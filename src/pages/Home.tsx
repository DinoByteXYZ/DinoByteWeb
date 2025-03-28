import React from 'react';
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

const Home: React.FC = () => {
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