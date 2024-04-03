import axios from 'axios'
import config from '../config'
import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_SUCCESS,
    
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_SENDED_REQUEST,
    ORDER_SENDED_SUCCESS,
    ORDER_SENDED_FAIL,
} from '../constants/OrderConstants'
import { CART_CLEAR_ITEMS } from '../constants/CartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_CREATE_REQUEST})

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

        const {data} = await axios.post(
            `${backendUrl}/api/orders/add/`,
            order,
            configurations
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

        
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_DETAILS_REQUEST})

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
            `${backendUrl}/api/orders/${id}/`,
            configurations
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_PAY_REQUEST})

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
            `${backendUrl}/api/orders/${id}/pay/`,
            paymentResult,
            configurations
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const listMyOrders = () => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_LIST_MY_REQUEST})

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
            `${backendUrl}/api/orders/myorders/`,
            configurations
        )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const listOrders = () => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_LIST_REQUEST})

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
            `${backendUrl}/api/orders/`,
            configurations
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const sendOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_SENDED_REQUEST})

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
            `${backendUrl}/api/orders/${order._id}/send/`,
            {},
            configurations
        )

        dispatch({
            type: ORDER_SENDED_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: ORDER_SENDED_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}