import React from 'react';
import SettingsDropdown from '../SettingsDropdown/SettingsDropdown';
import { uploadImageToFirebase, getProfileOfUser, addProfileToUser, getAccountInfo, changePassword } from '../../../firestore/dbOperations';
import './DashboardSettings.scss';
import { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
function DashboardSettings(props) {
    // state to hold which settings are selected
    const [selectedSettings, setSelectedSettings] = React.useState('Profile');
    // account settings state
    const [accountSettings, setAccountSettings] = React.useState({
        email: '',
        password: '',
    });
    // database account settings state
    const [databaseAccountSettings, setDatabaseAccountSettings] = React.useState({
        email: '',
        membership: '',
        membershipEnds: '',
    });
    // set profile state that holds the profile data
    const [profile, setProfile] = React.useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        selectedImage: null,
    });

    //  handle profile form submit and update the profile state

    const handleInputChange = (e) => {
        e.preventDefault();

        // find which field is being updated
        const field = e.target.name;
        // find the value of the field
        const value = e.target.value;
        // update the profile state
        setProfile({
            ...profile,
            [field]: value,
        });
    };
    // handle account input change
    const handleAccountInputChange = (e) => {
        e.preventDefault();

        // find which field is being updated
        const field = e.target.name;
        // find the value of the field
        const value = e.target.value;
        // update the profile state
        setAccountSettings({
            ...accountSettings,
            [field]: value,
        });
    };
    // handle image upload and resize it to 200px width
    // if image is larger than 30kb we scale it down to 30kb
    const handleImageUpload = (e) => {
        e.preventDefault();
        // get the image file
        const imageFile = e.target.files[0];
        // create a new FileReader
        const reader = new FileReader();
        // if the image is larger than 30kb we scale it down to 30kb
        if (imageFile.size > 30000) {
            // create a new image
            const img = new Image();
            // set the image src to the image file BLOB
            img.src = URL.createObjectURL(imageFile);
            // once the image loads
            img.onload = async () => {
                // create a canvas element
                const canvas = document.createElement('canvas');
                // set the canvas width to 200px
                canvas.width = 200;
                // set the canvas height to the image height
                canvas.height = img.height * (200 / img.width);
                // get the canvas context
                const ctx = canvas.getContext('2d');
                // draw the image on the canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // get the data url from the canvas
                const dataUrl = canvas.toDataURL('image/jpeg');
                // set the selected image state
                setProfile({
                    ...profile,
                    selectedImage: dataUrl,
                });

                await uploadImageToFirebase(dataUrl, localStorage.getItem('user'));
                await getProfileOfUserFront();
            };
        } else {
            // if the image is less than 30kb we just set the image state
            reader.onloadend = async () => {
                setProfile({
                    ...profile,
                    selectedImage: reader.result,
                });
                await uploadImageToFirebase(reader.result, localStorage.getItem('user'));
            };
            reader.readAsDataURL(imageFile);
        }
    };

    const getProfileOfUserFront = async () => {
        let profile = await getProfileOfUser(localStorage.getItem('user'));

        // add only the fields that are in profile to state
        setProfile({
            ...profile,
            name: profile.name ? profile.name : '',
            phone: profile.phone ? profile.phone : '',
            address: profile.address ? profile.address : '',
            city: profile.city ? profile.city : '',
            postalCode: profile.postalCode ? profile.postalCode : '',
            country: profile.country ? profile.country : '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addProfileToUser(localStorage.getItem('user'), profile).then((result) => {
            if(result) {
               props.showToast('success',  t('dashNew.profileUpdated') , t('dashNew.profileUpdatedDesc'));
            }else{
                alert('Profile not updated');
            }
        });
    };

    const handleAccountSubvmit = async (e) => {
        e.preventDefault();

        await handleChangePassword().then((result) => {

        });
    };

    const getAccountInfoFront = async () => {
        let accountInfo = await getAccountInfo(localStorage.getItem('user'));
        console.log(accountInfo);
        setDatabaseAccountSettings({
            ...databaseAccountSettings,
            email: accountInfo.email,
            membership: accountInfo.membership,
            membershipEnds: accountInfo.membershipEnds,
        });
    };

    // handle Password change
    const handleChangePassword = async () => {
        if (accountSettings.password.length > 5) {
            await changePassword(accountSettings.password);
            props.showToast('success',  t('dashNew.passChanged'), t('dashNew.passChangedDesc'));
        } else {
            props.showToast('error',  t('dashNew.passError'), t('dashNew.passErrorDesc'));
        }
    };

    useEffect(() => {
        getProfileOfUserFront();
        getAccountInfoFront();
    }, []);

    const { t } = props;

    return (
        <div className="settings">
            {/* Head */}
            <div className="settings-head">
                <h2>Settings</h2>
            </div>
            {/* settings wrapper */}
            <div className="settings-wrapper">
                <div className="settings-wrapper-left">
                    <ul>
                        <li onClick={() => setSelectedSettings('Profile')}>
                            <div className="settings-item active">{t('dashNew.profile')}</div>
                        </li>
                        <li onClick={() => setSelectedSettings('Account')}>
                            <div className="settings-item">{t('dashNew.account')}</div>
                        </li>
                        {/* <li onClick={() => setSelectedSettings('Data')}>
                            <div className="settings-item">Data</div>
                        </li> */}
                    </ul>
                </div>

                <div className="settings-wrapper-right">
                    {selectedSettings === 'Profile' && (
                        <div className="settings-section">
                            <h3>Profile</h3>
                            {/* Avatar change */}
                            <div className="settings-section-avatar">
                                <div className="settings-section-avatar-img">{profile.image ? <img src={profile.image} alt="profile" /> : ''}</div>
                                <form>
                                    <label for="actual-btn" className="settings-section-avatar-input">
                                        <a className="settings-button blue">
                                          {t('dashNew.upload')}
                                        </a>
                                    </label>
                                    <input hidden onChange={(event) => handleImageUpload(event)} className="settings-button blue" type="file" id="actual-btn" />
                                </form>

                                <a className="settings-button grey">   {t('dashNew.remove')}</a>
                            </div>
                            {/* Form */}

                            <div className="settings-form">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="setting-form-grid-2">
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="fullName">{t('dashNew.fullName')}</label>
                                                <label htmlFor="fullName">{t('dashNew.fullNameDesc')}</label>
                                            </div>
                                            <input onChange={(e) => handleInputChange(e)} type="text" name="name" id="name" value={profile.name} />
                                        </div>

                                        {/* Phone - Address */}
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="phone">{t('dashNew.phone')}</label>
                                            </div>
                                            <input onChange={(e) => handleInputChange(e)} type="text" name="phone" id="phone" value={profile.phone} />
                                        </div>
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="address">{t('dashNew.address')}</label>
                                            </div>
                                            <input onChange={(e) => handleInputChange(e)} type="text" name="address" id="address" value={profile.address} />
                                        </div>

                                        {/* City - PostalCode */}
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="city">{t('dashNew.city')}</label>
                                            </div>
                                            <input onChange={(e) => handleInputChange(e)} type="text" name="city" id="city" value={profile.city} />
                                        </div>
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="postalCode">{t('dashNew.postalcode')}</label>
                                            </div>
                                            <input onChange={(e) => handleInputChange(e)} type="text" name="postalCode" id="postalCode" value={profile.postalCode} />
                                        </div>
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="postalCode">{t('dashNew.country')}</label>
                                            </div>
                                            <input onChange={(e) => handleInputChange(e)} type="text" name="country" id="country" value={profile.country} />
                                        </div>

                                        {/* Save Button */}
                                        <div className="setting-form-group">
                                            <input style={{ marginTop: '25px' }} name="submit" className="settings-form-submit" type="submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {selectedSettings === 'Account' && (
                        <div className="settings-section">
                            <h3>{t('dashNew.account')}</h3>

                            <div className="settings-form">
                                <form onSubmit={(event) => handleAccountSubvmit(event)}>
                                    <div className="setting-form-grid-2">
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="dpName">{t('dashNew.email')}</label>
                                                <label htmlFor="dpName">{t('dashNew.emailDesc')}</label>
                                            </div>
                                            <input disabled onChange={(e) => handleInputChange(e)} type="text" name="dpName" id="dpName" value={databaseAccountSettings.email} />
                                        </div>
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="subscription">{t('dashNew.description')}</label>
                                                <label htmlFor="subscription"> {t('dashNew.descriptionDesc')} </label>
                                            </div>
                                            <input disabled onChange={(e) => handleInputChange(e)} type="text" name="name" id="name" value={databaseAccountSettings.membership} />
                                        </div>

                                        {/* Phone - Address */}
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="phone">{t('dashNew.changePassword')}</label>
                                                <label htmlFor="phone">{t('dashNew.newPassword')}</label>
                                            </div>
                                            <input type="password" onChange={(e) => handleAccountInputChange(e)} name="password" id="password" value={accountSettings.password} />
                                        </div>

                                        {/* Phone - Address */}
                                        <div className="setting-form-group">
                                            <div className="labels">
                                                <label htmlFor="phone">{t('dashNew.sbsend')}</label>
                                                <label htmlFor="phone"> {t('dashNew.sbsendDesc')} </label>
                                            </div>
                                            <input
                                                disabled
                                                onChange={(e) => handleInputChange(e)}
                                                name="phone"
                                                id="phone"
                                                // firebase timestamp to string
                                                value={
                                                    databaseAccountSettings.membershipEnds ? new Date(databaseAccountSettings.membershipEnds.seconds * 1000).toDateString() : 'No subscription'
                                                }
                                            />
                                        </div>

                                        {/* Save Button */}
                                        <div className="setting-form-group">
                                            <input style={{ marginTop: '25px' }} name="submit" className="settings-form-submit" type="submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}



const MyComponent = withTranslation('common')(DashboardSettings);
export default MyComponent;
