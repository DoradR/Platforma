import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <Spinner
        animation='border'
        role='status'
        style={{
            height: '100px',
            width: '100px',
            margin: 'auto',
            display: 'block',
            color: '#2387A0'
        }}>
            <span className='sr-only'>Ładowanie...</span>
    </Spinner>
  )
}

export default Loader