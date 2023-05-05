import React, { useState, useEffect, useRef } from 'react';
import './OtpPopup.css'

function OtpPopup({setState}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [otpFilled, setOtpFilled] = useState(false)

  console.log(otp)

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    setOtpFilled(otp.every(otp => otp !== ''))
  },[otp])

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
  

  
  return (
    <div className="otp-popup">
      <form>
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
        <button type="submit" onClick = {
          ()=> {
            if(otpFilled) {
              setState(false)
            } else {
              setState(true)
            }
          }} disabled ={!otpFilled}>Verify OTP</button>
      </form>
    </div>
  );
}

export default OtpPopup;
