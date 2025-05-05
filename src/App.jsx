import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [activeTab, setActiveTab] = useState('LRGenerate');

  return (
    <div className="d-flex">
      <Sidebar setActiveTab={setActiveTab} />
      <MainContent activeTab={activeTab} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  );
}

export default App;