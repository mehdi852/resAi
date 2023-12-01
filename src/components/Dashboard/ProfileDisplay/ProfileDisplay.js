import { AnimatePresence, motion } from 'framer-motion';
import React, { Component } from 'react';
import './ProfileDisplay.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { addFieldToProfile, addSkillToUser, getSkillsOfUser,removeSkillFromUser } from '../../../firestore/dbOperations';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BsFillTrashFill} from 'react-icons/bs';
import { withTranslation } from 'react-i18next';

class ProfileDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentModalShowed: '',
            searchInput: '',
            skills: [],
        };

        this.displaySkills = this.displaySkills.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.returnItems = this.returnItems.bind(this);
        this.handleValueSubmit = this.handleValueSubmit.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.handleSkillClick = this.handleSkillClick.bind(this);
    }

    componentDidMount() {
        this.returnSkills();
    }
    // handle value submit
    handleValueSubmit = async (event,field, value) => {
        event.preventDefault();
        await addFieldToProfile(localStorage.getItem('user'), field, value);

        this.setState({
            currentModalShowed: '',
        });

        await this.props.getProfileOfUserFront();
    };

    // handle skill submit
    handleSkillSubmit = async (skill) => {
         addSkillToUser(localStorage.getItem('user'), skill).then((result) => {
            this.setState({
                currentModalShowed: '',
            });
             this.returnSkills();
            // this.props.getProfileOfUserFront();
         });

     
    };

    handleInputChange = (e) => {
        this.setState({ searchInput: e.target.value });
    };

    showSkillModal = () => {
        this.setState({ currentModalShowed: 'Skill' });
    };

    // return skills items of user using getskillsOfUser function
    returnSkills = async () => {
          getSkillsOfUser(localStorage.getItem('user')).then((result) => {
            this.setState({ skills: result });
          });
        
    };

    displaySkills = () => {
        let items = this.state.skills.map((skill) => {
            return <li onClick={()=>{this.handleSkillClick(skill)}} className='profile-skill'>
                <div className='profile-skill-name'>{skill}</div>
              <div>
                <BsFillTrashFill className= 'profile-skill-delete'   />
              </div>
             </li>;
        });
        return items;
    };

    returnItems = () => {
        let items = [];
        for (const [key, value] of Object.entries(this.props.profile)) {
            items.push(
                <li key={key}>
                    <span className="profile-details-list-label">{
                        // return key with first letter capital
                     //  key.charAt(0).toUpperCase() + key.slice(1)

                       key === 'name' ? 'Nom':
                       key ===  'email' ? 'E-mail' : 
                      key === 'phone' ? 'Téléphone' :
                     key ===  'address' ? 'Addresse':
                     key === 'city' ? 'Ville' :
                  key === 'country' ? 'Pay' :
                  key === 'Occupation' ? 'Profession' :''
                    

                       
                    }</span>
                    <div className="profile-details-list-value">
                        {value === '' ? (
                            <div className="profile-details-list-value-add-wrapper">
                                <div className="profile-details-list-value-add-link" onClick={() => this.setState({ currentModalShowed: key })}>
                                Ajouter
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => this.setState({ currentModalShowed: key })}>{value}</div>
                        )}

                        <AnimatePresence>
                            {this.state.currentModalShowed === key ? (
                                <motion.div
                                    initial={{ opacity: 0, translateX: '100px' }}
                                    animate={{ opacity: 1, translateX: '0px' }}
                                    exit={{ opacity: 0, translateX: '100px' }}
                                    transition={{ duration: 0.3 }}
                                    className="profile-details-list-value-add">
                                    <div className="prodile-modal-head">
                                        <span className="profile-modal-name">{key}</span>

                                        <AiOutlineClose
                                            onClick={() => {
                                                this.setState({ currentModalShowed: '' });
                                            }}
                                            className="profile-modal-close"
                                        />
                                    </div>
                                    <>
                                        <input onChange={(event) => this.handleInputChange(event)} value={this.state.searchInput} />
                                        <a href='#' onClick={(event) => this.handleValueSubmit(event,key, this.state.searchInput)}>Submit</a>
                                    </>
                                </motion.div>
                            ) : (
                                ''
                            )}
                        </AnimatePresence>
                    </div>
                </li>
            );
        }
        return items;
    };

    handleSkillClick = (skill) => {
        removeSkillFromUser(localStorage.getItem('user'), skill).then((result) => {
            if(result){
                this.returnSkills();
                
            }else{
                console.log('error');
            }
        });
      
    };

    render() {
        const { t } = this.props;

        return (
            <div className="profile-display">
                {/* Profile */}
                <div className="profile-picture">
                    <div className="profile-picture-holder">
                        {/* We have data url in this,props.image.image  return an image */}

                        {/* Before we input the image we check if it exist */}

                        {this.props.image?.image ? <img src={this.props.image.image} alt="profile" /> : ''}
                    </div>
                </div>
                <div className="profile-name">{this.props.profile.name}</div>
                <div className="profile-job">{this.props.profile.occupation}</div>
                <div className="profile-status">
                    <div className="profile-status-online">
                        <div className="profile-circle"></div>
                        <span>En Ligne</span>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="profile-details">
                    <div className="profile-details-head">
                        <h3> {t('dashNew.personalDetails')}</h3>
                    </div>
                    <ul className="profile-details-list">{this.returnItems()}</ul>
                </div>
                {/* Skills */}
                <div className="profile-details">
                    <div className="profile-details-head">
                        <h3>{t('dashNew.skills')}</h3>
                        <div className="add-skill">
                            <a onClick={() => this.showSkillModal()}>
                                <AiOutlinePlusCircle className='add-skill-plus' />
                            </a>
                            <AnimatePresence>
                                {this.state.currentModalShowed === 'Skill' ? (
                                    <motion.div
                                        initial={{ opacity: 0, translateX: '100px' }}
                                        animate={{ opacity: 1, translateX: '0px' }}
                                        exit={{ opacity: 0, translateX: '100px' }}
                                        transition={{ duration: 0.3 }}
                                        className="profile-details-list-value-add">
                                        <div className="prodile-modal-head">
                                            <span className="profile-modal-name">Skill</span>

                                            <AiOutlineClose
                                                onClick={() => {
                                                    this.setState({ currentModalShowed: '' });
                                                }}
                                                className="profile-modal-close"
                                            />
                                        </div>
                                        <>
                                            <input onChange={(event) => this.handleInputChange(event)} value={this.state.searchInput} />
                                            <a onClick={() => this.handleSkillSubmit(this.state.searchInput)}>Submit</a>
                                        </>
                                    </motion.div>
                                ) : (
                                    ''
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className="skills-holder">
                    <div className="profile-skill-holder">{this.displaySkills()}</div>
                </div>
            </div>
        );
    }
}



const MyComponent = withTranslation('common')(ProfileDisplay);
export default MyComponent;