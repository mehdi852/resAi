import React, { Component } from 'react';
import Cv1New from './../../../cv-templates/cv1/Cv1';
import Cv2New from './../../../cv-templates/cv2/Cv2';
import Cv3New from './../../../cv-templates/cv3/Cv3';
import Cv4New from './../../../cv-templates/cv4/Cv4';
import Cv5New from './../../../cv-templates/cv5/Cv5';
import Cv6New from './../../../cv-templates/cv6/Cv6';
import Cv7New from './../../../cv-templates/cv7/Cv7';
import Cv11 from './../../../cv-templates/cv11/Cv11';
import Cv12 from './../../../cv-templates/cv12/Cv12';
import Cv13 from './../../../cv-templates/cv13/Cv13';
import Cv14 from './../../../cv-templates/cv14/Cv14';
import Cv15 from '../../../cv-templates/cv15/Cv15';
import Cv16 from '../../../cv-templates/cv16/Cv16';
import Cv17 from '../../../cv-templates/cv17/Cv17';
import Cv18 from '../../../cv-templates/cv18/Cv18';
import Cv19 from '../../../cv-templates/cv19/Cv19';
import Cv8 from '../../../cv-templates/cv8/Cv8';
import Cv9 from '../../../cv-templates/cv9/Cv9';
import Cv10 from '../../../cv-templates/cv10/Cv10';
import Cover1 from '../../../cv-templates/cover1/Cover1';
import Cover2 from '../../../cv-templates/cover2/Cover2';
import Cover3 from '../../../cv-templates/cover3/Cover3';
import Cover4 from '../../../cv-templates/cover4/Cover4';
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.currentHeight = 0;
    }
    render() {
        return (
            <div style={{ color: 'black' }}>
                {this.props.currentResumeName == 'Cv1' ? (
                    <Cv1New values={this.props.values}></Cv1New>
                ) : this.props.currentResumeName == 'Cv2' ? (
                    <Cv2New values={this.props.values}></Cv2New>
                ) : this.props.currentResumeName == 'Cv3' ? (
                    <Cv3New values={this.props.values}></Cv3New>
                ) : this.props.currentResumeName == 'Cv4' ? (
                    <Cv4New values={this.props.values}></Cv4New>
                ) : this.props.currentResumeName == 'Cv5' ? (
                    <Cv5New values={this.props.values}></Cv5New>
                ) : this.props.currentResumeName == 'Cv6' ? (
                    <Cv6New values={this.props.values}></Cv6New>
                ) : this.props.currentResumeName == 'Cv7' ? (
                    <Cv7New values={this.props.values}></Cv7New>
                ) : this.props.currentResumeName == 'Cv8' ? (
                    <Cv8 values={this.props.values}></Cv8>
                ) : this.props.currentResumeName == 'Cover1' ? (
                    <Cover1 values={this.props.values}></Cover1>
                ) : this.props.currentResumeName == 'Cover2' ? (
                    <Cover2 values={this.props.values}></Cover2>
                ) : this.props.currentResumeName == 'Cover3' ? (
                    <Cover3 values={this.props.values}></Cover3>
                ) : this.props.currentResumeName == 'Cover4' ? (
                    <Cover4 values={this.props.values}></Cover4>
                ) : this.props.currentResumeName == 'Cv9' ? (
                    <Cv9 values={this.props.values}></Cv9>
                ) : this.props.currentResumeName == 'Cv10' ? (
                    <Cv10 values={this.props.values}></Cv10>
                ) : this.props.currentResumeName == 'Cv11' ? (
                    <Cv11 values={this.props.values}></Cv11>
                ) : this.props.currentResumeName == 'Cv12' ? (
                    <Cv12 values={this.props.values}></Cv12>
                ) : this.props.currentResumeName == 'Cv13' ? (
                    <Cv13 values={this.props.values}></Cv13>
                ) : this.props.currentResumeName == 'Cv14' ? (
                    <Cv14 values={this.props.values}></Cv14>
                ) : this.props.currentResumeName == 'Cv15' ? (
                    <Cv15 values={this.props.values}></Cv15>
                ) : this.props.currentResumeName == 'Cv16' ? (
                    <Cv16 values={this.props.values}></Cv16>
                ) : this.props.currentResumeName == 'Cv17' ? (
                    <Cv17 values={this.props.values}></Cv17>
                ) :  this.props.currentResumeName == 'Cv18' ?  (
                    <Cv18 values={this.props.values}></Cv18>
                ): (
                    <Cv19 values={this.props.values}></Cv19>
                )}
            </div>
        );
    }
}
export default Canvas;
