import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { listArticles } from '../actions/articleActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Article from '../components/Article'


function ArticlesScreen() {
  const dispatch = useDispatch()
  const articleList = useSelector(state => state.articleList)
  const {error, loading, articles} = articleList

  useEffect(() => {
    dispatch(listArticles())

  }, [dispatch])

  return (
    <div>
      <Header/>
      {loading ? <Loader/>
        : error ? <Message>{error}</Message>  
          :
          <Row className='shopscreen-row mx-auto'>
            {articles.map(article => (
              <Col key={article._id} sm={12} md={6} lg={4} xl={3}>
                <Article article={article}/>
              </Col>
            ))}
        </Row>
      }
      <Footer/>
    </div>
  )
}

export default ArticlesScreen