import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
function StoreDetail() {
const [store, setStore] = useState(null);
const { id } = useParams();

useEffect(() => {
    axios.get(`http://localhost:8000/stores/${id}`)
    .then(response => setStore(response.data))
    .catch(error => console.error('Error fetching store details:', error));
}, [id]);

if (!store) {
    return <div>Loading...</div>;
}

    return (
    <div>
        <a href="/">Back to home</a> 
        <h1>Store Finder</h1>
        <p>Store Name: {store.storeName}</p>
        <p>Store Number: {store.number}</p>
        <p>Open Status: {store.openStatus ? 'Open' : 'Closed'}</p>
        <Link to={`/stores/edit/${store._id}`} className="edit-store-link">
        <button>Edit Store Details</button>
        </Link>
    </div>
    );
}

export default StoreDetail;