import React, {useState, useEffect} from 'react'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listArticleDetails, updateArticle, uploadArticleImage } from '../actions/articleActions'
import { ARTICLE_UPDATE_RESET } from '../constants/ArticleConstants'


import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ArticleEditScreen() {

    const {id} = useParams()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    let navigate = useNavigate()

    const articleDetails = useSelector(state => state.articleDetails)
    const {loading, error, article} = articleDetails

    const articleUpdate = useSelector(state => state.articleUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = articleUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: ARTICLE_UPDATE_RESET})
            navigate('/admin/articlelist')
        } else {
            if(!article.title || article._id !== Number(id)){
                dispatch(listArticleDetails(id))
            } else {
                setTitle(article.title)
                setContent(article.content)
                setImage(article.image)
            }
        }
    }, [article, id, navigate, dispatch, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateArticle({
            _id: id,
            title,
            content,
            image       
        }))
    }

    const uploadFileHandler = (e) => {
        setUploading(true)
 
        const file = e.target.files[0]
        dispatch(uploadArticleImage(file, id))
        
        setUploading(false)
    }


  return (
    <div>
        <Header/>
            <div className='p-3'>
                <Link to='/admin/articlelist'>
                    Powrót
                </Link>
                
                <h2>Edytuj artykuł</h2>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler} className='list-of-forms-from-profile-screen'>
                        <FormGroup controlId='title'>
                            <Form.Label>Nazwa artykułu</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Wprowadz tytuł artykuły'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </Form.Control>
                        </FormGroup>

                        <FormGroup controlId='content'>
                            <Form.Label>Kontent</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={5}
                                placeholder='Wprowadz kontent'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            >
                            </Form.Control>
                        </FormGroup>

                        <FormGroup controlId='image'>
                            <Form.Label>Zdjęcie</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Wprowadz zdjęcie'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>
                            
                            <Form.Control
                                type='file'
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            >
                            </Form.Control>
                            {uploading && <Loader/>}
                        </FormGroup>

                        <Button className='btn-info' type='submit' variant='secondary'>
                            Edytuj
                        </Button>
                    </Form>
                )}
            </div>
        <Footer/>
    </div>
  )
}

export default ArticleEditScreen