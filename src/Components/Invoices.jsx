import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import './LRGenerate.css';  // Custom CSS for additional styling

function Invoices() {
  const [formData, setFormData] = useState({
    lr_no:'',
    truck_no:'',
    from_to:'',
    material_parcel:'',
    total_weight:'',
    Freight_amount:'',
    Halting_charge:'',
    extra_charge:'',
    advance:'',
    trip_amount:'',
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
      const response = await axios.post('http://localhost:8000/api/invoices', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid className="p-4">
      <div className="header-section mb-2 p-3 bg-info text-white">
        <Row>
          <Col xs={8}>
            <h5>Head Office: 308, Soham Heights, Dashrath, Dist Vadodara, Gujarat-363642</h5>
            <h6>Contact: 9662332719, 8200167319</h6>
          </Col>
          <Col xs={4} className="text-right">
            <img src="\src\Image\Dwarkadhish.png" alt="Logo" className="logo" /> 
          </Col>
        </Row>
        <Row>
          <Col>
            <p>GSTIN NO: 24ESZPD5938M1ZU &nbsp;&nbsp;&nbsp; PAN NO: ESZPD5938M</p>
          </Col>
        </Row>
      </div>
    <Card>
      <Card.Header className="bg-success text-white text-center">Invoice Generate</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <h6>Bill	To	:	SOPPA	PROJECT	LLP	</h6>
              <p>Address	:	MANJUSAR	GIDC	ALINDRA,	Vadodara,	Gujarat,	India	Pin	:	391775	</p>
              <p>GST	No	:	27AETFS8602M1Z6</p>
            </Col>
            <Col></Col>
            <Col>
              <p>Date	:	09-03-2025</p>
              <p>Invoice	Number	:	APR/24-25/2</p>
              <p>Branch:	01</p>
            </Col>
          </Row>

          <Table bordered className="mt-4">
            <thead className="bg-light">
              <tr>
                <th>LR/GR/Bilty Number</th>
                <th>Truck Number</th>
                <th>From - To</th>
                <th>Material Parcel Details</th>
                <th>Total Weight</th>
                <th>Freight Amount</th>
                <th>Halting Charge</th>
                <th>Extra Charge</th>
                <th>Advance</th>
                <th>Trip Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    type="text"
                    name="lr_no"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="truck_no"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="from_to"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="material_parcel"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="total_weight"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="freight_amount"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="halting_charge"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="extra_charge"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="advance"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="trip_amount"
                    value={formData.packages}
                    onChange={handleChange}
                  />
                  </td>
              </tr>
              <tr>
                <td colSpan="5">HSN	/	SAC	:</td>
                <td colSpan="3">SUB TOTAL</td>
                <td colSpan="2">28,800.00</td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="2">remarks</td>
                <td colSpan="3">DISCOUNT</td>
                <td colSpan="2">-	0.00</td>
              </tr>
              <tr>
                <td colSpan="3"><b>TOTAL	TRIP	AMOUNT</b></td>
                <td colSpan="2">28,800.00</td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="3">TWENTY-EIGHT	THOUSAND,	EIGHT	HUNDRED</td>
                <td colSpan="3"><h5>INVOICE	VALUE</h5></td>
                <td colSpan="2">28,800.00</td>
              </tr>
              <tr>
              <td colSpan="3"><b>ADVANCE	RECEIVED</b></td>
              <td colSpan="2">-0.00</td>
              </tr>
              <tr>
              <td colSpan="3"><b>NET	PAYABLE</b></td>
              <td colSpan="2">28,800.00</td>
              </tr>
            </tbody>
          </Table>
          <div className="text-center mt-3">
          <Button variant="primary" type="submit">
            Generate Invoice
          </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  );
}

export default Invoices;