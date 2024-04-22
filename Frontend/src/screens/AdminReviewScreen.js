import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listReviews, deleteReview, createReview, updateReview } from '../actions/reviewActions'; // replace with your actual actions
import Loader from '../components/Loader'; // replace with your actual Loader component
import Message from '../components/Message'; // replace with your actual Message component
import Paginate from '../components/Paginate'; // replace with your actual Paginate component
// import './AdminReviewScreen.css'; // replace with your actual CSS file

const AdminReviewScreen = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const history = useNavigate();

    const reviewList = useSelector(state => state.reviewList);
    const { loading, error, reviews, cur_page, total_page } = reviewList;

    const reviewDelete = useSelector(state => state.reviewDelete);
    const { success: successDelete } = reviewDelete;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history('/login');
        } else {
            dispatch(listReviews());
        }
    }, [dispatch, history, userInfo, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteReview(id));
        }
    };

    const editHandler = (id) => {
        history(`/admin/review/edit/${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {loading ? <Loader /> : error ? <Message message={error} /> : (
                <div className="overflow-x-auto w-full">
                    <Link to={'/admin/review/create/'}>
                        <button className='btn items-center justify-center mb-3'>ADD REVIEW</button>
                    </Link>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User Name</th>
                                <th>Comment</th>
                                <th>Image</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => (
                                <tr key={review.reviewId}>
                                    <td>{review.reviewId}</td>
                                    <td>{review.userName}</td>
                                    <td>{review.comment}</td>
                                    <td><img className='h-20 w-20' src={review.img} alt={review.userName} /></td>
                                    <td>
                                        <button onClick={() => editHandler(review.reviewId)} className='btn mx-3'> <i className='fas fa-edit'></i> </button>
                                        <button onClick={() => deleteHandler(review.reviewId)} className='btn'> <i className='fas fa-trash'></i> </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center m-10">
                        <Paginate pages={total_page} page={cur_page} dispatcher_action={listReviews}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminReviewScreen;
