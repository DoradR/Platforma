import React from 'react'
import {useParams} from 'react-router-dom'
import CoursePlayer from '../components/CoursePlayer'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'


function CourseScreen () {
  const {courseId} = useParams()

  return (
    <div>
      <Header/>
        <CoursePlayer courseId={courseId} />
      <Footer/>
    </div>
      
  )
}

export default CourseScreen