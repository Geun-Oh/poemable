import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import WritingPage from "./writingPage";
import LandingPage from "./landingPage";
import UpdateCurrentUser from "./context";
import SideNav from "./sidenav";
import ProfilePage from "./profilePage";
import IntroPage from "./introPage";

function App() {
  return (
    <UpdateCurrentUser>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route
            path="/landing"
            element={
              <>
                <SideNav />
                <LandingPage />
              </>
            }
          />
          <Route
            path="/writedown"
            element={
              <>
                <SideNav />
                <WritingPage />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <SideNav />
                <ProfilePage />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </UpdateCurrentUser>
  );
}

export default withAuthenticator(App);
