import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/edit.css';

function EditStore() {
  const [store, setStore] = useState(null);
  const [formData, setFormData] = useState({
    storeName: '',
    number: '',
    openStatus: false
  });
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`http://localhost:8000/stores/${id}`)
      .then(response => {
        setStore(response.data);
        setFormData({
          storeName: response.data.storeName,
          number: response.data.number,
          openStatus: response.data.openStatus
        });
      })
      .catch(error => console.error('Error fetching store details:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'openStatus' ? e.target.checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/stores/edit/${id}`, formData);
      navigate(`/store/${id}`);
    } catch (error) {
      console.error('Error updating store details:', error);
      alert('Error updating store details. Please try again.');
    }
  };

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <a href="/">Back to home</a>
      <h1>Store Finder</h1>
      <p>Edit this store!</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="storeName">Store Name:</label>
          <input type="text" id="storeName" name="storeName" value={formData.storeName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="number">Store Number:</label>
          <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="openStatus">Open Status:</label>
          <input type="checkbox" id="openStatus" name="openStatus" checked={formData.openStatus} onChange={handleChange} />
        </div>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditStore;
