import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate, createSearchParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import { listArticleDetails } from '../actions/articleActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import config from '../config'

function ArticleScreen() {
  const env = process.env.NODE_ENV || 'development';
  const backendUrl = config[env].backendUrl;
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {id} = useParams()
  const articleDetails = useSelector(state => state.articleDetails)
  const { loading, error, article } = articleDetails

  useEffect(() => {
    dispatch(listArticleDetails(id))

  }, [dispatch, id])

    return (  
    <div>
        <Header/>
          <div className='p-3'>
            <Link to='/' className='btn btn-outline-secondary my-3'>Wróć do poprzedniej strony</Link>
            { loading ? <Loader/>
                : error ? <Message>{error}</Message>
                :(
                  <Row className='shopscreen-row mx-auto' style={{display: 'flex', justifyContent: 'center'}}>
                    <Col md='auto' className='mt-3'>
                      <Image src={`${backendUrl}/${article.image}`} alt={article.title} fluid className='mx-auto'/>
                    </Col>
                    <Col md={9} className='mt-3'>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <h3>{article.title}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <strong>Treść: </strong>{article.content}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                )
            }
          </div>
        <Footer/>
    </div>
  )
}

export default ArticleScreen