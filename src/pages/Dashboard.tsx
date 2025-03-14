import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import NFTCard from '../components/dashboard/NFTCard';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
// import { useWallet } from '../contexts/WalletContext';
import { useNFTs } from '../hooks/useNFTs';

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DashboardHeader = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
              url('/images/dashboard-bg.png');
  background-size: cover;
  background-position: center;
`;

const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.light};
  text-shadow: 3px 3px 0 ${props => props.theme.colors.dark};
`;

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: ${props => props.theme.colors.dark};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  grid-column: 1 / -1;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.light};
`;

const EmptyStateText = styled.p`
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.light};
`;

const Dashboard: React.FC = () => {
  // const { connected, connectWallet } = useWallet();
  const connected = true;
  const connectWallet = () => {
    console.log('Connect Wallet');
  };
  const { ownedNFTs, isLoading, error } = useNFTs();
  
  if (!connected) {
    return (
      <DashboardContainer>
        <Navbar />
        <DashboardHeader>
          <DashboardTitle>My DinoByte NFTs</DashboardTitle>
        </DashboardHeader>
        <EmptyState>
          <EmptyStateTitle>Please connect your wallet</EmptyStateTitle>
          <EmptyStateText>Connect your wallet to view your DinoByte NFTs</EmptyStateText>
          <Button primary onClick={connectWallet}>
            Connect Wallet
          </Button>
        </EmptyState>
      </DashboardContainer>
    );
  }
  
  if (isLoading) {
    return (
      <DashboardContainer>
        <Navbar />
        <DashboardHeader>
          <DashboardTitle>My DinoByte NFTs</DashboardTitle>
        </DashboardHeader>
        <EmptyState>
          <EmptyStateTitle>Loading...</EmptyStateTitle>
        </EmptyState>
      </DashboardContainer>
    );
  }
  
  return (
    <DashboardContainer>
      <Navbar />
      
      <NFTGrid>
        {ownedNFTs.length === 0 ? (
          <EmptyState>
            <EmptyStateTitle>You don't have any DinoByte NFTs</EmptyStateTitle>
            <EmptyStateText>Go to the Mint page to create your first DinoByte NFT</EmptyStateText>
            {/* <Button to="/mint">
              Mint Now
            </Button> */}
            <Link to="/mint">
              <Button primary glowing size="large">
                Mint now
              </Button>
            </Link>
          </EmptyState>
        ) : (
          ownedNFTs.map((tokenId) => (
            <NFTCard 
              key={tokenId}
              id={tokenId}
              imageUrl={`/nft/images/${tokenId}.png`}
              name={`DinoByte`}
              rarity={`Rarity ${tokenId}` as "common" | "rare" | "epic" | "legendary"}
            />
          ))
        )}
      </NFTGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 