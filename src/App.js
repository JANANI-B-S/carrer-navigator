import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Path from "./pages/Path";
import Prediction from "./pages/Prediction";
import Progress from "./pages/Progress";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App(){
  return (
    <GoogleOAuthProvider clientId="955368993073-oq4b6s3fbs5v50ics1tsdngek1qn2gvl.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/path" element={<Path />} />
          <Route path="/Progress" element={<Progress />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

