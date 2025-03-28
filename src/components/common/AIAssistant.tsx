import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import qaData from '../../ori.json';

const AIButton = styled.button<{ isExpanded: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: ${props => props.isExpanded ? '400px' : '60px'};
  height: ${props => props.isExpanded ? '400px' : '60px'};
  background: ${props => props.theme.colors.darker};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.light};
  margin: 0;
  font-size: 1.2rem;
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

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.darker};
  }
`;

const Answer = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: ${props => props.theme.colors.light};
`;

const IconButton = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
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

  return (
    <AIButton isExpanded={isExpanded}>
      {isExpanded ? (
        <>
          <Header>
            <img src="/images/webp.webp" width={40} height={40} alt="DinoByte NFT" />
            <Title> Dino AI</Title>
            <HeaderControls>
              <RefreshButton onClick={handleRefresh} title="refresh">
                <RefreshIcon />
              </RefreshButton>
              <MinimizeButton onClick={() => setIsExpanded(false)}>↓</MinimizeButton>
            </HeaderControls>
          </Header>
          <ChatContainer>
            {displayedQuestions.map((index) => (
              <div key={index}>
                <QuestionButton 
                  onClick={() => setSelectedQuestion(index === selectedQuestion ? null : index)}
                >
                  {qaConfig[index].question}
                </QuestionButton>
                {selectedQuestion === index && (
                  <Answer>{qaConfig[index].answer}</Answer>
                )}
              </div>
            ))}
          </ChatContainer>
        </>
      ) : (
        <IconButton onClick={() => setIsExpanded(true)}>🦖</IconButton>
      )}
    </AIButton>
  );
};

export default AIAssistant;