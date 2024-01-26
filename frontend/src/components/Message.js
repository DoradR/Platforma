import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function Message({ variant, children, dismissable = false }) {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState(children);

  useEffect(() => {
    setMessage(children);
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [children]);

  return (
    <>
      {show && (
        <Alert
          variant={variant}
          style={{ margin: '30px' }}
          dismissible={dismissable}
          onClose={() => setShow(false)}
        >
          {message}
        </Alert>
      )}
    </>
  );
}

export default Message;