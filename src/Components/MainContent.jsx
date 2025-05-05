import React from 'react';
import { Container } from 'react-bootstrap';
import LRGenerate from './LRGenerate';
import LRGenerateList from './LRGenerateList';
import Invoices from './Invoices';
import BankLedger from './BankLedger';

function MainContent({ activeTab }) {
  return (
    <Container className="mt-4">
      {activeTab === 'LRGenerate' && <LRGenerate />}
      {activeTab === 'LRGenerateList' && <LRGenerateList />}
      {activeTab === 'Invoices' && <Invoices />}
      {activeTab === 'BankLedger' && <BankLedger />}
    </Container>
  );
}

export default MainContent;