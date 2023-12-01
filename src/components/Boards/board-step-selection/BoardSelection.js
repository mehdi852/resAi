import React, { Component } from 'react';
import './BoardSelection.scss';
import { CSSTransition } from 'react-transition-group';
import { withTranslation } from 'react-i18next';
class BoardSelection extends Component {
   constructor(props) {
      super(props);
      this.togglerHandler = this.togglerHandler.bind(this);
      this.handleResumeClick = this.handleResumeClick.bind(this);
   }
   togglerHandler() {
      this.props.toggler();
      this.props.nextStep();
   }
   handleResumeClick(resumeName) {
      console.log('clicked cv');
      this.props.changeResumeName(resumeName);
      if(this.props.currentStep === 'Template Selection'){
         this.props.nextStep();
      }else{
         this.props.setFinalStep();

      }
   }
   render() {
      const { t } = this.props;
      return (
         <div className="board">
            <CSSTransition appear={true} in={true} classNames="fade" timeout={1000}>
               <div className="templateSelection">
                  <h3>{t('selectionAction.templates')}</h3>
                  {this.props.currentStep === 'Template Selection' && (
                     <div className="templatesList">
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv1')}
                              src={require('../../../assets/1.jpg')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv2')}
                              src={require('../../../assets/2.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv6')}
                              src={require('../../../assets/6.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv3')}
                              src={require('../../../assets/3.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv4')}
                              src={require('../../../assets/4.jpg')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv5')}
                              src={require('../../../assets/5.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv7')}
                              src={require('../../../assets/7.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv8')}
                              src={require('../../../assets/8.jpg')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv9')}
                              src={require('../../../assets/9.jpg')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv10')}
                              src={require('../../../assets/10.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv11')}
                              src={require('../../../assets/resumesNew/Cv11.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv12')}
                              src={require('../../../assets/resumesNew/Cv12.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv13')}
                              src={require('../../../assets/resumesNew/Cv13.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv14')}
                              src={require('../../../assets/resumesNew/Cv14.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv15')}
                              src={require('../../../assets/resumesNew/Cv15.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv16')}
                              src={require('../../../assets/20.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv17')}
                              src={require('../../../assets/21.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv18')}
                              src={require('../../../assets/22.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cv19')}
                              src={require('../../../assets/23.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        
                     </div>
                  )}

                  {this.props.currentStep === 'Action Cover Selection' && (
                     <div className="templatesList">
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cover1')}
                              src={require('../../../assets/coversNew/Cover1.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cover2')}
                              src={require('../../../assets/coversNew/Cover2.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cover3')}
                              src={require('../../../assets/coversNew/Cover3.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        <div className="template">
                           {' '}
                           <img
                              onClick={() => this.handleResumeClick('Cover4')}
                              src={require('../../../assets/coversNew/Cover4.JPG')}
                              alt="Cv Preview"
                           />{' '}
                        </div>
                        
                     </div>
                  )}
               </div>
            </CSSTransition>
         </div>
      );
   }
}
const MyComponent = withTranslation('common')(BoardSelection);
export default MyComponent;
