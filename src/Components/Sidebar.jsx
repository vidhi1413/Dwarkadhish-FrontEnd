import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Sidebar({ setActiveTab }) {
  return (
    <div className="bg-dark text-white vh-auto d-flex flex-column" style={{ width: '350px', }} >
      <div className="sidebar-heading p-3 text-center">Dwarkadhish Dashboard</div>
      <ListGroup variant="flush" className="flex-grow-1">
        <ListGroup.Item action onClick={() => setActiveTab('LRGenerate')} className="bg-dark text-white">
          LR Generate
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => setActiveTab('Invoices')} className="bg-dark text-white">
          Invoices
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => setActiveTab('BankLedger')} className="bg-dark text-white">
          Bank Ledger
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;