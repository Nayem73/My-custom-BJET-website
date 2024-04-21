import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './BjetResourceScreen.css';

function BjetResourceScreen() {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [editText, setEditText] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await axios.get('http://localhost:8080/api/review'); // replace with your API endpoint
            setReviews(res.data.content); // adjust this line according to your API response structure
        };

        fetchReviews();
    }, [userInfo]);

    const handleEdit = (review) => {
        if (!userInfo || !userInfo.isAdmin) {
            alert('Only super admin can edit/update/post reviews.');
        } else {
            setEditingReview(review);
            setEditText(review.comment);
        }
    };

    const handleSave = async () => {
    // Call your API to save the changes
    // Don't forget to handle errors and edge cases
    await axios.put(`http://localhost:8080/api/review/${editingReview.reviewId}`, { comment: editText }, {
        headers: {
            'Authorization': `Bearer ${userInfo.token}` // replace with your token
        }
    });
    setEditingReview(null);
    setEditText('');
};


    return (
        <div className="container mx-auto px-4 py-8">
            {reviews.map((review) => (
                <div className="card" key={review.reviewId}>
                    <img src={review.img} alt={review.userName} className="card-img-top" />
                    <div className="card-body">
                        <h2 className="card-title">{review.userName}</h2>
                        {editingReview === review ? (
                            <>
                                <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
                                <button onClick={handleSave}>Save</button>
                            </>
                        ) : (
                            <>
                                <p>{review.comment}</p>
                                {userInfo && userInfo.isAdmin && (
                                    <button onClick={() => handleEdit(review)}>Edit</button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BjetResourceScreen;
