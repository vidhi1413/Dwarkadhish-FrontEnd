import React from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';

function Sidebar({ setActiveTab }) {
  return (
    <div className="vh-auto d-flex flex-column" style={{ width: '350px' }}>
      <div className="sidebar-heading p-3 text-center">Dwarkadhish Dashboard</div>

      <Accordion flush>
        {/* LR Generate Section */}
        <Accordion.Item eventKey="0">
          <Accordion.Header className="bg-dark text-white">LR Generate</Accordion.Header>
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
          <Accordion.Header className="bg-dark text-white">Invoices</Accordion.Header>
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