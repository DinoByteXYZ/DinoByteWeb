import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface ButtonProps {
  primary?: boolean;
  outlined?: boolean;
  size?: 'small' | 'medium' | 'large';
  glowing?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px ${props => props.theme.colors.primary}, 0 0 10px ${props => props.theme.colors.primary}; }
  50% { box-shadow: 0 0 20px ${props => props.theme.colors.primary}, 0 0 30px ${props => props.theme.colors.primary}; }
  100% { box-shadow: 0 0 5px ${props => props.theme.colors.primary}, 0 0 10px ${props => props.theme.colors.primary}; }
`;

const pixelShake = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(2px, 2px); }
  50% { transform: translate(-2px, -2px); }
  75% { transform: translate(-2px, 2px); }
  100% { transform: translate(0, 0); }
`;

const StyledButton = styled.button<ButtonProps>`
  font-family: ${props => props.theme.fonts.pixel};
  border: 4px solid transparent;
  padding: ${props => 
    props.size === 'small' ? '8px 16px' : 
    props.size === 'large' ? '16px 32px' : 
    '12px 24px'};
  font-size: ${props => 
    props.size === 'small' ? '10px' : 
    props.size === 'large' ? '18px' : 
    '14px'};
  text-transform: uppercase;
  position: relative;
  transition: all 0.3s ease;
  background-color: ${props => 
    props.primary ? props.theme.colors.primary : 
    props.outlined ? 'transparent' : 
    props.theme.colors.secondary};
  color: ${props => 
    props.outlined ? props.theme.colors.light : 
    props.theme.colors.dark};
  
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 4px solid ${props => 
      props.primary ? props.theme.colors.primary : 
      props.theme.colors.secondary};
    z-index: -1;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid ${props => props.theme.colors.dark};
    z-index: -1;
  }

  ${props => props.glowing && css`
    animation: ${glowAnimation} 2s infinite, ${pixelShake} 0.5s infinite;
  `}

  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.boxShadows.neon};
  }

  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  primary = false, 
  outlined = false,
  size = 'medium',
  glowing = false,
  ...props 
}) => {
  return (
    <StyledButton 
      primary={primary} 
      outlined={outlined}
      size={size}
      glowing={glowing}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 