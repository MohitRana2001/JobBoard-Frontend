import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const Verification: React.FC = () => {
  const [emailOTP, setEmailOTP] = useState('');
  const [mobileOTP, setMobileOTP] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {toast} = useToast();
  const { companyEmail, phone } = location.state as { companyEmail: string; phone: string };

  const handleEmailVerify = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/verify-email', { companyEmail, otp: emailOTP });
      if (response.status === 200) {
        setEmailVerified(true);
        setError(null);
        toast({
            title: 'Email Verified',
            description: 'Email verification successful',
        })
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.msg || 'Email verification failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleMobileVerify = async () => {
    if (!mobileOTP) {
        alert('Please entry any number to continue [Twillio trial account doesnt support unverified numbers]')
        return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/auth/verify-mobile', { phone, otp: mobileOTP });
      if (response.status === 200) {
        setMobileVerified(true);
        setError(null);
        
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.msg || 'Mobile verification failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleComplete = () => {
    if (emailVerified && mobileVerified) {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
    </div>
  );
};

export default Verification;