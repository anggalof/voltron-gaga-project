import { AppContext } from 'next/app'
import Home from './charge-station';
import React from 'react';

function App(props: any) {
  return (
    <React.Fragment>
      <Home {...props} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context: AppContext) {
  return {
    props: {},
  }
}

export default App;
