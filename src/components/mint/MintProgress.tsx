import { title } from 'process';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface MintProgressProps {
  totalSupply: number;
  mintedCount: number;
  showTitle: string;
}

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
`;

const ProgressBar = styled.div`
  height: 30px;
  width: 100%;
  background-color: ${props => props.theme.colors.darker};
  border: 3px solid ${props => props.theme.colors.secondary};
  position: relative;
  margin-bottom: 1rem;
  
  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 1px solid ${props => props.theme.colors.dark};
  }
`;

const ProgressFill = styled.div<{percentage: number}>`
  height: 100%;
  width: ${props => `${props.percentage}%`};
  background: ${props => props.theme.colors.gradients.primary};
  position: relative;
  transition: width 1s ease-in-out;
`;

const ProgressDots = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ProgressDot = styled.div<{active: boolean}>`
  width: 20px;
  height: 20px;
  border-radius: 0;
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.darker};
  border: 2px solid ${props => props.theme.colors.light};
  animation: ${props => props.active ? blinkAnimation : 'none'} 2s infinite;
`;

const ProgressText = styled.div`
  font-family: ${props => props.theme.fonts.pixel};
  font-size: 1.2rem;
  text-align: center;
  color: ${props => props.theme.colors.light};
  font-family: ${props => props.theme.fonts.tech};
  text-shadow: 0 0 5px ${props => props.theme.colors.secondary};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
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

const MintProgress: React.FC<MintProgressProps> = ({ totalSupply, mintedCount, showTitle }) => {
  const percentage = (mintedCount / totalSupply) * 100;
  
  const createDots = () => {
    const dots = [];
    const dotCount = 5; 
    
    for (let i = 0; i < dotCount; i++) {
      const dotPercentage = (i / (dotCount - 1)) * 100;
      dots.push(
        <ProgressDot 
          key={i} 
          active={percentage >= dotPercentage}
        />
      );
    }
    
    return dots;
  };
  
  return (
    <ProgressContainer>
      <ProgressDots>
        {createDots()}
      </ProgressDots>
      
      <ProgressBar>
        <ProgressFill percentage={percentage} />
      </ProgressBar>
      
      <ProgressText>
        🔥 {mintedCount}/{totalSupply} {showTitle}
      </ProgressText>
    </ProgressContainer>
  );
};

export default MintProgress; 