import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import WritingPage from './writingPage';
import LandingPage from './landingPage';

function App() {
  return(
    <>
      <LandingPage />
      <WritingPage />
    </>
  )
}

export default withAuthenticator(App);