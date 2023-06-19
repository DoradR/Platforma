import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({variant, children}) {
  return (
    <Alert variant={variant} style={{margin: '30px'}}>
        {children}
    </Alert>
  )
}

export default Message