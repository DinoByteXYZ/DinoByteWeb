import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

interface NFTCardProps {
  id: number;
  imageUrl: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const rarityColors = {
  common: '#aaaaaa',
  rare: '#4444ff',
  epic: '#aa44ff',
  legendary: '#ffaa00',
};

const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.darker};
  border: 3px solid ${props => props.theme.colors.secondary};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.boxShadows.neon};
  }
`;
type RarityType = 'common' | 'rare' | 'epic' | 'legendary';


const NFTImage = styled.div<{rarity: RarityType}>`
  aspect-ratio: 1;
  width: 100%;
  border: 2px solid ${props => rarityColors[props.rarity]};
  margin-bottom: 1rem;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: pixelated;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 10px ${props => rarityColors[props.rarity]};
    z-index: 1;
    pointer-events: none;
  }
`;

const NFTInfo = styled.div`
  padding: 0.5rem;
`;

const NFTName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.light};
  text-align: center;
`;

const NFTRarity = styled.div<{rarity: RarityType}>`
  text-align: center;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.pixel};
  font-size: 0.8rem;
  color: ${props => rarityColors[props.rarity]};
  text-shadow: 0 0 5px ${props => rarityColors[props.rarity]};
`;

const NFTActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const NFTCard: React.FC<NFTCardProps> = ({ id, imageUrl, name, rarity }) => {
  const rarityText = {
    common: 'COMMOM ',
    rare: 'RARE ',
    epic: 'EPIC ',
    legendary: 'LEGENDARY ',
  };
  
  return (
    <CardContainer>
      <NFTImage rarity={rarity}>
        <img src={imageUrl} alt={name} />
      </NFTImage>
      <NFTInfo>
        <NFTName>{name} #{id}</NFTName>
        <NFTRarity rarity={rarity}>{rarityText[rarity]}</NFTRarity>
      </NFTInfo>
      <NFTActions>
        <Link to="/marketplace">
          <Button outlined size="small">List for sale</Button>
        </Link>
      </NFTActions>
    </CardContainer>
  );
};

export default NFTCard; 