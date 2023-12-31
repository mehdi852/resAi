import React, { Component } from 'react';
import './Employment.scss';
import Arrow from '../../../assets/arrow.png';
import SimpleInput from '../simple-input/SimpleInput';
import SimpleTextArea from '../simple-textarea/SimpleTextarea';
import { withTranslation } from 'react-i18next';
import DeleteImage from '../../../assets/cross.png';
class Employment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: 'false',
            jobTitle: this.props.jobTitle,
            begin: this.props.begin,
            end: this.props.end,
            description: this.props.description,
            employer: this.props.employer,
        };
        this.toggleHandle = this.toggleHandle.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
    }
    // Handling toggle click
    toggleHandle() {
        this.state.isOpened === 'false' ? this.setState({ isOpened: 'true' }) : this.setState({ isOpened: 'false' });
    }
    // Changing panel title when user type something in title
    handleInputs(inputName, inputValue) {
        switch (inputName) {
            case 'Job Title':
                this.setState({ jobTitle: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, 'Employment');
                break;
            case 'Begin':
                this.setState({ begin: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, 'Employment');
                break;
            case 'End':
                this.setState({ end: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, 'Employment');
                break;
            case 'Employer':
                this.setState({ employer: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, 'Employment');
                break;
            case 'Description':
                this.setState({ description: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, 'Employment');
                break;
            default:
                break;
        }
    }
    render() {
        const { t } = this.props;

        return (
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-title"> {this.state.jobTitle == '(not-set)' ? this.props.jobTitle : this.state.jobTitle}</span>
                    <span className="panel-subtitle">
                        {' '}
                        {this.state.begin} - {this.state.end}{' '}
                    </span>
                    <div className="panel-action">
                        <a
                            onClick={() => {
                                this.props.removeEmployment(this.props.id);
                                this.props.removeEmploymentJsx(this.props.id);
                            }}>
                            <img className="delete_Item" src={DeleteImage} alt="delete" />
                        </a>

                        <img alt="more" onClick={this.toggleHandle} className={this.state.isOpened === 'false' ? 'panel-toggler ' : 'panel-toggler panel-toggler-opened'} src={Arrow} />
                    </div>
                </div>
                <div className={this.state.isOpened === 'false' ? 'panel-body hidden' : 'panel-body'}>
                    <div className="grid-2-col">
                        {/* Passing handleInputs to get user text from input and handle it in parent ( this one ) */}
                        <SimpleInput value={this.state.jobTitle} handleInputs={this.handleInputs} title={t('form.jobTitle')} name="Job Title" />
                        <SimpleInput value={this.state.employer} handleInputs={this.handleInputs} title={t('form.employer')} name="Employer" />
                        <div className=" grid-2-col">
                            <SimpleInput placeholder="ex : aug 2020" value={this.state.begin} handleInputs={this.handleInputs} title={t('form.begin')} name="Begin" />
                            <SimpleInput placeholder="ex : Jan 2021" value={this.state.end} handleInputs={this.handleInputs} title={t('form.end')} name="End" />
                        </div>
                    </div>
                    <SimpleTextArea
                        employmentId={this.props.id}
                        employmentInputHandler={this.handleInputs}
                        suggestions={true}
                        values={this.props.values}
                        value={this.state.description == '' ? this.props.description : this.state.description}
                        handleInputs={this.handleInputs}
                        title={t('form.description')}
                        jobTitle={this.state.jobTitle}
                        employer={this.state.employer}
                        name="Description"
                    />
                </div>
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(Employment);
export default MyComponent;
