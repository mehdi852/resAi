import React, { Component } from 'react';
import './Cv18.scss';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { withTranslation } from 'react-i18next';
import i18n from '../../i18n';

import { FaAngleDoubleRight } from 'react-icons/fa';

class Cv18 extends Component {
    constructor(props) {
        super(props);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnLanguages = this.returnLanguages.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        i18n.changeLanguage(this.props.language);
    }

    returnEmployments() {
        var elements = [];
        var tempEmployments = this.props.values.employments.sort(function (a, b) {
            return a.date - b.date;
        });

        for (let index = 0; index < tempEmployments.length; index++) {
            elements.push(
                <div className="cv18-work-item">
                    <div className="cv18-work-right">
                        <div className="cv18-work-point"></div>
                        <div className="cv18-work-right-head">
                            <div className="cv18-work-description">
                                <div className="cv18-work-title">{tempEmployments[index].jobTitle}</div>
                                <div className="cv18-work-employer">{tempEmployments[index].employer}</div>
                            </div>

                            <div className="cv18-work-date">
                                {tempEmployments[index].begin} - {tempEmployments[index].end}
                            </div>
                        </div>

                        <div className="cv18-work-desc">{tempEmployments[index].description}</div>
                    </div>
                </div>
            );
        }
        return elements;
    }

    returnEducations() {
        var elements = [];
        var tempEducations = this.props.values.educations.sort(function (a, b) {
            return a.date - b.date;
        });

        for (let index = 0; index < tempEducations.length; index++) {
            elements.push(
                <div className="cv18-education-item">
                    <div className="education-title">
                        {tempEducations[index].degree}
                    </div>
                    <div className="education-school">
                        {tempEducations[index].school}
                    </div>
                    <div className="education-school">
                        {tempEducations[index].started} -    {tempEducations[index].finished}
                    </div>
                    {/* <div className="education-desc">{tempEducations[index].description}</div> */}
                </div>
            );
        }
        return elements;
    }

    returnSkills() {
        var elements = [];
        var tempSkills = this.props.values.skills.sort(function (a, b) {
            return a.date - b.date;
        });
        for (let index = 0; index < tempSkills.length; index++) {
            elements.push(
                <div className="cv18-skills-item">
                    <div className="cv18-skillName"> <div className="cv18-skillCircle"></div> {this.props.values.skills[index].name}</div>
                </div>
            );
        }
        return elements;
    }

    returnLanguages() {
        var elements = [];
        var tempLanguages = this.props.values.languages.sort(function (a, b) {
            return a.date - b.date;
        });
        for (let index = 0; index < tempLanguages.length; index++) {
            elements.push(
                <div className="cv15-languages-item">
                    <p>{tempLanguages[index].name}</p>
                    <p>{tempLanguages[index].level}</p>
                </div>
            );
        }
        return elements;
    }

    render() {
        const { t } = this.props;

        return (
            <div id="resumen" className="cv18-board">
                <div className="cv18-head-new">
                    <div className="cv18-head-new-name">
                        <div className="cv18-head-new-firstname">{this.props.values.firstname}</div>
                        <div className="cv18-head-new-lastname">{this.props.values.lastname}</div>
                    </div>
                    <div className="cv18-head-new-occupation">{this.props.values.occupation} </div>
                </div>
                <div className="cv18-content">
                    <div className="cv18-left">
                        {/* TOP */}
                        <div className="cv18-left-top">
                            {/* Separator */}
                            {/* <div className="cv18-separator"></div> */}

                            <div className="cv18-section-title ">CONTACT</div>

                            <div className="cv18-section-info">
                                <div className="cv18-section-info-item">
                                    <div className="cv18-section-info-iconWrapper">
                                        <FaEnvelope className="cv18-section-info-icon" />
                                    </div>
                                    <div className="cv18-section-info-text"> {this.props.values.email} </div>
                                </div>

                                <div className="cv18-section-info-item">
                                    <div className="cv18-section-info-iconWrapper">
                                        <FaPhoneAlt className="cv18-section-info-icon" />
                                    </div>
                                    <div className="cv18-section-info-text"> {this.props.values.phone} </div>
                                </div>
                                <div className="cv18-section-info-item">
                                    <div className="cv18-section-info-iconWrapper">
                                        <FaMapMarkerAlt className="cv18-section-info-icon" />

                                    </div>
                                    <div className="cv18-section-info-text"> {this.props.values.address}, {this.props.values.country}</div>
                                </div>
                            </div>

                            {/* Section Title */}
                            <div className="cv18-section-title ">{t('resume.educationHistory')}</div>

                            {/* Educations */}

                            {/* Educaton Item */}

                            <div className="cv18-education">{this.returnEducations()}</div>

                            {/* Separator */}
                            <div className="cv18-section-title ">{t('resume.skills')}</div>
                            <div className="cv18-skills">{this.returnSkills()}</div>
                        </div>
                    </div>
                    <div className="cv18-right">
                        {/* Personal details */}
                        <div className="cv18-personal-details">{this.props.values.summary}</div>

                        {/* Section Title */}
                        <div className="cv18-section-title">{t('resume.employmentHistory')}</div>

                        {/* Working experience */}
                        <div className="cv18-working">
                            {/* Work item */}

                            {this.returnEmployments()}
                        </div>

                        {/* Skills */}
                    </div>
                </div>
            </div>
        );
    }
}

const MyComponent = withTranslation('common')(Cv18);
export default MyComponent;
