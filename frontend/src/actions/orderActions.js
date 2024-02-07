import axios from 'axios'
import config from '../config'
import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_SUCCESS,
    
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
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