import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './LRGenerate.css';  // Custom CSS for additional styling

function LRGenerateList() {

    const [lrList, setLRList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/lr-generate')
            .then(res => setLRList(res.data))
            .catch(err => console.error(err));
    }, []);

    const downloadPDF = (invoice_no) => {
        window.open(`http://localhost:8000/api/lr-generate/pdf/${invoice_no}`, '_blank');
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
                <Card.Header className="bg-success text-white text-center">LR Generate List</Card.Header>
            </Card>
            <Table bordered className="mt-4">
            <thead className="bg-light">
                <tr>
                    <th>Invoice No</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {lrList.map(item => (
                    <tr key={item.lr_generate_no}>
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

export default LRGenerateList;