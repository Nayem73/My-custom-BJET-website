import React, { useState, useEffect, useRef } from 'react';

import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import SuccessMessage from '../components/SuccessMessage';
import Loader from '../components/Loader';
import { listReviews, deleteReview, createReview, updateReview } from '../actions/reviewActions';
import './BjetResourceScreen.css';

function BjetResourceScreen() {
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

    const [userIds, setUserIds] = useState({});

    useEffect(() => {
        dispatch(listReviews());
    }, [dispatch]);

    useEffect(() => {
        const fetchUserIds = async () => {
            const userIdsObject = {};
            for (const review of reviews) {
                try {
                    const response = await fetch(`/api/username/${review.userName}`);
                    if (response.ok) {
                        const data = await response.json();
                        userIdsObject[review.userName] = data.id;
                    } else {
                        console.error('Error fetching user ID for username:', review.userName, response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching user ID for username:', review.userName, error);
                }
            }
            setUserIds(userIdsObject);
        };

        if (reviews.length > 0) {
            fetchUserIds();
        }
    }, [reviews]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteReview(id));
        }
    };

    const updateHandler = (id) => {
        setReviewId(id);
        const review = reviews.find((review) => review.reviewId === id);
        formRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setEditingReview(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setUsingCamera(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('img', imageFile);
        formDataToSend.append('comment', e.target.comment.value);
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
        setImageFile(null);
        setUsingCamera(false);
        handleReset();
        setReviewId(null);
        setEditingReview(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {loadingReviewList ? <Loader /> : errorReviewList ? <div className="flex justify-center"><Message message={errorReviewList} /></div> :
                <div className="-m-4">
                    {reviews.map((review) => (
                        <div className="p-4 review my-4 lg:mx-10 md:mx-2 sm:mx-2">
                            <div className="h-full lg:px-8 md:px-4 sm:px-4 py-10 lg:border-2 md:border-2 border-gray-200 rounded-lg dark:border-gray-800">
                                <div className="flex flex-col mb-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-15 h-10 mb-5 py-2 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                        <i className="fa-regular fa-user fa-2xl lg:px-8 md:px-4 sm:px-2"></i>
                                        <Link to={`/users/${userIds[review.userName]}`} className='lg:px-8 md:px-4 sm:px-2 font-bold text-xl title-font' style={{ color: 'white' }}>
                                            {review.userName}
                                        </Link>
                                    </div>
                                    {(review.img !== undefined && review.img !== null && review.img !== "" && review.img !== "null")
                                        ? <>
                                            <div className="flex-grow p-4 lg:w-1/3 md:w-1/2 card">
                                                <img src={review.img} alt={review.userName} fluid rounded />
                                            </div>
                                            <hr className="mb-5 mt-5" style={{ color: '#000000' }} />
                                        </>
                                        : <></>}
                                    <div className="flex-grow rounded-lg dark:border-gray-800 dark:bg-gray-100 p-8 dark:hover:bg-gray-200 transition duration-500 ease-in-out">
                                        <p className="text-base leading-relaxed">{review.comment}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    {(userInfo && userInfo.username === review.userName) && <button className="inline-flex px-4 py-2 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 border-blue-500 rounded-lg hover:bg-blue-700 hover:border-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={() => updateHandler(review.reviewId)}>Edit</button>}
                                    {(userInfo && (userInfo.username === review.userName || userInfo.isSuperAdmin)) && <button className="inline-flex px-4 py-2 ml-4 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 border-red-500 rounded-lg hover:bg-red-700 hover:border-red-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={() => deleteHandler(review.reviewId)}>Delete</button>}
                                </div>
                                <p className="pt-2 text-sm text-gray-500">Created: {review.created}</p>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    );
}

export default BjetResourceScreen;
