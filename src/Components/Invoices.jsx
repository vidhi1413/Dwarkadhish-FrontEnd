import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import './LRGenerate.css';  // Custom CSS for additional styling

function Invoices() {
  const [formData, setFormData] = useState({
    bill_to:'',
    address:'',
    gst_no:'',
    branch:'',
    invoice_no:'',
    date:'',
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
    hsn_sac:'',
    remarks:'',
    sub_total:'',
    discount:'',
    total_trip_amount:'',
    invoice_value:'',
    advance_received:'',
    net_payable:''
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
              <Form.Group controlId="bill_to">
                <Form.Label>Bill To</Form.Label>
                <Form.Control type="text" name="bill_to" value={formData.bill_to} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="gst_no">
                <Form.Label>GST No.</Form.Label>
                <Form.Control type="text" name="gst_no" value={formData.gst_no} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="branch">
                <Form.Label>Branch</Form.Label>
                <Form.Control type="text" name="branch" value={formData.branch} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="invoice_no">
                <Form.Label>Invoice No.</Form.Label>
                <Form.Control type="text" name="invoice_no" value={formData.invoice_no} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange}/>
              </Form.Group>
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
                <td colSpan="5">HSN	/	SAC	:
                  <Form.Group controlId="hsn_sac">
                    <Form.Control type="text" name="hsn_sac" value={formData.hsn_sac} onChange={handleChange}/>
                  </Form.Group>
                </td>
                <td colSpan="3">SUB TOTAL</td>
                <td colSpan="2"><Form.Group controlId="sub_total">
                    <Form.Control type="text" name="sub_total" value={formData.sub_total} onChange={handleChange}/>
                  </Form.Group></td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="2">remarks
                  <Form.Group controlId="remarks">
                    <Form.Control type="text" name="remarks" value={formData.remarks} onChange={handleChange}/>
                  </Form.Group></td>
                <td colSpan="3">DISCOUNT</td>
                <td colSpan="2">
                  <Form.Group controlId="discount">
                    <Form.Control type="text" name="discount" value={formData.discount} onChange={handleChange}/>
                  </Form.Group></td>
              </tr>
              <tr>
                <td colSpan="3"><b>TOTAL	TRIP	AMOUNT</b></td>
                <td colSpan="2">
                  <Form.Group controlId="total_trip_amount">
                    <Form.Control type="text" name="total_trip_amount" value={formData.total_trip_amount} onChange={handleChange}/>
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="3">TWENTY-EIGHT	THOUSAND,	EIGHT	HUNDRED</td>
                <td colSpan="3"><h5>INVOICE	VALUE</h5></td>
                <td colSpan="2">
                  <Form.Group controlId="invoice_value">
                    <Form.Control type="text" name="invoice_value" value={formData.invoice_value} onChange={handleChange}/>
                  </Form.Group>
                </td>
              </tr>
              <tr>
              <td colSpan="3"><b>ADVANCE	RECEIVED</b></td>
              <td colSpan="2">
                <Form.Group controlId="advance_received">
                    <Form.Control type="text" name="advance_received" value={formData.advance_received} onChange={handleChange}/>
                </Form.Group>
              </td>
              </tr>
              <tr>
              <td colSpan="3"><b>NET	PAYABLE</b></td>
              <td colSpan="2">
                <Form.Group controlId="net_payable">
                    <Form.Control type="text" name="net_payable" value={formData.net_payable} onChange={handleChange}/>
                  </Form.Group>
              </td>
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