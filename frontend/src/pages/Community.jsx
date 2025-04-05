import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Box,
  Tabs,
  Tab,
  Divider,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Search,
  Person,
  Group,
  EmojiEvents,
  Comment,
  ThumbUp,
  Share,
  MoreVert,
  Send,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0),
  },
  communityContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  discussionCard: {
    marginBottom: theme.spacing(3),
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
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  postActions: {
    display: 'flex',
    padding: theme.spacing(0, 2, 2),
  },
  actionButton: {
    marginRight: theme.spacing(2),
  },
  commentSection: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  commentForm: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  commentInput: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  leaderboardItem: {
    marginBottom: theme.spacing(1),
  },
  rankNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
  },
  groupCard: {
    height: '100%',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  },
  memberCount: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    '& svg': {
      marginRight: theme.spacing(0.5),
      fontSize: '1rem',
    },
  },
  topicChip: {
    margin: theme.spacing(0.5),
  },
}));

// 模擬討論數據
const discussions = [
  {
    id: 1,
    author: '音樂愛好者',
    avatar: 'M',
    title: '如何有效地練習音階？',
    content:
      '我最近開始學習鋼琴，但發現練習音階很枯燥。有沒有什麼有效的方法可以讓練習音階變得更有趣？我聽說有一些遊戲化的方法，但不確定具體是什麼。希望有經驗的朋友能分享一下。',
    date: '2023-11-20',
    likes: 24,
    comments: [
      {
        author: '專業鋼琴教師',
        avatar: 'P',
        content:
          '我建議你嘗試節奏練習法，就是用不同的節奏模式來練習同一個音階。這不僅能提高技巧，還能減輕枯燥感。另外，可以嘗試我們網站上的音階識別遊戲，這是一種寓教於樂的好方法。',
        date: '2023-11-20',
        likes: 12,
      },
      {
        author: '音樂學院學生',
        avatar: 'S',
        content:
          '我發現設定小目標很有效，比如每天增加一點點速度，或者挑戰自己彈奏不同的音階組合。另外，錄下自己的練習並回聽，可以幫助你發現需要改進的地方。',
        date: '2023-11-21',
        likes: 8,
      },
    ],
    tags: ['鋼琴', '練習技巧', '音階'],
  },
  {
    id: 2,
    author: '和聲探索者',
    avatar: 'H',
    title: '爵士和聲的應用與分析',
    content:
      '最近我在研究爵士樂中的和聲進行，特別是二五一進行的各種變體。我發現爵士樂手經常使用一些替代和弦，使得和聲色彩更加豐富。有沒有人可以推薦一些好的爵士和聲分析資源？或者分享一些你們在即興演奏中常用的和弦技巧？',
    date: '2023-11-18',
    likes: 31,
    comments: [
      {
        author: '爵士樂手',
        avatar: 'J',
        content:
          '我推薦Mark Levine的《爵士樂理》這本書，裡面詳細介紹了爵士和聲的各種技巧。關於二五一進行，你可以嘗試使用三全音替代，以及各種擴展和弦（9、11、13）來豐富和聲色彩。',
        date: '2023-11-19',
        likes: 15,
      },
    ],
    tags: ['爵士樂', '和聲分析', '即興演奏'],
  },
  {
    id: 3,
    author: '作曲新手',
    avatar: 'C',
    title: '如何克服作曲中的創作瓶頸？',
    content:
      '我最近在嘗試創作一些簡單的曲子，但經常遇到創作瓶頸，不知道如何繼續發展音樂主題。有時候寫了一個不錯的主題，但就是不知道怎麼展開。有什麼方法可以幫助克服這種創作瓶頸嗎？',
    date: '2023-11-15',
    likes: 18,
    comments: [
      {
        author: '資深作曲家',
        avatar: 'E',
        content:
          '創作瓶頸是很常見的問題。我建議你嘗試一些作曲技巧，如動機發展、序列、轉調等。另外，分析你喜歡的作品，看看其他作曲家是如何發展他們的主題的。有時候，暫時放下作品，過幾天再回來看，也會有新的靈感。',
        date: '2023-11-16',
        likes: 10,
      },
      {
        author: '音樂製作人',
        avatar: 'P',
        content:
          '我發現改變工作環境或使用不同的創作工具也很有幫助。例如，如果你通常在鋼琴上作曲，嘗試使用吉他或軟件合成器。另外，設定一些限制條件（如只使用特定的音階或節奏模式）反而可能激發創造力。',
        date: '2023-11-17',
        likes: 7,
      },
    ],
    tags: ['作曲', '創作技巧', '音樂理論'],
  },
];

// 模擬學習小組數據
const groups = [
  {
    id: 1,
    name: '古典樂理研究小組',
    description: '專注於研究古典音樂理論，包括和聲分析、曲式結構和對位法等。',
    members: 128,
    topics: ['古典樂理', '和聲分析', '曲式結構', '對位法'],
    recentActivity: '最近討論：莫札特奏鳴曲的結構分析',
  },
  {
    id: 2,
    name: '流行音樂創作小組',
    description: '交流流行音樂創作技巧，討論當代流行音樂的和聲語言和製作方法。',
    members: 215,
    topics: ['流行音樂', '歌曲創作', '編曲', '製作'],
    recentActivity: '最近討論：如何寫出朗朗上口的副歌',
  },
  {
    id: 3,
    name: '爵士即興演奏小組',
    description: '探討爵士樂即興演奏技巧，分享練習方法和理論知識。',
    members: 96,
    topics: ['爵士樂', '即興演奏', '和聲進行', '音階應用'],
    recentActivity: '最近討論：如何運用利地安調式進行即興演奏',
  },
  {
    id: 4,
    name: '電子音樂製作小組',
    description: '討論電子音樂製作技術，包括合成器編程、採樣和混音等。',
    members: 173,
    topics: ['電子音樂', '合成器', '採樣', '混音'],
    recentActivity: '最近討論：如何創造有層次感的電子音樂編排',
  },
];

// 模擬排行榜數據
const leaderboard = [
  {
    rank: 1,
    name: '音樂大師',
    avatar: 'M',
    score: 9850,
    badges: ['音階專家', '和弦大師', '理論通才'],
  },
  {
    rank: 2,
    name: '和聲探索者',
    avatar: 'H',
    score: 9320,
    badges: ['和弦大師', '爵士理論家'],
  },
  {
    rank: 3,
    name: '節奏達人',
    avatar: 'R',
    score: 8970,
    badges: ['節奏專家', '視唱高手'],
  },
  {
    rank: 4,
    name: '理論通才',
    avatar: 'T',
    score: 8640,
    badges: ['音階專家', '分析能手'],
  },
  {
    rank: 5,
    name: '創作新星',
    avatar: 'C',
    score: 8210,
    badges: ['作曲家', '和聲創新者'],
  },
];

const Community = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 渲染討論區
  const renderDiscussions = () => {
    return (
      <>
        <TextField
          className={classes.searchField}
          variant="outlined"
          fullWidth
          placeholder="搜索討論..."
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

        {discussions.map((discussion) => (
          <Card key={discussion.id} className={classes.discussionCard}>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>{discussion.avatar}</Avatar>
              }
              title={discussion.author}
              subheader={discussion.date}
              action={
                <Button size="small">
                  <MoreVert />
                </Button>
              }
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {discussion.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {discussion.content}
              </Typography>
              <Box mb={1}>
                {discussion.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    className={classes.topicChip}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
            <div className={classes.postActions}>
              <Button
                startIcon={<ThumbUp />}
                className={classes.actionButton}
                size="small"
              >
                讚 ({discussion.likes})
              </Button>
              <Button
                startIcon={<Comment />}
                className={classes.actionButton}
                size="small"
              >
                評論 ({discussion.comments.length})
              </Button>
              <Button
                startIcon={<Share />}
                className={classes.actionButton}
                size="small"
              >
                分享
              </Button>
            </div>

            {/* 評論區 */}
            <div className={classes.commentSection}>
              <Typography variant="subtitle1" gutterBottom>
                評論
              </Typography>
              <List>
                {discussion.comments.map((comment, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{comment.avatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle2">
                            {comment.author}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {comment.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {comment.content}
                          </Typography>
                          <Box mt={1}>
                            <Button size="small" startIcon={<ThumbUp />}>
                              讚 ({comment.likes})
                            </Button>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {/* 評論表單 */}
              <div className={classes.commentForm}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="寫下您的評論..."
                  className={classes.commentInput}
                />
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Send />}
                >
                  發送
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="outlined" color="primary">
            查看更多討論
          </Button>
        </Box>
      </>
    );
  };

  // 渲染學習小組
  const renderGroups = () => {
    return (
      <>
        <TextField
          className={classes.searchField}
          variant="outlined"
          fullWidth
          placeholder="搜索學習小組..."
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

        <Grid container spacing={4}>
          {groups.map((group) => (
            <Grid item key={group.id} xs={12} sm={6}>
              <Card className={classes.groupCard}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {group.description}
                  </Typography>
                  <Box mb={2}>
                    {group.topics.map((topic) => (
                      <Chip
                        key={topic}
                        label={topic}
                        size="small"
                        className={classes.topicChip}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body2"
                    className={classes.memberCount}
                    color="textSecondary"
                  >
                    <Group fontSize="small" /> {group.members} 成員
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {group.recentActivity}
                  </Typography>
                </CardContent>
                <Box p={2} pt={0}>
                  <Button variant="contained" color="primary" fullWidth>
                    加入小組
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="outlined" color="primary">
            查看更多學習小組
          </Button>
        </Box>
      </>
    );
  };

  // 渲染排行榜
  const renderLeaderboard = () => {
    return (
      <Paper elevation={2} style={{ padding: '24px' }}>
        <Typography variant="h5" gutterBottom align="center">
          <EmojiEvents color="primary" style={{ marginRight: '8px' }} />
          音樂理論遊戲排行榜
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          paragraph
          align="center"
        >
          這些玩家在音樂理論遊戲中表現出色！
        </Typography>
        <Divider style={{ margin: '16px 0' }} />

        <List>
          {leaderboard.map((player) => (
            <ListItem key={player.rank} className={classes.leaderboardItem}>
              <div className={classes.rankNumber}>{player.rank}</div>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>{player.avatar}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">{player.name}</Typography>
                    <Typography variant="subtitle1" color="primary">
                      {player.score} 分
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box mt={0.5}>
                    {player.badges.map((badge) => (
                      <Chip
                        key={badge}
                        label={badge}
                        size="small"
                        className={classes.topicChip}
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="outlined" color="primary">
            查看完整排行榜
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <main>
      {/* 頁面標題 */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            音樂學習社區
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            加入我們的社區，與其他音樂愛好者交流經驗、分享知識，一起提高音樂技能。
          </Typography>
        </Container>
      </div>

      <Container className={classes.communityContainer} maxWidth="md">
        {/* 分類標籤 */}
        <div className={classes.tabsContainer}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="討論區" />
            <Tab label="學習小組" />
            <Tab label="排行榜" />
          </Tabs>
        </div>
        <Divider style={{ marginBottom: '24px' }} />

        {/* 內容區域 */}
        {tabValue === 0 && renderDiscussions()}
        {tabValue === 1 && renderGroups()}
        {tabValue === 2 && renderLeaderboard()}
      </Container>
    </main>
  );
};

export default Community;