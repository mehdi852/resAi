import React, { Component } from 'react';
import './Cv17.scss';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { withTranslation } from 'react-i18next';
import i18n from '../../i18n';

import { FaAngleDoubleRight } from 'react-icons/fa';

class Cv17 extends Component {
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
                <div className="cv17-work-item">
                   
                    <div className="cv17-work-right">
                        <div className="cv17-work-point"></div>
                        <div className="cv17-work-right-head">
                            <div className="cv17-work-description">
                                <div className="cv17-work-title">{tempEmployments[index].jobTitle}</div>
                                <div className="cv17-work-employer">{tempEmployments[index].employer}</div>
                            </div>

                            <div className="cv17-work-date">
                                {tempEmployments[index].begin} - {tempEmployments[index].end}
                            </div>
                        </div>

                        <div className="cv17-work-desc">{tempEmployments[index].description}</div>
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
                <div className="cv17-education-item">
                    <div className="education-title">
                        <div className="education-circle"></div>
                        {tempEducations[index].degree}
                    </div>
                    <div className="education-desc">{tempEducations[index].description}</div>
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
                <div className="cv17-skills-item">
                    <div className="cv17-skillName">{this.props.values.skills[index].name }</div>
                    <div className="cv17-skillprogressWrapper">
                        <div style={{ width: this.props.values.skills[index].rating + '%' }} className="cv17-skill-progress"></div>
                    </div>
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
            <div id="resumen" className="cv17-board">
                <div className="cv17-content">
                    <div className="cv17-left">
                        {/* TOP */}
                        <div className="cv17-left-top">
                            <div className="cv17-left-top-body">
                                <div className="cv17-name">
                                    <div className="cv17-firstname">{this.props.values.firstname}</div>
                                    <div className="cv17-lastname">{this.props.values.lastname}</div>
                                    <div />
                                </div>
                                <div className="cv17-job">{this.props.values.occupation}</div>
                            </div>
                            {/* Separator */}
                            {/* <div className="cv17-separator"></div> */}

                            {/* Section Title */}
                            <div className="cv17-section-title education-type">{t('resume.educationHistory')}</div>

                            {/* Educations */}

                            {/* Educaton Item */}

                            <div className="cv17-education">{this.returnEducations()}</div>

                            {/* Separator */}
                            <div className="cv17-section-title ">{t('resume.skills')}</div>
                            <div className="cv17-skills">{this.returnSkills()}</div>
                        </div>
                    </div>
                    <div className="cv17-right">
                        <div className="cv17-right-head">
                            <div className="cv17-right-head-item">
                                <div className="cv17-right-iconWrapper">
                                    <FaEnvelope className="cv17-icon" />
                                </div>
                                <div className="cv17-right-item-text">{this.props.values.email}</div>
                            </div>
                            <div className="cv17-right-head-item">
                                <div className="cv17-right-iconWrapper">
                                    <FaPhoneAlt className="cv17-icon" />
                                </div>
                                <div className="cv17-right-item-text">{this.props.values.phone}</div>
                            </div>
                            <div className="cv17-right-head-item">
                                <div className="cv17-right-iconWrapper">
                                    <FaEnvelope className="cv17-icon" />
                                </div>
                                <div className="cv17-right-item-text">
                                    {this.props.values.address}, {this.props.values.country}
                                </div>
                            </div>
                        </div>

                        {/* Personal details */}
                        <div className="cv17-personal-details">{this.props.values.summary}</div>

                        {/* Section Title */}
                        <div className="cv17-section-title">{t('resume.employmentHistory')}</div>

                        {/* Working experience */}
                        <div className="cv17-working">
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

const MyComponent = withTranslation('common')(Cv17);
export default MyComponent;
