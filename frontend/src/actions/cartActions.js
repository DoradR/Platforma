import axios from 'axios'
import config from '../config'
import { CART_ADD_ITEM } from '../constants/CartConstants'


export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;
        
        const {data} = await axios.get(`${backendUrl}/api/products/${id}/`)

        dispatch({
            type: CART_ADD_ITEM,
            payload:{
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quantity
            }
        })
    } catch (error) {}
    

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}