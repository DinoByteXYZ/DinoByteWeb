import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Press Start 2P';
    src: url('/fonts/PressStart2P-Regular.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'Orbitron';
    src: url('/fonts/Orbitron-Bold.ttf') format('truetype');
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    image-rendering: pixelated;
  }
  
  body {
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    font-family: ${props => props.theme.fonts.body};
    overflow-x: hidden;
    background-image: 
      linear-gradient(rgba(18, 18, 18, 0.9), rgba(8, 8, 8, 0.9)),
      url('/images/grid-bg.png');
    background-size: 100px 100px;
  }
  
  h1, h2, h3, h4 {
    font-family: ${props => props.theme.fonts.pixel};
    letter-spacing: 1px;
    margin-bottom: 1rem;
    text-shadow: ${props => props.theme.boxShadows.pixelated};
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      text-shadow: ${props => props.theme.boxShadows.neon};
    }
  }
  
  button {
    cursor: pointer;
  }
  
  ::selection {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.dark};
  }
`;

export default GlobalStyle; 