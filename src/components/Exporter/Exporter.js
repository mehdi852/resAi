import React, { Component } from 'react';
import Cv1 from '../../cv-templates/cv1/Cv1';
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
import Cv16 from '../../cv-templates/cv16/Cv16';
import Cv17 from '../../cv-templates/cv17/Cv17';
import Cv18 from '../../cv-templates/cv18/Cv18';
import Cv19 from '../../cv-templates/cv19/Cv19';

import { getJsonById } from '../../firestore/dbOperations';
import Cover1 from '../../cv-templates/cover1/Cover1';
import Cover2 from '../../cv-templates/cover2/Cover2';
import Cover3 from '../../cv-templates/cover3/Cover3';
import Cover4 from '../../cv-templates/cover4/Cover4';

class Exporter extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.resumeId);

        this.state = {
            gotData: false,
            values: {
                firstname: '',
                lastname: '',
                photo: '',
                phone: '',
                address: '',
                email: '',
                country: '',
                city: '',
                postalcode: '',
                languages: [],
                employments: [],
                skills: [],
                educations: [],
                summary: [],
                components: [],
            },
        };
    }
    componentDidMount() {
        if (!this.state.gotData) {
            getJsonById(this.props.match.params.resumeId).then((data) => {
                data !== null && this.setState({ values: data, gotData: true });
            });
        }
    }

    render() {
        return (
            <>
                {this.props.resumeName == 'Cv1' ? (
                    <Cv1 language={this.props.match.params.language} values={this.state.values}></Cv1>
                ) : this.props.resumeName == 'Cv2' ? (
                    <Cv2 language={this.props.match.params.language} values={this.state.values}></Cv2>
                ) : this.props.resumeName == 'Cv3' ? (
                    <Cv3 language={this.props.match.params.language} values={this.state.values}></Cv3>
                ) : this.props.resumeName == 'Cv4' ? (
                    <Cv4 language={this.props.match.params.language} values={this.state.values}></Cv4>
                ) : this.props.resumeName == 'Cv5' ? (
                    <Cv5 language={this.props.match.params.language} values={this.state.values}></Cv5>
                ) : this.props.resumeName == 'Cv6' ? (
                    <Cv6 language={this.props.match.params.language} values={this.state.values}></Cv6>
                ) : this.props.resumeName == 'Cv7' ? (
                    <Cv7 language={this.props.match.params.language} values={this.state.values}></Cv7>
                ) : this.props.resumeName == 'Cv8' ? (
                    <Cv8 language={this.props.match.params.language} values={this.state.values}></Cv8>
                ) : this.props.resumeName == 'Cv9' ? (
                    <Cv9 language={this.props.match.params.language} values={this.state.values}></Cv9>
                ) : this.props.resumeName == 'Cv10' ? (
                    <Cv10 language={this.props.match.params.language} values={this.state.values}></Cv10>
                ) : this.props.resumeName == 'Cv11' ? (
                    <Cv11 language={this.props.match.params.language} values={this.state.values}></Cv11>
                ) : this.props.resumeName == 'Cv12' ? (
                    <Cv12 language={this.props.match.params.language} values={this.state.values}></Cv12>
                ) : this.props.resumeName == 'Cv13' ? (
                    <Cv13 language={this.props.match.params.language} values={this.state.values}></Cv13>
                ) : this.props.resumeName == 'Cv14' ? (
                    <Cv14 language={this.props.match.params.language} values={this.state.values}></Cv14>
                ) : this.props.resumeName == 'Cv15' ? (
                    <Cv16 language={this.props.match.params.language} values={this.state.values}></Cv16>
                ) : this.props.resumeName == 'Cover1' ? (
                    <Cover1 language={this.props.match.params.language} values={this.state.values}></Cover1>
                ) : this.props.resumeName == 'Cover2' ? (
                    <Cover2 language={this.props.match.params.language} values={this.state.values}></Cover2>
                ) : this.props.resumeName == 'Cover3' ? (
                    <Cover3 language={this.props.match.params.language} values={this.state.values}></Cover3>
                ) : this.props.resumeName == 'Cover4' ? (
                    <Cover4 language={this.props.match.params.language} values={this.state.values}></Cover4>
                ) : this.props.resumeName == 'Cv16' ? (
                    <Cv16 language={this.props.match.params.language} values={this.state.values}></Cv16>
                ) : this.props.resumeName == 'Cv17' ? (
                    <Cv17 language={this.props.match.params.language} values={this.state.values}></Cv17>
                ) : this.props.resumeName == 'Cv18' ? (
                    <Cv18 language={this.props.match.params.language} values={this.state.values}></Cv18>
                ) : (
                    <Cv19 language={this.props.match.params.language} values={this.state.values}></Cv19>
                )}
            </>
        );
    }
}
export default Exporter;
