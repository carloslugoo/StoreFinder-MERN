import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../styles/main.css';

function App() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch stores from the server
    axios.get('http://localhost:8000/stores')
      .then(response => setStores(response.data))
      .catch(error => console.error('Error fetching stores:', error));
  }, []);

  const handleDelete = async (storeId) => {
    try {
      await axios.delete(`http://localhost:8000/stores/delete/${storeId}`);
      setStores(prevStores => prevStores.filter(store => store._id !== storeId));
    } catch (error) {
      alert('Error deleting store. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <h1>Store Finder</h1>
      <p>Find stores in your area!</p>
      <table className="table-container">
        <thead>
          <tr>
            <th>Store</th>
            <th>Store Number</th>
            <th>Open</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store._id}>
              <td><a href={`/store/${store._id}`}>{store.storeName}</a></td>
              <td>{store.number}</td>
              <td>{store.openStatus ? 'Open' : 'Closed'}</td>
              <td>
                {store.openStatus && (
                  <button onClick={() => handleDelete(store._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <Link to={`/stores/add`} className="edit-store-link">
        <button>Can't find your store?</button>
      </Link>
    </div>
  );
}

export default App;