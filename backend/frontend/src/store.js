import { configureStore, combineReducers} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { 
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productImageUploadReducer,
    productVideoUploadReducer,
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
    userCoursesReducer,
    courseTokenReducer, 
} from './reducers/userReducers'
import { 
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderListReducer,
    orderMarkAsPaidReducer,
} from './reducers/orderReducers'
import { 
    articleReducer,
    articleDetailsReducer,
    articleCreateReducer,
    articleDeleteReducer,
    articleUpdateReducer,
    articleImageUploadReducer,
} from './reducers/articleReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productImageUpload: productImageUploadReducer,
    productVideoUpload: productVideoUploadReducer,

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
    userCourses: userCoursesReducer,
    courseToken: courseTokenReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderMarkAsPaid: orderMarkAsPaidReducer,

    articleList: articleReducer,
    articleDetails: articleDetailsReducer,
    articleCreate: articleCreateReducer,
    articleDelete: articleDeleteReducer,
    articleUpdate: articleUpdateReducer,
    articleImageUpload: articleImageUploadReducer,
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