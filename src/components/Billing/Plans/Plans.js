import React, { Component } from 'react';
import Logo from '../../../assets/logo/logo.png';
import conf from '../../../conf/configuration';
import { ReactComponent as FacebookImage } from '../../../assets/facebook.svg';
import { ReactComponent as TwitterImage } from '../../../assets/twitter.svg';
import { ReactComponent as InstagramImage } from '../../../assets/instagram.svg';
import { ReactComponent as PinterestImage } from '../../../assets/pinterest.svg';
import { ReactComponent as YoutubeImage } from '../../../assets/youtube.svg';
import './Plans.scss';
import '../../CustomPage/CustomPage.scss';
import { getPageByName, getPages, getWebsiteDetails, getSocialLinks, getWebsiteData, getSubscriptionStatus } from '../../../firestore/dbOperations';
import PlansTable from './PlansTable';
import Checkout from './Checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import i18n from '../../../i18n';

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            websiteName: '',
            websiteDescription: '',
            pageContent: '',
            socialLinks: null,
            step: 0,
            monthly: null,
            quartarly: null,
            yearly: null,
            selectedPlan: null,
            isLoading: true,
            onlyPP: false,
            onlyCinet:true,
            currency: '',
        };
        this.customStyles();
        this.stripePromise = loadStripe(conf.stripe_publishable_key);
        window.location.pathname.substring(0, 14) == '/billing/plans' && this.customStyles();
        this.customStyles = this.customStyles.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }
    nextStep(plan) {
        this.setState((prevState) => ({
            step: prevState.step + 1,
            selectedPlan: plan,
        }));
    }
    previousStep() {
        this.setState((prevState) => ({
            step: prevState.step - 1,
        }));
    }
    // Giving the proper stylicn for custom pages
    customStyles() {
        document.getElementById('root').style.overflow = 'unset';
    }
    componentDidMount() {
        getPages().then((value) => this.setState({ pages: value }));
        getWebsiteData().then((value) => {
            value !== null && this.setState({ websiteName: value.title, websiteDescription: value.description });
        });
        getSocialLinks().then((value) => {
            value !== null && this.setState({ socialLinks: value });
        });
        getSubscriptionStatus().then((data) => {
            this.setState({ monthly: data.monthlyPrice, quartarly: data.quartarlyPrice, yearly: data.yearlyPrice, onlyPP: data.onlyPP,onlyCinet: data.onlyCinet, currency: data.currency });
        });
    }
    componentWillMount() {
        // Check which language
        if (localStorage.getItem('language')) {
            this.handleLanguageClick(localStorage.getItem('language'));
        } else {
            // this.handleLanguageClick('en')
        }
    }
    // Handle language click
    handleLanguageClick(language) {
        i18n.changeLanguage(language);
        this.setState({ language: language });
        localStorage.setItem('language', language);
    }
    render() {
        const { t } = this.props;

        return (
            <Elements stripe={this.stripePromise}>
                <div className="custom-page">
                    {/* Navbar */}
                    <div className="custom-page__nav">
                        <a>
                            <img className="custom-page__nav__logo" src={Logo} />
                        </a>
                        <ul className="custom-page__navlinks">
                            <li>
                                {' '}
                                <Link className="custom-page__navlinks" to={{ pathname: '/' }}>
                                    {t('static.footer8')}
                                </Link>{' '}
                            </li>
                            {this.state.pages !== null &&
                                this.state.pages.map((value, index) => {
                                    return (
                                        <li>
                                            {' '}
                                            <Link className="custom-page__navlinks" to={{ pathname: '/p/' + value.id }}>
                                                {value.id}
                                            </Link>{' '}
                                        </li>
                                    );
                                })}
                            <li>
                                {' '}
                                <Link className="custom-page__navlinks" to={{ pathname: '/contact' }}>
                                    {t('static.nav2')}
                                </Link>{' '}
                            </li>
                        </ul>
                        <div className="custom-page__nav__action">
                            <Link to={{ pathname: '/' }}>{t('static.nav1')}</Link>
                        </div>
                    </div>
                    {/* Page Content */}
                    <div className="custom-page__content">
                        <div className="custom-page__Plans">
                            {this.state.step == 0 && (
                                <PlansTable currency={this.state.currency} monthly={this.state.monthly} quartarly={this.state.quartarly} yearly={this.state.yearly} nextStep={this.nextStep} />
                            )}
                            {this.state.step == 1 && (
                                <ElementsConsumer>
                                    {({ stripe, elements }) => (
                                        <Checkout
                                            currency={this.state.currency}
                                            onlyPP={this.state.onlyPP}
                                            onlyCinet={this.state.onlyCinet}
                                            previousStep={this.previousStep}
                                            stripe={stripe}
                                            elements={elements}
                                            monthly={this.state.monthly}
                                            quartarly={this.state.quartarly}
                                            yearly={this.state.yearly}
                                            selectedPlan={this.state.selectedPlan}
                                        />
                                    )}
                                </ElementsConsumer>
                            )}
                        </div>
                    </div>
                    {/* Page Footer */}
                    <div className="custom-page__footer-wrapper">
                        <div className="custom-page__footer">
                            {/* Footer Item */}
                            <div className="custom-page__footer-item">
                                <a className="custom-page__footer-item__title"> {t('static.footer1')} </a>
                                <ul className="custom-page__footer-item__social-links">
                                    <li>
                                        <div className="social-link__facebook">
                                            {' '}
                                            <a href={this.state.socialLinks !== null ? this.state.socialLinks.facebook : '#'}>
                                                <FacebookImage className="social-link__icon" />
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="social-link__twitter">
                                            {' '}
                                            <a href={this.state.socialLinks !== null ? this.state.socialLinks.twitter : '#'}>
                                                {' '}
                                                <TwitterImage className="social-link__icon" />
                                            </a>{' '}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="social-link__pinterest">
                                            {' '}
                                            <a href={this.state.socialLinks !== null ? this.state.socialLinks.pinterest : '#'}>
                                                {' '}
                                                <PinterestImage className="social-link__icon" />
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="social-link__instagram">
                                            {' '}
                                            <a href={this.state.socialLinks !== null ? this.state.socialLinks.instagram : '#'}>
                                                {' '}
                                                <InstagramImage className="social-link__icon" />{' '}
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="social-link__youtube">
                                            <a href={this.state.socialLinks !== null ? this.state.socialLinks.youtube : '#'}>
                                                <YoutubeImage className="social-link__icon" />{' '}
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                                <p>{t('static.footer4')}</p>
                            </div>
                            {/* Footer Item */}
                            <div className="custom-page__footer-item">
                                <a className="custom-page__footer-item__title"> {t('static.footer7')} </a>
                                <ul className="custom-page__footer-item__website-links">
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    {this.state.pages !== null &&
                                        this.state.pages.map((value, index) => {
                                            return (
                                                <li>
                                                    <a href={'/p/' + value.id}>{value.id}</a>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                            {/* Footer Item */}
                            <div className="custom-page__footer-item">
                                <a className="custom-page__footer-item__title"> {t('static.footer5')} </a>
                                <p>{this.state.websiteDescription}</p>
                            </div>
                        </div>
                        {/* Divider */}
                        <hr className="custom-page__footer-devider"></hr>
                        <div className="custom-page__footer-copyright">
                            <span>{this.state.websiteName}</span> {t('static.footer6')}
                        </div>
                    </div>
                </div>
            </Elements>
        );
    }
}

const MyComponent = withTranslation('common')(Billing);
export default MyComponent;
