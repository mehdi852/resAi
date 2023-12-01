import React, { Component } from 'react';
import './Cv19.scss';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { withTranslation } from 'react-i18next';
import i18n from '../../i18n';

import { FaAngleDoubleRight } from 'react-icons/fa';

class Cv19 extends Component {
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
                <div className="cv19-work-item">
                    <div className="cv19-work-point"></div>
                    <div className="cv19-work-date">
                        {tempEmployments[index].begin} - {tempEmployments[index].end}
                    </div>
                    <div className="cv19-work-right">
                        <div className="cv19-work-right-head">
                            <div className="cv19-work-description">
                                <div className="cv19-work-title">{tempEmployments[index].jobTitle}</div>
                                <div className="cv19-work-employer">{tempEmployments[index].employer}</div>
                                <div className="cv19-work-desc">{tempEmployments[index].description}</div>
                            </div>

                            {/* <div className="cv19-work-date">
                                {tempEmployments[index].begin} - {tempEmployments[index].end}
                            </div> */}
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
                <div className="cv19-education-item">
                    <div className="cv19-education-circle"></div>
                    <div className="education-title">{tempEducations[index].degree}</div>
                    <div className="education-school">{tempEducations[index].school}</div>
                    <div className="education-school">
                        {tempEducations[index].started} - {tempEducations[index].finished}
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
                <div className="cv19-skills-item">
                    <div className="cv19-skill-name">Illustrator</div>
                    <div className="cv19-skill-rating">
                        {this.props.values.skills[index].rating > 70 ? (
                            <>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item filled"></div>
                            </>
                        ) : this.props.values.skills[index].rating > 40 ? (
                            <>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item "></div>
                                <div className="cv19-skill-rating-item "></div>
                            </>
                        ) : this.props.values.skills[index].rating > 20 ? (
                            <>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item filled"></div>
                                <div className="cv19-skill-rating-item "></div>
                                <div className="cv19-skill-rating-item "></div>
                                <div className="cv19-skill-rating-item ="></div>
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
                <div className="cv19-languages-item">
                    <div className="cv19-languages-item-name">{tempLanguages[index].name}</div>
                    <div className="cv19-languages-item-degree">{tempLanguages[index].level}</div>
                </div>
            );
        }
        return elements;
    }

    render() {
        const { t } = this.props;

        return (
            <div id="resumen" className="cv19-board">
                <div className="cv19-head-new">
                    <div className="cv19-head-new-name">
                        <div className="cv19-head-new-firstname">{this.props.values.firstname}</div>
                        <div className="cv19-head-new-lastname">{this.props.values.lastname}</div>
                    </div>
                    <div className="cv19-head-new-occupation">{this.props.values.occupation} </div>
                </div>
                <div className="cv19-content">
                    <div className="cv19-left">
                        {/* TOP */}
                        <div className="cv19-left-top">
                            {/* Separator */}
                            {/* <div className="cv19-separator"></div> */}

                            <div className="cv19-section-title ">CONTACT</div>

                            <div className="cv19-section-info">
                                <div className="cv19-section-info-item">
                                    <div className="cv19-section-info-iconWrapper">
                                        <FaEnvelope className="cv19-section-info-icon" />
                                    </div>
                                    <div className="cv19-section-info-text"> {this.props.values.email} </div>
                                </div>

                                <div className="cv19-section-info-item">
                                    <div className="cv19-section-info-iconWrapper">
                                        <FaPhoneAlt className="cv19-section-info-icon" />
                                    </div>
                                    <div className="cv19-section-info-text"> {this.props.values.phone} </div>
                                </div>
                                <div className="cv19-section-info-item">
                                    <div className="cv19-section-info-iconWrapper">
                                        <FaMapMarkerAlt className="cv19-section-info-icon" />
                                    </div>
                                    <div className="cv19-section-info-text">
                                        {' '}
                                        {this.props.values.address}, {this.props.values.country}
                                    </div>
                                </div>
                            </div>

                            {/* Section Title */}
                            <div className="cv19-section-title ">{t('resume.educationHistory')}</div>

                            {/* Educations */}

                            {/* Educaton Item */}

                            <div className="cv19-education">{this.returnEducations()}</div>

                            {/* Separator */}

                            <div className="cv19-section-title ">{t('resume.languages')}</div>

                            <div className="cv19-languages">
                               {this.returnLanguages()}
                            </div>

                            <div className="cv19-section-title ">{t('resume.skills')}</div>

                            <div className="cv19-skills">{this.returnSkills()}</div>
                        </div>
                    </div>
                    <div className="cv19-right">
                        {/* Personal details */}
                        <div className="cv19-section-title ">{t('resume.personalSummary')}</div>

                        <div className="cv19-personal-details">{this.props.values.summary}</div>

                        {/* Section Title */}
                        <div className="cv19-section-title">{t('resume.employmentHistory')}</div>

                        {/* Working experience */}
                        <div className="cv19-working">
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

const MyComponent = withTranslation('common')(Cv19);
export default MyComponent;
