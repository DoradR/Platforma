import React, {useState, useEffect} from 'react'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct, uploadProductImage, uploadProductVideo } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/ProductConstants'


import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductEditScreen() {

    const {id} = useParams()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false)
    const [videoName, setVideoName] = useState("")
    const [uploadingVideo] = useState(false)

    const dispatch = useDispatch()

    let navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {
            if(!product.name || product._id !== Number(id)){
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setVideoName(videoName)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [product, id, navigate, dispatch, successUpdate, videoName])

    const uploadVideoHandler = async (e) => {
        const videoCourse = e.target.files[0]
        const formData = new FormData()
        formData.append('video-course', videoCourse)
        formData.append('video_name', videoName)
        formData.append('product_id', id)
    
        setUploading(true)
    
        try {
            await dispatch(uploadProductVideo(videoCourse, videoName, id))
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = (e) => {
        setUploading(true)
 
        const file = e.target.files[0]
        dispatch(uploadProductImage(file, id))
        
        setUploading(false)
    }


  return (
    <div>
        <Header/>
            <div className='p-3'>
                <Link to='/admin/productlist' className='btn btn-outline-secondary my-3'>
                    Wróć do poprzedniej strony
                </Link>
                
                <h2>Edytuj produkt</h2>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler} className='style-of-screens'>
                        <FormGroup>
                            <Form.Label>Wideo</Form.Label>
                            <Form.Control
                                type='videoName'
                                placeholder='Wprowadz nazwę kursu'
                                value={videoName}
                                onChange={(e) => setVideoName(e.target.value)}
                            >
                            </Form.Control>
                            <Form.Control
                                type='file'
                                id='video-file'
                                label='Choose Video'
                                custom
                                onChange={uploadVideoHandler}
                            >
                            </Form.Control>
                            {uploadingVideo && <Loader/>}
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Nazwa produktu</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Wprowadz nazwę produktu'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Cena</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Wprowadz cenę produktu'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Zdjęcie</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Wprowadz zdjęcie'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>
                            
                            <Form.Control
                                type='file'
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            >
                            </Form.Control>
                            {uploading && <Loader/>}
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Ilość</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Wprowadz ilość'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Opis produktu</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Wprowadz opis produktu'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </FormGroup>

                        <Button className='btn-info' type='submit' variant='secondary' style={{marginTop: '10px'}}>
                            Edytuj
                        </Button>
                    </Form>
                )}
            </div>
        <Footer/>
    </div>
  )
}

export default ProductEditScreen