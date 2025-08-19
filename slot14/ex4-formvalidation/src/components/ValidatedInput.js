import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const validateInput = (value) => {
  return value.length >= 5;
};

function ValidatedInput() {
  const [value, setValue] = useState(""); 
  const [isValid, setIsValid] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput); 
    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!"); 
    } else {
      setErrorMessage(""); 
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (isValid) {
      setShowModal(true); 
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "100px auto" }}>
        <Form.Group controlId="validatedInput">
          <Form.Label>Nhập một giá trị</Form.Label>
          <Form.Control
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)} 
            isValid={isValid} 
            isInvalid={!isValid} 
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage} 
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" style={{marginTop:'10px'}} disabled={!isValid}>
          Gửi
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>Giá trị đã được gửi thành công!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ValidatedInput;
