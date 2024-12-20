import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Codingal_img from "../Assets/Codingal_img.png";
import ModelBox from "../Model-box/model-box"; 

const Navbar = () => {
  const [time, setTime] = useState(600); 
  const [showModal, setShowModal] = useState(false); 
  const [timerRunning, setTimerRunning] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); 

  
  const stopTimer = () => {
    setTimerRunning(false);
  };

  useEffect(() => {
    if (timerRunning && time > 0) {
      const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [time, timerRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white text-black shadow-md">

      <div className="flex items-center">
        <img src={Codingal_img} alt="Codingal Logo" className="h-8 w-auto mr-2" />
        <span className="md:hidden text-lg font-bold">Codingal</span>
        <span className="hidden md:flex items-center text-lg font-bold">
          <span className="mx-2 h-6 border-l-2 border-black"></span>
          Trial Lesson [Grade 1-3]
        </span>
      </div>

      <div className="md:hidden flex">
        <button
          className="text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <span>{formatTime(time)}</span>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          End Class
        </button>
        <Link to="/posts" className="bg-orange-500 text-white px-4 py-2 rounded">
          Posts
        </Link>
      </div>
  
      
      { menuOpen && (
        <div className="absolute top-16 right-0 w-3/4 bg-white flex flex-col items-center justify-center p-4 space-y-2 shadow-md md:hidden">
          <span>{formatTime(time)}</span>
          <button
            className="items-center justify-center bg-orange-500 text-white px-4 py-2 rounded w-full"
            onClick={() => setShowModal(true)} 
          >
            End Class
          </button>
          <button className="items-center justify-center bg-orange-500 text-white px-4 py-2 rounded w-full">
            <Link to="/posts">Posts</Link>
          </button>
        </div>
      )}

      
      {showModal && (
        <ModelBox
          showModal={showModal} 
          setShowModal={setShowModal} 
          stopTimer={stopTimer} 
        />
      )}
    </div>
  );
};

export default Navbar;
