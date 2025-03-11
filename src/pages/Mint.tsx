import React from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import MintProgress from '../components/mint/MintProgress';
// import { useWallet } from '../contexts/WalletContext';
// import { useMint } from '../hooks/useMint';

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
const MintPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MintSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
              url('/images/mint-bg.png');
  background-size: cover;
  background-position: center;
`;

const MintCard = styled.div`
  background-color: ${props => props.theme.colors.darker};
  border: 4px solid ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.boxShadows.neon};
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid ${props => props.theme.colors.dark};
    z-index: -1;
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

const MintTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: ${props => props.theme.colors.light};
  
  text-shadow: 
    3px 3px 0 ${props => props.theme.colors.primary},
    6px 6px 0 ${props => props.theme.colors.dark};
`;


const MintPrice = styled.div`
  text-align: center;
  margin: 2rem 0;
  font-size: 1.5rem;
  font-family: ${props => props.theme.fonts.tech};
  color: ${props => props.theme.colors.light};
`;

const MintButtonContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const NFTPreview = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  
  img {
    width: 200px;
    height: 200px;
    image-rendering: pixelated;
    border: 3px solid ${props => props.theme.colors.secondary};
  }
`;

const Mint: React.FC = () => {
  const connected = true;
  const connectWallet = () => {
    console.log('Connect Wallet');
  };
  // const { mintPrice, totalSupply, mintedCount, isMinting, mint } = useMint();
  const mintPrice = 199;
  const totalSupply = 2000;
  const mintedCount = 0;
  const handleMint = () => {
    alert("Time not yet"); 
    // if (!connected) {
    //   connectWallet();
    // } else {
    //   // mint();
    // }
  };
  
  return (
    <MintPageContainer>
      <Navbar />
      <MintSection>
        <MintCard>
          <MintTitle>Mint DinoByte NFT</MintTitle>
          
          <MintProgress totalSupply={totalSupply} mintedCount={mintedCount} />
          
          <NFTPreview>
            <img src="/images/legendary.png" alt="DinoByte NFT Preview" />
          </NFTPreview>
          
          <MintPrice>
            Price: {mintPrice} S
          </MintPrice>
          
          <MintButtonContainer>
            <Button 
              primary 
              size="large" 
              glowing={true}
              onClick={handleMint}
            >
              {'Mint NFT'}
            </Button>
          </MintButtonContainer>

          <MintPrice>
           WhiteList Price: FREE
          </MintPrice>
          
          <MintButtonContainer>
            <Button 
              primary 
              size="large" 
              glowing={true}
              onClick={handleMint}
            >
              {'WL Mint'}
            </Button>
          </MintButtonContainer>
        </MintCard>
      </MintSection>
    </MintPageContainer>
  );
};

export default Mint; 