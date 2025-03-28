import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import qaData from '../../ori.json';

const AIButton = styled.div<{ isExpanded: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: ${props => props.isExpanded ? '400px' : '50px'};
  height: ${props => props.isExpanded ? '400px' : '50px'};
  background: ${props => props.theme.colors.darker};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 1rem;
    right: 1rem;
    width: ${props => props.isExpanded ? 'calc(100% - 2rem)' : '50px'};
    height: ${props => props.isExpanded ? '45vh' : '50px'};
    border-radius: ${props => props.isExpanded ? '12px' : '10px'};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.primary};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.8rem;
  }
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.light};
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 40px;
    height: 40px;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      width: 30px;
      height: 30px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const MinimizeButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.light};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.8rem;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 3px;
  }
`;

const QuestionWrapper = styled.div`
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const QuestionButton = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  background: ${props => props.theme.colors.darker};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  color: ${props => props.theme.colors.light};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  will-change: transform, background-color;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.darker};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    -webkit-tap-highlight-color: transparent;
  }
`;

const Answer = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: ${props => props.theme.colors.light};
  font-size: 0.95rem;
  line-height: 1.5;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.light};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:active {
    transform: rotate(180deg);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </svg>
);

const AIAssistant: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [displayedQuestions, setDisplayedQuestions] = useState<number[]>([]);
  const [qaConfig, setQaConfig] = useState<Array<{question: string; answer: string}>>([]);

  useEffect(() => {
    setQaConfig(qaData);
  }, []);

  const initializeQuestions = useCallback(() => {
    const totalQuestions = qaConfig.length;
    const numToShow = Math.min(3, totalQuestions);
    const indices = Array.from({ length: totalQuestions }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, numToShow);
    
    setDisplayedQuestions(indices);
    setSelectedQuestion(null);
  }, [qaConfig]);

  useEffect(() => {
    if (qaConfig.length > 0) {
      initializeQuestions();
    }
  }, [initializeQuestions, qaConfig]);

  const handleRefresh = () => {
    initializeQuestions();
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(true);
  };

  return (
    <AIButton isExpanded={isExpanded}>
      {isExpanded ? (
        <>
          <Header>
            <img src="/images/webp.webp" width={40} height={40} alt="DinoByte NFT" />
            <Title> Dino AI</Title>
            <HeaderControls>
              <RefreshButton onClick={(e) => {
                e.stopPropagation();
                handleRefresh();
              }} title="refresh">
                <RefreshIcon />
              </RefreshButton>
              <MinimizeButton onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}>↓</MinimizeButton>
            </HeaderControls>
          </Header>
          <ChatContainer onClick={(e) => e.stopPropagation()}>
            {displayedQuestions.map((index) => (
              <QuestionWrapper key={index}>
                <QuestionButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedQuestion(index === selectedQuestion ? null : index);
                  }}
                >
                  {qaConfig[index].question}
                </QuestionButton>
                {selectedQuestion === index && (
                  <Answer>{qaConfig[index].answer}</Answer>
                )}
              </QuestionWrapper>
            ))}
          </ChatContainer>
        </>
      ) : (
        <IconButton onClick={handleIconClick}>🦖</IconButton>
      )}
    </AIButton>
  );
};

export default AIAssistant;