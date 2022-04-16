import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import WritePoem from './writepoem';

function App() {
  return(
    <>
      <div>hello</div>
      <WritePoem />
    </>
  )
}

export default withAuthenticator(App);