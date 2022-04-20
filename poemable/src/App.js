import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { withAuthenticator } from '@aws-amplify/ui-react';
import WritingPage from './writingPage';
import LandingPage from './landingPage';
import UpdateCurrentUser from './context';

function App() {
  return(
      <UpdateCurrentUser>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/writedown" element={<WritingPage />} />
          </Routes>
        </BrowserRouter>
      </UpdateCurrentUser>
  )
}

export default withAuthenticator(App);