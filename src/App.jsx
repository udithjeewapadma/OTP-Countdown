import React, {useEffect, useState} from 'react';
import "./App.css";

const App = () => {

  //state variables to manage otp input, minutes and seconds
  const [otp, setOtp ] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  //function to resend otp
  const resendOTP = () => {
      setMinutes(0);
      setSeconds(10);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      //decrease seconds if generatethan 0
      if(seconds > 0){
        setSeconds(seconds -1);
      }

      if (seconds === 0){
        if(minutes === 0 ){
          clearInterval(interval);
        }else{
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000)
    return () => {
      clearInterval(interval);
    };
  }, [seconds])


  return (
    <div className='container'>
      <div className='card'>
        <h4>Verify OTP</h4>

        {/* input field for entering otp */}
        <input
          placeholder='Enter OTP'
          value={otp}
          onChange={({target}) => {
            setOtp(target.value);
          }}
          />
          <div className='countdown-text'>
            <p>
              Time Remaining: {" "}
              <span style={{fontWeight: 600}} >
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}

              </span>
            </p>
            {/* button to resend OTP */}
            <button
                disabled={seconds > 0 || minutes > 0}
                style={{
                  color: seconds > 0 || minutes > 0 ? "#DEF3E8" : "#FF5630",
                }}
                onClick={resendOTP}
                >
                  Resend OTP
                </button>
          </div>

          {/* button to submit otp */}
          <button className='submit-btn'>SUBMIT</button>

      </div>
    </div>
 
  )
}

export default App