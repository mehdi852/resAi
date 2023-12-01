import React from 'react';
import './DashboardActions.scss';
import { getStatesOfUser } from '../../../firestore/dbOperations';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { FiDownloadCloud } from 'react-icons/fi';
import { MdAdsClick } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
 function DashboardActions(props) {
    // state that hold numberOfDocumentsGenerated , numberOfDocumentsDownloaded , numberOfDocumentVisites
    const [states, setStates] = React.useState({
        documentsGenerated: null,
        documentsDownloaded: null,
        numberOfDocumentVisites: null,
        isLoading: true,
    });

    // when we click on create new document we need to clear storage
    const clearStorage = () => {
        localStorage.removeItem('currentResumeItem');
        localStorage.removeItem('currentResumeId');
        localStorage.removeItem('currentCoverId');
    };

    // get states of user from firestore
    React.useEffect(() => {
        getStatesOfUser(localStorage.getItem('user')).then((res) => {
            setStates(res);
            //set loading
            setStates((prev) => ({ ...prev, isLoading: false }));
        });
    }, []);

    const { t } = props;

    return (
        <>
            <div className="dashboard-actions">
                {/* Head */}
                <div className="dashboard-actions-head">
                    <span>{t('dashNew.quickAccess')}</span>
                    <p>{t('dashNew.quickAccessDesc')}</p>
                    <Link onClick={() => clearStorage()} to="/" className="dashboard-action-btn">
                    {t('dashNew.createDocument')}                        
                    </Link>
                    <Link
                        to="#"
                        onClick={() => {
                            props.showFavorites();
                        }}
                        className="dashboard-action-btn">
                        {t('dashNew.favourites')}
                    </Link>
                    <Link
                        to="/dashboard/settings"
                      
                        className="dashboard-action-btn">
                        {t('dashNew.settings')}
                    </Link>
                </div>
            </div>

            <div className="dashboard-actions">
                {/* Head */}
                <div className="dashboard-actions-head">
                    <span>{t('dashNew.statistics')}</span>
                    <p>
                    {t('dashNew.statisticsDesc')}
                    </p>
                    <div className="dashboard-action-stats">
                        <div className="dashboard-action-stats-item">
                            {/* icon */}
                            <div className="dashboard-action-stats-item-icon">
                                <HiOutlineDocumentText className="dashboard-action-stats-item-icon" />
                            </div>
                            {/* text */}
                            <div className="dashboard-action-stats-item-text">
                                <span>{t('dashNew.documentsGenerated')}</span>
                                <p>{states.documentsGenerated === null ? <AiOutlineLoading3Quarters className="dashboard-stats-loading" /> :  states.documentsGenerated == undefined ? '0': states.documentsGenerated }</p>
                            </div>
                        </div>
                        <div className="dashboard-action-stats-item">
                            {/* icon */}
                            <div className="dashboard-action-stats-item-icon">
                                <FiDownloadCloud className="dashboard-action-stats-item-icon" />
                            </div>
                            {/* text */}
                            <div className="dashboard-action-stats-item-text">
                                <span>{t('dashNew.downloads')}</span>
                                <p>{states.documentsDownloaded === null ? <AiOutlineLoading3Quarters className="dashboard-stats-loading" /> : states.documentsDownloaded == undefined ? '0': states.documentsDownloaded }</p>
                            </div>
                        </div>

                      
                    </div>
                </div>
            </div>
        </>
    );
}

const MyComponent = withTranslation('common')(DashboardActions);
export default MyComponent;
