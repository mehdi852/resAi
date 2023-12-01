import React from 'react';
import './ResumesSelector.scss';
import { motion } from 'framer-motion';
import { GrClose } from 'react-icons/gr';
import Cv1 from '../../../assets/1.jpg';
import Cv3 from '../../../assets/3.JPG';
import Cv2 from '../../../assets/2.JPG';
import Cv4 from '../../../assets/4.jpg';
import Cv5 from '../../../assets/5.JPG';
import Cv6 from '../../../assets/6.JPG';
import Cv7 from '../../../assets/7.JPG';
import Cv8 from '../../../assets/8.jpg';
import Cv9 from '../../../assets/9.jpg';
import Cv20 from '../../../assets/20.JPG';
import Cv21 from '../../../assets/21.JPG';
import Cv22 from '../../../assets/22.JPG';
import Cv23 from '../../../assets/23.JPG';


import Cv10 from '../../../assets/10.JPG';
import Cv11 from '../../../assets/resumesNew/Cv11.JPG';
import Cv12 from '../../../assets/resumesNew/Cv12.JPG';
import Cv13 from '../../../assets/resumesNew/Cv13.JPG';
import Cv14 from '../../../assets/resumesNew/Cv14.JPG';
import Cv15 from '../../../assets/resumesNew/Cv15.JPG';

import Cover1 from '../../../assets/coversNew/Cover1.JPG';
import Cover2 from '../../../assets/coversNew/Cover2.JPG';
import Cover3 from '../../../assets/coversNew/Cover3.JPG';
import Cover4 from '../../../assets/coversNew/Cover4.JPG';
const ResumesSelector = (props) => {
    const handleResumeClick = (template) => {
        props.changeResumeName(template);
        props.handleTemplateShow();
    };
    return (
        <motion.div
            // delay 1 s
            initial={{ translateX: 700 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: 400 }}
            transition={{ delay: 0.3, duration: 0.2 }}
            className="select_body">
            <div className="select_header">
                <h2>Sélectionnez votre modèle</h2>
                <GrClose
                    onClick={() => {
                        props.handleTemplateShow();
                    }}
                    className="select_close"
                />
            </div>
            <p className="select_desc">
            Bienvenue sur notre page de sélection de modèles de CV ! Nous disposons d'une variété de modèles parmi lesquels vous pouvez choisir. Que vous soyez un jeune diplômé à la recherche d'un premier emploi ou un
                 professionnel expérimenté cherchant à changer de carrière
            </p>
            {props.currentStep === 'Adding Data' && (
                <div className="select_resumes">
                    <div
                        onClick={() => {
                            handleResumeClick('Cv1');
                        }}
                        className="select_resume_item">
                        <img src={Cv1} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv2');
                        }}
                        className="select_resume_item">
                        <img src={Cv2} alt="1" border="0" />
                    </div>{' '}
                    <div
                        onClick={() => {
                            handleResumeClick('Cv3');
                        }}
                        className="select_resume_item">
                        <img src={Cv3} alt="1" border="0" />
                    </div>{' '}
                    <div
                        onClick={() => {
                            handleResumeClick('Cv4');
                        }}
                        className="select_resume_item">
                        <img src={Cv4} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv5');
                        }}
                        className="select_resume_item">
                        <img src={Cv5} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv6');
                        }}
                        className="select_resume_item">
                        <img src={Cv6} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv7');
                        }}
                        className="select_resume_item">
                        <img src={Cv7} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv8');
                        }}
                        className="select_resume_item">
                        <img src={Cv8} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv9');
                        }}
                        className="select_resume_item">
                        <img src={Cv9} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv10');
                        }}
                        className="select_resume_item">
                        <img src={Cv10} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv11');
                        }}
                        className="select_resume_item">
                        <img src={Cv11} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv12');
                        }}
                        className="select_resume_item">
                        <img src={Cv12} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv13');
                        }}
                        className="select_resume_item">
                        <img src={Cv13} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv14');
                        }}
                        className="select_resume_item">
                        <img src={Cv14} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv14');
                        }}
                        className="select_resume_item">
                        <img src={Cv15} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv16');
                        }}
                        className="select_resume_item">
                        <img src={Cv20} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv17');
                        }}
                        className="select_resume_item">
                        <img src={Cv21} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv18');
                        }}
                        className="select_resume_item">
                        <img src={Cv22} alt="1" border="0" />
                    </div>
                    <div
                        onClick={() => {
                            handleResumeClick('Cv19');
                        }}
                        className="select_resume_item">
                        <img src={Cv23} alt="1" border="0" />
                    </div>
                </div>
            )}
            {props.currentStep === 'Cover Filling' && (
                <div>
                    <div className="select_resumes">
                        <div
                            onClick={() => {
                                handleResumeClick('Cover1');
                            }}
                            className="select_resume_item">
                            <img src={Cover1} alt="1" border="0" />
                        </div>
                        <div
                            onClick={() => {
                                handleResumeClick('Cover2');
                            }}
                            className="select_resume_item">
                            <img src={Cover2} alt="1" border="0" />
                        </div>
                        <div
                            onClick={() => {
                                handleResumeClick('Cover3');
                            }}
                            className="select_resume_item">
                            <img src={Cover3} alt="1" border="0" />
                        </div>
                        <div
                            onClick={() => {
                                handleResumeClick('Cover4');
                            }}
                            className="select_resume_item">
                            <img src={Cover4} alt="1" border="0" />
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ResumesSelector;
