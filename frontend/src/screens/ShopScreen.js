import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../product'
import Product from '../components/Product'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function ShopScreen() {
  return (
    <div>
      <Header/>
        <Row className='shopscreen-row'>
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