import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Tabs,
  Tab,
  Divider,
  TextField,
  InputAdornment,
  Fade,
  Zoom,
  Paper,
  Chip,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search, MusicNote, LibraryMusic, Equalizer, School, Headset, EmojiEvents, Star, StarBorder } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  gameListHeroSection: {
    background: 'linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)',
    padding: theme.spacing(6, 0),
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '0 0 20% 20%/30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/music-theory-academy/music-pattern.svg") center/cover',
    opacity: 0.1,
    zIndex: 0,
  },
  heroContentInner: {
    position: 'relative',
    zIndex: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s ease',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'var(--card-gradient)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: 'var(--hover-shadow)',
    },
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    background: 'var(--music-gradient)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cardMediaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 100%)',
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(2.5),
  },
  searchField: {
    marginBottom: theme.spacing(4),
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      },
    },
  },
  tabsContainer: {
    marginBottom: theme.spacing(4),
  },
  tabs: {
    '& .MuiTab-root': {
      minWidth: 100,
      borderRadius: '30px',
      margin: '0 8px',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    '& .Mui-selected': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      fontWeight: 600,
    },
    '& .MuiTabs-indicator': {
      height: 3,
      borderRadius: '3px',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  difficultyTag: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    color: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  beginnerTag: {
    backgroundColor: '#4caf50',
  },
  intermediateTag: {
    backgroundColor: '#ff9800',
  },
  advancedTag: {
    backgroundColor: '#f44336',
  },
  gameTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  gameDescription: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5),
  },
  gameButton: {
    borderRadius: '30px',
    padding: theme.spacing(1, 3),
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
  },
  popularityContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  popularityBar: {
    height: '4px',
    borderRadius: '2px',
    backgroundColor: 'rgba(63, 81, 181, 0.2)',
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  popularityFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
  },
  popularityText: {
    marginLeft: theme.spacing(1),
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
}));

const games = [
  {
    id: 1,
    title: '音階識別挑戰',
    description: '訓練您識別不同的音階和調式，從大調和小調開始，逐步進階到更複雜的調式。',
    icon: <MusicNote style={{ fontSize: 80, color: '#fff' }} />,
    category: '音階理論',
    difficulty: '初級',
    popularity: 95,
  },
  {
    id: 2,
    title: '和弦大師',
    description: '學習和識別各種和弦，從基本三和弦到複雜的七和弦和擴展和弦。',
    icon: <LibraryMusic style={{ fontSize: 80, color: '#fff' }} />,
    category: '和聲理論',
    difficulty: '中級',
    popularity: 88,
  },
  {
    id: 3,
    title: '節奏訓練營',
    description: '提高您的節奏感和時值理解，從基本節奏模式到複雜的節奏型態。',
    icon: <Equalizer style={{ fontSize: 80, color: '#fff' }} />,
    category: '節奏理論',
    difficulty: '初級',
    popularity: 92,
  },
  {
    id: 4,
    title: '樂理測驗',
    description: '測試您對音樂理論的理解，涵蓋從基礎符號到高級和聲分析的各個方面。',
    icon: <School style={{ fontSize: 80, color: '#fff' }} />,
    category: '綜合理論',
    difficulty: '高級',
    popularity: 85,
  },
  {
    id: 5,
    title: '音程訓練',
    description: '學習識別和演奏各種音程，從完全一度到複雜的增減音程。',
    icon: <MusicNote style={{ fontSize: 80, color: '#fff' }} />,
    category: '音階理論',
    difficulty: '中級',
    popularity: 80,
  },
  {
    id: 6,
    title: '調式探索',
    description: '深入探索各種調式，包括教會調式、爵士調式和世界音樂中的特殊調式。',
    icon: <LibraryMusic style={{ fontSize: 80, color: '#fff' }} />,
    category: '音階理論',
    difficulty: '高級',
    popularity: 75,
  },
  {
    id: 7,
    title: '和弦進行練習',
    description: '學習常見的和弦進行模式，從基本的I-IV-V到複雜的爵士和聲進行。',
    icon: <Equalizer style={{ fontSize: 80, color: '#fff' }} />,
    category: '和聲理論',
    difficulty: '中級',
    popularity: 82,
  },
  {
    id: 8,
    title: '視唱練耳基礎',
    description: '培養您的聽力技能，從單音識別到旋律和和弦的聽辨。',
    icon: <School style={{ fontSize: 80, color: '#fff' }} />,
    category: '聽力訓練',
    difficulty: '初級',
    popularity: 90,
  },
];

const GameList = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 過濾遊戲
  const filteredGames = games.filter((game) => {
    // 搜索詞過濾
    if (searchTerm && !game.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !game.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // 分類過濾
    if (tabValue === 1 && game.category !== '音階理論') return false;
    if (tabValue === 2 && game.category !== '和聲理論') return false;
    if (tabValue === 3 && game.category !== '節奏理論') return false;
    if (tabValue === 4 && game.category !== '聽力訓練') return false;
    if (tabValue === 5 && game.category !== '綜合理論') return false;
    
    return true;
  });

  // 根據難度獲取標籤樣式
  const getDifficultyTagClass = (difficulty) => {
    switch (difficulty) {
      case '初級':
        return `${classes.difficultyTag} ${classes.beginnerTag}`;
      case '中級':
        return `${classes.difficultyTag} ${classes.intermediateTag}`;
      case '高級':
        return `${classes.difficultyTag} ${classes.advancedTag}`;
      default:
        return classes.difficultyTag;
    }
  };

  return (
    <main>
      {/* 頂部英雄區 */}
      <div className={classes.gameListHeroSection}>
        <div className={classes.heroOverlay}></div>
        <Container maxWidth="md" className={classes.heroContentInner}>
          <Fade in timeout={800}>
            <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 700 }}>
              音樂理論遊戲
            </Typography>
          </Fade>
          
          <Fade in timeout={1000}>
            <Typography variant="h6" align="center" paragraph style={{ maxWidth: '800px', margin: '0 auto 24px' }}>
              選擇您想要挑戰的遊戲類型，提升您的音樂理論知識和技能。每個遊戲都有不同的難度級別，從初學者到高級水平。
            </Typography>
          </Fade>
        </Container>
      </div>

      <Container className={classes.cardGrid} maxWidth="md">
        {/* 搜索欄 */}
        <TextField
          className={classes.searchField}
          variant="outlined"
          fullWidth
          placeholder="搜索遊戲..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* 分類標籤 */}
        <div className={classes.tabsContainer}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="全部" />
            <Tab label="音階理論" />
            <Tab label="和聲理論" />
            <Tab label="節奏理論" />
            <Tab label="聽力訓練" />
            <Tab label="綜合理論" />
          </Tabs>
        </div>
        <Divider style={{ marginBottom: '24px' }} />

        {/* 遊戲列表 */}
        <Grid container spacing={4}>
          {filteredGames.map((game, index) => (
            <Grid item key={game.id} xs={12} sm={6} md={4}>
              <Zoom in timeout={800 + index * 200}>
                <Card className={`${classes.card} hover-card`}>
                  <CardMedia 
                    className={classes.cardMedia} 
                    title={game.title}
                    style={{ 
                      background: game.id === 1 ? 'linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)' :
                               game.id === 2 ? 'linear-gradient(135deg, #f50057 0%, #ff4081 100%)' :
                               game.id === 3 ? 'linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)' :
                                              'linear-gradient(135deg, #4caf50 0%, #81c784 100%)'
                    }}
                  >
                    <div className={classes.cardMediaOverlay}></div>
                    {game.icon}
                  </CardMedia>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.gameTitle}>
                      {game.title}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <span className={getDifficultyTagClass(game.difficulty)}>{game.difficulty}</span>
                      <Typography variant="body2" color="textSecondary" component="span">
                        {game.category}
                      </Typography>
                    </Box>
                    <Typography variant="body2" paragraph className={classes.gameDescription}>
                      {game.description}
                    </Typography>
                    
                    <div className={classes.popularityContainer}>
                      <div className={classes.popularityBar}>
                        <div 
                          className={classes.popularityFill} 
                          style={{ width: `${game.popularity}%` }}
                        />
                      </div>
                      <span className={classes.popularityText}>{game.popularity}%</span>
                    </div>
                  </CardContent>
                  <Box p={2} pt={0}>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      fullWidth
                      component={RouterLink}
                      to={`/games/${game.id}`}
                      className={`${classes.gameButton} pulse-button`}
                    >
                      開始遊戲
                    </Button>
                  </Box>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>

        {/* 無結果提示 */}
        {filteredGames.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="textSecondary">
              沒有找到符合條件的遊戲
            </Typography>
          </Box>
        )}
      </Container>
    </main>
  );
};

export default GameList;