import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import '../styles/add.css';
function AddStore() {
  const [formData, setFormData] = useState({
    storeName: '',
    number: '',
    openStatus: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'openStatus' ? e.target.checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.storeName.length < 3) {
      newErrors.storeName = 'Name must be at least 3 characters';
    }
    if (isNaN(formData.number) || parseInt(formData.number) <= 0) {
      newErrors.number = 'Number must be a number greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:8000/stores/add', formData);
      navigate(`/`);
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  return (
    <div>
      <a href="/">Back to home</a> 
      <h2>Add New Store</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Store Name:</label>
          <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} />
          {errors.storeName && <p className="error">{errors.storeName}</p>}
        </div>
        <div>
          <label>Store Number:</label>
          <input type="number" name="number" value={formData.number} onChange={handleChange} />
          {errors.number && <p className="error">{errors.number}</p>}
        </div>
        <div>
          <label>Open Status:</label>
          <input type="checkbox" name="openStatus" checked={formData.openStatus} onChange={handleChange} />
        </div>
        <br></br>
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
}

export default AddStore;