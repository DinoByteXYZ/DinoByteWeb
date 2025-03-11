import React from 'react';
import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  0% { box-shadow: 0 0 5px currentColor; }
  50% { box-shadow: 0 0 20px currentColor; }
  100% { box-shadow: 0 0 5px currentColor; }
`;

const RarityContainer = styled.section`
  padding: 5rem 2rem;
  background-color: ${props => props.theme.colors.darker};
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.light};
  text-shadow: 3px 3px 0 ${props => props.theme.colors.dark};
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: ${props => props.theme.colors.secondary};
    margin: 1rem auto;
  }
`;

const RarityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const RarityCard = styled.div<{rarity: string}>`
  background-color: ${props => props.theme.colors.dark};
  border: 3px solid ${props => props.color};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    animation: ${glow} 2s infinite;
    color: ${props => props.color};
  }
`;

const RarityImage = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    image-rendering: pixelated;
  }
`;

const RarityName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const RarityDescription = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RarityPercent = styled.div<{rarity: string}>`
  font-family: ${props => props.theme.fonts.tech};
  font-size: 1.2rem;
  color: ${props => props.color};
  margin-top: auto;
`;

interface RarityInfo {
  name: string;
  description: string;
  image: string;
  color: string;
  percent: string;
  bits: string;
}

const RaritySection: React.FC = () => {
  const rarities: RarityInfo[] = [
    {
      name: "COMMOM",
      description: "The most common DinoByte, with unique traits",
      image: "/images/common.png",
      color: "#aaaaaa",
      percent: "70%",
      bits: "8-bit"
    },
    {
      name: "RARE",
      description: "DinoByte with special colors and attributes",
      image: "/images/rare.png",
      color: "#4444ff",
      percent: "20%",
      bits: "16-bit"
    },
    {
      name: "EPIC",
      description: "DinoByte with unique appearance and special abilities",
      image: "/images/epic.png",
      color: "#aa44ff",
      percent: "9%",
      bits: "24-bit"
    },
    {
      name: "LEGENDARY",
      description: "The rarest DinoByte, with extreme abilities and completely unique design",
      image: "/images/legendary.png",
      color: "#ffaa00",
      percent: "1%",
      bits: "32-bit"
    }
  ];
  
  return (
    <RarityContainer>
      <SectionTitle>Rarity Levels</SectionTitle>
      <RarityGrid>
        {rarities.map((rarity, index) => (
          <RarityCard key={index} rarity={rarity.name} color={rarity.color}>
            <RarityImage>
              <img src={rarity.image} alt={rarity.name} />
            </RarityImage>
            <RarityName>{rarity.name}</RarityName>
            <RarityDescription>{rarity.description}</RarityDescription>
            <RarityPercent rarity={rarity.name} color={rarity.color}>
              Probability: {rarity.percent}
            </RarityPercent>
          </RarityCard>
        ))}
      </RarityGrid>
    </RarityContainer>
  );
};

export default RaritySection; 