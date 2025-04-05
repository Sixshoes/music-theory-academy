import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MusicNote, LibraryMusic, Equalizer, ArrowBack, EmojiEvents } from '@material-ui/icons';

// 導入遊戲組件
import ScaleIdentification from './ScaleIdentification';
import ChordMaster from './ChordMaster';
import RhythmTraining from './RhythmTraining';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
  },
  gameContainer: {
    marginTop: theme.spacing(3),
  },
  levelCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  },
  levelCardContent: {
    flexGrow: 1,
  },
  levelCardActions: {
    justifyContent: 'center',
  },
  backButton: {
    marginBottom: theme.spacing(2),
  },
  gameIcon: {
    fontSize: 40,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  resultContainer: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  resultIcon: {
    fontSize: 60,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

const GameSelector = () => {
  const classes = useStyles();
  const [selectedGame, setSelectedGame] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // 遊戲定義
  const games = [
    {
      id: 'scale',
      name: '音階識別挑戰',
      description: '訓練您識別不同的音階和調式，從大調和小調開始，逐步進階到更複雜的調式。',
      icon: <MusicNote className={classes.gameIcon} />,
      component: ScaleIdentification,
      levels: [
        { level: 1, name: '初級', description: '大調和小調的識別' },
        { level: 2, name: '中級', description: '和聲小調與旋律小調的識別' },
        { level: 3, name: '高級', description: '教會調式的識別' },
      ],
    },
    {
      id: 'chord',
      name: '和弦大師',
      description: '學習和識別各種和弦，從基本三和弦到複雜的七和弦和擴展和弦。',
      icon: <LibraryMusic className={classes.gameIcon} />,
      component: ChordMaster,
      levels: [
        { level: 1, name: '初級', description: '基本三和弦的識別' },
        { level: 2, name: '中級', description: '七和弦的識別' },
        { level: 3, name: '高級', description: '和弦轉位的識別' },
      ],
    },
    {
      id: 'rhythm',
      name: '節奏訓練營',
      description: '提高您的節奏感和時值理解，從基本節奏模式到複雜的節奏型態。',
      icon: <Equalizer className={classes.gameIcon} />,
      component: RhythmTraining,
      levels: [
        { level: 1, name: '初級', description: '基本節奏模式' },
        { level: 2, name: '中級', description: '複合拍子和切分音' },
        { level: 3, name: '高級', description: '變換拍號和複雜節奏' },
      ],
    },
  ];

  // 處理遊戲選擇
  const handleGameChange = (event, newValue) => {
    setSelectedGame(newValue);
    setSelectedLevel(null);
    setShowLevelSelection(false);
    setGameResult(null);
    setShowResult(false);
  };

  // 開始遊戲
  const handleStartGame = () => {
    setShowLevelSelection(true);
  };

  // 選擇級別
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setShowLevelSelection(false);
  };

  // 返回遊戲選擇
  const handleBackToGameSelection = () => {
    setSelectedLevel(null);
    setGameResult(null);
    setShowResult(false);
  };

  // 返回級別選擇
  const handleBackToLevelSelection = () => {
    setSelectedLevel(null);
    setShowLevelSelection(true);
    setGameResult(null);
    setShowResult(false);
  };

  // 遊戲完成處理
  const handleGameComplete = (result) => {
    setGameResult(result);
    setShowResult(true);
  };

  // 再玩一次
  const handlePlayAgain = () => {
    setShowResult(false);
    setGameResult(null);
  };

  // 嘗試新級別
  const handleTryNewLevel = () => {
    setSelectedLevel(null);
    setShowLevelSelection(true);
    setGameResult(null);
    setShowResult(false);
  };

  // 渲染遊戲結果
  const renderGameResult = () => {
    if (!gameResult) return null;

    const { score, totalQuestions, level } = gameResult;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 70;

    return (
      <Box className={classes.resultContainer}>
        <EmojiEvents className={classes.resultIcon} />
        <Typography variant="h5" gutterBottom>
          遊戲結束！
        </Typography>
        <Typography variant="h6" gutterBottom>
          您的得分: {score} / {totalQuestions} ({percentage}%)
        </Typography>
        <Typography variant="body1" paragraph>
          {isPassed
            ? '恭喜！您已成功通過這個級別。'
            : '再接再厲！您需要達到70%的正確率才能通過級別。'}
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlayAgain}
            style={{ marginRight: 16 }}
          >
            再玩一次
          </Button>
          <Button variant="outlined" color="primary" onClick={handleTryNewLevel}>
            嘗試其他級別
          </Button>
        </Box>
      </Box>
    );
  };

  // 渲染級別選擇
  const renderLevelSelection = () => {
    const currentGame = games[selectedGame];

    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => setShowLevelSelection(false)}
          className={classes.backButton}
        >
          返回
        </Button>

        <Typography variant="h5" gutterBottom>
          選擇 {currentGame.name} 的難度級別
        </Typography>

        <Grid container spacing={3}>
          {currentGame.levels.map((level) => (
            <Grid item xs={12} sm={4} key={level.level}>
              <Card className={classes.levelCard}>
                <CardContent className={classes.levelCardContent}>
                  <Typography variant="h6" gutterBottom>
                    {level.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {level.description}
                  </Typography>
                </CardContent>
                <CardActions className={classes.levelCardActions}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleLevelSelect(level.level)}
                  >
                    開始
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // 渲染遊戲組件
  const renderGameComponent = () => {
    const currentGame = games[selectedGame];
    const GameComponent = currentGame.component;

    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToLevelSelection}
          className={classes.backButton}
        >
          返回級別選擇
        </Button>

        <GameComponent level={selectedLevel} onComplete={handleGameComplete} />
      </Box>
    );
  };

  // 渲染遊戲選擇
  const renderGameSelection = () => {
    const currentGame = games[selectedGame];

    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          {currentGame.name}
        </Typography>
        <Typography variant="body1" paragraph>
          {currentGame.description}
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          {currentGame.icon}
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" onClick={handleStartGame}>
            開始遊戲
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          value={selectedGame}
          onChange={handleGameChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {games.map((game, index) => (
            <Tab key={game.id} label={game.name} icon={React.cloneElement(game.icon, { style: { fontSize: 24 } })} />
          ))}
        </Tabs>

        <Box p={3} className={classes.gameContainer}>
          {showResult
            ? renderGameResult()
            : selectedLevel
            ? renderGameComponent()
            : showLevelSelection
            ? renderLevelSelection()
            : renderGameSelection()}
        </Box>
      </Paper>
    </div>
  );
};

export default GameSelector;