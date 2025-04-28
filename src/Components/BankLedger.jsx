import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

function BankLedger() {
  const [formData, setFormData] = useState({
    // Add all form fields here
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/bank-ledger', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Card.Header>Update Bank Ledger</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="account_no" className="mb-3">
            <Form.Label>Account No.</Form.Label>
            <Form.Control
              type="text"
              name="account_no"
              value={formData.account_no}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Add more fields as needed */}
          <Button variant="primary" type="submit">
            Update Ledger
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default BankLedger;