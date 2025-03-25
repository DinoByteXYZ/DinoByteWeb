import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';


import GlobalStyle from './styles/globalStyles';
import theme from './styles/theme';


import Home from './pages/Home';
import Mint from './pages/Mint';
import Dashboard from './pages/Dashboard';
import NFT from './pages/NFT';


function App() {
  return (
      <ThemeProvider theme={theme}>
        {/* <WalletProvider> */}
          <GlobalStyle />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/nft" element={<NFT />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        {/* </WalletProvider> */}
      </ThemeProvider>
  );
}

export default App;