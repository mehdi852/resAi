import React, { Component } from 'react';
import DashboardSearch from '../DashboardSearch/DashboardSearch';
import ProfileDisplay from '../ProfileDisplay/ProfileDisplay';
import ResumeCard from '../ResumeCard/ResumeCard';
import './DashboardHomepage.scss';
import { getResumes, getCoversOfUser, getFavourites, getProfileOfUser } from '../../../firestore/dbOperations';
import DashboardActions from '../DasboardActions/DashboardActions';
import DashboardFavourites from '../DashboardFavourites/DashboardFavourites';
import DashboardPagination from '../DashboardPagination/DashboardPagination';
import { ReactComponent as NothingFound } from '../../../assets/nothing-found.svg';
import LoaderAnimation from '../../../assets/animations/lottie-loader.json';
import { withTranslation } from 'react-i18next';
import { useLottie } from "lottie-react";


const View = () => {
    const loaderOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const { View } = useLottie(loaderOptions);
    return View;
  };


class DashboardHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDocuments: [],
            fetchedDocuments: [],
            pageNumber: 1,
            perPage: 3,
            favourites: [],
            isfetcing: false,
            profile: {
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                country: '',
                occupation:'',
            },
            // filters
            filters: {
                resume: true,
                coverLetter: true,
            },
        };

        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.getAllDocuments = this.getAllDocuments.bind(this);
        this.returnDocuments = this.returnDocuments.bind(this);
        this.getProfileOfUserFront = this.getProfileOfUserFront.bind(this);
        this.setPageNumber = this.setPageNumber.bind(this);
        this.searchDocuments = this.searchDocuments.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.filterDocuments = this.filterDocuments.bind(this);
        this.frontGetFavourites = this.frontGetFavourites.bind(this);
    }

    async getAllDocuments() {
        // clear fetcheddocuments
        this.setState({ fetchedDocuments: [], isfetcing: true });
        // user getResumeByPage using the logged in user id and page 1
        await getResumes(localStorage.getItem('user')).then((documents) => {
            // concat documents to fetched documents
            // if there are documents
            if (documents) {
                this.setState({ fetchedDocuments: this.state.fetchedDocuments.concat(documents) });
            }
        });
        await getCoversOfUser(localStorage.getItem('user')).then((documents) => {
            if (documents) {
                this.setState({ fetchedDocuments: this.state.fetchedDocuments.concat(documents) });
            }
        });
        console.log(this.state.fetchedDocuments);
        this.setState({ isfetcing: false });
        // if fetched document is   empty

        if (this.state.fetchedDocuments.length === 0) {
            this.setState({ displayDocuments: null });
            return;
        }

        this.returnDocuments();
    }

    /// set filters
    setFilters(filters) {
        // add filters to state
        // we may not have all of them so add only the ones that are in state
        let stateFilters = this.state.filters;
        for (let key in filters) {
            if (stateFilters.hasOwnProperty(key)) {
                stateFilters[key] = filters[key];
            }
        }
        this.setState({ filters: stateFilters }, () => {
            this.returnDocuments();
        });
    }

    // set display documents to the documents that match the filters
    // if the documents contains employments this means that it is a resume

    filterDocuments() {}

    async getProfileOfUserFront() {
        let profile = await getProfileOfUser(localStorage.getItem('user'));

        // add only the fields that are in profile to state
        let stateProfile = this.state.profile;
        for (let key in profile) {
            if (stateProfile.hasOwnProperty(key)) {
                stateProfile[key] = profile[key];
            }
        }
        this.setState({ profile: stateProfile });
    }

    // a function that from the state perPage and fetcheddocuments calculates the number of pages
    calculatePages() {
        return Math.ceil(this.state.fetchedDocuments.length / this.state.perPage);
    }

    // add one id to favorites state
    addFavorite(id) {
        this.setState({ favourites: this.state.favourites.concat(id) });
    }

    // remove one id from favorites state
    removeFavorite(id) {
        this.setState({ favourites: this.state.favourites.filter((item) => item !== id) });
    }

    // get favourites

    frontGetFavourites() {
        getFavourites(localStorage.getItem('user')).then((value) => {
            this.setState({ favourites: value });
        });
    }


    componentDidMount() {
        this.getAllDocuments();
        this.frontGetFavourites();
        this.getProfileOfUserFront();
    }

    returnDocuments() {
        // if both true
        if (this.state.filters.resume && this.state.filters.coverLetter) {
            // respect the page number and per page
            let start = (this.state.pageNumber - 1) * this.state.perPage;
            let end = start + this.state.perPage;
            this.setState({ displayDocuments: this.state.fetchedDocuments.slice(start, end) });
            return;
        }

        // if this.state.filters.resume === false and this.state.filters.coverLetter === false
        // empty display documents

        if (!this.state.filters.resume && !this.state.filters.coverLetter) {
            this.setState({ displayDocuments: [] });
            return;
        }

        // if this.state.filters.resume === true and this.state.filters.coverLetter === false

        if (this.state.filters.resume && !this.state.filters.coverLetter) {
            this.setState({ displayDocuments: this.state.fetchedDocuments.filter((item) => item.employments !== undefined) });
            return;
        }

        // if this.state.filters.resume === false and this.state.filters.coverLetter === true

        if (!this.state.filters.resume && this.state.filters.coverLetter) {
            this.setState({ displayDocuments: this.state.fetchedDocuments.filter((item) => item.employments === undefined) });
            return;
        }
    }

    // set page number
    setPageNumber(pageNumber) {
        this.setState({ pageNumber: pageNumber }, () => {
            this.returnDocuments();
        });
    }
    // a function that takes search input and  find the documents that match the search in documents[].item.firstname or documents[].item.lastname
    // and sets the displaydocuments to the found documents
    searchDocuments(searchInput) {
        if (searchInput === '') {
            this.setState({ displayDocuments: this.state.fetchedDocuments.slice((this.state.pageNumber - 1) * this.state.perPage, this.state.pageNumber * this.state.perPage) });
        } else {
            let documents = this.state.fetchedDocuments.filter((document) => {
                return document.item.firstname.toLowerCase().includes(searchInput.toLowerCase()) || document.item.lastname.toLowerCase().includes(searchInput.toLowerCase());
            });
            this.setState({ displayDocuments: documents });
        }
    }

    render() {
   
        const { t } = this.props;

        return (
            <div className="dashboard-homepage">
                {/* {this.state.isSettingsShowed ? <Settings membership={this.state.membership} role={this.state.role} firstname={this.state.firstname} lastname={this.state.lastname} uid={this.state.user} /> : this.state.isAdsManagerShowed ? <AddAds /> : this.state.isAddPagesShowed ? <AddPage /> : <ResumeList showDeletedToast={this.showDeletedToast} />}
                    {this.state.isSettingsShowed ? <Settings membership={this.state.membership} role={this.state.role} firstname={this.state.firstname} lastname={this.state.lastname} uid={this.state.user} /> : this.state.isAdsManagerShowed ? <AddAds /> : this.state.isAddPagesShowed ? <AddPage /> : <CoversList showDeletedToast={this.showDeletedToast} />} */}

                {/* Here we will have the dashboard grid */}

                <div className="dashboardGrid">
                    {/* Left  :Profile */}
                    <div className="dashboardGridLeft">
                        <ProfileDisplay getProfileOfUserFront={this.getProfileOfUserFront} profile={this.state.profile} image={this.props.profile} />
                    </div>
                    {/* Right : Middle */}
                    <div className="dashboardGridCenter">
                        {/* Search form */}
                        <DashboardSearch setFilters={this.setFilters} searchDocuments={this.searchDocuments} />
                    
                        {this.state.displayDocuments !== null &&
                            this.state.displayDocuments.length > 0 &&
                            this.state.displayDocuments.map((document) => {
                                // check if the document contains components argument
                                if (document) {
                                    if (document.item.components) {
                                        return (
                                            <ResumeCard
                                            key={document.id}
                                                type="cover"
                                                showToast={this.props.showToast}
                                                document={document}
                                                favourites={this.state.favourites}
                                                addFavorite={this.addFavorite}
                                                removeFavorite={this.removeFavorite}
                                                getAllDocuments = {this.getAllDocuments}
                                                frontGetFavourites={this.frontGetFavourites}
                                            />
                                        );
                                    } else {
                                        return (
                                            <ResumeCard
                                            key={document.id}
                                                type="resume"
                                                showToast={this.props.showToast}
                                                document={document}
                                                favourites={this.state.favourites}
                                                addFavorite={this.addFavorite}
                                                removeFavorite={this.removeFavorite}
                                                getAllDocuments = {this.getAllDocuments}
                                                frontGetFavourites={this.frontGetFavourites}
                                            />
                                        );
                                    }
                                }
                            })}
                        {this.state.displayDocuments === null && this.state.isfetcing === false && (
                            <div className="noDocuments">
                                <NothingFound className="icon" />
                                <h2> {t('dashNew.noDocumentFound')}</h2>
                               
                                <p> {t('dashNew.noDocumentFoundSub')}</p>
                            </div>
                        )}

                        {this.state.isfetcing === true && (
                            <div className="dashboar-loading">
                                {/* <Lottie options={loaderOptions} height={190} width={400} /> */}
                                <div style={{width:'300px',height:'300px'}}><View /></div>
                            </div>
                        )}

                        {/* Pagination */}
                        {this.state.displayDocuments !== null && (
                            <DashboardPagination
                                pageNumber={this.state.pageNumber}
                                perPage={this.state.perPage}
                                totalDocuments={this.state.fetchedDocuments.length}
                                setPageNumber={this.setPageNumber}
                            />
                        )}
                    </div>

                    {/* Right */}
                    <div className="dashboardGridRight">
                        <DashboardActions showFavorites={this.props.showFavorites} />
                    </div>
                </div>
            </div>
        );
    }
}


const MyComponent = withTranslation('common')(DashboardHomepage);
export default MyComponent;