const theme = {
  colors: {
    primary: '#FF00FF', // 
    secondary: '#00FFFF', // 
    accent: '#33FF33', // 
    dark: '#121212',
    darker: '#080808',
    light: '#EFEFEF',

    gradients: {
      primary: 'linear-gradient(45deg, #FF00FF, #00FFFF)',
      secondary: 'linear-gradient(45deg, #00FFFF, #33FF33)',
    }
  },
  fonts: {
    pixel: '"Press Start 2P", cursive',
    tech: '"Orbitron", sans-serif',
    body: 'Arial, sans-serif',
  },
  borders: {
    pixel: '4px solid #FF00FF',
    pixelDouble: '4px double #00FFFF',
  },
  boxShadows: {
    neon: '0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF',
    pixelated: '2px 2px 0 #000000',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
  }
};

export default theme; 