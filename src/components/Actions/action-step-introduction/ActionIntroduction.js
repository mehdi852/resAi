import React, { Component } from 'react';
import './ActionIntroduction.scss';
import logo from '../../../assets/logo/logo.png';
import conf from '../../../conf/configuration';
import { Link } from 'react-router-dom';
import LanguagePicker from '../../Form/language-picker/LanguagePicker';
import { withTranslation } from 'react-i18next';
import { getPages } from '../../../firestore/dbOperations';
import TrustPilotImage from '../../../assets/trustpilot.png';
import HeadPNG from '../../../assets/headPNG.png';
import FeaturesPNG from '../../../assets/FeaturesPNG.png';
import IvoryCoast from '../../../assets/countries/ivory-coast.png';
import Mali from '../../../assets/countries/mali.png';
import Senegal from '../../../assets/countries/senegal.png';
import Togo from '../../../assets/countries/togo.png';
import Burkina from '../../../assets/countries/burkina-faso.png';
import Guinea from '../../../assets/countries/guinea.png';
import Benin from '../../../assets/countries/benin.png';
import Niger from '../../../assets/countries/niger.png';
import Cameroun from '../../../assets/countries/cameroon.png';
import Congo from '../../../assets/democratic-republic-of-congo.png';
import Home2 from '../../../assets/head3.png'   
import CvImage from '../../../assets/cvImage.png'

import { ReactComponent as Stars } from '../../../assets/stars.svg';
import { HiMenuAlt2 } from 'react-icons/hi';
import { get3Reviews, getWebsiteData } from '../../../firestore/dbOperations';

class ActionIntroduction extends Component {
    constructor(props) {
        super(props);
        if (document.location.search.substr(0, 7) === '?step=3') {
            this.props.goThirdStep();
        }

        this.getData();
        this.state = {
            pages: [],
            isMobileHeadToggle: false,
            reviews: [],
            reviewsNumber: 0,
        };
        window.location.pathname.substring(0, 8) === '/' && this.customStyles();

        this.customStyles = this.customStyles.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    authVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    handleToggleClick = () => {
        this.setState({ isMobileHeadToggle: !this.state.isMobileHeadToggle });
    };

    getData() {
        getWebsiteData().then((data) => {
            if (data) {
                this.setState({ reviewsNumber: data.rating });
            }
        });
    }

    customStyles() {
        document.getElementById('root').style.overflow = 'hidden';
        document.getElementById('root').style.height = '100%';
        document.getElementsByTagName('body')[0].style.height = '100%';
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        document.getElementsByTagName('html')[0].style.height = '100%';
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        document.getElementsByTagName('html')[0].style.overflowX = 'hidden';
    }

    componentDidMount() {
        getPages().then((value) => value !== null && this.setState({ pages: value }));
        get3Reviews().then((value) => value !== null && this.setState({ reviews: value }));
    }
    render() {
        const { t } = this.props;
        return (
            <div id="homepage" className="action-introWrapper">
                <div className="head">
                    <div className="brand">{conf.brand.useImg === false ? <span>{conf.brand.name}</span> : <img className="logo" src={logo} />}</div>
                    <div className="authentication">
                        {this.props.user !== null ? (
                            <Link style={{ textDecoration: 'none' }} to={{ pathname: './dashboard' }} className="authenticationButton">
                                {' '}
                                {t('selectionAction.account')}
                            </Link>
                        ) : (
                            <a onClick={() => this.props.authBtnHandler()} className="authenticationButton">
                                {' '}
                                {t('intro.login')}{' '}
                            </a>
                        )}
                        {this.props.values.email === conf.adminEmail && (
                            <Link style={{ textDecoration: 'none' }} to={{ pathname: './adm/dashboard' }} className="authenticationButton">
                                {' '}
                                {t('selectionAction.admin')}
                            </Link>
                        )}
                        {/* {this.props.user != null && <a onClick={() => this.props.logout()} className="authenticationButton">Logout</a>} */}
                        <LanguagePicker isHome={true} values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} />
                    </div>
                </div>
                <div className="head-mobile">
                    <div className="brand">{conf.brand.useImg === false ? <span>{conf.brand.name}</span> : <img className="logo" src={logo} />}</div>
                    {this.state.isMobileHeadToggle && (
                        <div className="authentication">
                            {this.props.user !== null ? (
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: './dashboard' }} className="authenticationButton">
                                    {' '}
                                    {t('selectionAction.account')}
                                </Link>
                            ) : (
                                <a onClick={() => this.props.authBtnHandler()} className="authenticationButton">
                                    {' '}
                                    {t('intro.login')}{' '}
                                </a>
                            )}
                            {this.props.values.email === conf.adminEmail && (
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: './adm/dashboard' }} className="authenticationButton">
                                    {' '}
                                    {t('selectionAction.admin')}
                                </Link>
                            )}
                            {/* {this.props.user != null && <a onClick={() => this.props.logout()} className="authenticationButton">Logout</a>} */}
                            <LanguagePicker isHome={true} values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} />
                        </div>
                    )}

                    <HiMenuAlt2 onClick={() => this.handleToggleClick()} className="head-toggle" />
                </div>
                <div className="body action-introBody">
                    <div className="intro-left">
                        {/* <h1>
                            {t('intro.titleLeft')} <span>{t('intro.titleSpan')}</span> {t('intro.titleRight')}
                        </h1>
                        <ul>
                            <li>
                                <div className="numberWrapper numberWrapperGold">
                                    <CrownImage className="crownImage" />
                                </div>
                                <span>Now you can create professional cover letters </span>
                            </li>
                            <li>
                                <div className="numberWrapper"> 1 </div> <span>{t('intro.step1')} </span>
                            </li>
                            <li>
                                <div className="numberWrapper"> 2 </div>
                                <span>{t('intro.step2')} </span>
                            </li>
                            <li>
                                <div className="numberWrapper"> 3 </div>
                                <span> {t('intro.step3')}</span>
                            </li>
                        </ul> */}

                        <div className="intro-head">
                            <h1> {t('homepageText.text1')}</h1>

                            <p className="headsub">Votre Partenaire est disponible à</p>
                            <div className="head-countries">
                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={IvoryCoast} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Côte d'Ivoire</div>
                                </div>

                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Mali} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Mali</div>
                                </div>

                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Senegal} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Sénégal</div>
                                </div>

                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Togo} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Togo</div>
                                </div>

                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Burkina} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Burkina</div>
                                </div>

                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Guinea} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Guinée Conakry</div>
                                </div>
                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Benin} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Bénin</div>
                                </div>
                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Niger} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Niger</div>
                                </div>
                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Cameroun} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">Cameroun</div>
                                </div>
                                <div className="head-country">
                                    <div className="head-country-wrapper">
                                        <img className="head-country-icon" src={Congo} alt="Cameroun" />
                                    </div>
                                    <div className="head-country-name">DC Congo</div>
                                </div>
                            </div>
                            <p>{t('homepageText.text2')}</p>

                            <span className="intro-light-text">Que souhaitez vous créer ?</span>
                            <div className="intro-button-selection">
                                <a className="light" onClick={() => this.props.goToResumeSelectionStep()}>
                                    {t('homepageText.text3')}
                                </a>
                                <a
                                    className="dark"
                                    onClick={() => {
                                        this.props.goToCoverSelection();
                                    }}>
                                    {t('homepageText.text4')}{' '}
                                </a>
                            </div>
                        </div>

                        <div className="intro-body">
                            {/*  App image */}
                            <div className="intro-body-head">
                            <img src={CvImage} className="intro-body-head-image" />
                            <div className="intro-body-circle">
                                
                            </div>
                            </div>

                            {/* Reviews */}
                            <div className="intro-body-reviews-wrapper">
                                <div className="intro-body-reviews">
                                    <h1>{t('homepageText.text5')}</h1>
                                    <div className="intro-body-reviews-list">
                                        <div className="intro-body-reviews-trustpilot">
                                            <span>{this.state.reviewsNumber} out of 5</span>
                                            <Stars />
                                            <img src={TrustPilotImage} alt="" />
                                            <p>Based on 1400 reviews</p>
                                        </div>

                                        {this.state.reviews.map((review, index) => {
                                            return (
                                                <div key={index} className="intro-body-reviews-list-item">
                                                    <img src={review.imageUrl} className="review-image" alt="Image" />
                                                    <span className="review-fullname">{review.name}</span>
                                                    <span className="review-position">{review.occupation}</span>
                                                    <p className="review-text">{review.review}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* Features */}
                            <div className="intro-body-features-wrapper">
                                <div className="intro-body-features">
                                    {/* Left */}
                                    <div className="intro-body-features-left">
                                        <h1>{t('homepageText.text8')}</h1>
                                        <p>{t('homepageText.text9')}</p>
                                    </div>
                                    {/*  right */}
                                    <div className="intro-body-features-right">
                                        <img src={Home2} className="features-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(ActionIntroduction);
export default MyComponent;
