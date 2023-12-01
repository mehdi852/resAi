import React, { Component } from 'react';
import './SimpleTextarea.scss';
import { FiSearch } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import config from '../../../conf/configuration';
import { useLottie } from 'lottie-react';
import RobotImage from '../../../assets/robot.png';

import LoaderAnimation from '../../../assets/animations/ai.json';

const View = () => {
    const loaderOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const { View } = useLottie(loaderOptions);
    return View;
};

class SimpleTextarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestionShowed: false,
            categories: this.props.categories,
            phrases: [],
            loadingAi: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.adjustTextarea = this.adjustTextarea.bind(this);
        this.returnItems = this.returnItems.bind(this);
        this.addParagraph = this.addParagraph.bind(this);
        this.handleToggleClickAi = this.handleToggleClickAi.bind(this);
        this.getSummary = this.getSummary.bind(this);
        this.getJobDecription = this.getJobDecription.bind(this);
        this.getEducationDescription = this.getEducationDescription.bind(this);
        this.getCoverParagraph = this.getCoverParagraph.bind(this);
    }
    handleInputChange(e) {
        if (this.props.name == 'Cover Paragraph') {
            this.props.coverHandleInput(this.props.componentName, e.target.value);
            return;
        }
        this.props.handleInputs(this.props.name, e.target.value);
    }

    adjustTextarea(event) {
        var windowHeight = window.innerHeight;
        var elementHeight = event.target.getBoundingClientRect().top;
        console.log(windowHeight);
        console.log(elementHeight + 100);
        if (elementHeight + 100 > windowHeight) {
            document.getElementById('introd').scrollBy(0, 150);
        }
    }

    componentDidMount() {
        // if we hover over a span that has a class of suggestionParagraph
        // we will add a class of suggestionParagraphHover to it

        document.addEventListener('mouseover', (event) => {
            // we remove the class of active from all the suggestionParagraph
            // so that we can add it to the hovered one
            document.querySelectorAll('.suggestionParagraph').forEach((element) => {
                element.classList.remove('active');
            });

            if (event.target.classList.contains('suggestionParagraph')) {
                event.target.classList.add('active');
            }
        });
        // set phrrases with the first category

        // i want to fill phrases with the first element in this.props.categories[0].phrases
        // but i can't do it because i don't know how to access the first element in this.props.categories
        // i tried this.props.categories[0].phrases but it didn't work

        setTimeout(() => {
            this.props.categories !== undefined && this.props.categories.length > 0 && this.setState({ phrases: this.props.categories[0].phrases });
        }, 2000);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseover', (event) => {});
    }

    //  convert a text paragraph array of phrases
    // each phrase needs to be in a span tag
    // example :
    // inpuT, Hello My name is mehdi, Howe are you doing
    // output : [<span>Hello My name is mehdi</span>, <span>Howe are you doing</span>]

    convertParagraphToPhrases(paragraph) {
        let phrases = [];
        let phrase = '';
        for (let i = 0; i < paragraph.length; i++) {
            if (paragraph[i] === '.' || paragraph[i] === '!' || paragraph[i] === '?') {
                phrases.push(
                    <span onClick={(event) => this.clickedOnSuggestionParagraph(event)} className="suggestionParagraph">
                        {phrase + paragraph[i]}
                    </span>
                );
                phrase = '';
            } else {
                phrase += paragraph[i];
            }
        }
        return phrases;
    }

    clickedOnSuggestionParagraph(event) {
        this.props.addSummary(event.target.textContent);
    }
    addParagraph(paragraph) {
        this.props.addSummary(paragraph);
    }

    handleToggle() {
        this.setState({ suggestionShowed: !this.state.suggestionShowed });
    }

    returnItems() {
        let items = this.state.phrases;
        let itemsToReturn = [];

        for (let i = 0; i < items.length; i++) {
            itemsToReturn.push(
                <div className="simpleTextArea-suggestion-body-items-item">
                    {/* Left */}
                    <div onClick={() => this.addParagraph(items[i])} className="simpleTextArea-suggestion-body-items-item-left">
                        <FiArrowLeft className="icon" />
                    </div>
                    {/* Right */}
                    <div className="simpleTextArea-suggestion-body-items-item-right">
                        <p className="suggestionParagraph">{this.convertParagraphToPhrases(items[i])}</p>
                    </div>
                </div>
            );
        }
        return itemsToReturn;
    }

    // handle category click and set the phrases
    handleCategoryClick(category) {
        this.setState({ phrases: category.phrases });
    }

    async getCoverParagraph() {
        this.setState({ loadingAi: true });
        // if (this.props.school== undefined || this.props.degree == undefined){
        //     this.setState({ loadingAi: false });
        //    // this.props.setOccupationError(true)
        //    this.props.handleInputs('Course Description','Please provide your Job title and the employer above to generate.')

        //     return 'Please provide your school and degree above to generate.';
        // }
        var summary = '';

        try {
            if(this.props.category =='Cover'){
                const response = await axios.post(config.provider + '://' + config.backendUrl + '/api/ai/fullCover', {
                    sector: this.props.sector,
                    occupation: this.props.occupation,
                    company: this.props.companyName,
                });
    
                console.log(response);
                summary = response.data.choices[0].message.content;
    
                this.props.coverHandleInput(this.props.componentName, summary);
            }else{

                const response = await axios.post(config.provider + '://' + config.backendUrl + '/api/ai/coverParagraph', {
                    sector: this.props.sector,
                    occupation: this.props.occupation,
                    company: this.props.companyName,
                });
    
                console.log(response);
                summary = response.data.choices[0].message.content;
    
                this.props.coverHandleInput(this.props.componentName, summary);
            }
          

            this.setState({ loadingAi: false });
        } catch (error) {
            // handle error
            console.log(error);
            this.setState({ loadingAi: false });
        }

        return summary;
    }

    async getEducationDescription() {
        this.setState({ loadingAi: true });
        if (this.props.school == undefined || this.props.degree == undefined) {
            this.setState({ loadingAi: false });
            // this.props.setOccupationError(true)
            this.props.handleInputs('Course Description', 'Please provide your Job title and the employer above to generate.');

            return 'Please provide your school and degree above to generate.';
        }
        var summary = '';

        try {
            const response = await axios.post(config.provider + '://' + config.backendUrl + '/api/ai/educationhistory', {
                school: this.props.school,
                degree: this.props.degree,
            });

            console.log(response);
            summary = response.data.choices[0].message.content;
            this.props.handleInputs('Course Description', summary);
            this.setState({ loadingAi: false });
        } catch (error) {
            // handle error
            console.log(error);
            this.setState({ loadingAi: false });
        }

        return summary;
    }

    async getJobDecription() {
        this.setState({ loadingAi: true });
        if (this.props.jobTitle == undefined || this.props.employer == undefined) {
            this.setState({ loadingAi: false });
            // this.props.setOccupationError(true)
            this.props.employmentInputHandler('Description', 'Please provide your Job title and the employer above to generate.');

            return 'Please provide your Job title and the employer above to generate.';
        }
        var summary = '';

        try {
            const response = await axios.post(config.provider + '://' + config.backendUrl + '/api/ai/jobHistory', {
                occupation: this.props.jobTitle,
                employer: this.props.employer,
            });

            console.log(response);
            summary = response.data.choices[0].message.content;
            this.props.employmentInputHandler('Description', summary);
            this.setState({ loadingAi: false });
        } catch (error) {
            // handle error
            console.log(error);
            this.setState({ loadingAi: false });
        }

        return summary;
    }
    async getSummary() {
        this.setState((prevState) => ({ loadingAi: true }));
        if (this.props.values.occupation == '') {
            this.setState({ loadingAi: false });
            // this.props.setOccupationError(true)
            return 'Please provide your occupation above.';
        }
        var summary = '';

        try {
            const response = await axios.post(config.provider + '://' + config.backendUrl + '/api/ai/summary', {
                occupation: this.props.values.occupation,
            });

            console.log(response);
            summary = response.data.choices[0].message.content;
            this.setState({ loadingAi: false });
        } catch (error) {
            // handle error
            console.log(error);
            this.setState({ loadingAi: false });
        }

        return summary;
    }
    // start fetching

    async handleToggleClickAi() {
        var result = '';

        if (this.props.name == 'Professional Summary') {
            result = await this.getSummary();
            this.addParagraph(result);
        }
        if (this.props.name == 'Description') {
            // job desc
            result = await this.getJobDecription();
        }
        if (this.props.name == 'Course Description') {
            result = await this.getEducationDescription();
        }
        if (this.props.name == 'Cover Paragraph') {
            result = await this.getCoverParagraph();
        }
    }
    render() {
        return (
            <div className="simpleTextArea-wrapper">
                <div className="simpleTextArea">
                    <div className="simpleTextArea-head">
                        <span className="inputTitle">{this.props.title}</span>
                        {/* <div className="toggle">
                            {this.props.suggestions === true ? (
                                <span onClick={() => this.handleToggle()} className="toggle-text">
                                    Suggestion
                                </span>
                            ) : (
                                ''
                            )}
                        </div> */}

                        <div className="toggle">
                            {this.props.suggestions === true ? (
                                // <span onClick={() => this.handleToggleClickAi()} className="toggle-text">
                                //     Suggestion
                                // </span>
                                <div onClick={() => this.handleToggleClickAi()} className='toggle-button-ai'>
                                    <img src={RobotImage} alt="Ia" />
                                    IA Generation
{/* 
                                    <div className="toggle-popup">
                                        <p>Ce bouton génère du contenu en utilisant l'intelligence artificielle pour vous fournir des informations pertinentes et utiles. Cliquez pour découvrir du contenu généré par l'IA</p>
                                    </div> */}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <div className="simpleTextArea-inputWrapper ">
                        <textarea onClick={(event) => this.adjustTextarea(event)} style={{ overflow: 'auto' }} value={this.props.value} onChange={(event) => this.handleInputChange(event)} />

                        <AnimatePresence>
                            {this.state.loadingAi == true && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} exit={{ opacity: 0 }} className="simpleTextArea-loading">
                                    <motion.div
                                        initial={{ translateY: 200 }}
                                        animate={{ translateY: 0 }}
                                        transition={{ duration: 0.2, delay: 0.3 }}
                                        exit={{ translateY: 200 }}
                                        className="simpleTextArea-loading-center">
                                        <View />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <span className="border"></span>
                </div>

                {/* <AnimatePresence>
                    {this.state.suggestionShowed ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="simpleTextArea-suggestion">
                            <div className="simpleTextArea-suggestion-head">
                                <FiSearch className="simpleTextArea-suggestion-head-search-icon" />
                                <div className="simpleTextArea-categories">
                                    {this.props.categories.map((category, index) => {
                                        return (
                                            <a onClick={() => this.handleCategoryClick(category)} key={index} className="simpleTextArea-categories-item">
                                                {category.name}
                                            </a>
                                        );
                                    })}
                                </div>
                                <GrFormClose onClick={() => this.handleToggle()} className="simpleTextArea-suggestion-head-icon" />
                            </div>
                            <div className="simpleTextArea-suggestion-body">
                                <div className="simpleTextArea-suggestion-body-head">

                                    <div className="simpleTextArea-suggestion-body-head-most-popular">
                                        <FaCrown className="simpleTextArea-suggestion-body-head-most-popular-icon" />
                                        <span>Most Popular</span>
                                    </div>
                                </div>

                                <div className="simpleTextArea-suggestion-body-items">{this.returnItems()}</div>
                            </div>
                            <div className="simpleTextArea-suggestion-footer"></div>
                        </motion.div>
                    ) : (
                        ''
                    )}
                </AnimatePresence> */}
            </div>
        );
    }
}
export default SimpleTextarea;
