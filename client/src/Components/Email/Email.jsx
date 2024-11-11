import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Email({ show, handleClose, sendEmail }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(email);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button className='mt-3' variant="primary" type="submit">
            Send Email
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Email;
