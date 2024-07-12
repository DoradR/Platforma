import React, {useEffect} from 'react'
import { Row, Col, ListGroup, Image, Card} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { getOrderDetails} from '../actions/orderActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import config from '../config'

function OrderScreen() {
    const env = process.env.NODE_ENV || 'development';
    const backendUrl = config[env].backendUrl;
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if(!loading && !error){
        order.coursesPrice = order.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        if(!order || order._id !== Number(id)){
            dispatch(getOrderDetails(id))
        }
    }, [dispatch, order, id, navigate, userInfo])

  return loading ? (
    <Loader/>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
        <Header/>
        {!order.isPaid ? (
            <Message variant='info'><strong>Zamówienie zostało złożonę, email z danym do przelewu, znajduję się na Państwa skrzynce mailowej.</strong></Message>
        ) : (
            <Message variant='info'><strong>Zamówienie zostało opłacone.</strong></Message>
        )}
        
            <Row className='shopscreen-row mx-auto'>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Dostawa: </h2>
                            <p><strong>Imię i nazwisko: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Dostawa: </strong>
                                {order.deliveryAddress.address}, {order.deliveryAddress.city}
                                {'   '}
                                {order.deliveryAddress.postalCode}
                            </p>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>Metoda płatności:</h2>
                            <p>
                                <strong>Metoda: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success' dismissable={true}>Zapłacone {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning' dismissable={true}>Nie zapłacone</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Zamówione kursy:</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant='info'>Brak zamówień <Link to='/shop' className='link-in-link'><strong>wróć do sklepu</strong></Link></Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={`${backendUrl}/${item.image}`} alt={item.name} fluid rounded/>
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
                                    <Col>{order.coursesPrice}zł</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Łącznie: </Col>
                                    <Col>{order.totalPrice}zł</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                        
                    </Card>
                </Col>
            </Row>
        <Footer/>
    </div>
  )
}

export default OrderScreen