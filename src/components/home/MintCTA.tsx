import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

import { useEarlyBird } from '../../hooks/useEarlyBird';
import MintProgress from '../../components/mint/MintProgress';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;
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

const CTASection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
              url('/images/cta-bg.png');
  background-size: cover;
  background-position: center;
  text-align: center;
  position: relative;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.light};
  text-shadow: 3px 3px 0 ${props => props.theme.colors.dark};
`;

const CTAContent = styled.div`
  padding-top: 100px;
  max-width: 800px;
  margin: 0 auto;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.light};
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

const MintButton = styled(Button)`
  animation: ${pulse} 2s infinite;
`;

const PriceTag = styled.div`
  margin-top: 0.5rem;
  font-family: ${props => props.theme.fonts.tech};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.light};
  font-family: ${props => props.theme.fonts.tech};
  text-shadow: 0 0 5px ${props => props.theme.colors.secondary};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
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

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  color: ${props => props.theme.colors.light};
  text-align: center;
  font-family: ${props => props.theme.fonts.tech};
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid ${props => props.theme.colors.primary};
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MintCTA: React.FC = () => {
  const { isConnected, address } = useAccount();

  // const { mintPrice, totalSupply, mintedCount,isMinting,isRegistered,signer, mint } = useEarlyBird();
  // const priceETH = ethers.formatEther(mintPrice); 
  const totalSupply = 100;
  const mintedCount = 100;  
  const isMinting = false;
  const isRegistered = false;
  const priceETH = 99;


  
  const [countdown, setCountdown] = React.useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
  });
  React.useEffect(() => {
    const targetDate = new Date('2025-03-13T12:00:00Z'); 
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


const reserveNow = async () => {
  try {
    // const userAddress = await signer?.getAddress();
    // const provider = signer?.provider;
    

    // console.log('mintPrice',mintPrice);
    // await mint();
    
    
    console.log('success');
  } catch (error) {
    alert("Failed, please try again");
    console.error('error:', error);
  }
};
  
  return (
    <>
      <CTASection>
        <CTAContent>
          <Title>🦖 DinoByte WhiteList Sold out</Title>
          <Subtitle>
          DinoByte NFT WL is limited to 100 spots, FCFS. To secure a place, users must pay 50% of the NFT price upfront. WL addresses may mint one NFT for free, with no further cost.
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
          
          <MintProgress totalSupply={totalSupply} mintedCount={mintedCount} showTitle="" />
          {/* {mintedCount === totalSupply ? (
            <Title>Sold out</Title>
          ) : (
            <>
              {isConnected ? (
                <>
                  <ButtonGroup>
                    {isRegistered ? (
                      <Button glowing size="large">
                        Eligible
                      </Button>
                    ) : (
                      <Button primary glowing size="large" onClick={reserveNow}>
                        Reserve now
                      </Button>
                    )}
                    <a>
                      <Button outlined size="large" onClick={handleScrollToAbout}>
                        learn more
                      </Button>
                    </a>
                  </ButtonGroup>
                  {isRegistered ? (
                    <Title>You have been whitelisted</Title>
                  ) : (
                    <PriceTag>PRICE: {priceETH} S</PriceTag>
                  )}
                </>
              ) : (
                <Subtitle>Please connect wallet</Subtitle>
              )}
            </>
          )} */}
        </CTAContent>
      </CTASection>
      
      {isMinting && (
        <LoadingOverlay>
          <LoadingContent>
            <div className="spinner" />
            <div>Loading...</div>
          </LoadingContent>
        </LoadingOverlay>
      )}
    </>
  );
};

export default MintCTA; 