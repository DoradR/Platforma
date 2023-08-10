import React, {useEffect} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { BsCartFill } from 'react-icons/bs'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Message from '../components/Message'

function CartScreen() {
  const {id} = useParams()
  const location = useLocation()
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, quantity))
      navigate('/cart')
    }
  }, [dispatch, id, quantity, navigate])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

 
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <div>
      <Header/>
        <div className='p-3'>
        <Link to='/shop' className='btn btn-outline-secondary my-3'>Kontynuuj zakupy</Link>
          <Row className='shopscreen-row'>
            <Col md={8} className='mt-3'>
              {cartItems.length === 0 ? (
                <Message variant='info'>Twój koszyk jest pusty <Link to='/shop' className='link-in-link'><strong>wróć do sklepu</strong></Link></Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                        
                        <Col md={3}>
                          <Link to={`/product/${item.product}`} className='link-in-link'>{item.name}</Link>
                        </Col>

                        <Col md={2}>
                          <strong>${item.price}</strong>
                        </Col>

                        <Col md={3}>
                          <div className="quantity-input">
                            <input
                              type="number"
                              className="form-control"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = Math.min(
                                  Math.max(Number(e.target.value), 1),
                                  item.countInStock
                                );
                                dispatch(addToCart(item.product, newQuantity));
                              }}
                              min="1"
                              max={item.countInStock}
                            />
                          </div>
                        </Col>

                        <Col md={1}>
                          <Button
                            type='button'
                            variant='light'
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4} className='mt-3'>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Suma częściowa {cartItems.reduce((acc, item) => acc + item.quantity, 0)} przedmiotów:</h2>
                    <h3><strong>${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</strong></h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-info'
                      style={{width:'100%'}}
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Złóż zamówienie
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      <Footer/>
    </div>
  )
}

export default CartScreen