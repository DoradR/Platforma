import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import config from '../config'


function Article({article}) {
    const env = process.env.NODE_ENV || 'development';
    const backendUrl = config[env].backendUrl;
    return (
        <Card className="my-3 p-3 mx-4 rounded">
        <Link to={`/article/${article._id}`}>
            <Card.Img src={`${backendUrl}/${article.image}`} style={{display: 'flex', justifySelf:'center', margin: 'auto', maxWidth: 'fit-content'}} />
        </Link>
        <Card.Body>
            <Link to={`/article/${article._id}`}>
                <Card.Title as="div">
                    <strong style={{color: 'black', display: 'inline-block'}}>{article.title}</strong>
                </Card.Title>
            </Link>
        </Card.Body>
    </Card>
    )
}

export default Article

