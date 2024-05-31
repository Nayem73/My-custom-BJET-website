import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listCarouselImages, addCarouselImage, deleteCarouselImage } from '../actions/carouselActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CarouselAdminScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const carouselList = useSelector(state => state.carouselList);
    const { loading, error, images } = carouselList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo.isAdmin) {
            navigate('/login');
        } else {
            dispatch(listCarouselImages());
        }
    }, [dispatch, navigate, userInfo]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append('img', image);
            dispatch(addCarouselImage(formData));
        }
    };

    const deleteHandler = (id) => {
        dispatch(deleteCarouselImage(id));
    };

    return (
        <div className="container">
            <h1>Manage Carousel Images</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message message={error} />
            ) : (
                <>
                    <form onSubmit={submitHandler}>
                        <input type="file" onChange={uploadFileHandler} />
                        <button type="submit">Upload</button>
                    </form>
                    <div className="carousel-images">
                        {images.map(image => (
                            <div key={image.id} className="carousel-image">
                                <img src={image.url} alt={image.url} />
                                <button onClick={() => deleteHandler(image.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CarouselAdminScreen;
