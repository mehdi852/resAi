import React, { Component } from 'react';
import './Phrases.scss';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addCategoryToData, getAllCategories, removeCategoryByName, removePhraseFromCategory, addPhraseToCategory, getPhrasesOfCategory } from '../../../firestore/dbOperations';
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'websiteSettings',
            categoryInput: 'Cat',
            categories: [],
            phrases: [],
            isPhrasesShowed: true,
        };
        this.setStep = this.setStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCategoryRemove = this.handleCategoryRemove.bind(this);
        this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
        this.handlePhraseSubmit = this.handlePhraseSubmit.bind(this);
        this.handlePhraseRemove = this.handlePhraseRemove.bind(this);
    }
    setStep(stepName) {
        this.setState({ step: stepName });
    }

    handleChange(event, inputName) {
        switch (inputName) {
            case 'categoryInput':
                this.setState({ categoryInput: event.target.value });
                break;
            case 'phraseInput':
                this.setState({ phraseInput: event.target.value });
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        getAllCategories().then((categories) => {
            this.setState({ categories: categories });
        });
        getPhrasesOfCategory(this.state.categoryInput).then((phrases) => {
            this.setState({ phrases: phrases });
        });
    }
    // handle category submit
    handleCategorySubmit() {
        /// add category to data
        addCategoryToData(this.state.categoryInput).then(() => {
            getAllCategories().then((categories) => {
                this.setState({ categories: categories });
            });
        });
    }
    // handle category remove
    handleCategoryRemove() {
        /// remove category from data
        removeCategoryByName(this.state.categoryInput).then((response) => {
            if (response === true) {
                alert('Category removed');
                getAllCategories().then((categories) => {
                    this.setState({ categories: categories });
                });
            } else {
                alert('Category not found');
            }
        });
    }

    // sett categoryInput with the clicked category
    handleCategoryClick(category) {
        this.setState({ categoryInput: category.name, phraseInput: '' });

        setTimeout(() => {
            getPhrasesOfCategory(this.state.categoryInput).then((phrases) => {
                this.setState({ phrases: phrases });
            });
        }, 1000);
    }
    // handle phrase submit
    handlePhraseSubmit() {
        /// add phrase to category
        addPhraseToCategory(this.state.categoryInput, this.state.phraseInput).then((response) => {
            if (response === true) {
                getPhrasesOfCategory(this.state.categoryInput).then((phrases) => {
                    this.setState({ phrases: phrases });
                });
            } else {
                alert('Category not found');
            }
        });
    }
    /// handle phrase click
    handlePhraseClick(phrase) {
        this.setState({ phraseInput: phrase });
    }

    // handle phrase remove
    handlePhraseRemove() {
        /// remove phrase from category
        removePhraseFromCategory(this.state.categoryInput, this.state.phraseInput).then((response) => {
            if (response === true) {
                alert('Phrase removed');
                getPhrasesOfCategory(this.state.categoryInput).then((phrases) => {
                    this.setState({ phrases: phrases });
                });
            } else {
                alert('Category not found');
            }
        });
    }

    render() {
        return (
            <div className="settings">
                <Container>
                    {/* Categories */}

                    <div className="settings-categories">
                        <h1>Categories</h1>
                        <div className="settings-category-input-wrapper">
                            <TextField
                                placeholder={this.state.categoryInput}
                                value={this.state.categoryInput}
                                fullWidth
                                className="settings__input"
                                onChange={(event) => this.handleChange(event, 'categoryInput')}
                                label="Add Category"
                                variant="outlined"
                                style={{ marginRight: '20px' }}
                            />
                            {/*  A button with mui-react */}

                            <Button onClick={() => this.handleCategorySubmit()} variant="contained" color="primary">
                                Save
                            </Button>
                            <Button onClick={() => this.handleCategoryRemove()} style={{ marginLeft: '10px' }} variant="outlined" color="secondary">
                                Remove
                            </Button>
                        </div>

                        {/* List of current categories with delete icon from react-icons */}

                        <Grid container className="settings-categories-items" spacing={3}>
                            {this.state.categories.length > 0 &&
                                this.state.categories.map((category) => {
                                    return (
                                        <Grid item xs={12} sm={3}>
                                            <div onClick={() => this.handleCategoryClick(category)} className="settings-categories__item">
                                                <p>{category.name}</p>
                                                <i className="fas fa-trash-alt"></i>
                                            </div>
                                        </Grid>
                                    );
                                })}
                        </Grid>

                        <h1>Phrases</h1>

                        <div className="settings-category-input-wrapper">
                            <TextField
                                placeholder={this.state.phraseInput}
                                value={this.state.phraseInput}
                                fullWidth
                                className="settings__input"
                                onChange={(event) => this.handleChange(event, 'phraseInput')}
                                label="Add Phrase"
                                variant="outlined"
                                style={{ marginRight: '20px' }}
                            />

                            <Button onClick={() => this.handlePhraseSubmit()} variant="contained" color="primary">
                                Save
                            </Button>
                            <Button onClick={() => this.handlePhraseRemove()} style={{ marginLeft: '10px' }} variant="outlined" color="secondary">
                                Remove
                            </Button>
                        </div>
                        {/* List of phrases */}

                        <div className="settings-categories-phrases">
                            {this.state.phrases &&
                                this.state.phrases.length > 0 &&
                                this.state.phrases.map((phrase) => {
                                    return (
                                        <div onClick={() => this.handlePhraseClick(phrase)} className="settings-categories-phrases__item">
                                            <p>{phrase}</p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}
export default Settings;
