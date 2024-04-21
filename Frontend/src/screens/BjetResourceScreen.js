import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './BjetResourceScreen.css';

function BjetResourceScreen() {
    const [reviews, setReviews] = useState([]);
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const history = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await axios.get('http://localhost:8080/api/review'); // replace with your API endpoint
            setReviews(res.data.content); // adjust this line according to your API response structure
        };

        fetchReviews();
    }, [history, userInfo]);

    const handleEdit = (review) => {
        if (!userInfo || !userInfo.isAdmin) {
            alert('Only super admin can edit/update/post reviews.');
        } else {
            // handle edit functionality here
            history(`/editReview/${review.reviewId}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {reviews.map((review) => (
                <div className="card" key={review.reviewId}>
                    <img src={review.img} alt={review.userName} className="card-img-top" />
                    <div className="card-body">
                        <h2 className="card-title">{review.userName}</h2>
                        <p>{review.comment}</p>
                        {/* Add more fields as per your review structure */}
                        {userInfo && userInfo.isAdmin && (
                            <button onClick={() => handleEdit(review)}>Edit</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BjetResourceScreen;
