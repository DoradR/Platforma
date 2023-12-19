import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <Card className="my-3 p-3 mx-4 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} style={{display: 'flex', justifySelf:'center', margin: 'auto'}}/>
        </Link>
        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong style={{color: 'black', display: 'inline-block'}}>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <div className='py-3'>
                    <Rating value={product.rating} text={` ${product.numReviews} recenzji`} color={'#f8e825'}/>
                </div>
            </Card.Text>
            <Card.Text as="h3">
                {product.price}zł
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product