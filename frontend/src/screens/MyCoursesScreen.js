import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCourses } from '../actions/userActions'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import config from '../config'

function MyCoursesScreen() {
    const env = process.env.NODE_ENV || 'development';
    const backendUrl = config[env].backendUrl;
    const dispatch = useDispatch()

    const userCourses = useSelector(state => state.userCourses)
    const { loading, error, courses } = userCourses

    useEffect(() => {
        dispatch(getUserCourses())
    }, [dispatch])

    return (
        <div>
            <Header/>
                <Row>
                    <Col md={12}>
                        <h1>Moje Kursy</h1>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <Row>
                                {courses.map((course) => (
                                    <Col key={course.id} sm={12} md={6} lg={4} xl={3}>
                                        <Card className='my-3 p-3 rounded'>
                                            <Card.Body>
                                                <Card.Title as='div'>
                                                    <strong>{course.name}</strong>
                                                </Card.Title>
                                                <Card.Text as='div'>
                                                    {course.description}
                                                </Card.Text>
                                                    <a href={`${backendUrl}/${course.video_file}`}><Button>Zobacz video</Button></a>   
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>
            <Footer/>
        </div>
    )
}

export default MyCoursesScreen
