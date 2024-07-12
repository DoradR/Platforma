import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCourses } from '../actions/userActions';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';

function MyCoursesScreen() {
    const env = process.env.NODE_ENV || 'development';
    const backendUrl = config[env].backendUrl;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userCourses = useSelector(state => state.userCourses);
    const { loading, error, courses } = userCourses;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(getUserCourses());
        }
    }, [dispatch, navigate, userInfo]);

    return (
        <div>
            <Header />
            <Row className='shopscreen-row'>
                <Col md={12}>
                    <h1 style={{padding: '1rem'}}>Moje Kursy</h1>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Row className='shopscreen-row'>
                            {courses.map((course) => (
                                <Col key={course.id} sm={12} md={6} lg={4} xl={3}>
                                    <Card className='my-3 p-3 rounded'>
                                        <Card.Img src={`${backendUrl}/${course.product.image}`} variant='top' />
                                        <Card.Body>
                                            <Card.Title as='div'>
                                                <strong>{course.name}</strong>
                                            </Card.Title>
                                            <Link to={`/course/${course.id}`}>
                                                <Button variant='info'>Zobacz video</Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Col>
            </Row>
            <Footer />
        </div>
    );
}

export default MyCoursesScreen;
