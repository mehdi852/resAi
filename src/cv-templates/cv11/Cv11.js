import React, { Component } from 'react';
import './Cv11.scss';

import AddressImage from '../../assets/cv10-assets/at.png';
import LocationImage from '../../assets/cv10-assets/location-pointer.png';
import PhoneImage from '../../assets/cv10-assets/phone-call.png';

import { withTranslation } from 'react-i18next';
import i18n from '../../i18n';

class Cv11 extends Component {
    constructor(props) {
        super(props);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.returnLanguages = this.returnLanguages.bind(this);
        i18n.changeLanguage(this.props.language);
    }

    returnEmployments() {
        var elements = [];
        for (let index = 0; index < this.props.values?.employments.length; index++) {
            elements.push(
                <div key={index} className="cv11-jobItem">
                    <div className="cv11-jobTitle">
                        <p>
                            {this.props.values?.employments[index].jobTitle} , <span className="cv11-employer">{this.props.values?.employments[index].employer}</span>.
                        </p>
                        <p className="cv11-jobtime">
                            {this.props.values?.employments[index].begin} - {this.props.values?.employments[index].end}
                        </p>
                    </div>
                    <div className="cv11-jobDesc">
                        <p> {this.props.values?.employments[index].description}</p>
                    </div>
                </div>
            );
        }
        return elements;
    }

    returnEducations() {
        var elements = [];
        for (let index = 0; index < this.props.values?.educations.length; index++) {
            elements.push(
                <div key={index} className="cv11-jobItem">
                    <div className="cv11-jobTitle">
                        <p>
                            {this.props.values?.educations[index].degree} , <span className="cv11-employer">{this.props.values?.educations[index].school}</span>.
                        </p>
                        <p className="cv11-jobtime">
                            {this.props.values?.educations[index].started} - {this.props.values?.educations[index].finished}
                        </p>
                    </div>
                    <div className="cv11-jobDesc">
                        <p>{this.props.values?.educations[index].description}</p>
                    </div>
                </div>
            );
        }
        return elements;
    }

    returnLanguages() {
        var elements = [];
        for (let index = 0; index < this.props.values?.languages.length; index++) {
            elements.push(
                <div key={index} className="cv11-languages">
                    <div className="cv11-languageName">{this.props.values?.languages[index].name}</div>
                    <div className="cv11-Level">{this.props.values?.languages[index].level}</div>
                </div>
            );
        }
        return elements;
    }
    returnSkills() {
        var elements = [];
        for (let index = 0; index < this.props.values?.skills.length; index++) {
            elements.push(
                <div key={index} className="cv11-skill">
                    {this.props.values?.skills[index].name}
                </div>
            );
        }
        return elements;
    }

    render() {
        const { t } = this.props;

        return (
            <div id="resumen" className="cv11-board">
                <div className="cv11-content">
                    <div className="cv11-content-head">
                        <h2>{this.props.values.firstname} {this.props.values.lastname}</h2>
                        <h3>{this.props.values.occupation} </h3>
                    </div>
                    
                    {/* Body */}
                    <div className="cv11-content-body">
                        {/* Left Side */}
                        <div className="cv11-content-left">
                            {/* SUmmary */}
                            <div className="cv11-sectionTitle">
                                <h2>{t('resume.personalSummary')}</h2>
                            </div>
                            <p class="cv11-summary">{this.props.values?.summary}</p>

                            {/* Professional experience */}
                            <div className="cv11-sectionTitle">
                                <h2>{t('resume.employmentHistory')}</h2>
                            </div>
                            {/* Job Items */}
                            {this.returnEmployments()}

                            {/* Education  */}
                            <div className="cv11-sectionTitle">
                                <h2>{t('resume.educationHistory')} </h2>
                            </div>

                            {/* Ecuations */}
                            {this.returnEducations()}
                        </div>
                        <div className="cv11-content-right">
                            <div className="cv11-sectionTitle">
                                <h2>{t('resume.info')} </h2>
                            </div>

                            <div className="cv11-infoSection">
                                {/* Info Item */}
                                <div className="cv11-infoItem">
                                    <div className="cv11-infoSectionLeft">
                                        <img alt="loation" src={LocationImage} />
                                    </div>
                                    <div className="cv11-infoSectionRight">
                                        <p>
                                            {this.props.values?.address} , {this.props.values?.city} , {this.props.values?.postalecode}, {this.props.values?.country}.
                                        </p>
                                    </div>
                                </div>
                                {/* Info Item */}
                                <div className="cv11-infoItem">
                                    <div className="cv11-infoSectionLeft">
                                        <img alt="address" src={AddressImage} />
                                    </div>
                                    <div className="cv11-infoSectionRight">{this.props.values?.email}</div>
                                </div>
                                {/* Info Item */}
                                <div className="cv11-infoItem">
                                    <div className="cv11-infoSectionLeft">
                                        <img alt="phone" src={PhoneImage} />
                                    </div>
                                    <div className="cv11-infoSectionRight">{this.props.values?.phone}</div>
                                </div>
                            </div>

                            <div className="cv11-sectionTitle">
                                <h2>{t('resume.languages')} </h2>
                            </div>
                            <br></br>
                            {/* Languages */}
                            {this.returnLanguages()}
                            <div className="cv11-sectionTitle">
                                <h2>{t('resume.skills')} </h2>
                            </div>
                            <br></br>

                            {/* Skillls */}
                            <div className="cv11-skills">
                                {/* Skill */}
                                {this.returnSkills()}
                            </div>
                        </div>

                        {/* Right Side */}
                    </div>
                </div>
            </div>
        );
    }
}

const MyComponent = withTranslation('common')(Cv11);
export default MyComponent;
