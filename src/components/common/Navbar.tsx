import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useWallet } from '../../contexts/WalletContext';

interface NavbarProps {
  transparent?: boolean;
}

const StyledNavbar = styled.nav<NavbarProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: ${props => props.transparent ? 'absolute' : 'relative'};
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${props => props.transparent ? 'transparent' : props.theme.colors.darker};
  border-bottom: ${props => props.transparent ? 'none' : `2px solid ${props.theme.colors.primary}`};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${props => props.transparent ? 'transparent' : props.theme.colors.secondary};
    opacity: 0.5;
  }
`;

const Logo = styled.div`
  img {
    height: 40px;
    image-rendering: pixelated;
  }
`;

const MenuItems = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.light};
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{isOpen: boolean}>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.darker};
  padding: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
`;

const NavItem = styled(({ isExternal, to, href, ...props }) => 
  isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
  ) : (
    <Link to={to} {...props} />
  )
)`
  font-family: ${props => props.theme.fonts.pixel};
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.light};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${props => 
      props.transparent && props.active ? 
      props.theme.colors.primary : 
      props.active ? 
      props.theme.colors.primary : 
      'transparent'
    };
    transition: width 0.3s ease;
    opacity: 1; 
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const NavItemUnderline = styled.div<{active: boolean}>`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: ${props => props.active ? '100%' : '0'};
  height: 2px;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.light};
  background-color: ${props => props.theme.colors.primary} !important;
  transition: width 0.3s ease;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.light};
  text-shadow: 
    3px 3px 0 ${props => props.theme.colors.primary},
    6px 6px 0 ${props => props.theme.colors.dark};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

// 添加外部链接样式组件
const ExternalNavItem = styled.a`
  color: ${props => props.theme.colors.light};
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  // const { connected, connectWallet } = useWallet();
  const connected = true;
  const connectWallet = () => {

  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const isHomePage = () => {
    return location.pathname === '/' || location.pathname === '' || location.pathname.match(/^\/?$/);
  };
  
  return (
    <StyledNavbar transparent={transparent}>
      <Logo>
        <Link to="/">
          <img src="/images/webp.webp" alt="DinoByte NFT" />
        </Link>
      </Logo>
      {/* <Title>🦖</Title> */}
      
      <MenuItems>
        <NavItem to="/" active={location.pathname === '/'}>Home</NavItem>
        <NavItem to="/mint" active={location.pathname === '/mint'}>Mint</NavItem>
        <NavItem to="/dashboard" active={location.pathname === '/dashboard'}>My NFT</NavItem>
        <NavItem 
          isExternal 
          href="https://dinobytenfts-organization.gitbook.io/the-evolution-from-nft-to-defi"
        >
          Docs
        </NavItem>
      </MenuItems>
        <ConnectButton />
      <MobileMenuButton onClick={toggleMobileMenu}>
        ☰
      </MobileMenuButton>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <NavItem to="/" active={location.pathname === '/'}>Home</NavItem>
        <NavItem to="/mint" active={location.pathname === '/mint'}>Mint</NavItem>
        <NavItem to="/dashboard" active={location.pathname === '/dashboard'}>My NFT</NavItem>
        <NavItem 
          isExternal 
          href="https://dinobytenfts-organization.gitbook.io/the-evolution-from-nft-to-defi"
        >
          Docs
        </NavItem>
      </MobileMenu>
      <NavItemUnderline active={location.pathname === '/'} />
    </StyledNavbar>
  );
};

export default Navbar; 