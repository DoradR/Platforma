import axios from 'axios'
import config from '../config'
import { 
    ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL,

    ARTICLE_DETAILS_REQUEST,
    ARTICLE_DETAILS_SUCCESS,
    ARTICLE_DETAILS_FAIL,

    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
    ARTICLE_CREATE_FAIL,

    ARTICLE_DELETE_REQUEST,
    ARTICLE_DELETE_SUCCESS,
    ARTICLE_DELETE_FAIL,

    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL,

    ARTICLE_IMAGE_UPLOAD_REQUEST,
    ARTICLE_IMAGE_UPLOAD_SUCCESS,
    ARTICLE_IMAGE_UPLOAD_FAIL,
} from '../constants/ArticleConstants'

export const listArticles = () => async (dispatch) => {
    try {
        dispatch({type: ARTICLE_LIST_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const {data} = await axios.get(`${backendUrl}/api/articles/`)

        dispatch({
            type: ARTICLE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ARTICLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const listArticleDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ARTICLE_DETAILS_REQUEST})

        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;

        const {data} = await axios.get(`${backendUrl}/api/articles/${id}`)

        dispatch({
            type: ARTICLE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ARTICLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const deleteArticle = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: ARTICLE_DELETE_REQUEST})

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
            `${backendUrl}/api/articles/delete/${id}`,
            configurations
        )

        dispatch({
            type: ARTICLE_DELETE_SUCCESS,
        })

        
    } catch (error) {
        dispatch({
            type: ARTICLE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const createArticle = () => async (dispatch, getState) => {
    try{
        dispatch({type: ARTICLE_CREATE_REQUEST})

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
            `${backendUrl}/api/articles/create/`,
            {},
            configurations
        )

        dispatch({
            type: ARTICLE_CREATE_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: ARTICLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const updateArticle = (article) => async (dispatch, getState) => {
    try{
        dispatch({type: ARTICLE_UPDATE_REQUEST})

        const env = process.env.NODE_ENV || 'development'
        const backendUrl = config[env].backendUrl

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
            `${backendUrl}/api/articles/update/${article._id}/`,
            article,
            configurations
        )

        dispatch({
            type: ARTICLE_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: ARTICLE_DETAILS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type: ARTICLE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const uploadArticleImage = (file, articleId) => async (dispatch, getState) => {
    try {
        const formData = new FormData()
        formData.append("image", file)
        formData.append("article_id", articleId)
 
        dispatch({ type: ARTICLE_IMAGE_UPLOAD_REQUEST })

        const env = process.env.NODE_ENV || 'development'
        const backendUrl = config[env].backendUrl

        const {
            userLogin: {userInfo},
        } = getState()
 
        const configurations = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}` 
            },
        }
 
        const { data } = await axios.post(
            `${backendUrl}/api/articles/upload/`,
            formData,
            configurations
        )
 
        dispatch({
            type: ARTICLE_IMAGE_UPLOAD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ARTICLE_IMAGE_UPLOAD_FAIL,
            payload: error.response,
        })
    }
}