import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SuccessMessage from '../components/SuccessMessage';
import ReactMarkdown from 'react-markdown';
import './BjetResourceScreen.css';

import {
    listResources,
    deleteResources,
    createResources,
    updateResources
} from '../actions/resourcesActions';

function BjetResourceScreen() {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const resourceCreate = useSelector(state => state.resourceCreate);
    const { error: errorResourceCreate, success: successResourceCreate } = resourceCreate;

    const resourceUpdate = useSelector(state => state.resourceUpdate);
    const { error: errorResourceUpdate, success: successResourceUpdate } = resourceUpdate;

    const resourceList = useSelector(state => state.resourceList);
    const { loading: loadingResourceList, error: errorResourceList, resources } = resourceList;

    const resourceDelete = useSelector(state => state.resourceDelete);
    const { success: successResourceDelete } = resourceDelete;

    const [editingResource, setEditingResource] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [resourceId, setResourceId] = useState(null);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        img: null,
        description: ''
    });

    const [markdownText, setMarkdownText] = useState(''); // New state for Markdown text

    useEffect(() => {
        dispatch(listResources());
        if (successResourceCreate || successResourceUpdate) {
            setFormData({
                img: null,
                description: ''
            });
            setImageFile(null);
            handleReset();
            setResourceId(null);
            setEditingResource(false);
        }
    }, [dispatch, successResourceDelete, successResourceCreate, successResourceUpdate]);

    useEffect(() => {
        setMarkdownText(formData.description); // Update Markdown text on form data change
    }, [formData.description]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteResources(id));
        }
    };

    const updateHandler = (id) => {
        setResourceId(id);
        const resource = resources.find((resource) => resource.resourceId === id);
        setFormData({
            img: null,
            description: resource.description
        });
        formRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setEditingResource(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            img: file,
        }));
        setImageFile(file);
    };

    const handleChange = (e) => {
        const text = e.target.value;
        setFormData({ ...formData, description: text });
        setMarkdownText(text); // Update Markdown text
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('img', formData.img);
        formDataToSend.append('description', formData.description);
        if (resourceId) {
            dispatch(updateResources(resourceId, formDataToSend));
        } else {
            dispatch(createResources(formDataToSend));
        }
    };

    const handleReset = () => {
        document.getElementById("myForm").reset();
    };

    const editCancelHandler = () => {
        setFormData({
            img: null,
            description: ''
        });
        setImageFile(null);
        handleReset();
        setResourceId(null);
        setEditingResource(false);
    };

    return (
        <div>
            {/* ... */}
            <div className="container px-5 py-4 mx-auto">
                {loadingResourceList ? (
                    <Loader />
                ) : errorResourceList ? (
                    <div className="flex justify-center">
                        <Message message={errorResourceList} />
                    </div>
                ) : (
                    <div className="-m-4">
                        {resources.map((resource) => (
                            <div key={resource.resourceId} className="p-4 review my-4 lg:mx-10 md:mx-2 sm:mx-2">
                                <div className="flex flex-col  mb-3">
                                    {resource.img ? (
                                        <div className="flex-grow card">
                                            <img src={resource.img} alt={resource.description} className="card-img-top" />
                                            <div className="card-body">
                                                <ReactMarkdown>{resource.description}</ReactMarkdown>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="description">
                                            <ReactMarkdown>{resource.description}</ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    {userInfo && userInfo.username === resource.userName && (
                                        <button className="inline-flex px-4 py-2 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 border-blue-500 rounded-lg hover:bg-blue-700 hover:border-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={() => updateHandler(resource.resourceId)}>Edit</button>
                                    )}
                                    {userInfo && (userInfo.username === resource.userName || userInfo.isSuperAdmin) && (
                                        <button className="inline-flex px-4 py-2 ml-4 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 border-red-500 rounded-lg hover:bg-red-700 hover:border-red-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={() => deleteHandler(resource.resourceId)}>Delete</button>
                                    )}
                                </div>
                                <p className="pt-2 text-sm text-gray-500">Created: {resource.created}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* ... */}
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 w-full">
                        {/* ... */}
                        <div className="flex justify-center mb-5 mt-5">
                            {errorResourceCreate && <Message message={errorResourceCreate} />}
                            {successResourceCreate && <SuccessMessage message={"Resource is added successfully"} />}
                            {errorResourceUpdate && <Message message={errorResourceUpdate} />}
                            {successResourceUpdate && <SuccessMessage message={"Resource is updated"} />}
                        </div>
                        {userInfo && userInfo.isSuperAdmin ? (
                            <div className='lg:px-20 mt-10 mr-5 ml-5 mb-10 w-3/4'>
                                <form className='normal-form' ref={formRef} id="myForm" onSubmit={handleSubmit}>
                                    {imageFile && (
                                        <div className="container-aisearch">
                                            <div className="ai_img">
                                                <img
                                                    src={URL.createObjectURL(imageFile)}
                                                    alt="Uploaded"
                                                    className="uploaded-image"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="img">Image:</label>
                                        <input
                                            type="file"
                                            id="img"
                                            name="img"
                                            accept=".png, .jpg, .jpeg"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div data-color-mode="light">
                                        <label htmlFor="description">Description:</label>
                                        <textarea
                                            required
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Markdown Preview */}
                                    <div className="markdown-preview">
                                        <h3>Markdown Preview</h3>
                                        <ReactMarkdown>{markdownText}</ReactMarkdown>
                                    </div>
                                    <div className='py-4 flex justify-left'>
                                        {editingResource ? (
                                            <>
                                                <button type='submit' className='btn btn-primary w-24'>Update</button>
                                                <div onClick={editCancelHandler} className='btn btn-primary w-24 mx-5'>Cancel</div>
                                            </>
                                        ) : (
                                            <button type='submit' className='btn btn-primary w-24'>Submit</button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div >
                                
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BjetResourceScreen;
