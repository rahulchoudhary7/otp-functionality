import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function OtpPopup(props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    // move the focus to the previous input when the backspace key is pressed
    if (event.key === 'Backspace' && index > 0) {
        if (otp[index] !== '') {
          // delete the current value
          const newOtp = [...otp];
          newOtp[index] = '';
          setOtp(newOtp);
          return;
        }
        // move the focus to the previous input and delete its value
        inputRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
  
    // move the focus to the next input when the right arrow key is pressed
    if (event.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index+1].focus();
    }
  
    // move the focus to the previous input when the left arrow key is pressed
    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index-1].focus();
    }
  
    // paste the OTP from the clipboard
    if (event.key === 'v' && event.ctrlKey) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('Text');
  
      if (/^\d{6}$/.test(pastedData)) {
        setOtp(pastedData.split(''));
      }
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpString = otp.join('');

    if (!/^\d{6}$/.test(otpString)) {
      setError('Please enter a valid OTP.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('/verify-otp', { otp: otpString });

      if (response.data.success) {
        setSuccess('OTP verified successfully.');
        setError('');
        props.onVerified();
      } else {
        setError(response.data.message);
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred while verifying the OTP. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="otp-popup">
      <form onSubmit={handleSubmit}>
        <h2>Enter OTP</h2>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default OtpPopup;
