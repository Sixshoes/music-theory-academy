import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MusicNote,
  Star,
  StarBorder,
  PlayArrow,
  Info,
  School,
  EmojiEvents,
  CheckCircle,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  gameHeroSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0),
  },
  gameDetailContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  gameIcon: {
    fontSize: 80,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  gameHeader: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
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
  difficultyChip: {
    marginLeft: theme.spacing(1),
  },
  beginnerChip: {
    backgroundColor: '#4caf50',
    color: 'white',
  },
  intermediateChip: {
    backgroundColor: '#ff9800',
    color: 'white',
  },
  advancedChip: {
    backgroundColor: '#f44336',
    color: 'white',
  },
  instructionsPaper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    backgroundColor: '#f8f9fa',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  starIcon: {
    color: '#ffc107',
  },
  popularityChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginLeft: theme.spacing(2),
  },
}));

// 模擬遊戲數據
const games = [
  {
    id: 1,
    title: '音階識別挑戰',
    description: '訓練您識別不同的音階和調式，從大調和小調開始，逐步進階到更複雜的調式。',
    longDescription:
      '音階是音樂的基礎，掌握不同的音階和調式對於理解和創作音樂至關重要。本遊戲將幫助您訓練耳朵識別各種音階，從基本的大調和小調開始，逐步進階到教會調式、爵士調式和世界音樂中的特殊調式。通過互動式練習和測驗，您將能夠快速提高您的音階識別能力。',
    category: '音階理論',
    difficulty: '初級',
    rating: 4.8,
    popularity: 95,
    instructions:
      '在每個關卡中，您將聽到一個音階。您需要從給出的選項中選擇正確的音階名稱。您可以重複聆聽音階，但這會降低您獲得的分數。隨著關卡的進展，難度會逐漸增加，音階的種類會更加多樣化。',
    levels: [
      {
        level: 1,
        name: '大調與小調基礎',
        description: '學習識別基本的大調和小調音階',
        difficulty: '初級',
        questions: 10,
        passingScore: 70,
      },
      {
        level: 2,
        name: '和聲小調與旋律小調',
        description: '區分自然小調、和聲小調和旋律小調',
        difficulty: '初級',
        questions: 12,
        passingScore: 75,
      },
      {
        level: 3,
        name: '教會調式入門',
        description: '學習識別七種基本的教會調式',
        difficulty: '中級',
        questions: 15,
        passingScore: 80,
      },
      {
        level: 4,
        name: '爵士調式探索',
        description: '探索常見的爵士調式，如利底亞和混合利底亞',
        difficulty: '中級',
        questions: 15,
        passingScore: 80,
      },
      {
        level: 5,
        name: '世界音樂調式',
        description: '學習來自不同文化的特殊調式',
        difficulty: '高級',
        questions: 20,
        passingScore: 85,
      },
    ],
    benefits: [
      '提高音階識別能力',
      '增強音樂聽力',
      '擴展音樂理論知識',
      '為和聲分析打下基礎',
      '提高即興演奏和作曲能力',
    ],
  },
  {
    id: 2,
    title: '和弦大師',
    description: '學習和識別各種和弦，從基本三和弦到複雜的七和弦和擴展和弦。',
    longDescription:
      '和弦是現代音樂的核心元素，理解和識別不同類型的和弦對於音樂創作、編曲和即興演奏至關重要。本遊戲將幫助您從基本的大三和弦和小三和弦開始，逐步學習增三和弦、減三和弦、七和弦、九和弦等更複雜的和弦結構。通過聽力訓練和視覺輔助，您將能夠快速提高和弦識別能力。',
    category: '和聲理論',
    difficulty: '中級',
    rating: 4.7,
    popularity: 88,
    instructions:
      '在每個關卡中，您將聽到一個和弦。您需要從給出的選項中選擇正確的和弦類型。您可以重複聆聽和弦，但這會降低您獲得的分數。隨著關卡的進展，和弦的種類會更加多樣化，並會包含不同的轉位形式。',
    levels: [
      {
        level: 1,
        name: '基本三和弦',
        description: '學習識別大三和弦、小三和弦、增三和弦和減三和弦',
        difficulty: '初級',
        questions: 12,
        passingScore: 75,
      },
      {
        level: 2,
        name: '三和弦轉位',
        description: '識別三和弦的原位、第一轉位和第二轉位',
        difficulty: '中級',
        questions: 15,
        passingScore: 80,
      },
      {
        level: 3,
        name: '七和弦基礎',
        description: '學習識別大七和弦、屬七和弦、小七和弦和半減七和弦',
        difficulty: '中級',
        questions: 15,
        passingScore: 80,
      },
      {
        level: 4,
        name: '七和弦轉位',
        description: '識別七和弦的各種轉位形式',
        difficulty: '高級',
        questions: 18,
        passingScore: 85,
      },
      {
        level: 5,
        name: '擴展和弦',
        description: '探索九和弦、十一和弦和十三和弦',
        difficulty: '高級',
        questions: 20,
        passingScore: 85,
      },
    ],
    benefits: [
      '提高和弦識別能力',
      '增強和聲聽力',
      '擴展和聲理論知識',
      '提高即興伴奏能力',
      '增強編曲和作曲技巧',
    ],
  },
  {
    id: 3,
    title: '節奏訓練營',
    description: '提高您的節奏感和時值理解，從基本節奏模式到複雜的節奏型態。',
    longDescription:
      '節奏是音樂的時間維度，是音樂表達的重要元素。本遊戲將幫助您從基本的節奏模式開始，逐步學習更複雜的節奏型態，包括不同的拍號、切分音、多連音和變化節奏。通過互動式練習和測驗，您將能夠提高您的節奏感和時值理解能力。',
    category: '節奏理論',
    difficulty: '初級',
    rating: 4.6,
    popularity: 92,
    instructions:
      '在每個關卡中，您將看到或聽到一個節奏模式。您需要通過點擊或敲擊來重現這個節奏，或從給出的選項中選擇正確的節奏記號。隨著關卡的進展，節奏模式會變得更加複雜，並會包含不同的拍號和節奏變化。',
    levels: [
      {
        level: 1,
        name: '基本節奏模式',
        description: '學習基本的節奏符號和簡單拍子',
        difficulty: '初級',
        questions: 10,
        passingScore: 70,
      },
      {
        level: 2,
        name: '複合拍子',
        description: '探索複合拍子和相關的節奏模式',
        difficulty: '初級',
        questions: 12,
        passingScore: 75,
      },
      {
        level: 3,
        name: '切分音和附點節奏',
        description: '學習切分音和附點節奏的應用',
        difficulty: '中級',
        questions: 15,
        passingScore: 80,
      },
      {
        level: 4,
        name: '多連音',
        description: '探索三連音、五連音等多連音的使用',
        difficulty: '中級',
        questions: 15,
        passingScore: 80,
      },
      {
        level: 5,
        name: '變化節奏和不規則拍子',
        description: '學習變化節奏和不規則拍子的應用',
        difficulty: '高級',
        questions: 20,
        passingScore: 85,
      },
    ],
    benefits: [
      '提高節奏感和時值理解',
      '增強音樂表現力',
      '提高視譜和演奏能力',
      '擴展節奏理論知識',
      '增強即興創作能力',
    ],
  },
  {
    id: 4,
    title: '樂理測驗',
    description: '測試您對音樂理論的理解，涵蓋從基礎符號到高級和聲分析的各個方面。',
    longDescription:
      '音樂理論是理解和創作音樂的基礎。本遊戲將測試您對音樂理論的全面理解，從基本的音樂符號和術語開始，逐步深入到調性、和聲、曲式和分析等高級主題。通過多樣化的問題和挑戰，您將能夠鞏固您的音樂理論知識，發現需要加強的領域。',
    category: '綜合理論',
    difficulty: '高級',
    rating: 4.9,
    popularity: 85,
    instructions:
      '在每個關卡中，您將面對不同類型的音樂理論問題，包括選擇題、填空題和分析題。您需要根據問題的要求選擇正確的答案或提供適當的分析。隨著關卡的進展，問題的難度會逐漸增加，涵蓋的主題也會更加廣泛和深入。',
    levels: [
      {
        level: 1,
        name: '基礎樂理',
        description: '測試基本的音樂符號、術語和概念',
        difficulty: '初級',
        questions: 15,
        passingScore: 75,
      },
      {
        level: 2,
        name: '音階與調性',
        description: '探索音階、調性和相關概念',
        difficulty: '中級',
        questions: 15,
        passingScore: 80,
      },
      {
        level: 3,
        name: '和聲分析',
        description: '學習和弦進行和和聲分析',
        difficulty: '中級',
        questions: 18,
        passingScore: 80,
      },
      {
        level: 4,
        name: '曲式與結構',
        description: '探索音樂的形式和結構',
        difficulty: '高級',
        questions: 18,
        passingScore: 85,
      },
      {
        level: 5,
        name: '高級音樂分析',
        description: '進行全面的音樂作品分析',
        difficulty: '高級',
        questions: 20,
        passingScore: 85,
      },
    ],
    benefits: [
      '鞏固音樂理論知識',
      '提高音樂分析能力',
      '增強音樂創作技巧',
      '擴展音樂詞彙',
      '提高音樂欣賞水平',
    ],
  },
];

const GameDetail = () => {
  const classes = useStyles();
  const { gameId } = useParams();
  
  // 根據gameId查找遊戲數據
  const game = games.find((g) => g.id === parseInt(gameId)) || games[0];

  // 根據難度獲取Chip樣式
  const getDifficultyChipClass = (difficulty) => {
    switch (difficulty) {
      case '初級':
        return classes.beginnerChip;
      case '中級':
        return classes.intermediateChip;
      case '高級':
        return classes.advancedChip;
      default:
        return '';
    }
  };

  // 渲染評分星星
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className={classes.starIcon} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className={classes.starIcon} />);
      } else {
        stars.push(<StarBorder key={i} className={classes.starIcon} />);
      }
    }

    return stars;
  };

  return (
    <main>
      {/* 遊戲標題區 */}
      <div className={classes.gameHeroSection}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center" className={classes.gameHeader}>
            <Grid item xs={12} md={2} align="center">
              <MusicNote className={classes.gameIcon} />
            </Grid>
            <Grid item xs={12} md={10}>
              <Box display="flex" alignItems="center">
                <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
                  {game.title}
                </Typography>
                <Chip
                  label={game.difficulty}
                  className={`${classes.difficultyChip} ${getDifficultyChipClass(game.difficulty)}`}
                />
              </Box>
              <Box className={classes.ratingContainer}>
                {renderRating(game.rating)}
                <Typography variant="body1" style={{ marginLeft: '8px' }}>
                  {game.rating}/5
                </Typography>
                <Chip
                  icon={<EmojiEvents fontSize="small" />}
                  label={`人氣: ${game.popularity}%`}
                  className={classes.popularityChip}
                  size="small"
                />
              </Box>
              <Typography variant="subtitle1" color="textSecondary">
                分類: {game.category}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container className={classes.gameDetailContainer} maxWidth="md">
        {/* 遊戲描述 */}
        <Typography variant="body1" paragraph>
          {game.longDescription}
        </Typography>

        {/* 遊戲說明 */}
        <Typography variant="h5" className={classes.sectionTitle}>
          遊戲說明
        </Typography>
        <Paper className={classes.instructionsPaper} elevation={0}>
          <Typography variant="body1">{game.instructions}</Typography>
        </Paper>

        {/* 遊戲關卡 */}
        <Typography variant="h5" className={classes.sectionTitle}>
          遊戲關卡
        </Typography>
        <Grid container spacing={3}>
          {game.levels.map((level) => (
            <Grid item key={level.level} xs={12} sm={6} md={4}>
              <Card className={classes.levelCard}>
                <CardContent className={classes.levelCardContent}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {level.level}. {level.name}
                  </Typography>
                  <Chip
                    label={level.difficulty}
                    size="small"
                    className={getDifficultyChipClass(level.difficulty)}
                    style={{ marginBottom: '12px' }}
                  />
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {level.description}
                  </Typography>
                  <Typography variant="body2">
                    問題數量: {level.questions}
                  </Typography>
                  <Typography variant="body2">
                    通過分數: {level.passingScore}%
                  </Typography>
                </CardContent>
                <Box p={2} pt={0}>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    fullWidth
                    startIcon={<PlayArrow />}
                    component={RouterLink}
                    to={`/games/${game.id}/play?level=${level.level}`}
                  >
                    開始遊戲
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 學習收益 */}
        <Typography variant="h5" className={classes.sectionTitle}>
          學習收益
        </Typography>
        <List>
          {game.benefits.map((benefit, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary={benefit} />
            </ListItem>
          ))}
        </List>

        <Divider style={{ margin: '32px 0' }} />

        {/* 行動按鈕 */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PlayArrow />}
            component={RouterLink}
            to={`/games/${game.id}/play`}
            style={{ marginRight: '16px' }}
          >
            開始遊戲
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<Info />}
            component={RouterLink}
            to="/resources"
          >
            相關學習資源
          </Button>
        </Box>
      </Container>
    </main>
  );
};

export default GameDetail;