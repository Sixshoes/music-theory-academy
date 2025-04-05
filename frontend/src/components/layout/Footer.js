import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Link,
  Container,
  Grid,
  Box,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MusicNote } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
    marginTop: 'auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& svg': {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
    },
  },
  footerNav: {
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      marginBottom: theme.spacing(1),
    },
  },
  footerTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  copyright: {
    marginTop: theme.spacing(4),
  },
}));

const Footer = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box className={classes.logo}>
              <MusicNote />
              <Typography variant="h6">音樂理論遊戲</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
              通過遊戲化的方式學習音樂理論，提高您的音樂技能和理解力。
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" className={classes.footerTitle}>
              遊戲
            </Typography>
            <div className={classes.footerNav}>
              <Link component={RouterLink} to="/games/1" color="textSecondary">
                音階識別
              </Link>
              <Link component={RouterLink} to="/games/2" color="textSecondary">
                和弦練習
              </Link>
              <Link component={RouterLink} to="/games/3" color="textSecondary">
                節奏訓練
              </Link>
              <Link component={RouterLink} to="/games/4" color="textSecondary">
                樂理測驗
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" className={classes.footerTitle}>
              資源
            </Typography>
            <div className={classes.footerNav}>
              <Link component={RouterLink} to="/resources" color="textSecondary">
                學習教程
              </Link>
              <Link component={RouterLink} to="/resources" color="textSecondary">
                視頻教學
              </Link>
              <Link component={RouterLink} to="/resources" color="textSecondary">
                互動樂譜
              </Link>
              <Link component={RouterLink} to="/resources" color="textSecondary">
                術語詞典
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" className={classes.footerTitle}>
              社區
            </Typography>
            <div className={classes.footerNav}>
              <Link component={RouterLink} to="/community" color="textSecondary">
                討論區
              </Link>
              <Link component={RouterLink} to="/community" color="textSecondary">
                學習小組
              </Link>
              <Link component={RouterLink} to="/community" color="textSecondary">
                排行榜
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" className={classes.footerTitle}>
              關於
            </Typography>
            <div className={classes.footerNav}>
              <Link href="#" color="textSecondary">
                關於我們
              </Link>
              <Link href="#" color="textSecondary">
                聯繫我們
              </Link>
              <Link href="#" color="textSecondary">
                隱私政策
              </Link>
              <Link href="#" color="textSecondary">
                使用條款
              </Link>
            </div>
          </Grid>
        </Grid>
        <Divider style={{ margin: '24px 0' }} />
        <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright}>
          © {currentYear} 音樂理論遊戲. 保留所有權利.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;