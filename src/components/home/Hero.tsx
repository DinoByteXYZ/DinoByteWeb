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
  height: 70vh;
  display: flex;
  padding-top: 10vh;
  padding-bottom: 5vh;
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
  padding-top: 40px;
  max-width: 800px;
  margin: 0 auto;
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

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const CountdownItem = styled.div`
  background-color: ${props => props.theme.colors.dark};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 1rem 1.5rem;
  margin: 0 0.1rem;
  min-width: 80px;
  
  .number {
    font-family: ${props => props.theme.fonts.tech};
    font-size: 1.5rem;
    color: ${props => props.theme.colors.primary};
  }
  
  .label {
    font-family: ${props => props.theme.fonts.pixel};
    font-size: 0.8rem;
    color: ${props => props.theme.colors.light};
  }
`;


const Hero: React.FC = () => {

  const [countdown, setCountdown] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});
React.useEffect(() => {
  const targetDate = new Date('2025-03-14T12:00:00Z'); 
  const calculateTimeLeft = () => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
  };
}
const days = Math.floor(difference / (1000 * 60 * 60 * 24));
const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((difference % (1000 * 60)) / 1000);
return { days, hours, minutes, seconds };
};
setCountdown(calculateTimeLeft());
const timer = setInterval(() => {
setCountdown(calculateTimeLeft());}, 1000);
return () => clearInterval(timer);
}, []);

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
          DinoByte isn't just an NFT—we're building a new asset protocol on Sonic. A protocol where ownership, liquidity, and utility converge.
        </Subtitle>
        <Subtitle>
          CA: 0x4f77c84c2dfb8b1d985571e3e3bc2129a54c4e10
        </Subtitle>
        {/* <CountdownContainer>
            <CountdownItem>
              <div className="number">{countdown.days}</div>
              <div className="label">D</div>
            </CountdownItem>
            <CountdownItem>
              <div className="number">{countdown.hours}</div>
              <div className="label">H</div>
            </CountdownItem>
            <CountdownItem>
              <div className="number">{countdown.minutes}</div>
              <div className="label">M</div>
            </CountdownItem>
            <CountdownItem>
              <div className="number">{countdown.seconds}</div>
              <div className="label">S</div>
            </CountdownItem>
          </CountdownContainer> */}
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