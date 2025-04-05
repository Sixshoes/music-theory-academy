import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Hidden,
  Menu,
  MenuItem,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon, MusicNote } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.contrastText,
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  navButton: {
    marginLeft: theme.spacing(1),
    fontWeight: 500,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} color="primary">
        <Container>
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={RouterLink} to="/games">
                  遊戲
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={RouterLink} to="/resources">
                  學習資源
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={RouterLink} to="/community">
                  社區
                </MenuItem>
              </Menu>
            </Hidden>

            <MusicNote className={classes.logo} />
            <Typography variant="h6" className={classes.title}>
              <Link component={RouterLink} to="/">
                音樂理論遊戲
              </Link>
            </Typography>

            <Hidden smDown>
              <Button
                color="inherit"
                className={classes.navButton}
                component={RouterLink}
                to="/games"
              >
                遊戲
              </Button>
              <Button
                color="inherit"
                className={classes.navButton}
                component={RouterLink}
                to="/resources"
              >
                學習資源
              </Button>
              <Button
                color="inherit"
                className={classes.navButton}
                component={RouterLink}
                to="/community"
              >
                社區
              </Button>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;