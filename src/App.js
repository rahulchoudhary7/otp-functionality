import React, { useState } from 'react';
import OtpPopup from './OtpPopup';
import './App.css'

function App() {
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const handleClick = () => {
    setShowOtpPopup(true)
  }
  return (
    <div className="App">
      {!showOtpPopup ? <button id = 'btn' onClick = {handleClick}>Verify Phone</button> : <OtpPopup setState ={setShowOtpPopup}/>}
    </div>
  );
}

export default App;

