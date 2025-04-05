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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, MusicNote } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}));

const StyledLogo = styled(MusicNote)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.primary.contrastText,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 700,
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontWeight: 500,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static" color="default">
      <Container>
        <Toolbar>
          <StyledLogo />
          <StyledTitle variant="h6">
            <Link component={RouterLink} to="/">
              音樂理論學院
            </Link>
          </StyledTitle>

          <Hidden smDown>
            <NavButton color="inherit" component={RouterLink} to="/">
              首頁
            </NavButton>
            <NavButton color="inherit" component={RouterLink} to="/games">
              練習遊戲
            </NavButton>
            <NavButton color="inherit" component={RouterLink} to="/resources">
              學習資源
            </NavButton>
            <NavButton color="inherit" component={RouterLink} to="/community">
              討論社區
            </NavButton>
          </Hidden>

          <Hidden smUp>
            <MenuButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </MenuButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                component={RouterLink}
                to="/"
                onClick={handleClose}
              >
                首頁
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/games"
                onClick={handleClose}
              >
                練習遊戲
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/resources"
                onClick={handleClose}
              >
                學習資源
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/community"
                onClick={handleClose}
              >
                討論社區
              </MenuItem>
            </Menu>
          </Hidden>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;