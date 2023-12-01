import React, { Component } from 'react';
import SimpleInput from '../../Form/simple-input/SimpleInput';
import LanguagePicker from '../../Form/language-picker/LanguagePicker';
import SimpleTextarea from '../../Form/simple-textarea/SimpleTextarea';
import PlusIcon from '../../../assets/plus.png';

import { ReactComponent as ParagraphImage } from '../../../assets/paragraph.svg';
import { ReactComponent as ListImage } from '../../../assets/list.svg';
import { ReactComponent as ComponentImage } from '../../../assets/component.svg';

import './ActionCoverFilling.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { BiCrown, BiPlus } from 'react-icons/bi';
class ActionCoverFilling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFieldsShowed: false,
        };
        this.handleAddFieldsClick = this.handleAddFieldsClick.bind(this);
        this.adjustTextarea = this.adjustTextarea.bind(this);
        this.addItemToList = this.addItemToList.bind(this);
        this.handleListItemChange = this.handleListItemChange.bind(this);
        this.handleListNameChange = this.handleListNameChange.bind(this);
    }

    handleAddFieldsClick = (event) => {
        event.preventDefault();
        this.setState({
            addFieldsShowed: !this.state.addFieldsShowed,
        });
    };

    adjustTextarea(event) {
        var windowHeight = window.innerHeight;
        var elementHeight = event.target.getBoundingClientRect().top;
        console.log(windowHeight);
        console.log(elementHeight + 100);
    }

    addItemToList = (value, listName) => {
        this.props.handleListAddItem(value, listName);
    };

    handleListItemChange(listName, componentIndex, componentValue) {
        this.props.handleListItemChange(listName, componentIndex, componentValue);
    }
    handleListNameChange(ListName, value) {
        this.props.handleListNameChange(ListName, value);
    }

    render() {
        return (
            <div id="introd" className="action-introWrapper filling">



                

                {/* Head  */}
                {/* {JSON.stringify(this.props.values.components)} */}
                <div className="formHead">
                    <div className="cvTitle">
                        <span spellCheck="false" onBlur={this.handleTitleChange} suppressContentEditableWarning={true} contentEditable={true}>
                            {' '}
                            {this.props.values.title}
                        </span>
                    </div>
                    {/* {t("form.untitled")} */}
                    <div className="actionFilling__headAction">
                        <LanguagePicker values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} />
                        <a onClick={() => this.props.resetNavigation()} className="authenticationButton">
                            return
                        </a>
                    </div>
                </div>
                {/* Head ends */}

                {/* Form */}

                <form>
                    <div className="sectionHeading">
                        <span className="sectionTitle">Détails personnels</span>
                    </div>
                </form>
                <div className="grid-2-col">
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.firstname} title={'Prénom'} name="First Name" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.lastname} title={'Nom de famille'} name="Last Name" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.email} title={'E-mail'} name="Email" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.phone} title={'Telephone'} name="Phone" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.address} title={'Addresse'} name="Address" />

                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.city} title={'Ville'} name="City" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.postalcode} title={'Code Postale'} name="Postal Code" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.coverOccupation} title={'Occupation'} name="Cover Occupation" />
                </div>

                {/* Employer details */}

                <div className="sectionHeading">
                    <span className="sectionTitle">Détails de l'employeur</span>
                </div>

                <div className="grid-2-col">
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.employerFullName} title={"Nom complet de l'employeur"} name="Employer Full Name" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.companyName} title={"Nom de l'entreprise"} name="Company Name" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.sector} title={"Secteur d'activité"} name="Sector Of Activity" />

                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.companyAddress} title={'Adresse de la société'} name="Company Address" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.companyCity} title={'Ville de l’entreprise'} name="Company City" />
                    <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.companyCity} title={"Code postal de l'entreprise"} name="Company Postal Code" />
                </div>
                {/* Custom Fields going to be here */}

                {/* Components prompt image and text */}

                {this.props.values.components.length === 0 && (
                    <div className="cover-components">
                        <ComponentImage className="cover-components-image" />
                        <h4>Sélectionnez un composant</h4>
                        <p>Pour remplir votre lettre de motivation, vous devez sélectionner un composant.</p>
                    </div>
                )}

                {/* <SimpleTextarea name="Paragraph" value={this.props.values.summary} handleInputs={this.props.handleInputs} title={'Paragraph'} /> */}

                {this.props.values.components.map((component, index) => {
                    if (component.type === 'Paragraph') {
                        return (
                            <div className="simpleTextArea">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="inputTitle">{ component.category == 'Cover' ? 'Lettre de motivation' :  component.name }</span>
                                    <span
                                        onClick={() => {
                                            this.props.handleComponentDelete(component.name);
                                        }}
                                        style={{ cursor: 'pointer', color: '#e74c3c' }}
                                        className="inputTitle">
                                        Retirer
                                    </span>
                                </div>
                                <SimpleTextarea
                                    occupation={this.props.values.coverOccupation}
                                    sector={this.props.values.sector}
                                    company={this.props.values.companyName}
                                    suggestions={true}
                                    id={index}
                                    category= {component.category}
                                    componentName={component.name}
                                    coverHandleInput={this.props.handleCoverParagraphChange}
                                    value={component.content}
                                    name="Cover Paragraph"
                                />
                                {/* <textarea
                                    onClick={(event) => {
                                        this.adjustTextarea(event);
                                    }}
                                    style={{ overflow: 'auto' }}
                                    value={component.content}
                                    onChange={(event) => {
                                        this.props.handleCoverParagraphChange(component.name, event.target.value);
                                    }}
                                /> */}
                                <span className="border"></span>
                            </div>
                        );
                    } else if (component.type === 'List') {
                        return (
                            <div id="add-List" className="simpleTextArea">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="inputTitle">{component.name}</span>
                                    <span
                                        onClick={() => {
                                            this.props.handleComponentDelete(component.name);
                                        }}
                                        style={{ cursor: 'pointer', color: '#e74c3c' }}
                                        className="inputTitle">
                                        Remove
                                    </span>
                                </div>

                                <div className="custom-list-item">
                                    <div className="custom-list-item-number">Liste de noms</div>

                                    <div className="custom-list-item-input">
                                        <input
                                            type="text"
                                            value={component.name}
                                            onChange={(event) => {
                                                this.handleListNameChange(component.name, event.target.value);
                                            }}
                                        />
                                        <div className="border-list"></div>
                                    </div>
                                </div>

                                {/* Items */}
                                {component.content.map((item, index) => (
                                    <div className="custom-list-item">
                                        {/* <div className="custom-list-item-number">{index + 1}</div> */}

                                        <div className="custom-list-item-input">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(event) => {
                                                    this.handleListItemChange(component.name, index, event.target.value);
                                                }}
                                            />
                                            <div className="border-list"></div>
                                        </div>
                                    </div>
                                ))}

                                <div className="add-item">
                                    <BiPlus className="toggle-icon" />
                                    <span onClick={() => this.addItemToList('Name', component.name)}> Ajouter un item</span>
                                </div>
                            </div>
                        );
                    }
                })}

                {/* Add field separator */}

                <div className="cover-separator">
                    <div className="cover-separator-line"></div>
                </div>

                <div className="addFields">
                    <div className="addFields-wrapper">
                        <a onClick={(event) => this.handleAddFieldsClick(event)} className="outline-primary">
                            ajouter le champ
                        </a>

                        <AnimatePresence>

                            {this.state.addFieldsShowed && (
                                <motion.div initial={{ opacity: 1, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1 }} className="addFieldsDrop">
                                    <div className="addFieldsDrop-head">Components</div>

                                    <div className="addFieldsDrop-items">
                                        <ul>
                                            <li
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    this.props.handleParagraphAdd('Paragraph');
                                                    this.setState({ addFieldsShowed: false });
                                                }}>
                                                <div className="item-left">
                                                    <ParagraphImage className="addFieldsDrop-icon" />
                                                    <a href="">Paragraph</a>
                                                </div>
                                                <div className="item-right">
                                                <a className="item-membership-basic">Gratuit</a>
                                                </div>
                                            </li>

                                            <li
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    this.props.handleListAdd();
                                                    this.setState({ addFieldsShowed: false });
                                                }}>
                                                <div className="item-left">
                                                    <ListImage className="addFieldsDrop-icon" />
                                                    <a href="">List</a>
                                                </div>

                                                <div className="item-right"></div>
                                            </li>

                                            <li
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                  if(  this.props.values.membership == 'Basic'  || this.props.values.membership === null ){
                                                    this.props.setUnauthorizedModalState(true)
                                                  }else{
                                                    this.props.handleParagraphAdd('Cover');
                                                    this.setState({ addFieldsShowed: false });
                                                  }
                                                 
                                                }}>
                                                <div className="item-left">
                                                    <BiCrown className="addFieldsDrop-icon" />
                                                    <a href="">Full Cover</a>
                                                </div>
                                                <div className="item-right">
                                                    <a className="item-membership-pro">Pro</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActionCoverFilling;
