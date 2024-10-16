import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Verification: React.FC = () => {
  const { companyDetails, setIsAuthenticated } = useAuth();
  const [emailOTP, setEmailOTP] = useState('');
  const [mobileOTP, setMobileOTP] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Company details in Verification:', companyDetails.companyEmail);
  }, [companyDetails]);

  const handleEmailVerify = () => {
    axios.post('http://localhost:4000/api/auth/verify-email', { 
      companyEmail: companyDetails.companyEmail, 
      otp: emailOTP 
    })
      .then(response => {
        console.log('Email OTP verified successfully:', response.data);
        setEmailVerified(true);
        setError('');
        if (emailVerified) {
          setIsAuthenticated(true);
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error(`Error verifying email OTP: ${companyDetails} ${emailOTP}`, error );
        setError('Error verifying email OTP. Please try again.');
      });
  };

  const handleMobileVerify = () => {
    axios.post('http://localhost:4000/api/auth/verify-mobile', { phone: companyDetails.phone, otp: mobileOTP })
      .then(response => {
        console.log('Mobile OTP verified successfully:', response.data);
        setMobileVerified(true);
        setError(''); // Clear any previous error
      })
      .catch(error => {
        console.error('Error verifying mobile OTP:', error);
        setError(`Error verifying mobile OTP. Please try again. ${companyDetails.phone}`);
      });
  };

  const handleComplete = () => {
    if (emailVerified && mobileVerified) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Email OTP</label>
        <div className="flex">
          <input
            type="text"
            value={emailOTP}
            onChange={(e) => setEmailOTP(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-l-md"
            placeholder="Enter Email OTP"
          />
          <button
            onClick={handleEmailVerify}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300"
            disabled={emailVerified}
          >
            {emailVerified ? 'Verified' : 'Verify'}
          </button>
          
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Mobile OTP</label>
        <div className="flex">
          <input
            type="text"
            value={mobileOTP}
            onChange={(e) => setMobileOTP(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-l-md"
            placeholder="Enter Mobile OTP"
          />
          <button
            onClick={handleMobileVerify}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300"
            disabled={mobileVerified}
          >
            {mobileVerified ? 'Verified' : 'Verify'}
          </button>
        </div>
      </div>
      <button
        onClick={handleComplete}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
        disabled={!emailVerified || !mobileVerified}
      >
        Complete Verification
      </button>
      <p>{companyDetails.companyEmail} {emailOTP}</p>
    </div>
  );
};

export default Verification;
