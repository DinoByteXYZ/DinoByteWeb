import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Introduction from '../components/home/Introduction';
import Footer from '../components/common/Footer';
import AIAssistant from '../components/common/AIAssistant';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const fetchInviterAddress = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const referAddressParam = urlParams.get('refer');
  const referAddress = referAddressParam ? decodeURIComponent(referAddressParam) : null; //
  if (referAddress) {
    console.log('referAddress', referAddress);
   }
};



const Home: React.FC = () => {
  useEffect(() => {
    fetchInviterAddress();
  });
  return (
    <HomeContainer>
      <Navbar transparent={true} />
      <Introduction />
      <Footer />
      <AIAssistant />
    </HomeContainer>
  );
};

export default Home; 