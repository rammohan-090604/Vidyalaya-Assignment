import React from 'react';
import { WindowWidthProvider } from '../components/common/WindowWidthProvider';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;
