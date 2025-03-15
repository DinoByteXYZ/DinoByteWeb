import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import RaritySection from '../components/home/RaritySection';
import MintCTA from '../components/home/MintCTA';
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
      {/* <MintCTA /> */}
      <Hero />
      <RaritySection />
      <About />
      <Footer />
    </HomeContainer>
  );
};

export default Home; 