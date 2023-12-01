import React, { Component } from 'react';
import './Skills.scss';
import Arrow from '../../../assets/arrow.png';
import Cross from '../../../assets/cross.png';
import SimpleInput from '../simple-input/SimpleInput';
import SimpleTextArea from '../simple-textarea/SimpleTextarea';
import ProgressBar from '../progress-bar/ProgressBar';
import Dropdown from '../dropdown-input/DropdownInput';
import { withTranslation } from 'react-i18next';
import DeleteImage from '../../../assets/cross.png';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skillName: '(not-set)',
            rating: 0,
        };
        this.toggleHandle = this.toggleHandle.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleInputs(inputName, Value) {
        switch (inputName) {
            case 'Skill Name':
                this.setState({
                    skillName: Value,
                });
                this.props.handleInputs(inputName, Value, this.props.id, 'Skills');
                break;
            case 'Rating':
                this.setState({
                    rating: Value,
                });
                this.props.handleInputs(inputName, Value, this.props.id, 'Skills');
                break;
            default:
                break;
        }
    }
    handleDelete() {
        console.log('in');
        this.props.handleDelete('Skills', 2); // This one responsable for removing the skill from the parent state
        this.props.handleComponentDelete('Skills', 2); // This one responsable to remove the skill component from parent
    }
    // Handling toggle click
    toggleHandle() {
        this.state.isOpened === 'false' ? this.setState({ isOpened: 'true' }) : this.setState({ isOpened: 'false' });
    }
    componentDidMount() {}

    // return an input range from 0 to 100
    // and set the skill rating of it
    skillHandle() {
        return (
            <div className="skillHandleWrapper">
                <input type="range" min="0" max="100" value={this.props.state} className="skillHandle__slider" id="myRange" onChange={(e) => this.handleInputs('Rating', e.target.value)}></input>
            </div>
        );
    }

    render() {
        const { t } = this.props;
        return (
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-title"> {this.state.skillName == '(not-set)' ? this.props.skillName : this.state.skillName}</span>
                    <span className="panel-subtitle"></span>
                    <span className="actionButtons">
                        <div className="panel-action">
                            <a
                                onClick={() => {
                                    this.props.removeSkill(this.props.id);
                                    this.props.removeSkillJsx(this.props.id);
                                }}>
                                <img className="delete_Item" src={DeleteImage} alt="delete" />
                            </a>
                            <img alt="more" onClick={this.toggleHandle} className={this.state.isOpened === 'false' ? 'panel-toggler ' : 'panel-toggler panel-toggler-opened'} src={Arrow} />
                        </div>
                    </span>
                </div>
                <div className={this.state.isOpened === 'false' ? 'panel-body hidden' : 'panel-body'}>
                    <div className=" skill_slider">
                        <SimpleInput
                            value={this.state.skillName == '(not-set)' ? this.props.skillName : this.state.skillName}
                            handleInputs={this.handleInputs}
                            title={t('form.skillName')}
                            name="Skill Name"
                        />
                        {this.skillHandle()}
                    </div>
                </div>
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(Skill);
export default MyComponent;
