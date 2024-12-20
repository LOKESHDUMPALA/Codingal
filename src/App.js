import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PostsPage from "./components/Post/Posts";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navbar/>} />
          <Route path="/posts" element={<PostsPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
