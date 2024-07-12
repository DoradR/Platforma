import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders, markOrderAsPaid } from '../actions/orderActions'
import { FaX } from 'react-icons/fa6'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function OrderListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { error, loading, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderMarkAsPaid = useSelector(state => state.orderMarkAsPaid)
    const {success: successMark } = orderMarkAsPaid

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }

        if (successMark) {
            dispatch(listOrders())
        }

    }, [dispatch, navigate, userInfo, successMark])

    const markAsPaidHandler = (id) => {
        dispatch(markOrderAsPaid(id))
    }

    return (
        <div>
            <Header />
            <h1 style={{ padding: '1rem' }}>Zamówienia</h1>
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Row style={{ display: 'flex', justifyContent: 'center' }} className='shopscreen-row'>
                            <Col md={9} className='mt-3'>
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nazwa użytkownika</th>
                                            <th>Data</th>
                                            <th>Kwota</th>
                                            <th>Status zapłaty</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.user ? order.user.name : order.user.username}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice} zł</td>
                                                <td>{order.isPaid
                                                    ? order.paidAt.substring(0, 10)
                                                    : (
                                                        <div>
                                                            <FaX style={{ color: 'red' }} />
                                                            <Button
                                                                variant='primary'
                                                                className='btn-sm'
                                                                onClick={() => markAsPaidHandler(order._id)}
                                                            >
                                                                Oznacz jako zapłacone
                                                            </Button>
                                                        </div>
                                                    )
                                                }</td>
                                                <td>
                                                    <LinkContainer to={`/order/${order._id}`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            Szczegóły
                                                        </Button>
                                                    </LinkContainer>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    )
            }
            <Footer />
        </div>
    )
}

export default OrderListScreen
