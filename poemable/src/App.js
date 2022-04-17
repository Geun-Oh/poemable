import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import WritingPage from './writingPage';
import LandingPage from './landingPage';

function App() {
  return(
    <>
      <WritingPage />
      <hr />
      <LandingPage />
    </>
  )
}

export default withAuthenticator(App);