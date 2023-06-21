import React, {useEffect} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Message from '../components/Message'

function CartScreen() {
  const {id} = useParams()
  const location = useLocation()
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1
  
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  const removeFromCartHandler = (id) => {
    console.log('remove:', id )
  }

  return (
    <div>
      <Header/>
        <div className='p-3'>
          <Row>
            <Col md={8}>
              <h1>Koszyk</h1>
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
                          <Form.Control
                            as='select'
                            value={item.quantity}
                            onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                          >
                            {
                              [...Array(item.countInStock).keys()].map((x) =>(
                                <option key={x+1} value={x+1}>
                                  {x+1}
                                </option>
                              ))
                            }
                          </Form.Control>
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
            <Col md={4}></Col>
          </Row>
        </div>
      <Footer/>
    </div>
  )
}

export default CartScreen