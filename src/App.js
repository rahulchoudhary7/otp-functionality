import React, { useState } from 'react';
import OtpPopup from './OtpPopup';

function App() {
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const handleShowOtpPopup = () => {
    setShowOtpPopup(true);
  };

  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false);
  };

  return (
    <div className="App">
      <button onClick={handleShowOtpPopup}>Verify Phone</button>
      {showOtpPopup && <OtpPopup onClose={handleCloseOtpPopup} />}
    </div>
  );
}

export default App;

