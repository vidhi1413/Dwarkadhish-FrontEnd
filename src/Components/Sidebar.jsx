import React from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';

function Sidebar({ setActiveTab }) {
  return (
    <div className="sidebar sidebar-style" style={{ width: '300px' }}>
      <div className="sidebar p-3 text-center">Dwarkadhish Dashboard</div>

      <Accordion flush>
        {/* LR Generate Section */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>LR Generate</Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush">
              <ListGroup.Item action onClick={() => setActiveTab('LRGenerate')}>
                LR Generate
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => setActiveTab('LRGenerateList')}>
                LR Generate List
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        {/* Invoices Section */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Invoices</Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush">
              <ListGroup.Item action onClick={() => setActiveTab('Invoices')}>
                Invoices
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => setActiveTab('InvoicesList')}>
                Invoices List
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Bank Ledger as separate item */}
      <ListGroup variant="flush">
        <ListGroup.Item action onClick={() => setActiveTab('BankLedger')}>
          Bank Ledger
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;