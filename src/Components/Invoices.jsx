import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import './LRGenerate.css';  // Custom CSS for additional styling
import { toast } from 'react-toastify';

function Invoices() {
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const initialFormState = {
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
    freight_amount:'',
    halting_charge:'',
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
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = async (e) => {
    const { name, value } = e.target;
  
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
  
    setFormData(updatedFormData);
  
    // Trigger calculation if relevant field changed
    if (['trip_amount', 'discount', 'advance_received'].includes(name)) {
      try {
        const response = await axios.post('http://localhost:8000/api/calculate-net-payable', {
          trip_amount: parseFloat(updatedFormData.trip_amount) || 0,
          discount: parseFloat(updatedFormData.discount) || 0,
          advance_received: parseFloat(updatedFormData.advance_received) || 0,
        });
  
        setFormData((prevData) => ({
          ...prevData,
          invoice_value: response.data.invoice_value,
          net_payable: response.data.net_payable,
        }));
      } catch (error) {
        console.error('Calculation error:', error.response?.data || error.message);
      }
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      bill_to: formData.bill_to,
      address: formData.address,
      gst_no: formData.gst_no,
      branch: formData.branch,
      invoice_no: formData.invoice_no,
      date: formData.date,
      lr_no: formData.lr_no,
      truck_no: formData.truck_no,
      from_to: formData.from_to,
      material_parcel: formData.material_parcel,
      total_weight: formData.total_weight,
      freight_amount: formData.freight_amount,
      halting_charge: formData.halting_charge,
      extra_charge: formData.extra_charge,
      advance: formData.advance,
      trip_amount: formData.trip_amount,
      hsn_sac: formData.hsn_sac,
      remarks: formData.remarks,
      sub_total: formData.sub_total,
      discount: formData.discount,
      total_trip_amount: formData.total_trip_amount,
      invoice_value: formData.invoice_value,
      advance_received: formData.advance_received,
      net_payable: formData.net_payable
    }
    axios.post(`http://localhost:8000/api/insert_invoice`, data)
      .then(response => {
        setErrors({});
        toast.success("Data submitted successfully!");
        setLoading(false);
        setFormData(initialFormState);
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors); // Laravel validation errors
          setLoading(false);
        }
      });
  };

  const fetchLRDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/lr-details/${formData.invoice_no}`);
      const { lr_no, sub_total } = response.data;

      setFormData((prev) => ({
        ...prev,
        lr_no,
        sub_total
      }));
      setError('');
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        lr_no: '',
        sub_total: ''
      }));
      setError('LR details not found for this Invoice No.');
    }
  };

  useEffect(() => {
    if (formData.invoice_no.trim() !== '') {
      fetchLRDetails();
    }
  }, [formData.invoice_no]);

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
                {errors.bill_to && <p style={{ color: 'red', fontSize: '12px'}}>{errors.bill_to[0]}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange}/>
                {errors.address && <p style={{ color: 'red', fontSize: '12px'}}>{errors.address[0]}</p>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="gst_no">
                <Form.Label>GST No.</Form.Label>
                <Form.Control type="text" name="gst_no" value={formData.gst_no} onChange={handleChange}/>
                {errors.gst_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.gst_no[0]}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="branch">
                <Form.Label>Branch</Form.Label>
                <Form.Control type="text" name="branch" value={formData.branch} onChange={handleChange}/>
                {errors.branch && <p style={{ color: 'red', fontSize: '12px'}}>{errors.branch[0]}</p>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="invoice_no">
                <Form.Label>Invoice No.</Form.Label>
                <Form.Control type="text" name="invoice_no" value={formData.invoice_no} onChange={handleChange}/>
                {errors.invoice_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.invoice_no[0]}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange}/>
                {errors.date && <p style={{ color: 'red', fontSize: '12px'}}>{errors.date[0]}</p>}
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
                    value={formData.lr_no}
                    onChange={handleChange} readOnly
                  />
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="truck_no"
                    value={formData.truck_no}
                    onChange={handleChange}
                  />
                  {errors.truck_no && <p style={{ color: 'red', fontSize: '12px'}}>{errors.truck_no[0]}</p>}
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="from_to"
                    value={formData.from_to}
                    onChange={handleChange}
                  />
                  {errors.from_to && <p style={{ color: 'red', fontSize: '12px'}}>{errors.from_to[0]}</p>}
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="material_parcel"
                    value={formData.material_parcel}
                    onChange={handleChange}
                  />
                  {errors.material_parcel && <p style={{ color: 'red', fontSize: '12px'}}>{errors.material_parcel[0]}</p>}
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="total_weight"
                    value={formData.total_weight}
                    onChange={handleChange}
                  />
                  {errors.total_weight && <p style={{ color: 'red', fontSize: '12px'}}>{errors.total_weight[0]}</p>}
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="freight_amount"
                    value={formData.freight_amount}
                    onChange={handleChange}
                  />
                  {errors.freight_amount && <p style={{ color: 'red', fontSize: '12px'}}>{errors.freight_amount[0]}</p>}
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="halting_charge"
                    value={formData.halting_charge}
                    onChange={handleChange}
                  />
                  {errors.halting_charge && <p style={{ color: 'red', fontSize: '12px'}}>{errors.halting_charge[0]}</p>}
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="extra_charge"
                    value={formData.extra_charge}
                    onChange={handleChange}
                  />
                  {errors.extra_charge && <p style={{ color: 'red', fontSize: '12px'}}>{errors.extra_charge[0]}</p>}
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="advance"
                    value={formData.advance}
                    onChange={handleChange}
                  />
                  {errors.advance && <p style={{ color: 'red', fontSize: '12px'}}>{errors.advance[0]}</p>}
                  </td>
                  <td>
                  <Form.Control
                    type="text"
                    name="trip_amount"
                    value={formData.trip_amount}
                    onChange={handleChange}
                  />
                  {errors.trip_amount && <p style={{ color: 'red', fontSize: '12px'}}>{errors.trip_amount[0]}</p>}
                  </td>
              </tr>
              <tr>
                <td colSpan="5">HSN	/	SAC	:
                  <Form.Group controlId="hsn_sac">
                    <Form.Control type="text" name="hsn_sac" value={formData.hsn_sac} onChange={handleChange}/>
                    {errors.hsn_sac && <p style={{ color: 'red', fontSize: '12px'}}>{errors.hsn_sac[0]}</p>}
                  </Form.Group>
                </td>
                <td colSpan="3">SUB TOTAL</td>
                <td colSpan="2"><Form.Group controlId="sub_total">
                    <Form.Control type="text" name="sub_total" value={formData.sub_total} onChange={handleChange} readOnly/>
                  </Form.Group></td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="2">remarks
                  <Form.Group controlId="remarks">
                    <Form.Control type="text" name="remarks" value={formData.remarks} onChange={handleChange}/>
                    {errors.remarks && <p style={{ color: 'red', fontSize: '12px'}}>{errors.remarks[0]}</p>}
                  </Form.Group></td>
                <td colSpan="3">DISCOUNT</td>
                <td colSpan="2">
                  <Form.Group controlId="discount">
                    <Form.Control type="text" name="discount" value={formData.discount} onChange={handleChange}/>
                    {errors.discount && <p style={{ color: 'red', fontSize: '12px'}}>{errors.discount[0]}</p>}
                  </Form.Group></td>
              </tr>
              <tr>
                <td colSpan="3"><b>TOTAL	TRIP	AMOUNT</b></td>
                <td colSpan="2">
                  <Form.Group controlId="total_trip_amount">
                    <Form.Control type="text" name="total_trip_amount" value={formData.total_trip_amount} onChange={handleChange}/>
                    {errors.total_trip_amount && <p style={{ color: 'red', fontSize: '12px'}}>{errors.total_trip_amount[0]}</p>}
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="3">TWENTY-EIGHT	THOUSAND,	EIGHT	HUNDRED</td>
                <td colSpan="3"><h5>INVOICE	VALUE</h5></td>
                <td colSpan="2">
                  <Form.Group controlId="invoice_value">
                    <Form.Control type="text" name="invoice_value" value={formData.invoice_value} onChange={handleChange} readOnly/>
                  </Form.Group>
                </td>
              </tr>
              <tr>
              <td colSpan="3"><b>ADVANCE	RECEIVED</b></td>
              <td colSpan="2">
                <Form.Group controlId="advance_received">
                    <Form.Control type="text" name="advance_received" value={formData.advance_received} onChange={handleChange}/>
                    {errors.advance_received && <p style={{ color: 'red', fontSize: '12px'}}>{errors.advance_received[0]}</p>}
                </Form.Group>
              </td>
              </tr>
              <tr>
              <td colSpan="3"><b>NET	PAYABLE</b></td>
              <td colSpan="2">
                <Form.Group controlId="net_payable">
                    <Form.Control type="text" name="net_payable" value={formData.net_payable} onChange={handleChange} readOnly/>
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