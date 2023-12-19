import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate, createSearchParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen() {
  const [quantity, setQuantity] =  useState(1)
  const params = {qty:quantity}
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {id} = useParams()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))

  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate({
      pathname: `/cart/${id}`,
      search: `?${createSearchParams(params)}`
    })
  }
    return (  
    <div>
        <Header/>
          <div className='p-3'>
            <Link to='/shop' className='btn btn-outline-secondary my-3'>Wróć do poprzedniej strony</Link>
            { loading ? <Loader/>
                : error ? <Message>{error}</Message>
                :(
                  <Row className='shopscreen-row mx-auto' style={{display: 'flex', justifyContent: 'center'}}>
                    <Col md='auto' className='mt-3'>
                      <Image src={product.image} alt={product.name} fluid className='mx-auto'/>
                    </Col>
                    <Col md={3} className='mt-3'>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Rating value={product.rating} text={`${product.numReviews} recenzji`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <strong>Cena: </strong>{product.price}zł
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <strong>Opis: </strong>{product.description}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={3} className='mt-3'>
                      <Card>
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <Row>
                              <Col>Cena:</Col>
                              <Col>
                                <strong>{product.price}zł</strong>
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col>Status:</Col>
                              <Col>
                                <strong>{product.countInStock > 0 ? 'Dostępne' : 'Brak na magazynie'}</strong>
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          {product.countInStock > 0 && (
                            <ListGroup.Item>
                              <Row>
                                <Col>Ilość</Col>
                                <Col className=''>
                                  <div className="quantity-input">
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={quantity}
                                      onChange={(e) => {
                                        const newQuantity = Math.min(
                                          Math.max(Number(e.target.value), 1),
                                          product.countInStock
                                        );
                                        setQuantity(newQuantity);
                                      }}
                                      min="1"
                                      max={product.countInStock}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}

                          <ListGroup.Item>
                            <Row>
                              <Button 
                                onClick={addToCartHandler}
                                className='btn-info' 
                                disabled={product.countInStock === 0} 
                                type='button'
                              >
                                Dodaj do koszyka
                              </Button>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Col>
                  </Row>
                )
            }
          </div>
        <Footer/>
    </div>
  )
}

export default ProductScreen