import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listArticles, deleteArticle, createArticle } from '../actions/articleActions'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { ARTICLE_CREATE_RESET } from '../constants/ArticleConstants'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ArticleListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const articleList = useSelector(state => state.articleList)
    const {error, loading, articles} = articleList

    const articleDelete = useSelector(state => state.articleDelete)
    const {error: errorDelete, loading: loadingDelete, success: successDelete} = articleDelete

    const articleCreate = useSelector(state => state.articleCreate)
    const {error: errorCreate, loading: loadingCreate, success: successCreate, article: createdArticle} = articleCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type:ARTICLE_CREATE_RESET})
        if(!userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/article/${createdArticle._id}/edit`)
        } else {
            dispatch(listArticles())
        }
        
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdArticle])

    const deleteHandler = (id) => {
        if(window.confirm('Czy na pewno chcesz usunąć ten artykuł?')) {
            dispatch(deleteArticle(id))
        }
    }

    const createArticleHandler = () => {
        dispatch(createArticle())
    }
  return (
    <div>
        <Header/>
            <Row className='align-items-center' style={{padding: '1rem', width: '100%'}}>
                <Col>
                    <h1>Artykuły</h1>
                </Col>
                <Col style={{textAlign: 'right'}}>
                    <Button className='my-3' onClick={createArticleHandler}>
                        <FaPlus/> Stwórz artykuł
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading 
            ? <Loader/> 
            : error 
            ? <Message variant='danger'>{error}</Message>
            : (
                <Row style={{display: 'flex', justifyContent: 'center'}} className='shopscreen-row'>
                    <Col md={9} className='mt-3'>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nazwa artykułu</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {articles.map(article => (
                                    <tr key={article._id}>
                                        <td>{article._id}</td>
                                        <td>{article.title}</td>
                                        <td>
                                            <LinkContainer to={`/admin/article/${article._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <FaEdit/>
                                                </Button>
                                            </LinkContainer>

                                            <Button style={{color: 'tomato'}} className='btn-sm' onClick={() => deleteHandler(article._id)}>
                                                <FaTrash style={{color:'white'}}/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                
            )
            }
        <Footer/>
    </div>
  )
}

export default ArticleListScreen