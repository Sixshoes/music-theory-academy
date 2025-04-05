import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Box,
  Link,
  IconButton,
  Divider,
  TextField,
  Button,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  MusicNote,
  Headset,
  LibraryMusic,
  School,
  Public,
  Send as SendIcon,
  SportsEsports,
  GitHub,
  Code,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'var(--dark-bg)',
    color: 'var(--text-secondary)',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
    borderTop: '1px solid rgba(0, 242, 254, 0.1)',
  },
  footerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%233f51b5" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1,
    zIndex: 0,
  },
  footerTop: {
    borderBottom: '1px solid rgba(0, 242, 254, 0.15)',
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: -2,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '30%',
      height: '1px',
      background: 'var(--cyberpunk-line)',
    },
  },
  title: {
    color: 'var(--text-primary)',
    fontFamily: '"Rajdhani", sans-serif',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase',
    letterSpacing: '1px',
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -8,
      left: 0,
      width: '40px',
      height: '2px',
      background: 'var(--secondary-color)',
    },
  },
  link: {
    color: 'var(--text-secondary)',
    transition: 'all 0.3s ease',
    display: 'block',
    marginBottom: theme.spacing(1.5),
    position: 'relative',
    paddingLeft: theme.spacing(1.5),
    fontFamily: '"Rajdhani", sans-serif',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '6px',
      height: '1px',
      background: 'var(--secondary-color)',
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      color: 'var(--secondary-color)',
      textDecoration: 'none',
      paddingLeft: theme.spacing(2),
      '&::before': {
        width: '12px',
      },
    },
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(2),
  },
  socialIcon: {
    color: 'var(--text-secondary)',
    backgroundColor: 'rgba(0, 242, 254, 0.05)',
    margin: theme.spacing(0, 1, 0, 0),
    padding: theme.spacing(1),
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 242, 254, 0.1)',
    '&:hover': {
      color: 'var(--text-primary)',
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
      boxShadow: '0 0 15px rgba(0, 242, 254, 0.2)',
      transform: 'translateY(-3px)',
    },
  },
  subscribeInput: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(0, 242, 254, 0.05)',
      borderRadius: '4px',
      '& fieldset': {
        borderColor: 'rgba(0, 242, 254, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 242, 254, 0.4)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--secondary-color)',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'var(--text-primary)',
      fontFamily: '"Rajdhani", sans-serif',
    },
    '& .MuiInputLabel-outlined': {
      color: 'var(--text-secondary)',
      fontFamily: '"Rajdhani", sans-serif',
    },
  },
  subscribeButton: {
    backgroundColor: 'var(--primary-color)',
    color: '#fff',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 2),
    fontFamily: '"Rajdhani", sans-serif',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 0 10px rgba(0, 242, 254, 0.2)',
    '&:hover': {
      backgroundColor: 'var(--secondary-color)',
      boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
    },
  },
  iconList: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  iconItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  icon: {
    color: 'var(--secondary-color)',
    marginRight: theme.spacing(1.5),
    fontSize: '1.2rem',
  },
  musicIcon: {
    animation: '$pulse 2s infinite',
    color: 'var(--secondary-color)',
    marginRight: theme.spacing(1.5),
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
  copyright: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
    borderTop: '1px solid rgba(0, 242, 254, 0.1)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -2,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '30%',
      height: '1px',
      background: 'var(--cyberpunk-line)',
    },
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  logoIcon: {
    color: 'var(--secondary-color)',
    marginRight: theme.spacing(1),
    fontSize: '1.8rem',
    filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.5))',
  },
  logoText: {
    fontFamily: '"Rajdhani", sans-serif',
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: '1px',
    background: 'linear-gradient(to right, var(--secondary-color), var(--text-primary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textTransform: 'uppercase',
  },
  techButton: {
    marginLeft: theme.spacing(1),
    padding: '0 6px',
    minWidth: 'auto',
    backgroundColor: 'rgba(0, 242, 254, 0.05)',
    border: '1px solid rgba(0, 242, 254, 0.2)',
    fontFamily: '"Rajdhani", sans-serif',
    fontSize: '0.7rem',
    '&:hover': {
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
    },
  },
  scanline: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'rgba(0, 242, 254, 0.05)',
    opacity: 0.5,
    zIndex: 9,
    animation: '$scanAnimation 8s linear infinite',
  },
  '@keyframes scanAnimation': {
    '0%': {
      top: 0,
    },
    '100%': {
      top: '100%',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" className={classes.footer}>
      <div className={classes.footerOverlay}></div>
      <div className={classes.scanline}></div>
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.footerTop}>
          <Grid item xs={12} sm={6} md={3}>
            <Box className={classes.footerLogo}>
              <MusicNote className={classes.logoIcon} />
              <Typography className={classes.logoText}>
                音樂理論學院
              </Typography>
            </Box>
            <Typography variant="body2" paragraph>
              專業的音樂理論教育平台，透過先進的互動技術與專業課程設計，為各級音樂學習者提供體系化的理論知識與技能培訓。
            </Typography>
            <Box className={classes.socialIcons}>
              <Tooltip title="Facebook">
                <IconButton className={classes.socialIcon} aria-label="facebook">
                  <Facebook />
                </IconButton>
              </Tooltip>
              <Tooltip title="Twitter">
                <IconButton className={classes.socialIcon} aria-label="twitter">
                  <Twitter />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton className={classes.socialIcon} aria-label="instagram">
                  <Instagram />
                </IconButton>
              </Tooltip>
              <Tooltip title="YouTube">
                <IconButton className={classes.socialIcon} aria-label="youtube">
                  <YouTube />
                </IconButton>
              </Tooltip>
              <Tooltip title="GitHub">
                <IconButton className={classes.socialIcon} aria-label="github">
                  <GitHub />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className={classes.title}>
              導航
            </Typography>
            <Box>
              <Link component={RouterLink} to="/" className={classes.link}>
                首頁
              </Link>
              <Link component={RouterLink} to="/games" className={classes.link}>
                課程模組
              </Link>
              <Link component={RouterLink} to="/resources" className={classes.link}>
                教學資源
              </Link>
              <Link component={RouterLink} to="/community" className={classes.link}>
                專業社群
              </Link>
              <Link component={RouterLink} to="/about" className={classes.link}>
                關於我們
              </Link>
              <Link component={RouterLink} to="/contact" className={classes.link}>
                聯絡我們
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className={classes.title}>
              熱門課程
            </Typography>
            <Box>
              <Link component={RouterLink} to="/games/1" className={classes.link}>
                音階識別課程
              </Link>
              <Link component={RouterLink} to="/games/2" className={classes.link}>
                和弦理論精通
              </Link>
              <Link component={RouterLink} to="/games/3" className={classes.link}>
                節奏訓練專題
              </Link>
              <Link component={RouterLink} to="/games/4" className={classes.link}>
                樂理專業評估
              </Link>
              <Link component={RouterLink} to="/games/5" className={classes.link}>
                視唱練耳進階
              </Link>
              <Link component={RouterLink} to="/games/6" className={classes.link}>
                作曲技巧工坊
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className={classes.title}>
              訂閱更新
            </Typography>
            <Typography variant="body2" paragraph>
              訂閱我們的專業電子報，獲取最新音樂教育資源與課程更新通知。
            </Typography>
            <Box>
              <TextField
                variant="outlined"
                size="small"
                label="您的電子郵件"
                fullWidth
                margin="dense"
                className={classes.subscribeInput}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.subscribeButton}
                startIcon={<SendIcon />}
              >
                訂閱
              </Button>
            </Box>
            
            <Box mt={3}>
              <Typography variant="h6" className={classes.title}>
                聯絡我們
              </Typography>
              <Box className={classes.iconItem}>
                <MusicNote className={classes.musicIcon} />
                <Typography variant="body2">
                  music-theory@example.com
                </Typography>
              </Box>
              <Box className={classes.iconItem}>
                <Public className={classes.icon} />
                <Typography variant="body2">
                  www.music-theory-games.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box textAlign="center" className={classes.copyright}>
          <Typography variant="body2">
            © {currentYear} 音樂理論學院 | 專業音樂教育平台. 保留所有權利.
          </Typography>
          <Box display="flex" justifyContent="center" mt={1}>
            <Button size="small" className={classes.techButton}>
              <Code fontSize="small" style={{ marginRight: 4, fontSize: '0.8rem' }} />
              React
            </Button>
            <Button size="small" className={classes.techButton}>
              <Code fontSize="small" style={{ marginRight: 4, fontSize: '0.8rem' }} />
              Material-UI
            </Button>
            <Button size="small" className={classes.techButton}>
              <SportsEsports fontSize="small" style={{ marginRight: 4, fontSize: '0.8rem' }} />
              Web Audio API
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;