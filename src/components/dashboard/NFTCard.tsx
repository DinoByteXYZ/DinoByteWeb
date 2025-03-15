import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import rarityReport from '../../rarity_report.json';  // 导入 JSON 文件

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
  COMMON: '#808080',
  UNCOMMON: '#00FF00',
  RARE: '#0000FF',
  EPIC: '#800080',
  LEGENDARY: '#FFD700'
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

interface NFTDetail {
  id: number;
  rarity: string;
  traitsCount: number;
}

const NFTCard: React.FC<NFTCardProps> = ({ id, imageUrl, name, rarity }) => {
  const rarityText = {
    common: 'COMMOM ',
    rare: 'RARE ',
    epic: 'EPIC ',
    legendary: 'LEGENDARY ',
  };
  
  const nftDetail = rarityReport.detailedNFTList.find(
    (nft: NFTDetail) => nft.id === id
  );

  return (
    <CardContainer>
      <NFTImage rarity={rarity}>
        <img src={imageUrl} alt={name} />
      </NFTImage>
      <NFTInfo>
        <NFTName>DinoByte #{id}</NFTName>
        <NFTRarity rarity={nftDetail?.rarity as RarityType || 'UNKNOWN'}>
          {nftDetail?.rarity || 'UNKNOWN'}
        </NFTRarity>
      </NFTInfo>
      <NFTActions>
        <a href='https://paintswap.io/sonic/collections/0x4f77c84c2dfb8b1d985571e3e3bc2129a54c4e10/nfts' target='_blank'>
          <Button outlined size="small">List for sale</Button>
        </a>
      </NFTActions>
    </CardContainer>
  );
};

export default NFTCard; 