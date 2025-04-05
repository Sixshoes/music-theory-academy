import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Link,
  Container,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MusicNote } from '@mui/icons-material';

const FooterRoot = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const FooterNav = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& a': {
    marginBottom: theme.spacing(1),
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const Copyright = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterRoot>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <LogoBox>
              <MusicNote />
              <Typography variant="h6">音樂理論遊戲</Typography>
            </LogoBox>
            <Typography variant="body2" color="textSecondary">
              通過遊戲化的方式學習音樂理論，提高您的音樂技能和理解力。
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FooterTitle variant="subtitle1">
              遊戲
            </FooterTitle>
            <FooterNav>
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
            </FooterNav>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FooterTitle variant="subtitle1">
              資源
            </FooterTitle>
            <FooterNav>
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
            </FooterNav>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FooterTitle variant="subtitle1">
              社區
            </FooterTitle>
            <FooterNav>
              <Link component={RouterLink} to="/community" color="textSecondary">
                討論區
              </Link>
              <Link component={RouterLink} to="/community" color="textSecondary">
                學習小組
              </Link>
              <Link component={RouterLink} to="/community" color="textSecondary">
                排行榜
              </Link>
            </FooterNav>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FooterTitle variant="subtitle1">
              關於
            </FooterTitle>
            <FooterNav>
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
            </FooterNav>
          </Grid>
        </Grid>
        <Divider sx={{ margin: '24px 0' }} />
        <Copyright variant="body2" color="textSecondary" align="center">
          © {currentYear} 音樂理論遊戲. 保留所有權利.
        </Copyright>
      </Container>
    </FooterRoot>
  );
};

export default Footer;