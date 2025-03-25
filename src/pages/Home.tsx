import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Introduction from '../components/home/Introduction';
import Footer from '../components/common/Footer';

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
    </HomeContainer>
  );
};

export default Home; 