import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Container, Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import './LRGenerate.css';  // Custom CSS for additional styling
import API_URL from '../../config';

function LRGenerate() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    invoice_no: '',
    value_rs: '',
    lorry_no: '',
    cnn_no: '',
    delivery_at: '',
    date: '',
    consignor: '',
    consignor_gstin: '',
    consignor_eway: '',
    consignee: '',
    consignee_gstin: '',
    consignee_eway: '',
    from: '',
    to: '',
    insurance_company: '',
    policy_no: '',
    amount_rs: '',
    risk_rs: '',
    packages: '',
    destination: '',
    actual_weight: '',
    rate_per_mt: '',
    bc: '',
    sgst: '',
    cgst: '',
    igst: '',
    gc: '',
    grand_total: '',
    option1: false,
    option2: false,
    option3: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.persist();
    if (e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,  // Handle checkbox changes correctly
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      invoice_no: '102514',
      value_rs: '50000',
      lorry_no: '5542',
      cnn_no: '7750',
      delivery_at: formData.delivery_at,
      date: formData.date,
      consignor_gstin_no: formData.consignor_gstin,
      consignor_eway_bill_no: formData.consignor_eway,
      consignee_gstin_no: formData.consignee_gstin,
      consignee_eway_bill_no: formData.consignee_eway,
      from: formData.from,
      to: formData.to,
      insurance_company_name: formData.insurance_company,
      policy_no: formData.policy_no,
      amount_rs: formData.amount_rs,
      risk_rs: formData.risk_rs,
      packages: formData.packages,
      destination: formData.destination,
      actual_weight: formData.actual_weight,
      rate_per_mt: formData.rate_per_mt,
      bc: formData.bc,
      sgst: formData.sgst,
      cgst: formData.cgst,
      igst: formData.igst,
      gc: formData.gc,
      grand_total: formData.grand_total
    }

    axios.post(`http://localhost:8000/api/insert_lr`, data)
      .then(response => {
        setErrors({});
        alert('Data submitted successfully!');
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors); // Laravel validation errors
          setLoading(false);
        }
      });
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
            <img src="/src/Image/Dwarkadhish.png" alt="Logo" className="logo" /> 
          </Col>
        </Row>
        <Row>
          <Col>
            <p>GSTIN NO: 24ESZPD5938M1ZU &nbsp;&nbsp;&nbsp; PAN NO: ESZPD5938M</p>
          </Col>
        </Row>
      </div>
      <Card className="shadow-lg mb-4">
        <Card.Header className="bg-success text-white text-center">LR Generate</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="cnn_no">
                  <Form.Label>C.N. No.</Form.Label>
                  <Form.Control type="text" name="cnn_no" value={formData.cnn_no} disabled />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="delivery_at">
                  <Form.Label>Delivery At</Form.Label>
                  <Form.Control type="text" name="delivery_at" value={formData.delivery_at} onChange={handleChange} />
                  {errors.delivery_at && <p className="text-red-500">{errors.delivery_at[0]}</p>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Card className="p-3">
                  <Card.Title>Consignor</Card.Title>
                  <Form.Group controlId="consignor">
                    <Form.Label>Consignor</Form.Label>
                    <Form.Control as="textarea" rows={3} name="consignor" value={formData.consignor} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="consignor_gstin" className="mt-3">
                    <Form.Label>GSTIN No.</Form.Label>
                    <Form.Control type="text" name="consignor_gstin" value={formData.consignor_gstin} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="consignor_eway" className="mt-3">
                    <Form.Label>E-way Bill No.</Form.Label>
                    <Form.Control type="text" name="consignor_eway" value={formData.consignor_eway} onChange={handleChange} />
                  </Form.Group>
                </Card>
              </Col>
              <Col>
                <strong>AT OWNER'S RISK</strong><br /><strong>INSURANCE</strong>
                <p>The Customer has stated that, He has INSURED / NOT INSURED the Consignment</p>
                <Form.Group controlId="insurance_company">
                  <Form.Control type="text" name="insurance_company" placeholder="Company" value={formData.insurance_company} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="policy_no" className="mt-3">
                  <Form.Control type="text" name="policy_no" placeholder="Policy No." value={formData.policy_no} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="amount_rs" className="mt-3">
                  <Form.Control type="text" name="amount_rs" placeholder="Amount Rs." value={formData.amount_rs} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="risk_rs" className="mt-3">
                  <Form.Control type="text" name="risk_rs" placeholder="Risk Rs." value={formData.risk_rs} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Card className="p-3">
                  <Card.Title>Consignee</Card.Title>
                  <Form.Group controlId="consignee">
                    <Form.Label>Consignee</Form.Label>
                    <Form.Control as="textarea" rows={3} name="consignee" value={formData.consignee} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="consignee_gstin" className="mt-3">
                    <Form.Label>GSTIN No.</Form.Label>
                    <Form.Control type="text" name="consignee_gstin" value={formData.consignee_gstin} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="consignee_eway" className="mt-3">
                    <Form.Label>E-way Bill No.</Form.Label>
                    <Form.Control type="text" name="consignee_eway" value={formData.consignee_eway} onChange={handleChange} />
                  </Form.Group>
                </Card>
              </Col>
            </Row>
          
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="from">
                  <Form.Label>From</Form.Label>
                  <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="to">
                  <Form.Label>To</Form.Label>
                  <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col><Form.Label>Personal Liable For Paying GSTIN:</Form.Label></Col>
              <Col>
                <Form.Label>Consignor</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Option 1"
                  name="option1"
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Consignee</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Option 2"
                  name="option2"
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Goods Transport AG.</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Option 3"
                  name="option3"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            
            <Table bordered className="mt-4">
              <thead className="bg-light">
                <tr>
                  <th>Packages</th>
                  <th>Destination (Said to Contain)</th>
                  <th>Actual Wt. (Kg.)</th>
                  <th>Rate Per MT</th>
                  <th colSpan="2">PAID / TO PAY</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="7">
                    <Form.Control
                      type="text"
                      name="packages"
                      value={formData.packages}
                      onChange={handleChange}
                    />
                  </td>
                  <td rowSpan="6">
                    <Form.Control
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                    />
                  </td>
                  
                  <td rowSpan="2">
                    <Form.Control
                      type="text"
                      name="actual_weight"
                      value={formData.actual_weight}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="rate_per_mt"
                      value={formData.rate_per_mt}
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                  
                </tr>
                <tr>
                  <td>B.C.</td>
                  <td colSpan="2">
                    <Form.Control
                      type="text"
                      name="bc"
                      value={formData.bc}
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td rowSpan="2">Rate Per MT</td>
                  <td>SGST %</td>
                  <td colSpan="2">
                    <Form.Control
                      type="text"
                      name="sgst"
                      value={formData.sgst}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>CGST %</td>
                  <td colSpan="2">
                    <Form.Control
                      type="text"
                      name="cgst"
                      value={formData.cgst}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="2"></td>
                  <td>IGST %</td>
                  <td colSpan="2">
                    <Form.Control
                      type="text"
                      name="igst"
                      value={formData.igst}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>G.C.</td>
                  <td colSpan="2">
                    <Form.Control
                      type="text"
                      name="gc"
                      value={formData.gc}
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
                <tr>
                <td>Not Responsible for Breakage, Damage & Leakage.</td>
                  <td>O/R</td>
                  <td>
                    <strong>Grand Total</strong>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="grand_total"
                      value={formData.grand_total}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <ClipLoader size={24} color="#fff" /> : 'Generate LR'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LRGenerate;