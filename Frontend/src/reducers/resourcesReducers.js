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

export const resourceListReducer = (state = { resources: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case RESOURCE_LIST_REQUEST:
            return { ...state, loading: true };
        case RESOURCE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                resources: action.payload
            };
        case RESOURCE_LIST_FAILED:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const resourceDeleteReducer = (state = { loading: false, success: false, error: null }, action) => {
    switch (action.type) {
        case RESOURCE_DELETE_REQUEST:
            return { loading: true };
        case RESOURCE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case RESOURCE_DELETE_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const resourceCreateReducer = (state = { loading: false, success: false, resource: null, error: null }, action) => {
    switch (action.type) {
        case RESOURCE_CREATE_REQUEST:
            return { loading: true };
        case RESOURCE_CREATE_SUCCESS:
            return { loading: false, success: true, resource: action.payload };
        case RESOURCE_CREATE_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const resourceUpdateReducer = (state = { loading: false, success: false, resource: null, error: null }, action) => {
    switch (action.type) {
        case RESOURCE_UPDATE_REQUEST:
            return { loading: true };
        case RESOURCE_UPDATE_SUCCESS:
            return { loading: false, success: true, resource: action.payload };
        case RESOURCE_UPDATE_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
