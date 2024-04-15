
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import App from './components/Main';
import StoreDetail from './components/StoreDetail';
import EditStore from './components/EditStore';
import AddStore from './components/AddStore';
function Main() {
return (
    <Router>
    <div className="app-container">
        <Routes>
            <Route path="/" exact element={<App />} />
            <Route path="/store/:id" element={<StoreDetail />} />
            <Route path="/stores/edit/:id" element={<EditStore />}/>
            <Route path="/stores/add" element={<AddStore />}/>
        </Routes>
        </div>
    </Router>
);
}

export default Main;