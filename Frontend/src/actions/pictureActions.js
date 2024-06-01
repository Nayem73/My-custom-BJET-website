import axios from "axios";
import { 
    PICTURE_LIST_REQUEST,
    PICTURE_LIST_SUCCESS,
    PICTURE_LIST_FAILED,

    PICTURE_DELETE_REQUEST,
    PICTURE_DELETE_SUCCESS,
    PICTURE_DELETE_FAILED,

    PICTURE_CREATE_REQUEST,
    PICTURE_CREATE_SUCCESS,
    PICTURE_CREATE_FAILED,

    PICTURE_UPDATE_REQUEST,
    PICTURE_UPDATE_SUCCESS,
    PICTURE_UPDATE_FAILED,

    PICTURE_SLIDER_REQUEST,
    PICTURE_SLIDER_SUCCESS,
    PICTURE_SLIDER_FAILED
} from "../constants/pictureConstants";

export const listPictures = () => async (dispatch) => {
    try {
        dispatch({ type: PICTURE_LIST_REQUEST });

        const { data } = await axios.get(`/api/carousel`);
        dispatch({ type: PICTURE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PICTURE_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const sliderPicture = () => async (dispatch) => {
    try {
        dispatch({ type: PICTURE_SLIDER_REQUEST });

        const { data } = await axios.get(`/api/carousel`);
        dispatch({ type: PICTURE_SLIDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PICTURE_SLIDER_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deletePicture = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PICTURE_DELETE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        await axios.delete(`/api/carousel/${id}`, config);
        dispatch({ type: PICTURE_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: PICTURE_DELETE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const createPicture = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PICTURE_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        const { data } = await axios.post(`/api/carousel`, formData, config);
        dispatch({ type: PICTURE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PICTURE_CREATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const updatePicture = (id, formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PICTURE_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        const { data } = await axios.put(`/api/carousel/${id}`, formData, config);
        dispatch({ type: PICTURE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PICTURE_UPDATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
