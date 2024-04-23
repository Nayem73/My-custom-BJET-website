import axios from "axios";
import {
    RESOURCE_LIST_REQUEST,
    RESOURCE_LIST_SUCCESS,
    RESOURCE_LIST_FAILED,
    RESOURCE_DELETE_REQUEST,
    RESOURCE_DELETE_SUCCESS,
    RESOURCE_DELETE_FAILED,
    RESOURCE_CREATE_REQUEST,
    RESOURCE_CREATE_SUCCESS,
    RESOURCE_CREATE_FAILED,
    RESOURCE_UPDATE_REQUEST,
    RESOURCE_UPDATE_SUCCESS,
    RESOURCE_UPDATE_FAILED
} from "../constants/resourcesConstants";

export const listResources = (params) => async (dispatch, getState) => {
    let page = 0;
    if (params){
        page = params.page || 0;
    }
    try {
        dispatch({
            type: RESOURCE_LIST_REQUEST
        });

        const { data } = await axios.get(`/api/resources?page=${page}`);
        dispatch({
            type: RESOURCE_LIST_SUCCESS,
            payload: data.content
        });
    } catch (error) {
        dispatch({
            type: RESOURCE_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deleteResources = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESOURCE_DELETE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        await axios.delete(`/api/resources/${id}`, config);
        dispatch({
            type: RESOURCE_DELETE_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: RESOURCE_DELETE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const createResources = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESOURCE_CREATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.post(`/api/resources`, formData, config);
        dispatch({
            type: RESOURCE_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: RESOURCE_CREATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateResources = (id, formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESOURCE_UPDATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.put(`/api/resources/${id}`, formData, config);
        dispatch({
            type: RESOURCE_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: RESOURCE_UPDATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
