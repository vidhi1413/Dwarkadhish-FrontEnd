import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Container, Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import './LRGenerate.css';  // Custom CSS for additional styling
import { toast } from 'react-toastify';
import API_URL from '../../config';

function LRGenerate() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const initialFormState = {
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
    remarks: '',
    bc: '',
    sgst: '',
    cgst: '',
    igst: '',
    sgst_amount: '',
    cgst_amount: '',
    igst_amount: '',
    gc: '',
    grand_total: '',
    gst_payer_consignor: false,
    gst_payer_consignee: false,
    gst_payer_goods_transport: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch invoice_no and cnn_no on page load
  useEffect(() => {
    axios.get('http://localhost:8000/api/next-lr-numbers')
      .then(res => {
        setFormData(prev => ({
          ...prev,
          invoice_no: res.data.invoice_no,
          cnn_no: res.data.cnn_no
        }));
      })
      .catch(err => {
        console.error("Error fetching next LR numbers:", err);
      });
  }, []);

  // Auto-calculate BC
  useEffect(() => {
    const weight = parseFloat(formData.actual_weight) || 0;
    const rate = parseFloat(formData.rate_per_mt) || 0;
    const bc = weight * rate;
    setFormData(prev => ({
      ...prev,
      bc: bc ? bc.toFixed(2) : ''
    }));
  }, [formData.actual_weight, formData.rate_per_mt]);

  // Auto-calculate GST fields
  useEffect(() => {
    const bc = parseFloat(formData.bc) || 0;
    const sgst = parseFloat(formData.sgst) || 0;
    const cgst = parseFloat(formData.cgst) || 0;
    const igst = parseFloat(formData.igst) || 0;

    setFormData(prev => ({
      ...prev,
      sgst_amount: bc && sgst ? ((bc * sgst) / 100).toFixed(2) : '',
      cgst_amount: bc && cgst ? ((bc * cgst) / 100).toFixed(2) : '',
      igst_amount: bc && igst ? ((bc * igst) / 100).toFixed(2) : '',
    }));
  }, [formData.bc, formData.sgst, formData.cgst, formData.igst]);

  // Auto-calculate Grand Total (bc + all GST amounts)
  useEffect(() => {
    const bc = parseFloat(formData.bc) || 0;
    const sgst = parseFloat(formData.sgst_amount) || 0;
    const cgst = parseFloat(formData.cgst_amount) || 0;
    const igst = parseFloat(formData.igst_amount) || 0;
    const grandTotal = bc + sgst + cgst + igst;
    setFormData(prev => ({
      ...prev,
      grand_total: grandTotal ? grandTotal.toFixed(2) : ''
    }));
  }, [formData.bc, formData.sgst_amount, formData.cgst_amount, formData.igst_amount]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Combine selected options into a single string
    const selectedOptions = [
      formData.gst_payer_consignor ? 'consignor' : null,
      formData.gst_payer_consignee ? 'consignee' : null,
      formData.gst_payer_goods_transport ? 'goods_transport' : null,
    ].filter(Boolean).join(',');

    const data = {
      invoice_no: formData.invoice_no,
      value_rs: formData.value_rs,
      lorry_no: formData.lorry_no,
      cnn_no: formData.cnn_no,
      delivery_at: formData.delivery_at,
      date: formData.date,
      consignor: formData.consignor,
      consignor_gstin_no: formData.consignor_gstin,
      consignor_eway_bill_no: formData.consignor_eway,
      consignee: formData.consignee,
      consignee_gstin_no: formData.consignee_gstin,
      consignee_eway_bill_no: formData.consignee_eway,
      from: formData.from,
      to: formData.to,
      insurance_company_name: formData.insurance_company,
      policy_no: formData.policy_no,
      amount_rs: formData.amount_rs,
      risk_rs: formData.risk_rs,
      gst_payer: selectedOptions, // Combine selected options
      packages: formData.packages,
      destination: formData.destination,
      actual_weight: formData.actual_weight,
      rate_per_mt: formData.rate_per_mt,
      remarks: formData.remarks,
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
        toast.success("Data submitted successfully!");
        setLoading(false);
        resetFormAndFetchNextNumbers();
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors); // Laravel validation errors
          setLoading(false);
        }
      });
  };

  const resetFormAndFetchNextNumbers = () => {
    axios.get('http://localhost:8000/api/next-lr-numbers')
      .then(res => {
        setFormData({
          invoice_no: res.data.invoice_no,
          value_rs: '',
          lorry_no: '',
          cnn_no: res.data.cnn_no,
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
          gst_payer_consignor: false,
          gst_payer_consignee: false,
          gst_payer_goods_transport: false,
          packages: '',
          destination: '',
          actual_weight: '',
          rate_per_mt: '',
          remarks: '',
          bc: '',
          sgst: '',
          cgst: '',
          igst: '',
          gc: '',
          grand_total: '',
        });
      })
      .catch(err => {
        console.error("Error resetting numbers:", err);
      });
  };

  return (
    <Container fluid className="container">
      <div className="header-container main-content">
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
      <Card className='main-content'>
        <Card.Header className="custom-card-header">LR Generate</Card.Header>
        <Card.Body class="card-body">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Col>
                <Form.Group controlId="invoice_no">
                  <Form.Label>Invoice No.</Form.Label>
                  <Form.Control type="text" name="invoice_no" value={formData.invoice_no} onChange={handleChange} readOnly/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="value_rs">
                  <Form.Label>Value Rs</Form.Label>
                  <Form.Control type="text" name="value_rs" value={formData.value_rs} onChange={handleChange}/>
                  {/* {errors.value_rs && <p style={{ color: 'red', fontSize: '12px'}}>{errors.value_rs[0]}</p>} */}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lorry_no">
                  <Form.Label>Lorry No.</Form.Label>
                  <Form.Control type="text" name="lorry_no" value={formData.lorry_no} onChange={handleChange}/>
                  {/* {errors.lorry_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.lorry_no[0]}</p>} */}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="cnn_no">
                  <Form.Label>C.N. No.</Form.Label>
                  <Form.Control type="text" name="cnn_no" value={formData.cnn_no} onChange={handleChange} readOnly/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="delivery_at">
                  <Form.Label>Delivery At</Form.Label>
                  <Form.Control type="text" name="delivery_at" value={formData.delivery_at} onChange={handleChange} />
                  {/* {errors.delivery_at && <p style={{ color: 'red', fontSize: '12px'}}>{errors.delivery_at[0]}</p>} */}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
                  {/* {errors.date && <p style={{ color: 'red', fontSize: '12px'}}>{errors.date[0]}</p>} */}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Card className="bg-light p-3">
                  <Card.Title>Consignor</Card.Title>
                  <Form.Group controlId="consignor">
                    <Form.Label>Consignor</Form.Label>
                    <Form.Control as="textarea" rows={3} name="consignor" value={formData.consignor} onChange={handleChange} />
                    {/* {errors.consignor && <p style={{ color: 'red', fontSize: '12px'}}>{errors.consignor[0]}</p>} */}
                  </Form.Group>
                  <Form.Group controlId="consignor_gstin" className="mt-3">
                    <Form.Label>GSTIN No.</Form.Label>
                    <Form.Control type="text" name="consignor_gstin" value={formData.consignor_gstin} onChange={handleChange} />
                    {/* {errors.consignor_gstin_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.consignor_gstin_no[0]}</p>} */}
                  </Form.Group>
                  <Form.Group controlId="consignor_eway" className="mt-3">
                    <Form.Label>E-way Bill No.</Form.Label>
                    <Form.Control type="text" name="consignor_eway" value={formData.consignor_eway} onChange={handleChange} />
                    {/* {errors.consignor_eway_bill_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.consignor_eway_bill_no[0]}</p>} */}
                  </Form.Group>
                </Card>
              </Col>
              <Col>
                <strong>AT OWNER'S RISK</strong><br /><strong>INSURANCE</strong>
                <p>The Customer has stated that, He has INSURED / NOT INSURED the Consignment</p>
                <Form.Group controlId="insurance_company">
                  <Form.Control type="text" name="insurance_company" placeholder="Company" value={formData.insurance_company} onChange={handleChange} />
                  {/* {errors.insurance_company_name && <p style={{ color: 'red', fontSize: '12px'}}>{errors.insurance_company_name[0]}</p>} */}
                </Form.Group>
                <Form.Group controlId="policy_no" className="mt-3">
                  <Form.Control type="text" name="policy_no" placeholder="Policy No." value={formData.policy_no} onChange={handleChange} />
                  {/* {errors.policy_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.policy_no[0]}</p>} */}
                </Form.Group>
                <Form.Group controlId="amount_rs" className="mt-3">
                  <Form.Control type="text" name="amount_rs" placeholder="Amount Rs." value={formData.amount_rs} onChange={handleChange} />
                  {/* {errors.amount_rs && <p style={{ color: 'red', fontSize: '12px'}}>{errors.amount_rs[0]}</p>} */}
                </Form.Group>
                <Form.Group controlId="risk_rs" className="mt-3">
                  <Form.Control type="text" name="risk_rs" placeholder="Risk Rs." value={formData.risk_rs} onChange={handleChange} />
                  {/* {errors.risk_rs && <p style={{ color: 'red', fontSize: '12px'}}>{errors.risk_rs[0]}</p>} */}
                </Form.Group>
              </Col>
              <Col>
                <Card className="bg-light p-3">
                  <Card.Title>Consignee</Card.Title>
                  <Form.Group controlId="consignee">
                    <Form.Label>Consignee</Form.Label>
                    <Form.Control as="textarea" rows={3} name="consignee" value={formData.consignee} onChange={handleChange} />
                    {/* {errors.consignee && <p style={{ color: 'red', fontSize: '12px'}}>{errors.consignee[0]}</p>} */}
                  </Form.Group>
                  <Form.Group controlId="consignee_gstin" className="mt-3">
                    <Form.Label>GSTIN No.</Form.Label>
                    <Form.Control type="text" name="consignee_gstin" value={formData.consignee_gstin} onChange={handleChange} />
                    {/* {errors.consignee_gstin_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.consignee_gstin_no[0]}</p>} */}
                  </Form.Group>
                  <Form.Group controlId="consignee_eway" className="mt-3">
                    <Form.Label>E-way Bill No.</Form.Label>
                    <Form.Control type="text" name="consignee_eway" value={formData.consignee_eway} onChange={handleChange} />
                    {/* {errors.consignee_eway_bill_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.consignee_eway_bill_no[0]}</p>} */}
                  </Form.Group>
                </Card>
              </Col>
            </Row>
          
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="from">
                  <Form.Label>From</Form.Label>
                  <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} />
                  {/* {errors.from && <p style={{ color: 'red', fontSize: '12px'}}>{errors.from[0]}</p>} */}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="to">
                  <Form.Label>To</Form.Label>
                  <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} />
                  {/* {errors.to && <p style={{ color: 'red', fontSize: '12px'}}>{errors.to[0]}</p>} */}
                </Form.Group>
              </Col>
              <Col><Form.Label>Personal Liable For Paying GSTIN:</Form.Label></Col>
              <Col>
                <Form.Label>Option 1</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Consignor"
                  name="gst_payer_consignor"
                  checked={formData.gst_payer_consignor}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Option 2</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Consignee"
                  name="gst_payer_consignee"
                  checked={formData.gst_payer_consignee}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Option 3</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Goods Transport AG."
                  name="gst_payer_goods_transport"
                  checked={formData.gst_payer_goods_transport}
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
                    {/* {errors.packages && <p style={{ color: 'red', fontSize: '12px'}}>{errors.packages[0]}</p>} */}
                  </td>
                  <td rowSpan="6">
                    <Form.Control
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                    />
                    {/* {errors.destination && <p style={{ color: 'red', fontSize: '12px'}}>{errors.destination[0]}</p>} */}
                  </td>
                  
                  <td rowSpan="2">
                    <Form.Control
                      type="text"
                      name="actual_weight"
                      value={formData.actual_weight}
                      onChange={handleChange}
                    />
                    {/* {errors.actual_weight && <p style={{ color: 'red', fontSize: '12px'}}>{errors.actual_weight[0]}</p>} */}
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="rate_per_mt"
                      value={formData.rate_per_mt}
                      onChange={handleChange}
                    />
                    {/* {errors.rate_per_mt && <p style={{ color: 'red', fontSize: '12px'}}>{errors.rate_per_mt[0]}</p>} */}
                  </td>
                  <td colSpan="2"></td>
                  <td>
                  <Form.Control
                    as="textarea"
                    style={{ resize: 'none' }}
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                  />
                    {/* {errors.remarks && <p style={{ color: 'red', fontSize: '12px'}}>{errors.remarks[0]}</p>} */}
                  </td>
                </tr>
                <tr>
                  <td>B.C.</td>
                  <td colSpan="2">
                    <Form.Control
                      type="text"
                      name="bc"
                      value={formData.bc}
                      onChange={handleChange}
                      readOnly
                    />
                  </td>
                  
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
                    <Form.Text>SGST Amount: {formData.sgst_amount}</Form.Text>
                    {/* {errors.sgst && <p style={{ color: 'red', fontSize: '12px'}}>{errors.sgst[0]}</p>} */}
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
                    <Form.Text>CGST Amount: {formData.cgst_amount}</Form.Text>
                    {/* {errors.cgst && <p style={{ color: 'red', fontSize: '12px'}}>{errors.cgst[0]}</p>} */}
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
                    <Form.Text>IGST Amount: {formData.igst_amount}</Form.Text>
                    {/* {errors.igst && <p style={{ color: 'red', fontSize: '12px'}}>{errors.igst[0]}</p>} */}
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
                    {/* {errors.gc && <p style={{ color: 'red', fontSize: '12px'}}>{errors.gc[0]}</p>} */}
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
                      readOnly
                    />
                    {/* {errors.grand_total && <p style={{ color: 'red', fontSize: '12px'}}>{errors.grand_total[0]}</p>} */}
                  </td>
                </tr>
              </tbody>
            </Table>
            {loading ? (
              <div className="text-center mt-4">
                <ClipLoader size={35} color="#007bff" />
              </div>
            ) : (
              <Button className="btn my-custom-button" type="submit" variant="primary" style={{ display: 'block', margin: '20px auto' }}>Generate LR</Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LRGenerate;