import React, {useState} from 'react'
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { saveShippingAddress } from '../actions/cartActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    // const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode}))
        navigate('/payment')
    }
  return (
    <div>
        <Header/>
            <CheckoutSteps step1 step2/>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Adres</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Wprowadź adres'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Miasto</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Wprowadź miasto'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Kod Pocztowy</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Wprowadź kod pocztowy'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* <Form.Group controlId='country'>
                    <Form.Label>Państwo</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Wprowadź państwo'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group> */}

                <Button
                      type='submit'
                      className='btn-info'
                      style={{width:'100%'}}
                    //   disabled={cartItems.length === 0}
                    //   onClick={checkoutHandler}
                    >
                      Kontynuuj
                </Button>
                
            </Form>
        <Footer/>
    </div>
  )
}

export default ShippingScreen