// simple class component of React
// import '../ResumeCard.scss';
// and return a card with the resume

import React, { Component } from 'react';
import './ResumeCard.scss';
import { addToFavourites, checkIfInFavourites, removeCover, removeResumeCurrent } from '../../../firestore/dbOperations';
import { ReactComponent as ResumeIcon } from '../../../assets/resume.svg';
import { ReactComponent as BookmarkIcon } from '../../../assets/bookmark.svg';
import { ReactComponent as CoverIcon } from '../../../assets/CoverIcon.svg';
import { BsFillShareFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { AiTwotoneDelete } from 'react-icons/ai';
import { withTranslation } from 'react-i18next';

class ResumeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareModal: false,
            copied: false,
        };
        this.handleFavouriteClick = this.handleFavouriteClick.bind(this);
        this.checkIfFavourite = this.checkIfFavourite.bind(this);
        this.handleShareClick = this.handleShareClick.bind(this);
        this.handleCoverRemoveClick = this.handleCoverRemoveClick.bind(this);
        this.handleResumeRemoveClick = this.handleResumeRemoveClick.bind(this);
    }

    // handle favourite click event
    handleFavouriteClick = () => {
        if (this.props.favourites.includes(this.props.document.id) === true) {
            this.props.removeFavorite(this.props.document.id);
            this.props.showToast('success', 'Removed from favourites', 'You have removed this resume from your favourites');
        } else {
            this.props.addFavorite(this.props.document.id);
            this.props.showToast('success', 'Added to favourites', 'You have added this resume to your favourites');
        }

        checkIfInFavourites(localStorage.getItem('user'), this.props.document.id)
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    };
    // a function that checks if the id of the documents is in this.props.favourites if it is then it will return true
    checkIfFavourite(id) {
        if (this.props.favourites.includes(id)) {
            return true;
        } else {
            return false;
        }
    }

    handleShareClick = () => {
        this.setState({ shareModal: true });
    };

    handleShareModalClose = () => {
        this.setState({ shareModal: false });
    };
    handleCopyClick = (link) => {
        // copy shareable link input value to clipboard without execommand

        navigator.clipboard.writeText(link);

        this.setState({ copied: true });
        setTimeout(() => {
            this.setState({ copied: false });
        }, 500);
        setTimeout(() => {
            this.handleShareModalClose();
        }, 500);
    };

    shareAbleLinkFormatter = (id) => {
        // link is https://domain/shared/id
        return window.location.origin + '/shared/' + id;
    };

    setAsCurrentResume(resumeId, data) {
        console.log(data);
        localStorage.removeItem('currentResumeId');
        localStorage.removeItem('currentResumeDara');
        localStorage.setItem('currentResumeId', resumeId);
        localStorage.setItem('currentResumeItem', JSON.stringify(data));
        localStorage.setItem('currentCoverId', resumeId);

        console.log('Data of resumes');
        var resumeData = JSON.parse(localStorage.getItem('currentResumeItem'));
        console.log(resumeData.firstname);
        // redirect to /
        window.location.href = '/';
    }
    // function that handle remove click of resume
    handleResumeRemoveClick = async (id) => {
        let res = await removeResumeCurrent(localStorage.getItem('user'), id);
        if (res) {
            this.props.getAllDocuments();
            this.props.showToast('error', ' Document removed!', 'You have removed this document from your account ');

        }
    };
    handleCoverRemoveClick = async (id) => {
        let res = await removeCover(localStorage.getItem('user'), id);
        if (res) {
            this.props.getAllDocuments();
        }
    };

    render() {
        const { t } = this.props;

        if (this.props.type == 'resume') {
            return (
                <div className="dashboard-resume-card">
                    <div className="dashboard-resume-card-head">
                        <div className="dashboard-resume-card-head-left">
                            <div style={{ backgroundColor: this.props.bgColor }} className="dashboard-resume-card-head-left-avatar">
                                <ResumeIcon className="dashboard-resume-card-head-left-avatar-icon" />
                            </div>
                        </div>
                        <div className="dashboard-resume-card-head-center">
                            <div className="dashboard-resume-card-head-center-title">
                                {this.props.document.item?.firstname} {this.props.document.item?.lastname}
                            </div>
                            <div className="dashboard-resume-card-head-center-skills">
                                {
                                    // check if no skills are added or undefined return no skills
                                    this.props.document.skills == undefined || this.props.document.skills.length == 0 ? (
                                        <div className="dashboard-resume-card-head-center-skills-item">{t('dashNew.noSkillsAdded')}</div>
                                    ) : (
                                        <>
                                            {this.props.document.skills.map((skill, index) => {
                                                return (
                                                    <div key={index} className="dashboard-resume-card-head-center-skills-item">
                                                        {skill.name}
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div className="dashboard-resume-card-head-right">
                            <div
                                onClick={() => this.handleFavouriteClick()}
                                className={`dashboard-resume-card-head-right-bookmark ${this.checkIfFavourite(this.props.document.id) === true && 'active'} `}>
                                <BookmarkIcon className="dashboard-resume-card-head-right-bookmark-icon" />
                            </div>
                            <div className={`dashboard-resume-card-head-right-bookmark `}>
                                <BsFillShareFill onClick={() => this.handleShareClick()} className="dashboard-resume-card-head-right-bookmark-icon" />

                                <AnimatePresence>
                                    {this.state.shareModal && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="dashboard-share-modal">
                                            <div className="dashboard-share-modal-head">
                                                <div className="dashboard-share-modal-head-title">{t('dashNew.shareDocument')}</div>
                                                <div onClick={() => this.handleShareModalClose()} className="dashboard-share-modal-head-close">
                                                    <IoClose className="dashboard-share-modal-head-close-icon" />
                                                </div>
                                            </div>
                                            <div className="dashboard-share-tabs">
                                                <div className="dashboard-share-tabs-item active">{t('dashNew.link')}</div>
                                            </div>

                                            <div className="dashboard-share-body">
                                                <div className="dashboard-share-body-title">{t('dashNew.linkDesc')}</div>
                                                <div className="dashboard-share-body-input">
                                                    <input id="shareableLink" type="text" value={this.shareAbleLinkFormatter(this.props.document.id)} />
                                                    <div
                                                        onClick={() => {
                                                            this.handleCopyClick(this.shareAbleLinkFormatter(this.props.document.id));
                                                        }}
                                                        className="dashboard-share-copy">
                                                        {this.state.copied && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="dashboard-share-copy-copied">
                                                                {t('dashNew.copied')}
                                                            </motion.div>
                                                        )}
                                                        {!this.state.copied && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="dashboard-share-copy-icon">
                                                                {t('dashNew.copy')}
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div onClick={() => this.setAsCurrentResume(this.props.document.id, this.props.document)} className={`dashboard-resume-card-head-right-bookmark `}>
                                <MdModeEdit className="dashboard-resume-card-head-right-bookmark-icon" />
                            </div>
                            <div onClick={() => this.handleResumeRemoveClick(this.props.document.id)} className={`dashboard-resume-card-head-right-bookmark  remove`}>
                                <AiTwotoneDelete className="dashboard-resume-card-head-right-bookmark-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-resume-card-body">
                        <div className="dashboard-resume-card-body-description">
                            <p>{this.props.document.item?.summary == '' ? 'Aucun résumé ajouté' : this.props.document.item?.summary}</p>
                        </div>
                    </div>
                    <div className="dashboard-resume-card-footer">
                        <div className="dashboard-resume-card-footer-date">
                            {this.props.document.item?.created_at?.toDate().toLocaleString('fr-FR', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.type == 'cover') {
            return (
                <div className="dashboard-resume-card">
                    <div className="dashboard-resume-card-head">
                        <div className="dashboard-resume-card-head-left">
                            <div style={{ backgroundColor: this.props.bgColor }} className="dashboard-resume-card-head-left-avatar">
                                <CoverIcon className="dashboard-resume-card-head-left-avatar-icon" />
                            </div>
                        </div>
                        <div className="dashboard-resume-card-head-center">
                            <div className="dashboard-resume-card-head-center-title">
                                {this.props.document.item?.firstname} {this.props.document.item?.lastname}
                            </div>
                        </div>
                        <div className="dashboard-resume-card-head-right">
                            <div
                                onClick={() => this.handleFavouriteClick()}
                                className={`dashboard-resume-card-head-right-bookmark ${this.checkIfFavourite(this.props.document.id) === true && 'active'} `}>
                                <BookmarkIcon className="dashboard-resume-card-head-right-bookmark-icon" />
                            </div>
                            <div className={`dashboard-resume-card-head-right-bookmark `}>
                                <BsFillShareFill onClick={() => this.handleShareClick()} className="dashboard-resume-card-head-right-bookmark-icon" />

                                <AnimatePresence>
                                    {this.state.shareModal && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="dashboard-share-modal">
                                            <div className="dashboard-share-modal-head">
                                                <div className="dashboard-share-modal-head-title">{t('dashNew.shareDocument')}</div>
                                                <div onClick={() => this.handleShareModalClose()} className="dashboard-share-modal-head-close">
                                                    <IoClose className="dashboard-share-modal-head-close-icon" />
                                                </div>
                                            </div>
                                            <div className="dashboard-share-tabs">
                                                <div className="dashboard-share-tabs-item active">{t('dashNew.link')}</div>
                                            </div>

                                            <div className="dashboard-share-body">
                                                <div className="dashboard-share-body-title">{t('dashNew.linkDesc')}</div>
                                                <div className="dashboard-share-body-input">
                                                    <input id="shareableLink" type="text" value={this.shareAbleLinkFormatter(this.props.document.id)} />
                                                    <div
                                                        onClick={() => {
                                                            this.handleCopyClick(this.shareAbleLinkFormatter(this.props.document.id));
                                                        }}
                                                        className="dashboard-share-copy">
                                                        {this.state.copied && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="dashboard-share-copy-copied">
                                                                {t('dashNew.copied')}
                                                            </motion.div>
                                                        )}
                                                        {!this.state.copied && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="dashboard-share-copy-icon">
                                                                {t('dashNew.copy')}
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div onClick={() => this.setAsCurrentResume(this.props.document.id, this.props.document)} className={`dashboard-resume-card-head-right-bookmark `}>
                                <MdModeEdit className="dashboard-resume-card-head-right-bookmark-icon" />
                            </div>
                            <div onClick={() => this.handleCoverRemoveClick(this.props.document.id)} className={`dashboard-resume-card-head-right-bookmark  remove`}>
                                <AiTwotoneDelete className="dashboard-resume-card-head-right-bookmark-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-resume-card-footer">
                        <div className="dashboard-resume-card-footer-date">
                            {
                                // firebase date object to  Month day, year at hour

                                this.props.document.item?.created_at?.toDate().toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const MyComponent = withTranslation('common')(ResumeCard);
export default MyComponent;
