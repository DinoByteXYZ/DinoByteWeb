import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

const HeroSection = styled.section`
  height: 50vh;
  display: flex;
  padding-top: 20vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/hero-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      transparent 0%,
      rgba(0, 0, 0, 0.1) 1px,
      transparent 2px,
      transparent 4px
    );
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  z-index: 10;
  max-width: 800px;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.light};
  text-shadow: 
    3px 3px 0 ${props => props.theme.colors.primary},
    6px 6px 0 ${props => props.theme.colors.dark};
  animation: ${glitch} 3s infinite alternate;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.light};
  font-family: ${props => props.theme.fonts.tech};
  text-shadow: 0 0 10px ${props => props.theme.colors.secondary};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Hero: React.FC = () => {
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <HeroSection>
      <HeroContent>
        <Title>🦖 Awaken the DinoByte and possess the legend</Title>
        <Subtitle>
          The DinoByte NFT is a limited edition digital collectible with unique evolutionary systems and gaming experiences. Join the DinoByte universe now!
        </Subtitle>
        <ButtonGroup>
          <Link to="/mint">
            <Button primary glowing size="large">
              Mint now
            </Button>
          </Link>
          <a >
            <Button outlined size="large" onClick={handleScrollToAbout}>
              Learn more
            </Button>
          </a>
        </ButtonGroup>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 