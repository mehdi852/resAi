import React, { Component } from 'react';
import './Cv16.scss';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { withTranslation } from 'react-i18next';
import i18n from '../../i18n';

import { FaAngleDoubleRight } from 'react-icons/fa';

class Cv16 extends Component {
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
                <div className="cv16-work-item">
                    <div className="cv16-work-left">
                        <div className="cv16-work-title">{tempEmployments[index].jobTitle}</div>
                        <div className="cv16-work-company">{tempEmployments[index].employer}</div>
                    </div>
                    <div className="cv16-work-right">
                        <div className="cv16-work-date">{tempEmployments[index].begin} - {tempEmployments[index].end}</div>

                        <div className="cv16-work-desc">
                        {tempEmployments[index].description}
                        </div>
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
              
                <div className="cv16-education-item">
                    <div className="education-title">{tempEducations[index].degree}</div>
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
                <div className="cv16-skills-item">
                    <div className="cv16-skill-name">{this.props.values.skills[index].name}</div>
                    <div className="cv16-skills-stars">
                        

                    {this.props.values.skills[index].rating > 70 ? (
                            <>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star-filled"></div>
                            </>
                        ) : this.props.values.skills[index].rating > 40 ? (
                            <>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star"></div>
                                <div className="cv16-skills-star"></div>
                            </>
                        ) : this.props.values.skills[index].rating > 20 ? (
                            <>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star-filled"></div>
                                <div className="cv16-skills-star"></div>
                                <div className="cv16-skills-star"></div>
                                <div className="cv16-skills-star"></div>
                            </>
                        ) : (
                           <>
                           <div className="cv16-skills-star"></div>
                                <div className="cv16-skills-star"></div>
                                <div className="cv16-skills-star"></div>
                                <div className="cv16-skills-star"></div>
                                <div className="cv16-skills-star"></div>
                           </>
                        )}
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
            <div id="resumen" className="cv16-board">
                <div className="cv16-content">
                    <div className="cv16-left">
                        {/* TOP */}
                        <div className="cv16-left-top">
                            <div className="cv16-left-top-body">
                                <div className="cv16-firstname">{this.props.values.firstname}</div>
                                <div className="cv16-lastname">{this.props.values.lastname}</div>
                                <div className="cv16-job">{this.props.values.occupation}</div>
                            </div>
                        </div>
                        {/* Separator */}
                        <div className="cv16-separator"></div>

                        {/* Section Title */}
                        <div className="cv16-section-title">{t('resume.educationHistory')}</div>

                        {/* Educations */}

                        {/* Educaton Item */}

                        <div className="cv16-education">{this.returnEducations()}</div>

                        {/* Separator */}
                        <div className="cv16-separator"></div>

                        {/* Section Title */}
                        <div className="cv16-section-title">Info</div>

                        {/* information section */}
                        <div className="cv16-info">
                            <div className="cv16-info-item">
                                <div className="cv16-infoImage">
                                    <FaEnvelope className="cv16-icon" />
                                </div>
                                <div className="cv16-infoDesc">{this.props.values.email}</div>
                            </div>
                            <div className="cv16-info-item">
                                <div className="cv16-infoImage">
                                    <FaPhoneAlt className="cv16-icon" />
                                </div>
                                <div className="cv16-infoDesc">{this.props.values.phone}</div>
                            </div>
                            <div className="cv16-info-item">
                                <div className="cv16-infoImage">
                                    <FaMapMarkerAlt className="cv16-icon" />
                                </div>
                                <div className="cv16-infoDesc">
                                    {this.props.values.address}, {this.props.values.country}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cv16-right">
                        {/* Separator */}
                        <div className="cv16-separator"></div>

                        {/* Section Title */}
                        <div className="cv16-section-title">{t('resume.personalSummary')}</div>

                        {/* Personal details */}
                        <div className="cv16-personal-details">{this.props.values.summary}</div>

                        {/* Experience */}

                        <div className="cv16-separator"></div>

                        {/* Section Title */}
                        <div className="cv16-section-title">{t('resume.employmentHistory')}</div>

                        {/* Working experience */}
                        <div className="cv16-working">
                            {/* Work item */}

                            {this.returnEmployments()}
                        </div>

                        {/* Skills */}

                        <div className="cv16-separator"></div>

                        {/* Section Title */}
                        <div className="cv16-section-title">{t('resume.skills')}</div>

                        <div className="cv16-skills">{this.returnSkills()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const MyComponent = withTranslation('common')(Cv16);
export default MyComponent;
