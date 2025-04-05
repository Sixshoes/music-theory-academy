import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, ThemeProvider, createTheme, Button, Snackbar, CssBaseline } from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';
import * as Tone from 'tone';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import GameList from './pages/GameList.jsx';
import GameDetail from './pages/GameDetail.jsx';
import GamePlay from './pages/GamePlay.jsx';
import NotFound from './pages/NotFound.jsx';
import Resources from './pages/Resources.jsx';
import Community from './pages/Community.jsx';
import './App.css';

// 科技感暗色主題
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
      dark: '#303f9f',
      light: '#7986cb',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00f2fe',
      dark: '#00b8d4',
      light: '#80ffff',
      contrastText: '#000',
    },
    accent: {
      main: '#f050e6',
      light: '#f894f2',
      dark: '#c910b8',
      contrastText: '#ffffff',
    },
    background: {
      paper: 'rgba(26, 32, 53, 0.8)',
      default: '#0a1929',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b8c4',
      disabled: '#6c7a9c',
      hint: '#6c7a9c',
    },
    error: {
      main: '#ff5370',
      light: '#ff867c',
      dark: '#c62f47',
    },
    success: {
      main: '#0df5e3',
      light: '#6ffffa',
      dark: '#00c2b1',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    h2: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: 1,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: 0.8,
    },
    h5: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: 0.4,
    },
    button: {
      fontWeight: 600,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(0, 0, 0, 0.3)',
    '0px 4px 12px rgba(0, 0, 0, 0.4)',
    '0px 8px 16px rgba(0, 0, 0, 0.5)',
    // ... 其他陰影保持默認
    ...Array(20).fill(''),
  ].slice(0, 25),
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          // 移除對 Google Fonts 的引用
        ],
      },
    },
    MuiButton: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        padding: '8px 16px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
        },
      },
      containedPrimary: {
        background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
      },
      containedSecondary: {
        background: 'linear-gradient(45deg, #00b8d4 30%, #00f2fe 90%)',
      },
    },
    MuiCard: {
      root: {
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: 'rgba(26, 32, 53, 0.8)',
      },
      elevation1: {
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
      },
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: 'rgba(26, 31, 53, 0.8)',
        backdropFilter: 'blur(10px)',
      },
    },
    MuiIconButton: {
      root: {
        color: '#a0a8d9',
        '&:hover': {
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
        },
      },
    },
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
        },
      },
    },
    MuiInputBase: {
      root: {
        '&.Mui-focused': {
          boxShadow: '0 0 0 2px rgba(63, 81, 181, 0.25)',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 8,
        '&:hover $notchedOutline': {
          borderColor: 'rgba(63, 81, 181, 0.5)',
        },
        '&.Mui-focused $notchedOutline': {
          borderColor: '#3f51b5',
          borderWidth: 2,
        },
      },
      notchedOutline: {
        borderColor: 'rgba(160, 168, 217, 0.23)',
      },
    },
    MuiDialog: {
      paper: {
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        backgroundImage: 'linear-gradient(rgba(26, 31, 53, 0.8), rgba(26, 31, 53, 0.95))',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(63, 81, 181, 0.15)',
      },
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 5,
        height: 8,
      },
      barColorPrimary: {
        backgroundImage: 'linear-gradient(90deg, #3f51b5, #00f2fe)',
      },
    },
  },
});

// Export theme for use in other components if needed
export { theme };

// 全局音頻初始化組件
const AudioInitializer = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  
  const initializeAudio = () => {
    // 初始化 Tone.js
    if (Tone.context.state !== 'running') {
      Tone.context.resume().then(() => {
        console.log('音頻上下文已啟動');
        setShowPrompt(false);
      });
    } else {
      setShowPrompt(false);
    }
  };
  
  // 點擊頁面任何地方自動初始化
  useEffect(() => {
    const handleClick = () => {
      initializeAudio();
    };
    
    window.addEventListener('click', handleClick, { once: true });
    
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  
  return (
    <Snackbar
      open={showPrompt}
      message="點擊頁面任意處或此按鈕以啟用音頻功能，獲得完整體驗"
      action={
        <Button color="secondary" size="small" onClick={initializeAudio}>
          <VolumeUp style={{ marginRight: '8px' }} />
          啟用音頻
        </Button>
      }
      style={{ 
        bottom: '80px',
        boxShadow: '0 0 10px rgba(0, 242, 254, 0.5)' 
      }}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/games/:gameId/play" element={<GamePlay />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
      <AudioInitializer />
    </ThemeProvider>
  );
};

export default App;