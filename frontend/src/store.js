import { configureStore, combineReducers} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { 
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productImageUploadReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
    userLoginReducer, 
    userRegisterReducer,
    userResetPasswordReducer,
    userResetPasswordConfirmReducer,
    userDetailsReducer, 
    userUpdateProfileReducer,
    usersListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'
import { 
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderSendReducer,
} from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productImageUpload: productImageUploadReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userResetPassword: userResetPasswordReducer,
    userResetPasswordConfirm: userResetPasswordConfirmReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    usersList: usersListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderSend: orderSendReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddresFormStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : {}

export const initialState = {
    cart:{ 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddresFormStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin:{ userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,
})

export default store