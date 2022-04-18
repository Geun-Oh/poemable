import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { withAuthenticator } from '@aws-amplify/ui-react';
import WritingPage from './writingPage';
import LandingPage from './landingPage';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/writedown" element={<WritingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default withAuthenticator(App);