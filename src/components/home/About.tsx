import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${props => props.theme.colors.dark};
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.gradients.primary};
  }
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
    background: ${props => props.theme.colors.primary};
    margin: 1rem auto;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const AboutText = styled.div`
  flex: 1;
  min-width: 300px;
`;

const AboutImage = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    border: 3px solid ${props => props.theme.colors.secondary};
    image-rendering: pixelated;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const PixelList = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
  
  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.8rem;
    
    &:before {
      content: '►';
      position: absolute;
      left: 0;
      color: ${props => props.theme.colors.primary};
      font-family: ${props => props.theme.fonts.pixel};
    }
  }
`;

const About: React.FC = () => {
  return (
    <AboutSection id="about">
      <SectionTitle>DinoByte Legendary World</SectionTitle>
      <AboutContent>
        <AboutText>
          <Paragraph>
          DinoByte is an innovative NFT + DeFi ecosystem built on Sonic Chain, with the ultimate goal of evolving into a synthetic asset protocol.
          </Paragraph>
          <Paragraph>
          Unlike traditional NFT projects that remain static collectibles, DinoByte is designed to unlock deeper financial value and ecosystem integration!
          </Paragraph>
          <PixelList>
            <li>NFT Staking → Stake DinoByte NFTs to mine $DINO tokens.</li>
            <li>DINO Token as Collateral → $DINO will be used as collateral for synthetic assets.</li>
            <li>Debt Pool Mechanism → A shared debt pool ensures the stability of synthetic assets and allows for seamless minting and trading.</li>
            <li>Beyond NFTs → DinoByte NFTs and $DINO will integrate into various DeFi utilities, creating a sustainable on-chain economy.</li>
          </PixelList>
        </AboutText>
        <AboutImage>
          <img width="250px" height="250px" src="/images/legendary.png" alt="DinoByte Legendary World" />
        </AboutImage>
      </AboutContent>
    </AboutSection>
  );
};

export default About; 