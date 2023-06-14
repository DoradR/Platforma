import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from '../actions/productActions'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function ShopScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList

  useEffect(() => {
    dispatch(listProducts())

  }, [])

  return (
    <div>
      <Header/>
        <Row className='shopscreen-row mx-auto'>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>
      <Footer/>
    </div>
  )
}

export default ShopScreen