import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Box,
  Container,
  Fade,
  Slide,
  useScrollTrigger,
  Divider,
  Menu,
  MenuItem,
  useMediaQuery,
  Avatar,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  SportsEsports as GamesIcon,
  MenuBook as ResourcesIcon,
  People as CommunityIcon,
  AccountCircle,
  MusicNote,
  ExitToApp,
  Settings,
  ArrowDropDown,
  Close,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'rgba(15, 18, 36, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 242, 254, 0.1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
  },
  appBarScrolled: {
    backgroundColor: 'rgba(15, 18, 36, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 242, 254, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
  },
  toolbar: {
    padding: '0.5rem 1rem',
    [theme.breakpoints.up('md')]: {
      padding: '0.5rem 2rem',
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  logoIcon: {
    color: 'var(--secondary-color)',
    marginRight: theme.spacing(1),
    fontSize: '2rem',
    filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.5))',
  },
  logoText: {
    fontFamily: '"Rajdhani", sans-serif',
    fontWeight: 700,
    fontSize: '1.8rem',
    letterSpacing: '1px',
    background: 'linear-gradient(to right, var(--secondary-color), var(--text-primary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textTransform: 'uppercase',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -2,
      left: 0,
      width: '100%',
      height: '1px',
      background: 'var(--cyberpunk-line)',
      transform: 'scaleX(0.7)',
      opacity: 0.7,
    }
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  navButton: {
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0.8, 2),
    borderRadius: '4px',
    color: 'var(--text-primary)',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: '"Rajdhani", sans-serif',
    fontWeight: 600,
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      background: 'var(--secondary-color)',
      transform: 'scaleX(0)',
      transformOrigin: 'right',
      transition: 'transform 0.3s ease',
      boxShadow: '0 0 8px var(--secondary-color)',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
      '&::before': {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
      },
    },
  },
  activeNavButton: {
    color: 'var(--secondary-color)',
    '&::before': {
      transform: 'scaleX(1)',
      transformOrigin: 'left',
    },
  },
  navIcon: {
    marginRight: theme.spacing(1),
  },
  mobileMenuButton: {
    marginRight: theme.spacing(2),
    color: 'var(--text-primary)',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    width: 280,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 280,
    backgroundColor: 'var(--dark-bg)',
    borderRight: '1px solid rgba(0, 242, 254, 0.2)',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2),
    background: 'linear-gradient(135deg, var(--dark-bg) 0%, var(--card-bg) 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  drawerLogoText: {
    fontFamily: '"Rajdhani", sans-serif',
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: '1px',
    background: 'linear-gradient(to right, var(--secondary-color), var(--text-primary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textTransform: 'uppercase',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -2,
      left: 0,
      width: '100%',
      height: '1px',
      background: 'var(--cyberpunk-line)',
      transform: 'scaleX(0.7)',
      opacity: 0.7,
    }
  },
  drawerCloseButton: {
    color: 'var(--text-primary)',
    '&:hover': {
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
    },
  },
  drawerList: {
    padding: theme.spacing(2, 0),
  },
  drawerListItem: {
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
    },
  },
  drawerListItemActive: {
    backgroundColor: 'rgba(0, 242, 254, 0.15)',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '4px',
      backgroundColor: 'var(--secondary-color)',
      boxShadow: '0 0 8px var(--secondary-color)',
    },
  },
  drawerListItemIcon: {
    color: 'var(--text-secondary)',
    minWidth: 40,
  },
  drawerListItemText: {
    color: 'var(--text-primary)',
    '& .MuiListItemText-primary': {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },
  drawerDivider: {
    margin: theme.spacing(2, 0),
    backgroundColor: 'rgba(0, 242, 254, 0.1)',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
  },
  userButton: {
    color: 'var(--text-primary)',
    padding: theme.spacing(0.8, 1.5),
    borderRadius: '4px',
    border: '1px solid rgba(0, 242, 254, 0.2)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
      borderColor: 'rgba(0, 242, 254, 0.4)',
    },
  },
  userAvatar: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(1),
    backgroundColor: 'var(--primary-color)',
    border: '2px solid var(--secondary-color)',
    boxShadow: '0 0 10px rgba(0, 242, 254, 0.4)',
  },
  userMenu: {
    marginTop: theme.spacing(4.5),
  },
  userMenuItem: {
    padding: theme.spacing(1.5, 2),
    minWidth: 180,
    '&:hover': {
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
    },
  },
  userMenuIcon: {
    marginRight: theme.spacing(1.5),
    color: 'var(--text-secondary)',
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = true; // 假設用戶已登入，實際應從身份驗證服務中獲取
  const user = { name: '音樂愛好者', avatar: '', role: 'user' }; // 假設的用戶資料

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const isPathActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { text: '首頁', path: '/', icon: <HomeIcon /> },
    { text: '課程', path: '/games', icon: <GamesIcon /> },
    { text: '資源', path: '/resources', icon: <ResourcesIcon /> },
    { text: '社區', path: '/community', icon: <CommunityIcon /> },
  ];

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <Box display="flex" alignItems="center">
          <MusicNote className={classes.logoIcon} />
          <Typography className={classes.drawerLogoText}>
            音樂理論學院
          </Typography>
        </Box>
        <IconButton 
          className={classes.drawerCloseButton} 
          onClick={handleDrawerToggle}
        >
          <Close />
        </IconButton>
      </div>
      <Divider className={classes.drawerDivider} />
      <List className={classes.drawerList}>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            className={`${classes.drawerListItem} ${isPathActive(item.path) ? classes.drawerListItemActive : ''}`}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon className={classes.drawerListItemIcon}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              className={classes.drawerListItemText}
            />
          </ListItem>
        ))}
      </List>
      {isAuthenticated && (
        <>
          <Divider className={classes.drawerDivider} />
          <List className={classes.drawerList}>
            <ListItem
              button
              className={classes.drawerListItem}
              component={RouterLink}
              to="/profile"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon className={classes.drawerListItemIcon}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText 
                primary="個人檔案" 
                className={classes.drawerListItemText}
              />
            </ListItem>
            <ListItem
              button
              className={classes.drawerListItem}
              component={RouterLink}
              to="/settings"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon className={classes.drawerListItemIcon}>
                <Settings />
              </ListItemIcon>
              <ListItemText 
                primary="設定" 
                className={classes.drawerListItemText}
              />
            </ListItem>
            <ListItem
              button
              className={classes.drawerListItem}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon className={classes.drawerListItemIcon}>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText 
                primary="登出" 
                className={classes.drawerListItemText}
              />
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" className={`${classes.appBar} ${scrolled ? classes.appBarScrolled : ''}`}>
          <Container maxWidth="xl">
            <Toolbar className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.mobileMenuButton}
              >
                <MenuIcon />
              </IconButton>
              
              <RouterLink to="/" className={classes.logo}>
                <MusicNote className={classes.logoIcon} />
                <Typography variant="h6" className={classes.logoText}>
                  音樂理論學院
                </Typography>
              </RouterLink>

              <div className={classes.navContainer}>
                <Hidden smDown>
                  {navItems.map((item) => (
                    <Button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      className={`${classes.navButton} ${isPathActive(item.path) ? classes.activeNavButton : ''}`}
                    >
                      {!isMobile && <Box component="span" className={classes.navIcon}>{item.icon}</Box>}
                      {item.text}
                    </Button>
                  ))}
                </Hidden>
                
                {isAuthenticated ? (
                  <div className={classes.userSection}>
                    <Button 
                      className={classes.userButton}
                      onClick={handleUserMenuOpen}
                      endIcon={<ArrowDropDown />}
                    >
                      <Avatar className={classes.userAvatar} alt={user.name} src={user.avatar}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <Hidden only="xs">
                        <Typography variant="body2">{user.name}</Typography>
                      </Hidden>
                    </Button>
                    <Menu
                      id="user-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleUserMenuClose}
                      className={classes.userMenu}
                      PaperProps={{
                        style: {
                          backgroundColor: 'var(--card-bg)',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 242, 254, 0.2)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }
                      }}
                    >
                      <MenuItem 
                        className={classes.userMenuItem}
                        component={RouterLink}
                        to="/profile"
                        onClick={handleUserMenuClose}
                      >
                        <AccountCircle className={classes.userMenuIcon} />
                        個人檔案
                      </MenuItem>
                      <MenuItem 
                        className={classes.userMenuItem}
                        component={RouterLink}
                        to="/settings"
                        onClick={handleUserMenuClose}
                      >
                        <Settings className={classes.userMenuIcon} />
                        設定
                      </MenuItem>
                      <Divider className={classes.drawerDivider} />
                      <MenuItem 
                        className={classes.userMenuItem}
                        onClick={handleUserMenuClose}
                      >
                        <ExitToApp className={classes.userMenuIcon} />
                        登出
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    component={RouterLink} 
                    to="/login"
                    className={classes.navButton}
                  >
                    登入
                  </Button>
                )}
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        className={classes.drawer}
        ModalProps={{
          keepMounted: true, // 為了移動端性能更好
        }}
      >
        {drawer}
      </Drawer>

      <Toolbar /> {/* 這個空的 Toolbar 是為了提供與頂部 AppBar 相同高度的間距 */}
    </>
  );
};

export default Header;