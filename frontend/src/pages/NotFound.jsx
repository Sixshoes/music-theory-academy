import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MusicNote } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  icon: {
    fontSize: 80,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <MusicNote className={classes.icon} />
      <Typography variant="h2" className={classes.title}>
        404
      </Typography>
      <Typography variant="h4" className={classes.title}>
        頁面未找到
      </Typography>
      <Typography variant="subtitle1" className={classes.subtitle}>
        很抱歉，您要查找的頁面不存在或已被移除。
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={RouterLink}
          to="/"
        >
          返回首頁
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          component={RouterLink}
          to="/games"
          style={{ marginLeft: '16px' }}
        >
          瀏覽遊戲
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;