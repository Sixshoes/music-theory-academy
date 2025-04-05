import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Zoom,
  Fade,
  Paper,
  IconButton,
  Divider,
  Chip,
  CardActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  MusicNote, LibraryMusic, Equalizer, School, Headset, EmojiEvents, 
  Palette, KeyboardArrowDown, Star, Forum, Alarm, ArrowForward, 
  Info as InfoIcon, PersonAdd as PersonAddIcon, LockOpen as LockOpenIcon 
} from '@mui/icons-material';
import { 
  MusicNote as MusicNoteIcon, QueueMusic as QueueMusicIcon, 
  GraphicEq as GraphicEqIcon, Radio as RadioIcon, Album as AlbumIcon 
} from '@mui/icons-material';
import { theme } from '../App';

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0, 15, 0),
  background: 'var(--background-gradient)',
  color: theme.palette.primary.contrastText,
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  borderBottom: '1px solid var(--primary-color)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/music-pattern.svg)',
    backgroundSize: '400px',
    opacity: 0.07,
  }
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  background: 'var(--music-gradient)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  display: 'inline-block',
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: '800px',
  margin: '0 auto',
  opacity: 0.9,
  fontWeight: 300,
}));

const FeatureButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 3),
  borderRadius: '24px',
  fontWeight: 'bold',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.1) 50%)',
    backgroundSize: '250% 250%',
    backgroundPosition: '100% 100%',
    transition: 'all 0.5s ease',
  },
  '&:hover:before': {
    backgroundPosition: '0 0',
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: 'var(--card-bg)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: 'var(--hover-shadow)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(63, 81, 181, 0.1)',
  borderRadius: '50%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: 'var(--primary-color)',
  boxShadow: 'var(--primary-glow)',
}));

const GameCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: 'var(--hover-shadow)',
  }
}));

const GameMedia = styled(CardMedia)(({ theme }) => ({
  height: 160,
  backgroundSize: 'cover',
}));

const GameContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

const GameChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: 'rgba(63, 81, 181, 0.1)',
  color: 'var(--text-primary)',
  border: '1px solid var(--primary-color)',
  '& .MuiChip-label': {
    padding: '0 8px',
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    width: 60,
    height: 3,
    transform: 'translateX(-50%)',
    background: 'var(--secondary-color)',
    boxShadow: 'var(--neon-glow)',
  }
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(8, 0),
  backgroundImage: 'var(--cyberpunk-line)',
  height: '2px',
}));

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(5),
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(63, 81, 181, 0.1)',
  color: 'var(--text-primary)',
  animation: 'bounce 2s infinite',
  boxShadow: 'var(--neon-glow)',
  '&:hover': {
    backgroundColor: 'rgba(63, 81, 181, 0.2)',
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateX(-50%) translateY(0)',
    },
    '40%': {
      transform: 'translateX(-50%) translateY(-10px)',
    },
    '60%': {
      transform: 'translateX(-50%) translateY(-5px)',
    }
  }
}));

const Home = () => {
  const [animateHero, setAnimateHero] = useState(false);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [animateGames, setAnimateGames] = useState(false);

  useEffect(() => {
    setAnimateHero(true);
    const featuresTimer = setTimeout(() => setAnimateFeatures(true), 800);
    const gamesTimer = setTimeout(() => setAnimateGames(true), 1200);

    return () => {
      clearTimeout(featuresTimer);
      clearTimeout(gamesTimer);
    };
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({
      behavior: 'smooth'
    });
  };

  const featuredGames = [
    {
      id: 'rhythm',
      title: '節奏訓練',
      description: '培養你的節奏感，通過互動式練習掌握複雜的音樂節奏。',
      image: '/images/game-rhythm.jpg',
      level: '初級到進階',
      tags: ['節奏', '打拍子', '節拍器']
    },
    {
      id: 'notes',
      title: '音符識別',
      description: '通過有趣的遊戲學習五線譜，提高您的視譜能力。',
      image: '/images/game-notes.jpg',
      level: '初級',
      tags: ['五線譜', '音符', '記憶力']
    },
    {
      id: 'intervals',
      title: '音程訓練',
      description: '訓練您識別不同音程的能力，從基礎到複雜的音程關係。',
      image: '/images/game-intervals.jpg',
      level: '中級',
      tags: ['音程', '聽力', '關係']
    },
    {
      id: 'chords',
      title: '和弦分析',
      description: '學習辨認各種和弦並理解它們在音樂中的功能。',
      image: '/images/game-chords.jpg',
      level: '中高級',
      tags: ['和弦', '和聲', '功能']
    }
  ];

  const features = [
    {
      icon: <Equalizer fontSize="large" />,
      title: '互動練習',
      description: '通過即時反饋和評分系統，提高您的音樂技能。'
    },
    {
      icon: <School fontSize="large" />,
      title: '理論指導',
      description: '獲取清晰的理論解釋和實際應用的示例。'
    },
    {
      icon: <Headset fontSize="large" />,
      title: '聽覺訓練',
      description: '培養辨別音高、節奏和和聲的能力。'
    },
    {
      icon: <EmojiEvents fontSize="large" />,
      title: '成就系統',
      description: '獲得徽章和獎勵，追蹤您的進步。'
    },
    {
      icon: <LibraryMusic fontSize="large" />,
      title: '學習資源',
      description: '豐富的教育內容幫助您深入理解音樂理論。'
    },
    {
      icon: <Palette fontSize="large" />,
      title: '視覺化學習',
      description: '通過動畫和互動圖表直觀地理解抽象概念。'
    }
  ];

  return (
    <>
      <Fade in={animateHero} timeout={1000}>
        <HeroSection>
          <Container maxWidth="md">
            <HeroTitle variant="h2" component="h1">
              音樂理論學院
            </HeroTitle>
            <HeroSubtitle variant="h5">
              通過互動遊戲和練習輕鬆學習音樂理論，提升您的音樂技能和理解力
            </HeroSubtitle>
            <Box marginTop={4}>
              <FeatureButton
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/games"
                startIcon={<PlayArrow />}
              >
                開始練習
              </FeatureButton>
              <FeatureButton
                variant="outlined"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/resources"
                startIcon={<LibraryMusic />}
              >
                瀏覽課程
              </FeatureButton>
            </Box>
          </Container>
          <ScrollDownButton onClick={scrollToFeatures} aria-label="捲動到特色內容">
            <KeyboardArrowDown />
          </ScrollDownButton>
        </HeroSection>
      </Fade>

      <Container component="section" id="features" maxWidth="lg" sx={{ py: 8 }}>
        <Zoom in={animateFeatures} timeout={500}>
          <Box>
            <SectionTitle variant="h3" gutterBottom>
              為什麼選擇我們的平台？
            </SectionTitle>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <FeatureCard elevation={0}>
                    <FeatureIcon>
                      {feature.icon}
                    </FeatureIcon>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                      {feature.description}
                    </Typography>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Zoom>
      </Container>

      <StyledDivider />

      <Container component="section" maxWidth="lg" sx={{ py: 6 }}>
        <Fade in={animateGames} timeout={800}>
          <Box>
            <SectionTitle variant="h3" gutterBottom>
              熱門練習遊戲
            </SectionTitle>
            <Grid container spacing={4}>
              {featuredGames.map((game) => (
                <Grid item xs={12} sm={6} md={3} key={game.id}>
                  <GameCard>
                    <GameMedia
                      image={game.image}
                      title={game.title}
                    />
                    <GameContent>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {game.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {game.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        難度: {game.level}
                      </Typography>
                      <Box mt={1}>
                        {game.tags.map((tag) => (
                          <GameChip
                            key={tag}
                            size="small"
                            label={tag}
                          />
                        ))}
                      </Box>
                    </GameContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        component={RouterLink}
                        to={`/games/${game.id}`}
                        endIcon={<ArrowForward />}
                      >
                        開始練習
                      </Button>
                    </CardActions>
                  </GameCard>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={6}>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/games"
                size="large"
              >
                查看所有練習遊戲
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>

      <StyledDivider />

      <Container component="section" maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'rgba(26, 31, 53, 0.5)' }}>
          <Box textAlign="center">
            <MusicNoteIcon color="secondary" fontSize="large" />
            <Typography variant="h4" gutterBottom>
              準備好提升您的音樂技能了嗎？
            </Typography>
            <Typography variant="body1" paragraph>
              無論您是音樂學習的初學者還是尋求進階技能的音樂家，
              我們的平台都能提供適合您需求的互動式學習體驗。
            </Typography>
            <Box mt={3}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/games"
                startIcon={<PersonAddIcon />}
              >
                立即開始
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Home;