import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import conf from '../../../conf/configuration';
import { CardElement } from '@stripe/react-stripe-js';
import CheckImage from '../../../assets/check.png';
import AmericanExpress from '../../../assets/paiment/american-express.png';
import Paypal from '../../../assets/paiment/paypal.png';
import Visa from '../../../assets/paiment/visa.png';
import MasterCard from '../../../assets/paiment/mastercard.png';
import JCB from '../../../assets/paiment/jcb.png';
import DropdownInput from '../../Form/dropdown-input/DropdownInput';
import SimpleInput from '../../Form/simple-input/SimpleInput';
import axios from 'axios';
import { addSbs } from '../../../firestore/dbOperations';
import SuccessAnimation from '../../../assets/animations/50049-nfc-successful.json';
import { withTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import { useLottie } from 'lottie-react';

const successOptions = {
    loop: false,
    autoplay: true,
    animationData: SuccessAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

const View = () => {
    const options = {
        loop: false,
        autoplay: true,
        animationData: SuccessAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const { View } = useLottie(options);
    return View;
};

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.countries = ["Côte d'Ivoire","Mali","Sénégal","Togo","Burkina","Guinée Conakry","Bénin","Niger","Cameroun","DC Congo"];
        this.state = {
            step: 0,
            isLoading: false,
            postalCode: '',
            country: '',
            cardHolder: '',
            address: '',

            API_KEY: '17416289635f58c01f79e397.14430727',
            SITE_ID: '736657',
        };

        window.CinetPay.setConfig({
            apikey: '17416289635f58c01f79e397.14430727',
            site_id: '736657',
            mode: 'PRODUCTION',
            notify_url: 'https://mondomaine.com/notify/', // Replace with your notification URL
        });

        this.handlePayment = this.handlePayment.bind(this);
        this.initializeCinetpay = this.initializeCinetpay.bind(this);

        this.generateRandomId = this.generateRandomId.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    // Initialize Cinetpay SDK
    initializeCinetpay = () => {};

    generateRandomId(length) {
        const characters = '123456';
        let id = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }

        return id;
    }

    // Handle payment initiation
    handlePayment = () => {
        let randomId = null;
        setTimeout(() => {
            randomId = this.generateRandomId();
        }, 500);
        // Replace with your payment data
        const paymentData = {
            transaction_id: (Math.floor(Math.random() * 900000) + 100000 ).toString(),
            amount: parseInt(this.props.selectedPlan == 'monthly' ? this.props.monthly : this.props.electedPlan == 'halfYear' ? this.props.quartarly : this.props.yearly),
            currency: 'XOF',
            channels: 'ALL',
            description: 'Subscription Resume builder',
        };

        // Initiate the payment
        window.CinetPay.getCheckout(paymentData);

        window.CinetPay.waitResponse(function (data) {
            if (data.status == 'REFUSED') {
                if (alert('Votre paiement a échoué')) {
                    window.location.reload();
                }
            } else if (data.status == 'ACCEPTED') {
                if (alert('Votre paiement a été effectué avec succès')) {
                    addSbs(
                        this.props.selectedPlan,
                        'CinetPay',
                        new Date.now(),
                        this.props.selectedPlan == 'monthly'
                            ? this.props.monthly
                            : this.props.selectedPlan == 'halfYear'
                            ? this.props.quartarly
                            : this.props.selectedPlan == 'yearly'
                            ? this.props.yearly
                            : 0,
                        localStorage.getItem('user')
                    );
                }
            }
        });
        window.CinetPay.onError(function (data) {
            console.log(data);
        });
    };

    handleInput(name, event) {
        switch (name) {
            case 'Postal':
                this.setState({
                    postalCode: event.target.value,
                });
                break;
            case 'Country':
                this.setState({
                    country: event,
                });
                break;
            case 'CardHolder':
                this.setState({
                    cardHolder: event.target.value,
                });
                break;
            case 'Address':
                this.setState({
                    address: event.target.value,
                });
                break;
            default:
                break;
        }
    }

 
    handleSubmit = async () => {
        const { stripe, elements } = this.props;
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        this.setState({ isLoading: true });
        const res = await axios.post(conf.provider + '://' + conf.backendUrl + '/api/pay', {
            price:
                this.props.selectedPlan == 'monthly' ? this.props.monthly : this.props.selectedPlan == 'halfYear' ? this.props.quartarly : this.props.selectedPlan == 'yearly' ? this.props.yearly : 0,
        });
        const clientSecret = res.data['client_secret'];
        const time = res.data['server_time'];
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: this.state.cardHolder,
                },
            },
            // receipt_email: "ja3tar@gmail.com"
        });
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert('Error');
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                console.log('adding subscription');
                addSbs(
                    this.props.selectedPlan,
                    'CinetPay',
                    new Date(time).toDateString(),
                    this.props.selectedPlan == 'monthly'
                        ? this.props.monthly
                        : this.props.selectedPlan == 'halfYear'
                        ? this.props.quartarly
                        : this.props.selectedPlan == 'yearly'
                        ? this.props.yearly
                        : 0,
                    localStorage.getItem('user')
                );
                this.setState({ step: 3 });
                // Show a success message to your customer
            }
        }
    };
    nextStep() {
        this.setState((prevStat, props) => ({
            step: prevStat.step + 1,
        }));
    }
    previousStep() {
        this.setState((prevStat, props) => ({
            step: prevStat.step - 1,
        }));
    }
    render() {
        const { t } = this.props;

        return (
            <div className="checkout__content">
                {/* Left */}
                <div className="checkout__content-left">
                    <div className="checkout__content-left-wrapper">
                        <h2 className="checkout__content-leftTitle">{t('static.payment1')}</h2>
                        {/* Paiment list */}
                        <ul className="checkout__content-leftList">
                            <li>
                                {' '}
                                <img src={CheckImage} alt="check" /> {t('static.payment2')}
                            </li>
                            <li>
                                {' '}
                                <img src={CheckImage} alt="check" /> {t('static.payment3')}
                            </li>
                            <li>
                                {' '}
                                <img src={CheckImage} alt="check" /> {t('static.payment4')}
                            </li>
                        </ul>
                        {/* Questio */}
                        <div className="checkout__content-leftQuestion">
                            <h3>{t('static.payment5')}</h3>
                            <p>{t('static.payment6')}</p>
                        </div>
                        {/* Questio */}
                        <div className="checkout__content-leftQuestion">
                            <h3>{t('static.payment')}</h3>
                            <div className="methods">
                                <img src={Visa} alt="card" />
                                <img src={MasterCard} alt="card" />
                                <img src={Paypal} alt="card" />
                                <img src={JCB} alt="card" />
                                <img src={AmericanExpress} alt="card" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="checkout__content-right">
                    <div className="checkout__content-rightWrapper">
                        <div className="head">
                            {/* Head */}

                            <span>{t('static.payment8')} </span>

                            <span>
                                {' '}
                                {this.props.currency}
                                {this.props.selectedPlan == 'monthly' ? this.props.monthly : this.props.selectedPlan == 'halfYear' ? this.props.quartarly : this.props.yearly}{' '}
                            </span>
                        </div>
                        {/* Postal code */}
                        {this.state.step == 0 && (
                            <div className="body">
                                <p className="whereLocated">{t('static.payment9')}</p>
                                <p className="description">{t('static.payment10')}</p>
                                <DropdownInput handleInputs={this.handleInput} placeholder="Cote d'ivoire" checkout={true} name="Country" title="Pays" options={this.countries} />
                                {/* <SimpleInput handleInputs={this.handleInput} title="Postal Code" checkout={true} /> */}
                                <div onClick={() => this.nextStep()} className="checkout-continue-btn">
                                    Continue
                                </div>
                            </div>
                        )}
                        {/* Pick method  */}
                        {this.state.step == 1 && (
                            <div className="body">
                                {this.props.onlyCinet == true || this.props.onlyCinet == undefined ? (
                                    <div onClick={() => this.handlePayment()} className="checkout-continue-btn">
                                        Payez via Cinet Pay
                                    </div>
                                ) : (
                                    ''
                                )}

                                {/* <div className="checkout-continue-btn-light">
                                    <img src={Paypal} />
                                </div> */}
                                {this.props.onlyPP == true || this.props.onlyPP == undefined ? (
                                    <PayPalButton
                                        amount={
                                            this.props.selectedPlan == 'yearly'
                                                ? this.props.yearly
                                                : this.props.selectedPlan == 'monthly'
                                                ? this.props.monthly
                                                : this.props.selectedPlan == 'halfYear'
                                                ? this.props.quartarly
                                                : 0
                                        }
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        options={{
                                            clientId: conf.paypalClienID,
                                            disableFunding: 'card',
                                        }}
                                        onSuccess={async (details, data) => {
                                            // we need to get the time from the server since it can be manipulated by the  client
                                            const res = await axios.post(conf.provider + '://' + conf.backendUrl + '/api/date');
                                            const time = res.data['date'];
                                            addSbs(
                                                this.props.selectedPlan,
                                                'Paypal',
                                                new Date(time).toDateString(),
                                                this.props.selectedPlan == 'monthly'
                                                    ? this.props.monthly
                                                    : this.props.selectedPlan == 'halfYear'
                                                    ? this.props.quartarly
                                                    : this.props.selectedPlan == 'yearly'
                                                    ? this.props.yearly
                                                    : 0
                                            );
                                            this.setState({ step: 3 });
                                            return true;
                                        }}
                                    />
                                ) : (
                                    ''
                                )}

                                {this.props.onlyPP !== false && this.props.onlyCinet ? (
                                    <div onClick={() => this.previousStep()} className="checkout-continue-btnOutlined">
                                        {t('static.payment14')}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        )}
                        {/* Checkout  */}
                        {this.state.step == 2 && (
                            <div className="body">
                                <div className="card-details">
                                    <input onChange={(event) => this.handleInput('CardHolder', event)} placeholder={t('static.payment15')} className="card-nameHolder" />
                                    <input onChange={(event) => this.handleInput('Address', event)} placeholder={t('static.payment16')} className="card-nameHolder" />
                                    <CardElement className="checkout-input" />
                                    <div
                                        onClick={() => {
                                            this.handleSubmit();
                                        }}
                                        className="checkout-continue-btn">
                                        Checkout
                                    </div>
                                    <div onClick={() => this.previousStep()} className="checkout-continue-btnOutlined">
                                        {t('static.payment14')}
                                    </div>
                                    {this.state.isLoading && <div>Processing Payment...</div>}
                                    <div className="testWrapper">
                                        {/* <span className="testHeading">To test payments. use this testing card</span>
                                        <span className="testData">Card Number : 4242 4242 4242 4242 Exp: 22/22</span>
                                        <span className="testData">Full Name : Test Test</span>
                                        <span className="testData">Address: Any address.</span>cd
                                        <span className="testData">Address: Any address.</span> */}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/*  Loding - > Success   */}
                        {this.state.step == 3 && (
                            <div className="body">
                                <div className="paimentConfirmation">
                                    <>{View}</>
                                    <h2>Your payment made succefully</h2>
                                    <div
                                        onClick={() => {
                                            window.location.href = window.location.pathname + '/';
                                        }}
                                        className="checkout-continue-btn">
                                        Continue
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* <Elements stripe={this.stripePromise}>
            <CardElement /> 
            </Elements> */}
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(Checkout);
export default MyComponent;
