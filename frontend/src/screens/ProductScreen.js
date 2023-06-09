import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../product'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function ProductScreen( match ) {
  const product_id = useParams()
  const product = products.find((p) => p._id === product_id.id)
    return (
    <div>
        <Header/>
          <div className='p-3'>
            <Link to='/shop' className='btn btn-outline-secondary my-3'>Wróć do poprzedniej strony</Link>
            <Row className='shopscreen-row mx-auto'>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} recenzji`} color={'#f8e825'}/>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Cena: ${product.price}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Opis: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Cena:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>{product.countInStock > 0 ? 'Dostępne' : 'Brak na magazynie'}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Button className='btn-info' disabled={product.countInStock === 0} type='button'>Dodaj do koszyka</Button>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
        <Footer/>
    </div>
  )
}

export default ProductScreen