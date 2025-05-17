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
    items: [
      {
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
      }
    ],
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
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
  
    // Convert to float safely
    const freight = parseFloat(updatedItems[index].freight_amount) || 0;
    const halting = parseFloat(updatedItems[index].halting_charge) || 0;
    const extra = parseFloat(updatedItems[index].extra_charge) || 0;
    const advance = parseFloat(updatedItems[index].advance) || 0;
  
    updatedItems[index].trip_amount = freight + halting + extra;
  
    // Recalculate subtotal
    const updatedSubTotal = updatedItems.reduce(
      (acc, item) => acc + (parseFloat(item.trip_amount) || 0),
      0
    );
  
    const advanceReceived = updatedItems.reduce(
      (acc, item) => acc + (parseFloat(item.advance) || 0),
      0
    );
  
    const discount = parseFloat(formData.discount) || 0;
    const invoiceValue = updatedSubTotal - discount;
    const netPayable = invoiceValue - advanceReceived;
  
    setFormData({
      ...formData,
      items: updatedItems,
      sub_total: updatedSubTotal,
      total_trip_amount: updatedSubTotal - discount,
      invoice_value: invoiceValue,
      advance_received: advanceReceived,
      net_payable: netPayable
    });
  };  
  
  const handleAdvanceChange = (e) => {
    const advanceReceived = parseFloat(e.target.value || 0);
    const subTotal = parseFloat(formData.sub_total || 0);
    const discount = parseFloat(formData.discount || 0);
  
    const invoiceValue = subTotal - discount;
    const netPayable = invoiceValue - advanceReceived;
  
    setFormData({
      ...formData,
      advance_received: advanceReceived,
      invoice_value: invoiceValue,
      net_payable: netPayable,
    });
  };  
  
  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value || 0);
    const subTotal = parseFloat(formData.sub_total || 0);
    const advanceReceived = parseFloat(formData.advance_received || 0);
  
    const invoiceValue = subTotal - discount;
    const netPayable = invoiceValue - advanceReceived;
  
    setFormData({
      ...formData,
      discount: discount,
      invoice_value: invoiceValue,
      total_trip_amount: invoiceValue,
      net_payable: netPayable,
    });
  };  

  const removeItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1); // Removes the item at the given index
    setFormData({ ...formData, items: updatedItems });
  };
  

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
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
        }
      ]
    });
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
      items: formData.items,
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

  return (
    <Container fluid className="container">
      <div className="header-container mb-2 p-3 main-content">
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
    <Card className='main-content'>
      <Card.Header className="custom-card-header">Invoice Generate</Card.Header>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {formData.items.map((item, index) => (
            <tr key={index}>
              <td><Form.Control value={item.lr_no} onChange={(e) => handleItemChange(index, 'lr_no', e.target.value)} /></td>
              <td><Form.Control value={item.truck_no} onChange={(e) => handleItemChange(index, 'truck_no', e.target.value)} /></td>
              <td><Form.Control value={item.from_to} onChange={(e) => handleItemChange(index, 'from_to', e.target.value)} /></td>
              <td><Form.Control value={item.material_parcel} onChange={(e) => handleItemChange(index, 'material_parcel', e.target.value)} /></td>
              <td><Form.Control value={item.total_weight} onChange={(e) => handleItemChange(index, 'total_weight', e.target.value)} /></td>
              <td><Form.Control value={item.freight_amount} onChange={(e) => handleItemChange(index, 'freight_amount', e.target.value)} /></td>
              <td><Form.Control value={item.halting_charge} onChange={(e) => handleItemChange(index, 'halting_charge', e.target.value)} /></td>
              <td><Form.Control value={item.extra_charge} onChange={(e) => handleItemChange(index, 'extra_charge', e.target.value)} /></td>
              <td><Form.Control value={item.advance} onChange={(e) => handleItemChange(index, 'advance', e.target.value)} /></td>
              <td><Form.Control value={item.trip_amount} readOnly/></td>
              <td>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="primary" style={{ width: '50px', height: '40px' }} onClick={addItem}>+</Button>
                  <Button variant="danger" style={{ width: '50px', height: '40px' }} onClick={() => removeItem(index)}>-</Button>
                </div>
              </td>
            </tr>
            ))}
              <tr>
                <td colSpan="5">HSN	/	SAC	:
                  <Form.Group controlId="hsn_sac">
                    <Form.Control type="text" name="hsn_sac" value={formData.hsn_sac} onChange={handleChange}/>
                    {errors.hsn_sac && <p style={{ color: 'red', fontSize: '12px'}}>{errors.hsn_sac[0]}</p>}
                  </Form.Group>
                </td>
                <td colSpan="3">SUB TOTAL</td>
                <td colSpan="2"><Form.Group controlId="sub_total">
                    <Form.Control type="text" name="sub_total" value={formData.sub_total} readOnly/>
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
                    <Form.Control type="text" name="discount" value={formData.discount} onChange={handleDiscountChange}/>
                    {errors.discount && <p style={{ color: 'red', fontSize: '12px'}}>{errors.discount[0]}</p>}
                  </Form.Group></td>
              </tr>
              <tr>
                <td colSpan="3"><b>TOTAL	TRIP	AMOUNT</b></td>
                <td colSpan="2">
                  <Form.Group controlId="total_trip_amount">
                    <Form.Control type="text" name="total_trip_amount" value={formData.total_trip_amount} readOnly/>
                    {errors.total_trip_amount && <p style={{ color: 'red', fontSize: '12px'}}>{errors.total_trip_amount[0]}</p>}
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="3"></td>
                <td colSpan="3"><h5>INVOICE	VALUE</h5></td>
                <td colSpan="2">
                  <Form.Group controlId="invoice_value">
                    <Form.Control type="text" name="invoice_value" value={formData.invoice_value} readOnly/>
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="3"><b>ADVANCE	RECEIVED</b></td>
                <td colSpan="2">
                  <Form.Group controlId="advance_received">
                      <Form.Control type="text" name="advance_received" value={formData.advance_received} onChange={handleAdvanceChange} readOnly/>
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="3"><b>NET	PAYABLE</b></td>
                <td colSpan="2">
                  <Form.Group controlId="net_payable">
                      <Form.Control type="text" name="net_payable" value={formData.net_payable} readOnly/>
                  </Form.Group>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="text-center mt-3">
            <Button className="btn my-custom-button" variant="primary" type="submit">
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