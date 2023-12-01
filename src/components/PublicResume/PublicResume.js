import React from 'react';
import './PublicResume.scss';
import { AiFillHome, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { TbLetterCase } from 'react-icons/tb';
import Cv1 from '../../cv-templates/cv1/Cv1';
import { useEffect } from 'react';
import { getJsonById } from '../../firestore/dbOperations';
import axios from 'axios';
import config from '../../conf/configuration';

import Cv2 from '../../cv-templates/cv2/Cv2';
import Cv3 from '../../cv-templates/cv3/Cv3';
import Cv4 from '../../cv-templates/cv4/Cv4';
import Cv5 from '../../cv-templates/cv5/Cv5';
import Cv6 from '../../cv-templates/cv6/Cv6';
import Cv7 from '../../cv-templates/cv7/Cv7';
import Cv8 from '../../cv-templates/cv8/Cv8';
import Cv9 from '../../cv-templates/cv9/Cv9';
import Cv10 from '../../cv-templates/cv10/Cv10';
import Cv11 from '../../cv-templates/cv11/Cv11';
import Cv12 from '../../cv-templates/cv12/Cv12';
import Cv13 from '../../cv-templates/cv13/Cv13';
import Cv14 from '../../cv-templates/cv14/Cv14';
import Cv15 from '../../cv-templates/cv15/Cv15';

import Cover1 from '../../cv-templates/cover1/Cover1';
import Cover2 from '../../cv-templates/cover2/Cover2';
import Cover3 from '../../cv-templates/cover3/Cover3';
import Cover4 from '../../cv-templates/cover4/Cover4';

import download from 'downloadjs';
function PublicResume(props) {
    // values state
    const [values, setValues] = React.useState({
        gotData: false,
        values: {
            firstname: '',
            lastname: '',
            photo: '',
            phone: '',
            address: '',
            email: '',
            country: '',
            template: '',
            city: '',
            postalcode: '',
            languages: [],
            employments: [],
            skills: [],
            educations: [],
            summary: [],
            components: [],
            template: '',
        },
    });
    // scale state
    const [scale, setScale] = React.useState(1);
    // handle download click
    const handleDownloadClick = () => {
        axios
            .post(
                config.provider+'://' + config.backendUrl + '/api/export',
                {
                    language: 'en',
                    resumeId: props.match.params.resumeId,
                    resumeName: values.values.template,
                },
                {
                    responseType: 'blob', // had to add this one here
                }
            )
            .then(function (response) {
                // handle success
                // const content = response.headers['content-type'];
                // download(response.data, "resume.pdf", content)
                console.log(response);
                const content = response.headers['content-type'];
                download(response.data, 'resume.pdf', content);
                alert('Downloaded');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };

    const handleScaleDown = () => {
        if (scale > 0.5) {
            setScale(scale - 0.1);
        }
    };

    const handleScaleUp = () => {
        // set scale state

        if (scale < 1.5) {
            setScale(scale + 0.1);
        }
    };

    // function to return template based on template name

    const getTemplate = (templateName) => {
        console.log('template' + templateName);
        switch (templateName) {
            case 'Cv1':
                return <Cv1 values={values.values} />;
            case 'Cv2':
                return <Cv2 values={values.values} />;
            case 'Cv3':
                return <Cv3 values={values.values} />;
            case 'Cv4':
                return <Cv4 values={values.values} />;
            case 'Cv5':
                return <Cv5 values={values.values} />;
            case 'Cv6':
                return <Cv6 values={values.values} />;
            case 'Cv7':
                return <Cv7 values={values.values} />;
            case 'Cv8':
                return <Cv8 values={values.values} />;
            case 'Cv9':
                return <Cv9 values={values.values} />;
            case 'Cv10':
                return <Cv10 values={values.values} />;
            case 'Cv11':
                return <Cv11 values={values.values} />;
            case 'Cv12':
                return <Cv12 values={values.values} />;
            case 'Cv13':
                return <Cv13 values={values.values} />;
            case 'Cv14':
                return <Cv14 values={values.values} />;
            case 'Cv15':
                return <Cv15 values={values.values} />;
            case 'Cover1':
                return <Cover1 values={values.values} />;
            case 'Cover2':
                return <Cover2 values={values.values} />;
            case 'Cover3':
                return <Cover3 values={values.values} />;
            case 'Cover4':
                return <Cover4 values={values.values} />;

            default:
                return <Cv2 values={values.values} />;
        }
    };

    useEffect(() => {
        getJsonById(props.match.params.resumeId).then((data) => {
            console.log('datais' + data);
            data !== null &&
                setValues({
                    values: {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        photo: data.photo,
                        phone: data.phone,
                        address: data.address,
                        email: data.email,
                        country: data.country,
                        city: data.city,
                        postalcode: data.postalcode,
                        languages: data.languages,
                        employments: data.employments,
                        skills: data.skills,
                        educations: data.educations,
                        summary: data.summary,
                        components: data.components,
                        template: data.resumeName !== undefined ? data.resumeName : data.template,
                    },

                    gotData: true,
                });
        });
    }, []);

    useEffect(() => {
        console.log(values);
    }, [values]);
    return (
        <div className="public-resume">
            <div className="head">
                <div className="head-left">
                    <AiFillHome className="home-icon" />
                    <a href="/">Go to Homepage</a>
                </div>
                <div className="head-middle">
                    <div className="font-controller">
                        <AiOutlinePlus onClick={() => handleScaleUp()} className="plus-icon" />
                        <TbLetterCase className="letter-case" />
                        <AiOutlineMinus onClick={() => handleScaleDown()} className="minus-icon" />
                    </div>
                </div>
                <div className="head-right">
                    <a
                        onClick={() => {
                            handleDownloadClick();
                        }}
                        className="download-btn">
                        Download PDF
                    </a>
                </div>
            </div>
            <div className="body">
                {values.scale}
                <div className="resume" style={{ transform: `scale(${scale})` }}>
                    {values.gotData && getTemplate(values.values.template)}
                </div>
            </div>
        </div>
    );
}

export default PublicResume;
