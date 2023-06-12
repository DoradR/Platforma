import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import config from '../config'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function ShopScreen() {
  const [products, setProducts] = useState([])

  const env = process.env.NODE_ENV || 'development';
  const backendUrl = config[env].backendUrl;

  useEffect(() => {
    async function fetchProducts(){
      const {data} = await axios.get(`${backendUrl}/api/products/`)
      setProducts(data)
      console.log(data)
    }
    
    fetchProducts()

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