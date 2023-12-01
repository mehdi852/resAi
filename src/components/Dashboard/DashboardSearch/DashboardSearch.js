import React, { Component } from 'react';
import './DashboardSearch.scss';

import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import { ReactComponent as FilterIcon } from '../../../assets/filter.svg';
import { AiOutlineLoading } from 'react-icons/ai';
import { withTranslation } from 'react-i18next';

class DashboardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filterDropShow: false,
            resume: true,
            coverLetter: true,
            isLoading: false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilterDrop = this.handleFilterDrop.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch = (event) => {
        // after user finish typing wait 2 seconds then alert (search)
        this.setState({ search: event.target.value, isLoading: true });
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.props.searchDocuments(this.state.search);
            this.setState({ isLoading: false });
        }, 1500);
    };

    // handle filter dropdown
    handleFilterDrop = () => {
        this.setState({
            filterDropShow: !this.state.filterDropShow,
        });
    };

    // handle resume checkbox and cover-letter checkbox click and setState with the selected values
    handleCheckBox = (event) => {
        const { name, checked } = event.target;
        this.setState({
            [name]: checked,
        });
        this.props.setFilters({[name]: checked});
    };
    // listen for click outside the filter dropdown and close it

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        // get dropdown element
        const dropdown = document.querySelector('.dashboard-search-filter-dropdown');
        // check if the click is outside the dropdown
        if (dropdown && !dropdown.contains(event.target)) {
            this.setState({
                filterDropShow: false,
            });
        }
    };

    // clear all filters
    clearAllFilters = () => {
        this.setState({
            resume: false,
            coverLetter: false,
        });
        this.props.setFilters({resume: false, coverLetter: false});
    };

    render() {
        const { t } = this.props;
        return (
            <>
                <div className="dashboard-search">
                    <div className="dashboard-search-group">
                        {this.state.isLoading ? <AiOutlineLoading className="dashboard-search-loading"/> : <SearchIcon className="dashboard-search-icon" />}

                        <input className="dashboard-search-input" type="text" placeholder= {t('dashNew.searchDocuments')} value={this.state.search} onChange={(e) => this.handleSearch(e)} />

                        <a className="dashboard-search-filter" onClick={() => this.handleFilterDrop()} href="#">
                            <FilterIcon className="dashboard-search-filter-icon" />
                            {t('dashNew.filter')} {/* Dropdown filter options, Resume,Cover Letter with checkbox */}
                            {/* Check if filter dropdown is showed */}
                        </a>
                        
                        <div style={{ position: 'relative' }}>
                            {this.state.filterDropShow === true && (
                                <div className="dashboard-search-filter-dropdown">
                                    <div className="dashboard-search-filter-dropdown-item">
                                        <input checked= {this.state.resume === true ? true : false} onChange={(event) => this.handleCheckBox(event)} type="checkbox" id="resume" name="resume" value="resume" />
                                        <label for="resume">{t('dashNew.resume')}</label>
                                    </div>
                                    <div className="dashboard-search-filter-dropdown-item">
                                        <input checked= {this.state.coverLetter === true ? true : false} onChange={(event) => this.handleCheckBox(event)} type="checkbox" id="coverLetter" name="coverLetter" value="coverLetter" />
                                        <label for="coverLetter">{t('dashNew.coverLetter')}</label>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <div className="dashboard-search-filter-items">
                    {this.state.resume === true && <div className="dashboard-search-filter-item">{t('dashNew.resume')}</div>}
                    {this.state.coverLetter === true && <div className="dashboard-search-filter-item">{t('dashNew.coverLetter')}</div>}
                    {/* Check if no filter dont show this */}
                    {this.state.resume === true || this.state.coverLetter === true ? (
                        <a onClick={() => this.clearAllFilters()} className="dashboard-search-filter-clearAll">
                           {t('dashNew.clearAll')}
                        </a>
                    ) : null}
                </div>
            </>
        );
    }
}


const MyComponent = withTranslation('common')(DashboardSearch);
export default MyComponent;