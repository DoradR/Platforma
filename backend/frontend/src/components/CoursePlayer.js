import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseToken } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import config from '../config'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CoursePlayer = ({ courseId }) => {
  const env = process.env.NODE_ENV || 'development'
  const backendUrl = config[env].backendUrl
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const courseToken = useSelector((state) => state.courseToken)
  const { loading, error, token } = courseToken

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [videoUrl, setVideoUrl] = useState('')
  const videoElement = useRef(null)

  useEffect(() => {
    if (courseId) {
      dispatch(getCourseToken(courseId))
    }
  }, [dispatch, courseId])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (token) {
      const accessToken = typeof token === 'string' ? token : token.token
      
      if (accessToken) {
        const configurations = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        fetch(`${backendUrl}/api/users/course/access/${accessToken}`, configurations)
          .then(response => {
            if (!response.ok) {
              throw new Error('Unauthorized')
            }
            return response.json()
          })
          .then(data => {
            setVideoUrl(`${backendUrl}${data.video_file}`)
          })
          .catch(error => console.error('Error fetching course data:', error))
      }
    }
  }, [userInfo, token, backendUrl, navigate])

  useEffect(() => {
    videoElement.current.load()
  }, [videoUrl])

  useEffect(() => {
    const handleFullscreenChange = () => {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            videoElement.current.style.padding = '0';
        } else {
            videoElement.current.style.padding = '';
        }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
}, []);

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div style={{marginTop: '20px'}}>
          <video controls ref={videoElement} className='style-of-screens'>
            <source src={videoUrl} type="video/mp4" />
            Twoja przeglądarka nie obsługuje elementu video.
          </video>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
