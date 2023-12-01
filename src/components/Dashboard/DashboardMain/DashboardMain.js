import React, { Component } from 'react';
import './DashboardMain.scss';
import conf from '../../../conf/configuration';
import logo from '../../../assets/logo/logo.png';
import { BrowserRouter, Link, Route, Router } from 'react-router-dom';
import Toasts from '../../Toasts/Toats';
import Stats from '../stats/stats';
import fire from '../../../conf/fire';
// Components
import ResumeList from '../ResumesList/ResumesList';
import CoversList from '../CoversList/CoversList';
import ProfileDropDown from '../ProfileDropdown/ProfileDropdown';
import Settings from '../Settings/Settings';
// Images
import userImage from '../../../assets/user.png';
import arrow from '../../../assets/arrow.png';
import { getFullName, getAds } from '../../../firestore/dbOperations';
// Animation Library
import { motion, AnimatePresence, transform } from 'framer-motion';
import { withTranslation } from 'react-i18next';
import AddAds from '../../addAds/AddAds';
import AddPage from '../AddPage/AddPage';
import { Helmet } from 'react-helmet';
import { getWebsiteData } from '../../../firestore/dbOperations';
import i18n from '../../../i18n';
import { getPages } from '../../../firestore/dbOperations';
import ProfileDisplay from '../ProfileDisplay/ProfileDisplay';
import DashboardSearch from '../DashboardSearch/DashboardSearch';
import ResumeCard from '../ResumeCard/ResumeCard';
import DashboardToast from '../DashboardToast/DashboardToast';
import DashboardHomepage from '../DashboardHomepage/DashboardHomepage';
import DashboardSettings from '../DashboardSettings/DashboardSettings';
import DashboardFavourites from '../DashboardFavourites/DashboardFavourites';
// import i18
class DashboardMain extends Component {
    constructor(props) {
        super(props);
        this.authListener = this.authListener.bind(this);
        this.state = {
            user: null,
            role: 'user',
            toast: {
                isShowed: false,
                type: '', // success , error , warning
                title: '',
                text: '',
            },
            membership: '',
            firstname: '',
            lastname: '',
            displayDocuments: [],
            fetchedDocuments: [],
            activeNav: 'Dashboard',
            isDeleteToastShowed: false,
            isDropdownShowed: false,
            isCommingSoonShowed: false,
            pageNumber: 1,
            perPage: 2,
            isSettingsShowed: false,
            isAdsManagerShowed: false,
            isDashboardShowed: true,
            isAddPagesShowed: false,
            isFavoritesShowed: false,
            // Meta data
            metaDataFetched: false,
            websiteTitle: '',
            websiteDescription: '',
            profile: {},
            websiteKeywords: '',
            pages: [],
        };
        this.dropdownHandler = this.dropdownHandler.bind(this);
        this.settingsClickHandler = this.settingsClickHandler.bind(this);
        this.handleAdsClick = this.handleAdsClick.bind(this);
        this.handlePagesClick = this.handlePagesClick.bind(this);
        this.logout = this.logout.bind(this);
        this.showFavorites = this.showFavorites.bind(this);
        this.isSettingsPath = this.isSettingsPath.bind(this);

        this.showToast = this.showToast.bind(this);
    }
    componentWillMount() {
        this.authListener();
        getPages().then((value) => value !== null && this.setState({ pages: value }));
    }

    /// Check if the user is authenticated
    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.uid });
                getFullName(user.uid).then((value) => {
                    value !== undefined &&
                        this.setState({
                            firstname: value.firstname,
                            lastname: value.lastname,
                            membership: value.membership,
                            profile: value.profile,
                        });
                    console.log(value);
                });
                localStorage.setItem('user', user.uid);
                /// Checking if user ad
                if (user.email === conf.adminEmail) {
                    this.setState({ role: 'admin' });
                    getAds();
                }
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
                window.location.href = '/';
            }
        });
    }
    // Show Drop down
    dropdownHandler() {
        this.setState((prevState, props) => ({
            isDropdownShowed: !prevState.isDropdownShowed,
        }));
    }
    // Handle Settings Click
    settingsClickHandler() {
        this.setState((prevState, props) => ({
            isSettingsShowed: !prevState.isSettingsShowed,
            isAdsManagerShowed: false,
        }));
    }

    // Handle Ads Click
    handleAdsClick() {
        this.setState((prevState, props) => ({
            isSettingsShowed: false,
            activeNav: 'Ads Manager',
            isDashboardShowed: false,
            isAdsManagerShowed: true,
        }));
    }
    // Handle Ads Click
    handlePagesClick() {
        this.setState((prevState, props) => ({
            isSettingsShowed: false,
            activeNav: 'Pages',
            isDashboardShowed: false,
            isAdsManagerShowed: false,
            isAddPagesShowed: true,
        }));
    }
    // Logout
    logout() {
        fire.auth().signOut();
        localStorage.removeItem('currentResumeId');
        localStorage.removeItem('currentResumeItem');
        this.currentResume = null;
    }
    // Handling cover letter click to show coming soon message
    handleCoverLetter() {
        setTimeout(() => {
            this.setState((prevStat, props) => ({
                isCommingSoonShowed: !prevStat.isCommingSoonShowed,
            }));
        }, 2000);
        this.setState((prevStat, props) => ({
            isCommingSoonShowed: !prevStat.isCommingSoonShowed,
        }));
    }

    //show toast with a message
    showToast = (type, title, text) => {
        this.setState({
            toast: {
                isShowed: true,
                type: type, // success , error , warning
                title: title,
                text: text,
            },
        });
        // hide toast after 3 seconds
        setTimeout(() => {
            this.setState({
                toast: {
                    isShowed: false,
                    type: '', // success , error , warning
                    title: '',
                    text: '',
                },
            });
        }, 1000);
    };
    // show favorites
    showFavorites = () => {
        this.setState((prevState, props) => ({
            isFavoritesShowed: !prevState.isFavoritesShowed,
        }));
    };

    componentDidMount() {
        getWebsiteData().then((data) => {
            this.setState({
                metaDataFetched: true,
                websiteTitle: data.title,
                websiteDescription: data.description,
                websiteKeywords: data.keywords,
            });
        });
        // set currentResumeItem to null
        // set currentResumeId to null
        localStorage.removeItem('currentResumeId');
        localStorage.removeItem('currentResumeItem');
    }
    // a function that returns true if we are in this path /dashboard/settings
    isSettingsPath = () => {
        return window.location.pathname === '/dashboard/settings';
    };

    render() {
        const { t } = this.props;

        return this.state.user !== null ? (
            <div className="dashboardWrapper">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.state.websiteTitle + ' | Dashboard'}</title>
                    <meta name="description" content={this.state.websiteDescription} />
                    <meta name="keywords" content={this.state.websiteKeywords} />
                </Helmet>
                <AnimatePresence>
                    {this.state.isDeleteToastShowed && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Toasts type="Delete" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <DashboardToast isShowed={this.state.toast.isShowed} type={this.state.toast.type} title={this.state.toast.title} text={this.state.toast.text} />

                <DashboardFavourites showFavorites={this.showFavorites} isFavoritesShowed={this.state.isFavoritesShowed} />

                <div className="navbar">
                    {/* Website Logo */}
                    <div className="brand">
                        {conf.brand.useImg ? (
                            <Link to={'/dashboard'}>
                                <img src={logo} />
                            </Link>
                        ) : (
                            <span> {conf.brand.name} </span>
                        )}
                    </div>
                    {/* Navigation List */}
                    <div className="dashboardNavigaitionList">
                        <ul>
                            <li>
                                {' '}
                                <Link to="/" className="dashboardNavItem">
                                    {t('dashboard.homepage')}
                                </Link>
                            </li>
                            {/* <li>
                                <Link to={'/dashboard'} className={this.state.activeNav == 'Dashboard' ? 'dashboardNavItem dashboardNavItemActive' : 'dashboardNavItem '}>
                                    {t('dashboard.dashboard')}
                                </Link>
                            </li> */}

                            {this.state.pages.map((value, index) => {
                                return (
                                    // <li key={index}>
                                    //     {' '}
                                    //     <a className="custom-page__navlinks" href={'./' + value.id}>
                                    //         {value.id}
                                    //     </a>{' '}
                                    // </li>
                                    <li>
                                        <Link to={'/p/' + value.id} className={this.state.activeNav == value.id ? 'dashboardNavItem dashboardNavItemActive' : 'dashboardNavItem '}>
                                            {value.id}
                                        </Link>
                                    </li>
                                );
                            })}

                            <li>
                                <a href="https://news.cv-job.com" className="dashboardNavItem">
                                    Actualités
                                </a>{' '}
                            </li>
                            <li>
                                <Link to="contact" className="dashboardNavItem">
                                    Contactez-nous
                                </Link>{' '}
                            </li>
                        </ul>
                    </div>
                    {/* Profile  */}
                    <div onClick={() => this.dropdownHandler()} className="dashboarProfile">
                        <img className="dashboarProfileImage" src={userImage} alt="profile Image" />
                        <Link to="/dashboard/settings" className="dashboarProfileName">
                            Mon Compte
                        </Link>
                    </div>
                </div>
                <div className="dashboardContentWrapper">
                    <Route exact path="/dashboard" render={(props) => <DashboardHomepage profile={this.state.profile} showFavorites={this.showFavorites} showToast={this.showToast} {...props} />} />
                    <Route exact path="/dashboard/settings" render={(props) => <DashboardSettings showToast={this.showToast} {...props} />} />

                    <Route exact path="/dashboard/favorites" render={(props) => <DashboardFavourites showToast={this.showToast} {...props} />} />
                </div>
            </div>
        ) : (
            ' '
        );
    }
}
const MyComponent = withTranslation('common')(DashboardMain);
export default MyComponent;
