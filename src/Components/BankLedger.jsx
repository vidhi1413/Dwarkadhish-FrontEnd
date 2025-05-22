import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col, Table } from 'react-bootstrap';

function BankLedger() {
  const [formData, setFormData] = useState({});
  const [billToList, setBillToList] = useState([]);
  const [selectedBillTo, setSelectedBillTo] = useState('');
  const [invoices, setInvoices] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

   useEffect(() => {
    axios.get('http://localhost:8000/api/invoices')
      .then(res => {
        setInvoices(res.data);
        const uniqueBillTo = [...new Set(res.data.map(inv => inv.bill_to))];
        setBillToList(uniqueBillTo);
      })
      .catch(err => {
        console.error('Error fetching invoices:', err);
      });
  }, []);

  // Filter invoices for selected bill_to
  const filteredInvoices = invoices.filter(inv => inv.bill_to === selectedBillTo);


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
        <Card.Header className="custom-card-header">Bank Ledger</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="billToDropdown">
              <Form.Label>Bill To</Form.Label>
              <Form.Select
                name="bill_to"
                value={selectedBillTo}
                onChange={e => setSelectedBillTo(e.target.value)}
              >
                <option value="">Select Bill To</option>
                {billToList.map((billTo, idx) => (
                  <option key={idx} value={billTo}>{billTo}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>

          {selectedBillTo && filteredInvoices.length > 0 && (
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Invoice Value</th>
                  <th>Advance Received</th>
                  <th>Net Payable</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv, idx) => (
                  <tr key={idx}>
                    <td>{inv.invoice_no}</td>
                    <td>{inv.invoice_value}</td>
                    <td>{inv.advance_received}</td>
                    <td>{inv.net_payable}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BankLedger;