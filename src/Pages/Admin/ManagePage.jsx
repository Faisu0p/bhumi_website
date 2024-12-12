import React, { useState, useEffect } from 'react';
import './ManagePage.css';

const ManagePage = () => {
  const [selectedBuilder, setSelectedBuilder] = useState('');
  const [builders, setBuilders] = useState([]);
  const [verificationMessage, setVerificationMessage] = useState('');

  // Fetch builders from backend on component mount
  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/builders');
        const data = await response.json();
        if (data && data.data) {
          setBuilders(data.data);
        }
      } catch (error) {
        console.error('Error fetching builders:', error);
      }
    };

    fetchBuilders();
  }, []);

  const handleBuilderChange = (e) => {
    setSelectedBuilder(e.target.value);
    setVerificationMessage('');
  };

  const handleVerify = async () => {
    if (!selectedBuilder) {
      setVerificationMessage('Please select a builder');
      return;
    }

    try {
      const selectedBuilderObj = builders.find(builder => builder.builder_id === parseInt(selectedBuilder));

      if (selectedBuilderObj) {
        const response = await fetch('http://localhost:5000/api/builders/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: selectedBuilderObj.fullName,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setVerificationMessage(data.message); 
        } else {
          setVerificationMessage(data.message);  
        }
      }
    } catch (error) {
      setVerificationMessage('An error occurred while verifying the builder');
      console.error('Error verifying builder:', error);
    }
  };

  return (
    <div className="manage-page">
      <h1>Manage Builders</h1>
      <div className="builder-selection">
        <select
          value={selectedBuilder}
          onChange={handleBuilderChange}
          className="builder-dropdown"
        >
          <option value="">Select a builder</option>
          {builders.map((builder) => (
            <option key={builder.builder_id} value={builder.builder_id}>
              {builder.fullName} (ID: {builder.builder_id})
            </option>
          ))}
        </select>
        <button onClick={handleVerify} className="verify-button">
          Verify
        </button>
      </div>
      {verificationMessage && (
        <div className="verification-message">{verificationMessage}</div>
      )}
    </div>
  );
};

export default ManagePage;
