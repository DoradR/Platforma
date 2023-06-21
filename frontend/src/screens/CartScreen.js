import React, {useEffect} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Message from '../components/Message'

function CartScreen() {
  const {productId} = useParams()
  const location = useLocation()
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1
  
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log('cartItems', cartItems)

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  return (
    <div>
      <Header/>
        Koszyk
      <Footer/>
    </div>
  )
}

export default CartScreen