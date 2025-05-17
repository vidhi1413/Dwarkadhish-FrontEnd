import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import './LRGenerate.css';  // Custom CSS for additional styling

function InvoicesList() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/invoices')
            .then(res => setInvoices(res.data))
            .catch(err => console.error(err));
    }, []);

    const downloadPDF = (invoice_no) => {
        window.open(`http://localhost:8000/api/invoices/pdf/${invoice_no}`, '_blank');
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
                        <img src="/src/Image/Dwarkadhish.png" alt="Logo" className="logo" /> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>GSTIN NO: 24ESZPD5938M1ZU &nbsp;&nbsp;&nbsp; PAN NO: ESZPD5938M</p>
                    </Col>
                </Row>
            </div>
            <Card style={{ marginLeft: '300px', marginRight: 'auto', width: '76vw' }}>
                <Card.Header className="custom-card-header">Invoices List</Card.Header>
            </Card>
            <Table bordered className="main-content w-70">
                <thead className="bg-light">
                    <tr>
                        <th>Invoice No</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(item => (
                        <tr key={item.id}>
                            <td>{item.invoice_no}</td>
                            <td>
                                <Button variant="success" onClick={() => downloadPDF(item.invoice_no)}>
                                    Download PDF
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default InvoicesList;