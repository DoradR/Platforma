import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { savePaymentMethod } from '../actions/cartActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('Przelewy24')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <div>
        <Header/>
        <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Wybierz metodę</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Przelewy24 albo Karta Kredytowa'
                            id='przelewy24'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button
                    type='submit'
                    className='btn-info'
                    style={{width:'100%'}}
                >
                    Kontynuuj
                </Button>
            </Form>
        <Footer/>
    </div>
  )
}

export default PaymentScreen