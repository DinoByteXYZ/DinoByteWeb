import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.darker};
  padding: 3rem 2rem;
  border-top: 2px solid ${props => props.theme.colors.primary};
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const FooterLogo = styled.div`
  margin-bottom: 1rem;
  
  img {
    height: 50px;
    image-rendering: pixelated;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.light};
`;

const FooterText = styled.p`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  max-width: 300px;
`;

const FooterLinks = styled.ul`
  list-style: none;
  
  li {
    margin-bottom: 0.8rem;
  }
  
  a {
    font-family: ${props => props.theme.fonts.pixel};
    font-size: 0.9rem;
    
    &:hover {
      padding-left: 5px;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.dark};
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    color: ${props => props.theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.dark};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.light};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <img src="/images/webp.webp" alt="DinoByte NFT" />
          </FooterLogo>
          <FooterText>
            DinoByte NFT is an innovative blockchain digital collectible project that combines pixel art with blockchain technology.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="https://x.com/DinoByteXYZ" target="_blank">X</SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/mint">Mint</Link></li>
            <li><Link to="/dashboard">My NFTs</Link></li>
            <li><a href="#about">About Us</a></li>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Community</FooterTitle>
          <FooterLinks>
            {/* <li><a href="https://discord.com" target="_blank">Discord</a></li> */}
            <li><a href="https://x.com/DinoByteXYZ" target="_blank">Twitter</a></li>
            {/* <li><a href="https://telegram.org" target="_blank">Telegram</a></li> */}
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>
            If you have any questions or collaboration inquiries, please contact us via the following methods:
          </FooterText>
          <FooterText>
            Email: contact@dinobyte.xyz
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © 2025 DinoByte NFT. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 