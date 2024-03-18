'use client'

import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
  const [start, setStart] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  const [timeLeft, setTimeLeft] = useState(6); // Initial timer value (seconds)
  const [userInput, setUserInput] = useState(6); // User input for timer
  const timerId = useRef(null);
  const timeoutId = useRef(null);

  const showAlert = (icon, title, text) => {
    setStart(false);
    setButtonText('Start');
    clearInterval(timerId.current);
    clearTimeout(timeoutId.current);
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      footer: '<a href="#">Why do I have this issue?</a>',
      allowOutsideClick: false
    });
  };

  const startTimer = () => {
    setStart(true);
    setButtonText('Started...');
    setTimeLeft(userInput); // Set time left to user input

    timerId.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time === 1) {
          clearInterval(timerId.current);
          showAlert('success', 'Congratulations!', 'You made it through the minute without changing the tab!');
        }
        return time - 1;
      });
    }, 1000);

    timeoutId.current = setTimeout(() => {
      if (!document.hidden) {
        showAlert('success', 'Congratulations!', 'You made it through the minute without changing the tab!');
      }
    }, userInput * 1000);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && start) {
        showAlert('error', 'Oops...', 'You have changed the tab! You are expelled');
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [start]);

  return (
    <div>
      <div
        onMouseLeave={start ? () => {
          showAlert('error', 'Oops...', 'You have left the mouse! You are expelled');
        } : null}
        style={{
          backgroundColor: "#282c34",
          color: "white",
          textAlign: "center",
          borderRadius: "10px",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="number"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={start}
          min="1"
          style={{
            margin: '20px',
            padding: '10px 20px',
            fontSize: '20px',
            borderRadius: '5px',
            border: '1px solid #555',
            backgroundColor: '#fff',
            color: '#555',
            width: '100px',
            textAlign: 'center'
          }}
        />
        <button
          onClick={startTimer}
          disabled={start}
          style={{
            margin: '20px',
            padding: '10px 20px',
            fontSize: '20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: start ? '#555' : '#4CAF50',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {buttonText}
        </button>
        {start && <h2 style={{ color: 'white' }}>{timeLeft} seconds left</h2>}
      </div>
    </div>
  );
}
