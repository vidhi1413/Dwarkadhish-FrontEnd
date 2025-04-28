import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [activeTab, setActiveTab] = useState('LRGenerate');

  return (
    <div className="d-flex">
      <Sidebar setActiveTab={setActiveTab} />
      <MainContent activeTab={activeTab} />
    </div>
  );
}

export default App;