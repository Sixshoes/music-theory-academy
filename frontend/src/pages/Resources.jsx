import React, { useState } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Search,
  Book,
  VideoLibrary,
  MusicNote,
  MenuBook,
  ExpandMore,
  Bookmark,
  PlayArrow,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0),
  },
  resourcesContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    },
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: theme.palette.grey[200],
  },
  cardContent: {
    flexGrow: 1,
  },
  searchField: {
    marginBottom: theme.spacing(4),
  },
  tabsContainer: {
    marginBottom: theme.spacing(4),
  },
  resourceIcon: {
    fontSize: 100,
    color: theme.palette.primary.main,
    opacity: 0.8,
  },
  resourceType: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
  glossaryItem: {
    marginBottom: theme.spacing(2),
  },
  glossaryTerm: {
    fontWeight: 'bold',
  },
}));

// 模擬資源數據
const resources = [
  {
    id: 1,
    title: '音階理論基礎',
    description: '學習音樂中的各種音階，包括大調、小調和教會調式等。',
    type: '教程',
    category: '音階理論',
    icon: <Book className="resource-icon" />,
    content: {
      sections: [
        {
          title: '什麼是音階？',
          text: '音階是一組按照特定規則排列的音符，通常在一個八度內。音階是音樂理論的基礎，也是創作和演奏音樂的重要工具。',
        },
        {
          title: '大調音階',
          text: '大調音階是最常見的音階之一，它的音程排列為：全全半全全全半。C大調音階包含的音符是：C, D, E, F, G, A, B, C。',
        },
        {
          title: '小調音階',
          text: '小調音階有三種形式：自然小調、和聲小調和旋律小調。自然小調的音程排列為：全半全全半全全。a小調音階包含的音符是：A, B, C, D, E, F, G, A。',
        },
      ],
    },
  },
  {
    id: 2,
    title: '和弦構成與應用',
    description: '深入了解和弦的構成、功能和在音樂中的應用。',
    type: '教程',
    category: '和聲理論',
    icon: <Book className="resource-icon" />,
    content: {
      sections: [
        {
          title: '什麼是和弦？',
          text: '和弦是三個或更多音符的組合，這些音符同時發聲形成和諧的聲音。最基本的和弦是三和弦，由根音、三度音和五度音組成。',
        },
        {
          title: '三和弦類型',
          text: '三和弦有四種基本類型：大三和弦（根音、大三度、完全五度）、小三和弦（根音、小三度、完全五度）、增三和弦（根音、大三度、增五度）和減三和弦（根音、小三度、減五度）。',
        },
        {
          title: '和弦進行',
          text: '和弦進行是和弦按照特定順序排列的序列。常見的和弦進行包括I-IV-V-I、I-vi-IV-V等。和弦進行是創作歌曲和音樂作品的基礎。',
        },
      ],
    },
  },
  {
    id: 3,
    title: '節奏與拍子',
    description: '學習音樂中的節奏概念、拍子類型和節奏記譜法。',
    type: '教程',
    category: '節奏理論',
    icon: <Book className="resource-icon" />,
    content: {
      sections: [
        {
          title: '什麼是節奏？',
          text: '節奏是音樂中的時間元素，它決定了音符的長短和強弱關係。良好的節奏感是音樂表達的重要部分。',
        },
        {
          title: '拍子類型',
          text: '拍子是音樂中的時間組織方式，分為簡單拍子（如2/4、3/4、4/4）和複合拍子（如6/8、9/8、12/8）。拍子決定了音樂的基本脈動和強弱規律。',
        },
        {
          title: '常見節奏型',
          text: '常見的節奏型包括切分音、附點節奏、三連音等。這些節奏型的運用可以使音樂更加豐富多彩。',
        },
      ],
    },
  },
  {
    id: 4,
    title: '視唱練耳入門',
    description: '通過系統的訓練提高您的音樂聽力和視唱能力。',
    type: '視頻',
    category: '聽力訓練',
    icon: <VideoLibrary className="resource-icon" />,
    content: {
      videoUrl: 'https://example.com/video1',
      duration: '45:30',
      topics: ['音高識別', '節奏聽寫', '旋律聽寫', '和弦識別'],
    },
  },
  {
    id: 5,
    title: '鋼琴和弦指法',
    description: '學習在鋼琴上彈奏各種和弦的正確指法和技巧。',
    type: '視頻',
    category: '和聲理論',
    icon: <VideoLibrary className="resource-icon" />,
    content: {
      videoUrl: 'https://example.com/video2',
      duration: '32:15',
      topics: ['基本三和弦指法', '七和弦指法', '和弦轉位', '和弦連接'],
    },
  },
  {
    id: 6,
    title: '音樂術語詞典',
    description: '包含常見音樂術語的詳細解釋和用法示例。',
    type: '詞典',
    category: '綜合理論',
    icon: <MenuBook className="resource-icon" />,
    content: {
      terms: [
        {
          term: 'Allegro',
          definition: '快板，表示快速而活潑的速度。',
          example: '莫札特的《第40號交響曲》第一樂章標記為Allegro。',
        },
        {
          term: 'Crescendo',
          definition: '漸強，表示音量逐漸增大。',
          example: '在樂譜中通常用「cresc.」或「<」符號表示。',
        },
        {
          term: 'Legato',
          definition: '連奏，表示音符之間平滑連接，沒有明顯的間斷。',
          example: '蕭邦的《夜曲》中常使用legato演奏法。',
        },
        {
          term: 'Staccato',
          definition: '斷奏，表示音符短促分離，每個音符之間有明顯的間斷。',
          example: '在樂譜中用音符上方或下方的點表示。',
        },
        {
          term: 'Forte',
          definition: '強，表示大聲演奏。',
          example: '在樂譜中用「f」表示。',
        },
      ],
    },
  },
  {
    id: 7,
    title: '互動式樂譜：莫札特《小星星變奏曲》',
    description: '通過互動式樂譜學習莫札特的名作《小星星變奏曲》。',
    type: '互動樂譜',
    category: '綜合理論',
    icon: <MusicNote className="resource-icon" />,
    content: {
      sheetMusicUrl: 'https://example.com/sheet1',
      audioUrl: 'https://example.com/audio1',
      difficulty: '中級',
      composer: '莫札特',
    },
  },
  {
    id: 8,
    title: '巴赫《創意曲》分析',
    description: '深入分析巴赫《創意曲》的結構、和聲和對位法。',
    type: '教程',
    category: '和聲理論',
    icon: <Book className="resource-icon" />,
    content: {
      sections: [
        {
          title: '作品背景',
          text: '巴赫的《創意曲》是為鍵盤樂器而作的一系列短小的對位作品，包括15首兩聲部創意曲和15首三聲部創意曲。這些作品最初是為巴赫的學生們創作的教學曲目。',
        },
        {
          title: '對位法技巧',
          text: '《創意曲》展示了巴赫精湛的對位法技巧，包括主題的模仿、倒影、增值、減值等手法。通過分析這些作品，可以學習到對位法的基本原則和應用。',
        },
        {
          title: '和聲結構',
          text: '雖然《創意曲》主要是線性的對位作品，但其中的和聲進行也非常值得研究。巴赫通過精心設計的聲部進行，創造出豐富而自然的和聲效果。',
        },
      ],
    },
  },
];

const Resources = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleBackToList = () => {
    setSelectedResource(null);
  };

  // 過濾資源
  const filteredResources = resources.filter((resource) => {
    // 搜索詞過濾
    if (
      searchTerm &&
      !resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // 分類過濾
    if (tabValue === 1 && resource.type !== '教程') return false;
    if (tabValue === 2 && resource.type !== '視頻') return false;
    if (tabValue === 3 && resource.type !== '互動樂譜') return false;
    if (tabValue === 4 && resource.type !== '詞典') return false;

    return true;
  });

  // 渲染資源詳情
  const renderResourceDetail = () => {
    if (!selectedResource) return null;

    switch (selectedResource.type) {
      case '教程':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedResource.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              {selectedResource.description}
            </Typography>
            <Divider style={{ margin: '24px 0' }} />

            {selectedResource.content.sections.map((section, index) => (
              <Box key={index} mb={4}>
                <Typography variant="h5" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {section.text}
                </Typography>
              </Box>
            ))}

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackToList}
              >
                返回資源列表
              </Button>
            </Box>
          </Box>
        );

      case '視頻':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedResource.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              {selectedResource.description}
            </Typography>
            <Divider style={{ margin: '24px 0' }} />

            <Box
              mb={4}
              p={2}
              bgcolor="#f5f5f5"
              borderRadius={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="400px"
            >
              <Box textAlign="center">
                <VideoLibrary style={{ fontSize: 80, color: '#3f51b5', marginBottom: 16 }} />
                <Typography variant="h6" gutterBottom>
                  視頻播放器
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  (實際應用中這裡會嵌入真實的視頻播放器)
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayArrow />}
                  style={{ marginTop: 16 }}
                >
                  播放視頻
                </Button>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
              視頻信息
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Bookmark />
                </ListItemIcon>
                <ListItemText
                  primary="時長"
                  secondary={selectedResource.content.duration}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Bookmark />
                </ListItemIcon>
                <ListItemText
                  primary="主題"
                  secondary={selectedResource.content.topics.join(', ')}
                />
              </ListItem>
            </List>

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackToList}
              >
                返回資源列表
              </Button>
            </Box>
          </Box>
        );

      case '詞典':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedResource.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              {selectedResource.description}
            </Typography>
            <Divider style={{ margin: '24px 0' }} />

            <TextField
              variant="outlined"
              fullWidth
              placeholder="搜索術語..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: 24 }}
            />

            {selectedResource.content.terms.map((item, index) => (
              <Box key={index} className={classes.glossaryItem}>
                <Typography variant="h6" className={classes.glossaryTerm}>
                  {item.term}
                </Typography>
                <Typography variant="body1" paragraph>
                  {item.definition}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  例: {item.example}
                </Typography>
              </Box>
            ))}

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackToList}
              >
                返回資源列表
              </Button>
            </Box>
          </Box>
        );

      case '互動樂譜':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedResource.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              {selectedResource.description}
            </Typography>
            <Divider style={{ margin: '24px 0' }} />

            <Box
              mb={4}
              p={2}
              bgcolor="#f5f5f5"
              borderRadius={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="400px"
            >
              <Box textAlign="center">
                <MusicNote style={{ fontSize: 80, color: '#3f51b5', marginBottom: 16 }} />
                <Typography variant="h6" gutterBottom>
                  互動式樂譜
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  (實際應用中這裡會嵌入互動式樂譜)
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayArrow />}
                  style={{ marginTop: 16 }}
                >
                  播放音頻
                </Button>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
              樂譜信息
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Bookmark />
                </ListItemIcon>
                <ListItemText
                  primary="作曲家"
                  secondary={selectedResource.content.composer}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Bookmark />
                </ListItemIcon>
                <ListItemText
                  primary="難度"
                  secondary={selectedResource.content.difficulty}
                />
              </ListItem>
            </List>

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackToList}
              >
                返回資源列表
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <main>
      {/* 頁面標題 */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            學習資源
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            瀏覽我們豐富的音樂理論學習資源，包括教程、視頻、互動樂譜和術語詞典。
          </Typography>
        </Container>
      </div>

      <Container className={classes.resourcesContainer} maxWidth="md">
        {selectedResource ? (
          renderResourceDetail()
        ) : (
          <>
            {/* 搜索欄 */}
            <TextField
              className={classes.searchField}
              variant="outlined"
              fullWidth
              placeholder="搜索資源..."
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
                <Tab label="教程" />
                <Tab label="視頻" />
                <Tab label="互動樂譜" />
                <Tab label="詞典" />
              </Tabs>
            </div>
            <Divider style={{ marginBottom: '24px' }} />

            {/* 資源列表 */}
            <Grid container spacing={4}>
              {filteredResources.map((resource) => (
                <Grid item key={resource.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card} onClick={() => handleResourceClick(resource)}>
                    <CardMedia className={classes.cardMedia} title={resource.title}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                      >
                        {resource.icon}
                      </Box>
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {resource.title}
                        </Typography>
                      </Box>
                      <span className={classes.resourceType}>{resource.type}</span>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {resource.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        分類: {resource.category}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* 無結果提示 */}
            {filteredResources.length === 0 && (
              <Box textAlign="center" py={4}>
                <Typography variant="h6" color="textSecondary">
                  沒有找到符合條件的資源
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </main>
  );
};

export default Resources;