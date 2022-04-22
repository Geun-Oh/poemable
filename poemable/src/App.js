import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { withAuthenticator } from '@aws-amplify/ui-react';
import WritingPage from './writingPage';
import LandingPage from './landingPage';
import UpdateCurrentUser from './context';
import SideNav from './sidenav';
import ProfilePage from './profilePage';

function App() {
  return(
      <UpdateCurrentUser>
        <BrowserRouter>
          <SideNav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/writedown" element={<WritingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </UpdateCurrentUser>
  )
}

export default withAuthenticator(App);