import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import config from '../config'

function Product({product}) {
    const env = process.env.NODE_ENV || 'development';
    const backendUrl = config[env].backendUrl;
  return (
    <Card className="my-3 p-3 mx-4 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={`${backendUrl}/${product.image}`} style={{display: 'flex', justifySelf:'center', margin: 'auto', maxWidth: 'fit-content'}} />
        </Link>
        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong style={{color: 'black', display: 'inline-block'}}>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="h3">
                {product.price}zł
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product