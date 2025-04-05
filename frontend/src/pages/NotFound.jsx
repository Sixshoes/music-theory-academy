import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MusicNote } from '@mui/icons-material';

const NotFoundRoot = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const IconWrapper = styled(MusicNote)(({ theme }) => ({
  fontSize: 80,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const NotFound = () => {
  return (
    <NotFoundRoot>
      <IconWrapper />
      <Title variant="h2">
        404
      </Title>
      <Title variant="h4">
        頁面未找到
      </Title>
      <Subtitle variant="subtitle1">
        很抱歉，您要查找的頁面不存在或已被移除。
      </Subtitle>
      <Box>
        <ActionButton
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
        >
          返回首頁
        </ActionButton>
        <ActionButton
          variant="outlined"
          color="primary"
          component={RouterLink}
          to="/games"
          sx={{ marginLeft: '16px' }}
        >
          瀏覽遊戲
        </ActionButton>
      </Box>
    </NotFoundRoot>
  );
};

export default NotFound;