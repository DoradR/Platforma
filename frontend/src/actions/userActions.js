import axios from 'axios'
import config from '../config'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_PASSWORD_RESET_REQUEST,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_FAIL,

    USER_PASSWORD_RESET_CONFIRM_REQUEST,
    USER_PASSWORD_RESET_CONFIRM_SUCCESS,
    USER_PASSWORD_RESET_CONFIRM_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    // USER_UPDATE_PROFILE_RESET,

    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAIL,
    USERS_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
 } from '../constants/UserConstants'

 import { ORDER_LIST_MY_RESET } from '../constants/OrderConstants'


export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type: USER_LOGIN_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const configurations = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            `${backendUrl}/api/users/login/`,
            {'email': email, 'password': password},
            configurations
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USERS_LIST_RESET})
}


export const register = (username, email, password) => async (dispatch) => {
    try{
        dispatch({type: USER_REGISTER_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const configurations = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            `${backendUrl}/api/users/register/`,
            {'username': username, 'email': email, 'password': password},
            configurations
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const resetPassword = (email) => async (dispatch) => {
    console.log("Reset password action called with email:", email);
    try{
        dispatch({type: USER_PASSWORD_RESET_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const configurations = {
            headers: {
                'Content-type': 'application/json'
            }
        }
    
        const data = { email: email}

        const {data: responseData} = await axios.post(
            `${backendUrl}/api/users/reset-password/`,
            data,
            configurations,
        )

        dispatch({
            type: USER_PASSWORD_RESET_SUCCESS,
            payload: responseData
        })
        
    } catch (error) {
        dispatch({
            type: USER_PASSWORD_RESET_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const resetPasswordConfirm = (id, token, newPassword, reNewPassword) => async (dispatch) => {
    try{
        dispatch({type: USER_PASSWORD_RESET_CONFIRM_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const configurations = {
            headers: {
                'Content-type': 'application/json'
            }
        }
    
        const data = { id: id, token: token, newPassword: newPassword, reNewPassword: reNewPassword }

        const {data: responseData} = await axios.post(
            `${backendUrl}/api/users/reset-password-confirm/`,
            data,
            configurations,
        )

        dispatch({
            type: USER_PASSWORD_RESET_CONFIRM_SUCCESS,
            payload: responseData
        })
        
    } catch (error) {
        dispatch({
            type: USER_PASSWORD_RESET_CONFIRM_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_DETAILS_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const {
            userLogin: {userInfo},
        } = getState()

        const configurations = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.get(
            `${backendUrl}/api/users/${id}/`,
            configurations
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_UPDATE_PROFILE_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const {
            userLogin: {userInfo},
        } = getState()

        const configurations = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.put(
            `${backendUrl}/api/users/profile/update/`,
            user,
            configurations
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try{
        dispatch({type: USERS_LIST_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const {
            userLogin: {userInfo},
        } = getState()

        const configurations = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.get(
            `${backendUrl}/api/users/`,
            configurations
        )

        dispatch({
            type: USERS_LIST_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: USERS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_DELETE_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const {
            userLogin: {userInfo},
        } = getState()

        const configurations = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.delete(
            `${backendUrl}/api/users/delete/${id}/`,
            configurations
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_UPDATE_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const {
            userLogin: {userInfo},
        } = getState()

        const configurations = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.put(
            `${backendUrl}/api/users/update/${user._id}/`,
            user,
            configurations
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}