import React, { useState } from 'react';
import './Reviews.scss';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addReview, getAllReviews, deleteReview, addGlobalRating } from '../../../firestore/dbOperations';

const Reviews = () => {
    const [review, setReview] = useState({
        imageUrl: '',
        name: '',
        occupation: '',
        review: '',
        rating: '',
        ratingOf: 0,
    });

    const [reviews, setReviews] = useState([]);

    React.useEffect(() => {
        getAllReviews().then((result) => {
            setReviews(result);
        });
    }, []);

    const handleDelete = (id) => {
        deleteReview(id).then((result) => {
            if (result) {
                getAllReviews().then((result) => {
                    setReviews(result);
                });
                alert('Review deleted successfully');
            }
        });
    };

    const handleChange = (event, inputName) => {
        switch (inputName) {
            case 'imageUrl':
                setReview({ ...review, imageUrl: event.target.value });
                break;
            case 'name':
                setReview({ ...review, name: event.target.value });
                break;
            case 'occupation':
                setReview({ ...review, occupation: event.target.value });
                break;
            case 'ratingOf':
                setReview({ ...review, ratingOf: event.target.value });
                break;
            case 'review':
                setReview({ ...review, review: event.target.value });
                break;
            case 'rating':
                setReview({ ...review, rating: event.target.value });
                break;
            default:
                break;
        }
    };

    const handleReviewSubmit = () => {
        addReview(review).then((result) => {
            if (result) {
                getAllReviews().then((result) => {
                    setReviews(result);
                });
                alert('Review added successfully');
            }
        });
    };

    const handleRatingSubmit = () => {
        if (review.ratingOf === 0) {
            alert('Please enter a valid rating');
            return;
        }

        if (review.ratingOf > 5) {
            alert('Please enter a valid rating');
            return;
        }
        addGlobalRating(review.ratingOf).then((result) => {
            if (result) {
                alert('Rating added successfully');
            }
        });
    };

    return (
        <div className="settings_reviews">
            <Container>
                <Grid item xs={12}>
                    <h1>Reviews</h1>
                    <form>
                        <TextField
                            placeholder="Rating"
                            value={review.ratingOf}
                            fullWidth
                            className="settings__input"
                            onChange={(event) => handleChange(event, 'ratingOf')}
                            label="Rating"
                            variant="outlined"
                            style={{ marginRight: '20px' }}
                        />
                        <Button onClick={() => handleRatingSubmit()} variant="contained" color="primary">
                            Add Rating
                        </Button>
                    </form>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Reviews</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <form>
                            <TextField
                                placeholder="Image URL"
                                value={review.imageUrl}
                                fullWidth
                                className="settings__input"
                                onChange={(event) => handleChange(event, 'imageUrl')}
                                label="Image URL"
                                variant="outlined"
                                style={{ marginRight: '20px' }}
                            />
                            <TextField
                                placeholder="Name"
                                value={review.name}
                                fullWidth
                                className="settings__input"
                                onChange={(event) => handleChange(event, 'name')}
                                label="Name"
                                variant="outlined"
                                style={{ marginRight: '20px' }}
                            />
                            <TextField
                                placeholder="Occupation"
                                value={review.occupation}
                                fullWidth
                                className="settings__input"
                                onChange={(event) => handleChange(event, 'occupation')}
                                label="Occupation"
                                variant="outlined"
                                style={{ marginRight: '20px' }}
                            />

                            <TextField
                                placeholder="Review"
                                value={review.review}
                                fullWidth
                                className="settings__input"
                                onChange={(event) => handleChange(event, 'review')}
                                label="Review"
                                variant="outlined"
                                style={{ marginRight: '20px' }}
                            />
                            <TextField
                                placeholder="Rating"
                                value={review.rating}
                                fullWidth
                                className="settings__input"
                                onChange={(event) => handleChange(event, 'rating')}
                                label="Rating"
                                variant="outlined"
                                style={{ marginRight: '20px' }}
                            />
                            <Button onClick={() => handleReviewSubmit()} variant="contained" color="primary">
                                Add Review
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>

            {/* Using same Material ui we list the reviews in MockReviews */}

            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Reviews</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {reviews.map((review, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <div className="review">
                                        <div className="review__image">
                                            <img src={review.imageUrl} alt="review" />
                                        </div>
                                        <div className="review__content">
                                            <h3>{review.name}</h3>
                                            <p>{review.occupation}</p>
                                            <p>{review.review}</p>
                                            <p>{review.rating}</p>
                                            <a onClick={() => handleDelete(review.id)}>Delete</a>
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Reviews;
