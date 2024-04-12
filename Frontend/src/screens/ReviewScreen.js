import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import SuccessMessage from '../components/SuccessMessage';
import Loader from '../components/Loader';
import './ReviewScreen.css';

import {
    listReviews,
    deleteReview,
    createReview,
    updateReview
} from '../actions/reviewActions';

function ReviewScreen() {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const reviewCreate = useSelector(state => state.reviewCreate);
    const { error: errorReviewCreate, success: successReviewCreate } = reviewCreate;

    const reviewUpdate = useSelector(state => state.reviewUpdate);
    const { error: errorReviewUpdate, success: successReviewUpdate } = reviewUpdate;

    const reviewList = useSelector(state => state.reviewList);
    const { loading: loadingReviewList, error: errorReviewList, reviews, cur_page, total_page } = reviewList;

    const reviewDelete = useSelector(state => state.reviewDelete);
    const { success: successReviewDelete } = reviewDelete;

    const [editingReview, setEditingReview] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [usingCamera, setUsingCamera] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        img: null,
        comment: ''
    });

    useEffect(() => {
        dispatch(listReviews());
        if (successReviewCreate || successReviewUpdate) {
            setFormData({
                img: null,
                comment: ''
            });
            setImageFile(null);
            setUsingCamera(false);
            handleReset();
            setReviewId(null);
            setEditingReview(false);
        }
    }, [dispatch, successReviewDelete, successReviewCreate, successReviewUpdate]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteReview(id));
        }
    };

    const updateHandler = (id) => {
        setReviewId(id);
        const review = reviews.find((review) => review.reviewId === id);
        setFormData({
            img: null,
            comment: review.comment
        });
        formRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setEditingReview(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            img: file,
        }));
        setImageFile(file);
        setUsingCamera(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('img', formData.img);
        formDataToSend.append('comment', formData.comment);
        if (reviewId) {
            dispatch(updateReview(reviewId, formDataToSend));
        } else {
            dispatch(createReview(formDataToSend));
        }
    };

    const handleReset = () => {
        document.getElementById("myForm").reset();
    };

    const editCancelHandler = () => {
        setFormData({
            img: null,
            comment: ''
        });
        setImageFile(null);
        setUsingCamera(false);
        handleReset();
        setReviewId(null);
        setEditingReview(false);
    };

    return (
        <div className="review-container">
            <h1 className="text-center mb-4 text-2xl font-semibold tracking-widest text-black uppercase title-font">Reviews</h1>
            <div className="container mx-auto">
                {loadingReviewList ? <Loader /> : errorReviewList ? <Message message={errorReviewList} /> :
                    reviews.map((review) => (
                        <div className="review" key={review.reviewId}>
                            <div className="review-header flex items-center justify-between bg-gray-200 p-4 border-b">
                                <h2 className="text-lg font-semibold">{review.userName}</h2>
                                <p className="text-sm text-gray-500">Created: {review.created}</p>
                            </div>
                            <div className="review-body p-4">
                                {review.img && <img src={review.img} alt={review.userName} className="mb-4" />}
                                <p>{review.comment}</p>
                            </div>
                            {(userInfo && userInfo.username === review.userName) &&
                                <div className="review-actions p-4">
                                    <button className="btn btn-primary" onClick={() => updateHandler(review.reviewId)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteHandler(review.reviewId)}>Delete</button>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-center m-4">
                <Paginate pages={total_page} page={cur_page} dispatcher_action={listReviews} />
            </div>
            <hr className="my-4" />
            <div className="container mx-auto review-form">
                {/* Your review form goes here */}
            </div>
            {errorReviewCreate && <Message message={errorReviewCreate} className="error-message" />}
            {successReviewCreate && <SuccessMessage message={"Review is added successfully"} className="success-message" />}
            {errorReviewUpdate && <Message message={errorReviewUpdate} className="error-message" />}
            {successReviewUpdate && <SuccessMessage message={"Review is updated"} className="success-message" />}
        </div>
    );
}

export default ReviewScreen;