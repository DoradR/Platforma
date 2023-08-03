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
 } from '../constants/UserConstants'


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

export const resetPasswordConfirm = (_id, token, new_password, re_new_password) => async (dispatch) => {
    try{
        dispatch({type: USER_PASSWORD_RESET_CONFIRM_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const configurations = {
            headers: {
                'Content-type': 'application/json'
            }
        }
    
        const body = JSON.stringify({_id, token, new_password, re_new_password})

        const {data} = await axios.post(
            `${backendUrl}/api/users/reset-password-confirm/`,
            configurations,
            body
        )

        dispatch({
            type: USER_PASSWORD_RESET_CONFIRM_SUCCESS,
            payload: data
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