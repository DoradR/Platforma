import React, {useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/OrderConstants'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

function PlaceorderScreen() {
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)

    cart.coursesPrice = cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
    cart.promotion = 10

    cart.totalPrice = (cart.coursesPrice * Number(1 - cart.promotion/100)).toFixed(2)

    if(!cart.paymentMethod){
        navigate('/payment')
    }

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            coursesPrice: cart.coursesPrice,
            promotion: cart.promotion,
            totalPrice: cart.totalPrice
        }))
    }
  return (
    <div>
        <Header/>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Dostawa: </h2>
                            <p>
                                <strong>Dostawa: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'   '}
                                {cart.shippingAddress.postalCode}
                                {/* {'   '} */}
                                {/* {cart.shippingAddress.country} */}
                            </p>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>Metoda płatności:</h2>
                            <p>
                                <strong>Metoda: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Zamówione kursy:</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message variant='info'>Twój koszyk jest pusty <Link to='/shop' className='link-in-link'><strong>wróć do sklepu</strong></Link></Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.quantity} X {item.price}zł = <strong>{(item.quantity * item.price).toFixed(2)}zł </strong>                                               </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Cena: </h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Kursy: </Col>
                                    <Col>{cart.coursesPrice}zł</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Promocja: </Col>
                                    <Col>{cart.promotion}%</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Łącznie: </Col>
                                    <Col>{cart.totalPrice}zł</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-info'
                                    style={{width:'100%'}}
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrder}
                                >
                                    Złóż zamówienie
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        <Footer/>
    </div>
  )
}

export default PlaceorderScreen