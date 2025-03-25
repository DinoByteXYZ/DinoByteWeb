import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const IntroductionSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 8%;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.darker};
  gap: 4rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  text-align: center;
  z-index: 2;
  position: relative;
`;

const Section = styled.div`
  margin-top: 3rem;
  opacity: 0;
  will-change: opacity, transform;
  
  &.visible {
    animation: fadeInUp 0.8s ease forwards;
    
    &:nth-child(1) { animation-delay: 0.2s; }
    &:nth-child(2) { animation-delay: 0.4s; }
    &:nth-child(3) { animation-delay: 0.6s; }
    &:nth-child(4) { animation-delay: 0.8s; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SectionContent = styled.div`
  color: ${props => props.theme.colors.light};
  font-size: 1.1rem;
  line-height: 1.3;
  text-align: left;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    ${props => props.theme.colors.primary} 50%, 
    transparent 100%
  );
  margin: 2rem 0;
  opacity: 0.5;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  
  li {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:before {
      content: '🔹';
      font-size: 1.2rem;
    }
  }
`;

const RoadmapImage = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease 0.4s forwards;

  img {
    width: 100%;
    height: auto;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
  }
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const Introduction: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      cancelAnimationFrame(timeoutId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{x: number; y: number; dx: number; dy: number}> = [];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - distance/800})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <IntroductionSection>
      <ParticleCanvas ref={canvasRef} />
      <ContentWrapper>
        <Section className={isVisible ? 'visible' : ''}>
          <SectionTitle>🌀 A New Chain Needs New Primitives</SectionTitle>
          <SectionContent>
            DeFi needs structure.
            Stable value. Real exposure.
            And systems that go beyond speculation.
            <br /><br />
            That's where we come in.
            
          </SectionContent>
        </Section>

        <Divider />

        <Section className={isVisible ? 'visible' : ''}>
          <SectionTitle>🧱 / What We're Building</SectionTitle>
          <SectionContent>
            DinoByte started as an NFT project—but not for art alone.
            These NFTs are entry points into a broader system:
            A synthetic asset protocol built on Sonic Chain.
            <br /><br />
            NFTs are just the beginning—
            Staking, token mechanics, collateral loops, and synthetic assets come next.
            <br /><br />
            We're building the rails for on-chain exposure to real-world markets.
            Pixel by pixel. Block by block.
            {/* <FeatureList>
              <li>NFT-based staking</li>
              <li>Reward token ($DINO)</li>
              <li>Collateralized debt pool</li>
              <li>sUSD stablecoin</li>
              <li>On-chain synthetic assets like BTC, Gold, Stocks, etc.</li>
            </FeatureList> */}
          </SectionContent>
        </Section>

        <Divider />

        <Section className={isVisible ? 'visible' : ''}>
          <SectionTitle>🔥 / Why It Matters</SectionTitle>
          <SectionContent>
            Today's DeFi has stalled.
            High fees, shallow liquidity, and weak incentives limit true financial evolution.
            <br />
            Synthetic assets let users access real-world markets—without banks, brokers, or borders.
            <br />
            But to do that right, we need scalable infra and a new incentive model.
            That's where Sonic comes in. And that's what we're building.
          </SectionContent>
        </Section>

        <Divider />

        <Section className={isVisible ? 'visible' : ''}>
          <SectionTitle>🛠️ / How It Works</SectionTitle>
          <SectionContent>
            We start from the bottom up.
            <FeatureList>
              <li>NFTs generate $DINO through staking</li>
              <li>$DINO becomes the base collateral for minting sUSD</li>
              <li>sUSD unlocks synthetic assets: BTC, Gold, TSLA, SP&500, and more</li>
              <li>A shared debt pool governs risk and reward</li>
              <li>Liquidity providers earn $DINO and help sustain the system</li>
            </FeatureList>
            
            No shortcuts. No fake incentives.Just DeFi, rebuilt with intent.
          </SectionContent>
        </Section>
      </ContentWrapper>
      <RoadmapImage>
        <img src="/images/roadmaps.png" alt="Project Roadmap" />
      </RoadmapImage>
    </IntroductionSection>
  );
};

export default Introduction;