import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function Message({ variant, children, dismissable = false }) {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState(children);

  useEffect(() => {
    setMessage(children);
    if (!dismissable) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [children, dismissable]);

  return (
    <>
      {show && (
        <Alert
          variant={variant}
          style={{ margin: '30px' }}
          dismissible={false} // Ustawiamy dismissible na false, aby nie pokazywać przycisku zamykania, niezależnie od wartości dismissable
        >
          {message}
        </Alert>
      )}
    </>
  );
}

export default Message;
