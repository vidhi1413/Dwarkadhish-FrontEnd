import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Dashboard.css'; // Ensure you style the sidebar and layout

function Dashboard() {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3} className="sidebar bg-dark text-white p-4">
          <h3 className="mb-4">Dwarkadhish Dashboard</h3>
          <nav>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/lr-generate">LR Generate</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/invoices">Invoices</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/bank-ledger">Bank Ledger</Link>
              </li>
            </ul>
          </nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <Outlet /> {/* This renders the selected page (LR Generate, Invoice, etc.) */}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;