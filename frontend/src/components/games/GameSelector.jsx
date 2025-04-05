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
        { level: 1, name: '大調與小調基礎', description: '學習識別基本的大調和小調音階' },
        { level: 2, name: '和聲小調與旋律小調', description: '區分自然小調、和聲小調和旋律小調' },
        { level: 3, name: '教會調式入門', description: '學習識別七種基本的教會調式' },
        { level: 4, name: '爵士調式探索', description: '探索常見的爵士調式，如利底亞和混合利底亞' },
        { level: 5, name: '世界音樂調式', description: '學習來自不同文化的特殊調式，如五聲音階和藍調音階' },
      ],
    },
    {
      id: 'chord',
      name: '和弦大師',
      description: '學習和識別各種和弦，從基本三和弦到複雜的七和弦和擴展和弦。',
      icon: <LibraryMusic className={classes.gameIcon} />,
      component: ChordMaster,
      levels: [
        { level: 1, name: '基本三和弦', description: '學習識別大三和弦、小三和弦、增三和弦和減三和弦' },
        { level: 2, name: '七和弦', description: '探索屬七和弦、大七和弦和小七和弦的特性' },
        { level: 3, name: '和弦轉位', description: '學習識別三和弦和七和弦的各種轉位形式' },
        { level: 4, name: '擴展和弦', description: '掌握掛留和弦、九和弦和其他擴展和弦' },
        { level: 5, name: '高級和弦識別', description: '綜合練習各種複雜和弦的聽辨能力' },
      ],
    },
    {
      id: 'rhythm',
      name: '節奏訓練營',
      description: '提高您的節奏感和時值理解，從基本節奏模式到複雜的節奏型態。',
      icon: <Equalizer className={classes.gameIcon} />,
      component: RhythmTraining,
      levels: [
        { level: 1, name: '基本節奏模式', description: '學習基本的節奏符號和四分音符節奏' },
        { level: 2, name: '複合拍子和切分音', description: '探索複合拍子和切分音的應用' },
        { level: 3, name: '變換拍號和複雜節奏', description: '學習變換拍號和複雜節奏型態' },
        { level: 4, name: '多連音', description: '練習三連音、五連音等多連音的使用' },
        { level: 5, name: '節奏即興', description: '創作和模仿複雜的節奏模式' },
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