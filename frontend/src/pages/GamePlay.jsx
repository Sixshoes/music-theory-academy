import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { theme } from '../App';
import {
  Typography,
  Container,
  Button,
  Box,
  Paper,
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,
  Fade,
  Zoom,
  CircularProgress,
  Slider,
  Popover,
  Avatar,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlayArrow,
  Replay,
  VolumeUp,
  Help,
  ArrowBack,
  CheckCircle,
  Cancel,
  Home,
  MusicNote,
  LibraryMusic,
  Refresh,
} from '@material-ui/icons';
import * as Tone from 'tone';
import GameSelector from '../components/games/GameSelector';

const useStyles = makeStyles((theme) => ({
  gameContainer: {
    position: 'relative',
    padding: theme.spacing(4),
    minHeight: '100vh',
    overflowX: 'hidden',
  },
  gameBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #0f1224 0%, #1a2151 100%)',
    opacity: 0.95,
    zIndex: -1,
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%233f51b5" fill-opacity="0.15" fill-rule="evenodd"/%3E%3C/svg%3E")',
      backgroundSize: 'cover',
      boxShadow: 'inset 0 0 50px rgba(63, 81, 181, 0.2)',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 50% 50%, rgba(63, 81, 181, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
      backgroundSize: '200% 200%',
      animation: '$pulse 15s infinite linear',
    },
  },
  '@keyframes pulse': {
    '0%': { backgroundPosition: '0% 0%' },
    '50%': { backgroundPosition: '100% 100%' },
    '100%': { backgroundPosition: '0% 0%' },
  },
  '@keyframes neonGlow': {
    '0%': { textShadow: '0 0 10px rgba(63, 81, 181, 0.8), 0 0 20px rgba(63, 81, 181, 0.5), 0 0 30px rgba(63, 81, 181, 0.3)' },
    '50%': { textShadow: '0 0 15px rgba(63, 81, 181, 0.9), 0 0 25px rgba(63, 81, 181, 0.6), 0 0 35px rgba(63, 81, 181, 0.4)' },
    '100%': { textShadow: '0 0 10px rgba(63, 81, 181, 0.8), 0 0 20px rgba(63, 81, 181, 0.5), 0 0 30px rgba(63, 81, 181, 0.3)' },
  },
  '@keyframes floatIn': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  breadcrumbs: {
    marginBottom: theme.spacing(3),
    '& a': {
      transition: 'color 0.3s ease',
      color: '#a0a8d9',
      '&:hover': {
        color: '#ffffff',
        textDecoration: 'none',
      },
    },
    animation: '$floatIn 0.6s ease-out',
  },
  pageTitle: {
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    color: '#ffffff',
    position: 'relative',
    display: 'inline-block',
    animation: '$neonGlow 2s infinite ease-in-out',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: -8,
      left: 0,
      width: '80px',
      height: '4px',
      background: 'linear-gradient(90deg, #3f51b5, #00f2fe)',
      borderRadius: '4px',
      boxShadow: '0 0 15px rgba(63, 81, 181, 0.8)',
    },
  },
  gameDescription: {
    marginBottom: theme.spacing(4),
    maxWidth: '800px',
    color: '#a0a8d9',
    fontSize: '1.1rem',
    lineHeight: 1.5,
    animation: '$floatIn 0.8s ease-out',
  },
  backButton: {
    marginBottom: theme.spacing(3),
    borderRadius: '30px',
    padding: '8px 20px',
    backgroundColor: 'rgba(63, 81, 181, 0.2)',
    color: '#a0a8d9',
    border: '1px solid rgba(63, 81, 181, 0.3)',
    boxShadow: '0 0 15px rgba(63, 81, 181, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateX(-5px)',
      boxShadow: '0 0 20px rgba(63, 81, 181, 0.4)',
      backgroundColor: 'rgba(63, 81, 181, 0.3)',
      color: '#ffffff',
    },
  },
  gameCard: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(63, 81, 181, 0.3)',
    height: '100%',
    background: 'rgba(29, 32, 59, 0.85)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(63, 81, 181, 0.2)',
    transition: 'all 0.3s ease',
    animation: '$floatIn 1s ease-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(63, 81, 181, 0.4)',
    },
  },
  visualizer: {
    height: '120px',
    background: 'rgba(17, 19, 35, 0.7)',
    borderRadius: '12px',
    position: 'relative',
    marginBottom: theme.spacing(3),
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(63, 81, 181, 0.2)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(63, 81, 181, 0.5), transparent)',
    },
  },
  visualizerBar: {
    position: 'absolute',
    bottom: 0,
    width: '5px',
    background: 'linear-gradient(to top, #3f51b5, #00f2fe)',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.2s ease',
    boxShadow: '0 0 10px rgba(63, 81, 181, 0.8)',
  },
  progressContainer: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: 'rgba(17, 19, 35, 0.7)',
    borderRadius: '12px',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(63, 81, 181, 0.2)',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    background: 'linear-gradient(90deg, #3f51b5, #00f2fe)',
    boxShadow: '0 0 10px rgba(63, 81, 181, 0.4)',
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  },
  controlButton: {
    borderRadius: '50%',
    minWidth: '54px',
    width: '54px',
    height: '54px',
    padding: 0,
    background: 'rgba(17, 19, 35, 0.7)',
    border: '1px solid rgba(63, 81, 181, 0.3)',
    color: '#a0a8d9',
    boxShadow: '0 0 15px rgba(63, 81, 181, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: '0 0 20px rgba(63, 81, 181, 0.5)',
      color: '#ffffff',
    },
  },
  playButton: {
    background: 'linear-gradient(135deg, #3f51b5, #00f2fe)',
    color: 'white',
    width: '64px',
    height: '64px',
    border: 'none',
    boxShadow: '0 0 20px rgba(63, 81, 181, 0.5)',
    '&:hover': {
      boxShadow: '0 0 30px rgba(63, 81, 181, 0.8)',
    },
  },
  keyboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    overflowX: 'auto',
    padding: theme.spacing(2),
    position: 'relative',
    borderRadius: '12px',
    background: 'rgba(17, 19, 35, 0.7)',
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(63, 81, 181, 0.2)',
    '&::-webkit-scrollbar': {
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(17, 19, 35, 0.5)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(63, 81, 181, 0.5)',
      borderRadius: '4px',
      '&:hover': {
        background: 'rgba(63, 81, 181, 0.7)',
      },
    },
  },
  pianoKey: {
    height: 140,
    margin: 0,
    padding: 0,
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:active': {
      transform: 'translateY(3px)',
    },
  },
  whiteKey: {
    width: 46,
    border: '1px solid #3f51b5',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '0 0 6px 6px',
    zIndex: 1,
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      backgroundColor: '#f8f8f8',
      boxShadow: '0 0 15px rgba(63, 81, 181, 0.5)',
    },
  },
  blackKey: {
    width: 32,
    backgroundColor: '#151933',
    height: 90,
    marginLeft: -16,
    marginRight: -16,
    zIndex: 2,
    borderRadius: '0 0 4px 4px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.6)',
    border: '1px solid #3f51b5',
    '&:hover': {
      backgroundColor: '#222747',
      boxShadow: '0 0 15px rgba(63, 81, 181, 0.5)',
    },
  },
  keyLabel: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#151933',
  },
  feedbackContainer: {
    padding: theme.spacing(3),
    borderRadius: '12px',
    marginTop: theme.spacing(2),
    textAlign: 'center',
    background: 'rgba(17, 19, 35, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(63, 81, 181, 0.2)',
    boxShadow: '0 0 20px rgba(63, 81, 181, 0.2)',
  },
  dialogTitle: {
    background: 'linear-gradient(135deg, #151933, #1d2045)',
    color: 'white',
    '& .MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginRight: theme.spacing(1),
      },
    },
  },
  dialogContent: {
    background: '#151933',
    color: '#a0a8d9',
  },
  dialogActions: {
    background: '#151933',
    padding: theme.spacing(2),
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderRadius: '12px',
    background: 'rgba(63, 81, 181, 0.1)',
    border: '1px solid rgba(63, 81, 181, 0.2)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 0 15px rgba(63, 81, 181, 0.5)',
    border: '2px solid rgba(63, 81, 181, 0.3)',
  },
  userName: {
    marginLeft: theme.spacing(2),
    color: '#ffffff',
    fontWeight: 600,
  },
  userLevel: {
    marginLeft: theme.spacing(2),
    color: '#a0a8d9',
    fontSize: '0.9rem',
  },
  highestScore: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(63, 81, 181, 0.1)',
    borderRadius: '12px',
    padding: theme.spacing(2),
    border: '1px solid rgba(63, 81, 181, 0.2)',
    boxShadow: '0 0 15px rgba(63, 81, 181, 0.2)',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  scoreValue: {
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: 700,
    textShadow: '0 0 10px rgba(63, 81, 181, 0.8)',
  },
  scoreLabel: {
    color: '#a0a8d9',
    fontSize: '0.9rem',
    marginTop: theme.spacing(0.5),
  },
  difficultyButton: {
    borderRadius: '8px',
    padding: '10px 15px',
    margin: theme.spacing(1),
    minWidth: '120px',
    color: '#a0a8d9',
    backgroundColor: 'rgba(17, 19, 35, 0.7)',
    border: '1px solid rgba(63, 81, 181, 0.2)',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 0 10px rgba(63, 81, 181, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(63, 81, 181, 0.2)',
      boxShadow: '0 0 15px rgba(63, 81, 181, 0.4)',
      color: '#ffffff',
    },
    '&.active': {
      background: 'linear-gradient(135deg, #3f51b5, #00f2fe)',
      color: '#ffffff',
      boxShadow: '0 0 20px rgba(63, 81, 181, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  },
  volumeSlider: {
    color: theme.palette.primary.main,
    '& .MuiSlider-track': {
      background: 'linear-gradient(90deg, #3f51b5, #00f2fe)',
      boxShadow: '0 0 10px rgba(63, 81, 181, 0.5)',
    },
    '& .MuiSlider-thumb': {
      width: 18,
      height: 18,
      backgroundColor: '#ffffff',
      border: '2px solid #3f51b5',
      boxShadow: '0 0 10px rgba(63, 81, 181, 0.8)',
      '&:hover, &.Mui-focusVisible': {
        boxShadow: '0 0 15px rgba(63, 81, 181, 1)',
      },
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: '#3f51b5',
      color: '#ffffff',
    },
  },
  offlineMode: {
    padding: theme.spacing(1, 2),
    borderRadius: '8px',
    backgroundColor: 'rgba(245, 0, 87, 0.1)',
    border: '1px solid rgba(245, 0, 87, 0.3)',
    color: '#f06292',
    margin: theme.spacing(0, 0, 2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  animatedIcon: {
    animation: '$pulse 2s infinite ease-in-out',
  },
  cyberpunkDivider: {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #3f51b5, #00f2fe, #3f51b5, transparent)',
    margin: theme.spacing(3, 0),
    boxShadow: '0 0 10px rgba(63, 81, 181, 0.5)',
    border: 'none',
  },
  '@keyframes spinCorrect': {
    '0%': { transform: 'scale(0) rotate(0deg)' },
    '50%': { transform: 'scale(1.2) rotate(180deg)' },
    '100%': { transform: 'scale(1) rotate(360deg)' }
  },
  '@keyframes shake': {
    '0%': { transform: 'translateX(0)' },
    '20%': { transform: 'translateX(-5px)' },
    '40%': { transform: 'translateX(5px)' },
    '60%': { transform: 'translateX(-3px)' },
    '80%': { transform: 'translateX(3px)' },
    '100%': { transform: 'translateX(0)' }
  },
  '@keyframes bounce': {
    '0%': { transform: 'scale(0)' },
    '50%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' }
  },
  '@keyframes pulseGreen': {
    '0%': { boxShadow: '0 0 10px rgba(76, 175, 80, 0.2)' },
    '50%': { boxShadow: '0 0 20px rgba(76, 175, 80, 0.4)' },
    '100%': { boxShadow: '0 0 10px rgba(76, 175, 80, 0.2)' }
  },
  '@keyframes pulseRed': {
    '0%': { boxShadow: '0 0 10px rgba(244, 67, 54, 0.2)' },
    '50%': { boxShadow: '0 0 20px rgba(244, 67, 54, 0.4)' },
    '100%': { boxShadow: '0 0 10px rgba(244, 67, 54, 0.2)' }
  },
  '@keyframes textFlicker': {
    '0%': { textShadow: '0 0 5px rgba(0, 242, 254, 0.5), 0 0 10px rgba(0, 242, 254, 0.3)' },
    '25%': { textShadow: '0 0 5px rgba(0, 242, 254, 0.3), 0 0 10px rgba(0, 242, 254, 0.2)' },
    '50%': { textShadow: '0 0 5px rgba(0, 242, 254, 0.5), 0 0 10px rgba(0, 242, 254, 0.3), 0 0 15px rgba(0, 242, 254, 0.2)' },
    '75%': { textShadow: '0 0 5px rgba(0, 242, 254, 0.3), 0 0 10px rgba(0, 242, 254, 0.2)' },
    '100%': { textShadow: '0 0 5px rgba(0, 242, 254, 0.5), 0 0 10px rgba(0, 242, 254, 0.3)' }
  },
  '@keyframes borderGlow': {
    '0%': { boxShadow: '0 0 10px rgba(63, 81, 181, 0.3), 0 0 20px rgba(0, 242, 254, 0.1), inset 0 0 10px rgba(63, 81, 181, 0.1)' },
    '50%': { boxShadow: '0 0 15px rgba(63, 81, 181, 0.5), 0 0 30px rgba(0, 242, 254, 0.2), inset 0 0 15px rgba(63, 81, 181, 0.2)' },
    '100%': { boxShadow: '0 0 10px rgba(63, 81, 181, 0.3), 0 0 20px rgba(0, 242, 254, 0.1), inset 0 0 10px rgba(63, 81, 181, 0.1)' }
  },
  '@keyframes scanline': {
    '0%': { transform: 'translateY(-100%)' },
    '100%': { transform: 'translateY(100%)' }
  },
  cyberpunkButtonHover: {
    '&:hover': {
      boxShadow: '0 0 20px rgba(63, 81, 181, 0.6), 0 0 40px rgba(0, 242, 254, 0.3)',
      textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
      transform: 'translateY(-2px)',
      transition: 'all 0.3s ease',
      '&::before': {
        opacity: 1,
        transform: 'scaleX(1)',
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: '0',
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #00f2fe, transparent)',
      transform: 'scaleX(0)',
      opacity: 0,
      transition: 'transform 0.3s ease, opacity 0.3s ease',
    },
    position: 'relative',
  },
  scanline: {
    position: 'absolute',
    width: '100%',
    height: '2px',
    backgroundColor: 'rgba(0, 242, 254, 0.1)',
    animation: '$scanline 8s linear infinite',
    pointerEvents: 'none',
    zIndex: 1,
  },
  mainHeading: {
    animation: '$textFlicker 3s infinite',
    fontWeight: 700,
    letterSpacing: '1px',
  },
  neoCyberpunkEffect: {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(225deg, rgba(63, 81, 181, 0.1), transparent 70%)',
      zIndex: 0,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.5), transparent)',
      zIndex: 0,
    },
  },
  cyberpunkCard: {
    animation: '$borderGlow 4s infinite ease-in-out',
    position: 'relative',
    overflow: 'hidden',
  },
  chordButton: {
    margin: '8px',
    minWidth: '120px',
    background: 'rgba(17, 19, 35, 0.7)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(63, 81, 181, 0.3)',
    borderRadius: '12px',
    padding: '10px 16px',
    color: '#a0a8d9',
    transition: 'all 0.3s ease',
  },
}));

const GamePlay = () => {
  const classes = useStyles();
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [audioContextStarted, setAudioContextStarted] = useState(false);
  const [userId, setUserId] = useState('user123'); // 模擬用戶ID，實際應用中應從登錄信息獲取
  const [currentQuestion, setCurrentQuestion] = useState(1); // 當前問題編號
  const [totalQuestions, setTotalQuestions] = useState(10); // 總問題數
  const [volume, setVolume] = useState(0.3); // 降低默認音量至 30%
  const [showVolumeWarning, setShowVolumeWarning] = useState(true); // 顯示音量警告提示
  const [showHelpDialog, setShowHelpDialog] = useState(false); // 控制幫助對話框顯示
  const [showAudioPrompt, setShowAudioPrompt] = useState(true); // 顯示音頻啟動提示
  const [isOfflineMode, setIsOfflineMode] = useState(false); // 離線模式標誌
  const [gameMode, setGameMode] = useState('chords'); // 遊戲模式：'chords'為單和弦辨識，'progressions'為和弦進行辨識
  const effectiveGameId = gameId || '1'; // 如果 gameId 未定義，使用默認值 '1'
  
  // 生成視覺化效果的隨機條形
  const generateRandomBars = () => {
    return Array.from({ length: 40 }, () => Math.floor(Math.random() * 80) + 10);
  };
  
  const [visualizerBars, setVisualizerBars] = useState(generateRandomBars());
  
  // 初始化音頻上下文
  const initializeAudio = () => {
    try {
      // 使用 Tone.js 的音頻上下文而不是創建新的
      if (Tone.context.state !== 'running') {
        Tone.start().then(() => {
          console.log('音頻上下文已啟動');
          setShowAudioPrompt(false);
        }).catch(e => {
          console.error('啟動音頻上下文失敗:', e);
          // 保持提示可見，因為我們需要用戶再次嘗試
        });
      } else {
        console.log('音頻上下文已經在運行中');
        setShowAudioPrompt(false);
      }
    } catch (error) {
      console.error('初始化音頻時出錯:', error);
    }
  };
  
  // 處理音頻提示點擊
  const handleAudioPromptClick = () => {
    initializeAudio();
  };
  
  // 處理頁面卸載時的清理
  useEffect(() => {
    return () => {
      // 組件卸載時，如果已經啟動了音頻上下文，則關閉它
      if (audioContextStarted && Tone.context.state === 'running') {
        Tone.context.close();
      }
    };
  }, [audioContextStarted]);
  
  // 設置 Tone.js 的主音量
  useEffect(() => {
    Tone.Destination.volume.value = Tone.gainToDb(volume); // 轉換線性音量到分貝
  }, [volume]);
  
  // 關閉音量警告
  const handleCloseVolumeWarning = () => {
    setShowVolumeWarning(false);
  };
  
  // 切換幫助對話框顯示
  const toggleHelpDialog = () => {
    setShowHelpDialog(!showHelpDialog);
  };
  
  // 從後端獲取分數
  useEffect(() => {
    if (userId) {
      fetchScore();
    }
  }, [userId, effectiveGameId]);
  
  // 從後端獲取分數的方法
  const fetchScore = async () => {
    try {
      if (isOfflineMode) {
        console.log('離線模式：使用本地分數');
        return;
      }
      
      console.log(`嘗試從 API 獲取分數，用戶ID: ${userId}, 遊戲ID: ${effectiveGameId}`);
      
      // 使用相對路徑並確保 effectiveGameId 是字符串
      const gameIdStr = String(effectiveGameId);
      
      // 使用新的分數 API
      console.log('使用新的分數 API 路徑...');
      const response = await axios.get(`http://localhost:5001/api/scores/${userId}/${gameIdStr}`);
      
      console.log('API響應:', response);
      
      if (response.data && response.data.score !== undefined) {
        setScore(response.data.score);
        console.log(`成功獲取分數: ${response.data.score}`);
      }
    } catch (error) {
      console.error('獲取分數失敗:', error);
      console.log('完整錯誤信息:', error.response || error.message);
      
      // 嘗試使用測試路由
      try {
        console.log('嘗試使用測試路由...');
        const testResponse = await axios.get(`http://localhost:5001/api/direct-score/${userId}/${effectiveGameId}`);
        console.log('測試路由響應:', testResponse.data);
        
        // 使用測試路由的分數
        if (testResponse.data && testResponse.data.score !== undefined) {
          setScore(testResponse.data.score);
          console.log(`使用測試路由分數: ${testResponse.data.score}`);
        }
      } catch (testError) {
        console.log('測試路由也失敗:', testError.message);
        // 啟用離線模式
        setIsOfflineMode(true);
        console.log('已啟用離線模式，將使用本地分數');
      }
    }
  };

  // 保存分數到後端
  const saveScore = async (newScore) => {
    if (isOfflineMode) {
      console.log('離線模式：分數僅保存在本地');
      return;
    }
    
    try {
      console.log(`嘗試保存分數，用戶ID: ${userId}, 遊戲ID: ${effectiveGameId}, 分數: ${newScore}`);
      const response = await axios.post('http://localhost:5001/api/scores', {
        userId,
        gameId: String(effectiveGameId),
        score: newScore
      });
      console.log('保存分數響應:', response.data);
      console.log('分數已保存到後端');
    } catch (error) {
      console.error('保存分數失敗:', error);
      console.log('完整錯誤信息:', error.response || error.message);
      setIsOfflineMode(true);
      console.log('已啟用離線模式，分數將僅保存在本地');
    }
  };
  
  // 重置分數到後端
  const resetScoreOnServer = async () => {
    if (isOfflineMode) {
      console.log('離線模式：分數僅在本地重置');
      return;
    }
    
    try {
      console.log(`嘗試重置分數，用戶ID: ${userId}, 遊戲ID: ${effectiveGameId}`);
      const gameIdStr = String(effectiveGameId);
      const response = await axios.delete(`http://localhost:5001/api/scores/${userId}/${gameIdStr}`);
      console.log('重置分數響應:', response.data);
      console.log('分數已在後端重置');
    } catch (error) {
      console.error('重置分數失敗:', error);
      console.log('完整錯誤信息:', error.response || error.message);
      setIsOfflineMode(true);
      console.log('已啟用離線模式，分數將僅在本地重置');
    }
  };

  // 改進重置分數方法
  const resetScore = () => {
    // 首先在本地重置分數
    setScore(0);
    // 重置當前問題編號
    setCurrentQuestion(1);
    // 然後在後端重置分數（如果不是離線模式）
    resetScoreOnServer();
  };

  // 獲取當前問題的正確答案
  const getCorrectAnswer = () => {
    if (gameMode === 'chords') {
      switch(currentQuestion % 5) {
        case 1: return "major"; // 大三和弦
        case 2: return "minor"; // 小三和弦
        case 3: return "augmented"; // 增三和弦
        case 4: return "diminished"; // 減三和弦
        case 0: return "dominant7"; // 屬七和弦
        default: return "major";
      }
    } else {
      // 和弦進行模式
      switch(currentQuestion % 3) {
        case 1: return "251"; // 2-5-1進行
        case 2: return "1645"; // 1-6-4-5進行
        case 0: return "1564"; // 1-5-6-4進行
        default: return "251";
      }
    }
  };

  // 播放音頻函數
  const playAudio = () => {
    // 初始化音頻
    initializeAudio();
    
    // 如果音頻上下文未啟動，則不執行後續邏輯
    if (!audioContextStarted && Tone.context.state !== 'running') {
      console.log('等待音頻上下文啟動...');
      Tone.context.resume().then(() => {
        setAudioContextStarted(true);
        // 音頻上下文啟動後，重新嘗試播放
        playAudio();
      }).catch(error => {
        console.error('無法啟動音頻上下文:', error);
        alert('無法啟動音頻。請確保您的瀏覽器允許播放聲音，或嘗試點擊頁面任意處。');
      });
      return;
    }
    
    // 如果顯示音量警告，先確認用戶已關閉警告
    if (showVolumeWarning) {
      setShowVolumeWarning(false);
    }
    
    setIsPlaying(true);
    
    try {
      // 創建合成器並連接到主輸出
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      
      // 根據當前問題生成不同的音頻
      const now = Tone.now();
      
      // 獲取當前問題的答案
      const correctAnswer = getCorrectAnswer();
      
      if (gameMode === 'chords') {
        // 單和弦模式
        switch(currentQuestion % 5) {
          case 1: // 大三和弦
            synth.triggerAttackRelease(["C4", "E4", "G4"], "2n", now);
            break;
          case 2: // 小三和弦
            synth.triggerAttackRelease(["C4", "Eb4", "G4"], "2n", now);
            break;
          case 3: // 增三和弦
            synth.triggerAttackRelease(["C4", "E4", "G#4"], "2n", now);
            break;
          case 4: // 減三和弦
            synth.triggerAttackRelease(["C4", "Eb4", "Gb4"], "2n", now);
            break;
          case 0: // 屬七和弦
            synth.triggerAttackRelease(["C4", "E4", "G4", "Bb4"], "2n", now);
            break;
        }
      } else {
        // 和弦進行模式
        switch(currentQuestion % 3) {
          case 1: // 2-5-1進行 (Dm7-G7-CMaj7)
            synth.triggerAttackRelease(["D4", "F4", "A4", "C5"], "1n", now);
            synth.triggerAttackRelease(["G3", "B3", "D4", "F4"], "1n", now + 1);
            synth.triggerAttackRelease(["C4", "E4", "G4", "B4"], "1n", now + 2);
            break;
          case 2: // 1-6-4-5進行 (CMaj7-Am7-FMaj7-G7)
            synth.triggerAttackRelease(["C4", "E4", "G4", "B4"], "1n", now);
            synth.triggerAttackRelease(["A3", "C4", "E4", "G4"], "1n", now + 1);
            synth.triggerAttackRelease(["F3", "A3", "C4", "E4"], "1n", now + 2);
            synth.triggerAttackRelease(["G3", "B3", "D4", "F4"], "1n", now + 3);
            break;
          case 0: // 1-5-6-4進行 (CMaj7-G7-Am7-FMaj7)
            synth.triggerAttackRelease(["C4", "E4", "G4", "B4"], "1n", now);
            synth.triggerAttackRelease(["G3", "B3", "D4", "F4"], "1n", now + 1);
            synth.triggerAttackRelease(["A3", "C4", "E4", "G4"], "1n", now + 2);
            synth.triggerAttackRelease(["F3", "A3", "C4", "E4"], "1n", now + 3);
            break;
        }
      }
      
      // 模擬音頻播放和視覺化效果
      const updateVisualizer = () => {
        setVisualizerBars(generateRandomBars());
      };
      
      // 每200毫秒更新一次視覺化效果
      const visualizerInterval = setInterval(updateVisualizer, 200);
      
      // 根據模式設置播放時長
      const playDuration = gameMode === 'chords' ? 3000 : 5000;
      
      // 播放結束後停止視覺化效果
      setTimeout(() => {
        setIsPlaying(false);
        clearInterval(visualizerInterval);
        setVisualizerBars(visualizerBars.map(() => 0));
      }, playDuration);
    } catch (error) {
      console.error('播放音頻時出錯:', error);
      setIsPlaying(false);
      alert('播放音頻時出錯。請稍後再試。');
    }
  };

  // 提交答案
  const submitAnswer = (answer) => {
    const correct = answer === getCorrectAnswer();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // 更新分數
    let newScore = score;
    if (correct) {
      newScore = score + 10; // 假設每題10分
      setScore(newScore);
      // 保存更新後的分數到後端
      saveScore(newScore);
      
      // 當答案正確時，增加當前問題編號
      if (currentQuestion < totalQuestions) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
      }
    }
    
    // 3秒後隱藏反饋
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const renderGameHeader = () => (
    <Box mb={4} className={classes.neoCyberpunkEffect}>
      <div className={classes.scanline}></div>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link component={RouterLink} to="/" color="inherit">
          <Box display="flex" alignItems="center">
            <Home style={{ marginRight: 8, fontSize: 20 }} />
            首頁
          </Box>
        </Link>
        <Link component={RouterLink} to="/games" color="inherit">
          <Box display="flex" alignItems="center">
            <LibraryMusic style={{ marginRight: 8, fontSize: 20 }} />
            遊戲列表
          </Box>
        </Link>
        <Typography color="textPrimary">
          <Box display="flex" alignItems="center">
            <MusicNote style={{ marginRight: 8, fontSize: 20 }} />
            遊戲詳情
          </Box>
        </Typography>
      </Breadcrumbs>

      <Button
        component={RouterLink}
        to="/games"
        className={`${classes.backButton} ${classes.cyberpunkButtonHover}`}
        startIcon={<ArrowBack />}
      >
        返回遊戲列表
      </Button>

      <Typography variant="h4" component="h1" className={`${classes.pageTitle} ${classes.mainHeading}`}>
        音樂理論挑戰
      </Typography>
      <Typography variant="body1" className={classes.gameDescription}>
        通過互動式遊戲提高您的音樂理論知識和聽力技能。選擇下方的遊戲模式開始挑戰！
      </Typography>
      
      {isOfflineMode && (
        <Box className={classes.offlineMode}>
          <Refresh className={classes.animatedIcon} />
          <Typography>離線模式：分數將僅保存在本地</Typography>
        </Box>
      )}
      
      <hr className={classes.cyberpunkDivider} />
    </Box>
  );

  const renderUserInfo = () => (
    <Box className={classes.avatarContainer}>
      <Avatar className={classes.avatar}>
        {userId ? userId.charAt(0).toUpperCase() : 'U'}
      </Avatar>
      <Box>
        <Typography className={classes.userName}>
          玩家{userId || '未登入'}
        </Typography>
        <Typography className={classes.userLevel}>
          等級: 初學者
        </Typography>
      </Box>
    </Box>
  );

  const renderGameOptions = () => (
    <Box mb={4}>
      {renderUserInfo()}
      
      <Typography variant="h6" gutterBottom style={{ color: '#a0a8d9' }}>
        學習模式選擇
      </Typography>
      
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Button
          variant="contained" 
          color="primary" 
          fullWidth 
          className={`${classes.difficultyButton} ${gameMode === 'chords' ? classes.activeOption : ''}`}
          style={{ marginBottom: 16 }}
          startIcon={<MusicNote />}
          onClick={() => setGameMode('chords')}
        >
          單和弦聽辨
          <Box fontSize="12px" marginTop="4px" color="#a0a8d9">
            辨識不同和弦類型的音色特性
          </Box>
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          className={`${classes.difficultyButton} ${gameMode === 'progressions' ? classes.activeOption : ''}`}
          style={{ marginBottom: 16 }}
          startIcon={<MusicNote />}
          onClick={() => setGameMode('progressions')}
        >
          和弦進行練習
          <Box fontSize="12px" marginTop="4px" color="#a0a8d9">
            辨識流行音樂中常用的和弦進行
          </Box>
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          className={classes.difficultyButton}
          startIcon={<MusicNote />}
          disabled
        >
          實際創作應用
          <Box fontSize="12px" marginTop="4px" color="#a0a8d9">
            即將推出：將和弦應用於創作實踐
          </Box>
        </Button>
      </Box>
      
      {score > 0 && (
        <Box className={classes.highestScore}>
          <Typography className={classes.scoreLabel}>最高分數</Typography>
          <Typography className={classes.scoreValue}>{score}</Typography>
        </Box>
      )}
      
      <Button
        variant="outlined"
        color="secondary"
        onClick={resetScore}
        style={{ marginTop: theme.spacing(1), borderRadius: '8px' }}
      >
        重置分數
      </Button>
    </Box>
  );

  const renderGameControls = () => (
    <>
      <Box className={classes.visualizer}>
        {[...Array(40)].map((_, index) => (
          <div
            key={index}
            className={classes.visualizerBar}
            style={{
              left: `${index * 2.5}%`,
              height: `${visualizerBars[index] || 5}px`,
            }}
          />
        ))}
      </Box>

      <Box className={classes.progressContainer}>
        <Typography variant="body2" gutterBottom style={{ color: '#a0a8d9' }}>
          進度: {currentQuestion} / {totalQuestions}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(currentQuestion / totalQuestions) * 100}
          className={classes.progressBar}
        />
      </Box>

      <Box className={classes.controlsContainer}>
        <Tooltip title="開始播放">
          <span>
            <IconButton
              className={`${classes.controlButton} ${classes.playButton}`}
              onClick={playAudio}
              disabled={isPlaying}
            >
              <PlayArrow fontSize="large" />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="重新播放">
          <span>
            <IconButton
              className={classes.controlButton}
              onClick={() => playAudio(true)}
              disabled={isPlaying}
            >
              <Replay />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="幫助">
          <IconButton
            className={classes.controlButton}
            onClick={toggleHelpDialog}
          >
            <Help />
          </IconButton>
        </Tooltip>
      </Box>
      
      <hr className={classes.cyberpunkDivider} />
    </>
  );

  return (
    <Container className={classes.gameContainer}>
      <div className={classes.gameBackground}></div>
      
      {renderGameHeader()}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Zoom in timeout={1600}>
            <Paper className={`${classes.gameCard} ${classes.cyberpunkCard}`}>
              <Box p={3} position="relative">
                <div className={classes.scanline}></div>
                {renderGameControls()}
                
                {/* 和弦選擇區域，替換原來的鋼琴鍵盤 */}
                <Box className={classes.keyboardContainer} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" style={{ marginBottom: '16px', color: '#a0a8d9', textAlign: 'center' }}>
                    {gameMode === 'chords' 
                      ? '聽聲音辨識和弦類型，在創作中掌握正確的和聲運用' 
                      : '辨識常見和弦進行，掌握流行音樂創作的和聲基礎'}
                  </Typography>
                  
                  <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                    {gameMode === 'chords' ? (
                      <>
                        <Button
                          variant="contained"
                          className={classes.chordButton}
                          onClick={() => submitAnswer("major")}
                          style={{
                            margin: '8px',
                            minWidth: '120px',
                            background: 'rgba(17, 19, 35, 0.7)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(63, 81, 181, 0.3)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: '#a0a8d9',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          大三和弦 (Major)
                          <Box fontSize="12px" mt={1} color="#00f2fe">
                            明亮、開闊感，常用於歡快情緒
                          </Box>
                        </Button>
                        
                        <Button
                          variant="contained"
                          className={classes.chordButton}
                          onClick={() => submitAnswer("minor")}
                          style={{
                            margin: '8px',
                            minWidth: '120px',
                            background: 'rgba(17, 19, 35, 0.7)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(63, 81, 181, 0.3)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: '#a0a8d9',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          小三和弦 (Minor)
                          <Box fontSize="12px" mt={1} color="#00f2fe">
                            深沉、憂鬱感，常用於抒情曲調
                          </Box>
                        </Button>
                        
                        <Button
                          variant="contained"
                          className={classes.chordButton}
                          onClick={() => submitAnswer("augmented")}
                          style={{
                            margin: '8px',
                            minWidth: '120px',
                            background: 'rgba(17, 19, 35, 0.7)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(63, 81, 181, 0.3)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: '#a0a8d9',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          增三和弦 (Augmented)
                          <Box fontSize="12px" mt={1} color="#00f2fe">
                            緊張懸疑感，常用於轉調過渡
                          </Box>
                        </Button>
                        
                        <Button
                          variant="contained"
                          className={classes.chordButton}
                          onClick={() => submitAnswer("diminished")}
                          style={{
                            margin: '8px',
                            minWidth: '120px',
                            background: 'rgba(17, 19, 35, 0.7)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(63, 81, 181, 0.3)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: '#a0a8d9',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          減三和弦 (Diminished)
                          <Box fontSize="12px" mt={1} color="#00f2fe">
                            不安定感，常用於戲劇性轉折
                          </Box>
                        </Button>
                        
                        <Button
                          variant="contained"
                          className={classes.chordButton}
                          onClick={() => submitAnswer("dominant7")}
                          style={{
                            margin: '8px',
                            minWidth: '120px',
                            background: 'rgba(17, 19, 35, 0.7)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(63, 81, 181, 0.3)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: '#a0a8d9',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          屬七和弦 (Dominant 7th)
                          <Box fontSize="12px" mt={1} color="#00f2fe">
                            帶有張力與解決感，常用於終止式
                          </Box>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          className={classes.chordButton}
                          onClick={() => submitAnswer("251")}
                          style={{
                            margin: '8px',
                            minWidth: '170px',
                            background: 'rgba(17, 19, 35, 0.7)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(63, 81, 181, 0.3)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: '#a0a8d9',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          2-5-1 進行
                          <Box fontSize="12px" mt={1} color="#00f2fe">
                            終止式，強烈的結束感
                          </Box>
                          <Box fontSize="11px" mt={0.5} color="#a0a8d9">
                            Dm7 - G7 - CMaj7
                          </Box>
                        </Button>
                        
                        <Button
                          variant="contained"
                          className={classes.chordButton}
                          onClick={() => submitAnswer("1645")}
                          style={{
                            margin: '8px',
                            minWidth: '170px',
                            background: 'rgba(17, 19, 35, 0.7)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(63, 81, 181, 0.3)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: '#a0a8d9',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          1-6-4-5 進行
                          <Box fontSize="12px" mt={1} color="#00f2fe">
                            流行經典進行，歌謠風格
                          </Box>
                          <Box fontSize="11px" mt={0.5} color="#a0a8d9">
                            CMaj7 - Am7 - FMaj7 - G7
                          </Box>
                        </Button>
                        
                        <Button
                          variant="contained"
                          className={classes.chordButton}
                          onClick={() => submitAnswer("1564")}
                          style={{
                            margin: '8px',
                            minWidth: '170px',
                            background: 'rgba(17, 19, 35, 0.7)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(63, 81, 181, 0.3)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: '#a0a8d9',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          1-5-6-4 進行
                          <Box fontSize="12px" mt={1} color="#00f2fe">
                            流行抒情曲常用進行
                          </Box>
                          <Box fontSize="11px" mt={0.5} color="#a0a8d9">
                            CMaj7 - G7 - Am7 - FMaj7
                          </Box>
                        </Button>
                      </>
                    )}
                  </Box>
                  
                  <Typography variant="body2" style={{ margin: '16px auto', color: '#a0a8d9', textAlign: 'center', maxWidth: '90%' }}>
                    {gameMode === 'chords' 
                      ? '提示：當您在創作時，不同和弦能創造不同的情感氛圍。聆聽後選擇正確的和弦類型，學習如何在您的創作中運用這些和聲色彩。'
                      : '提示：和弦進行是流行歌曲創作的基礎，不同進行創造不同風格與情感。聆聽後選擇正確的和弦進行，加強您的創作技巧。'}
                  </Typography>
                </Box>
                
                {/* 反饋信息 */}
                {showFeedback && (
                  <Fade in={showFeedback}>
                    <Box className={classes.feedbackContainer} sx={{
                      background: isCorrect
                        ? 'linear-gradient(135deg, rgba(17, 19, 35, 0.7), rgba(17, 25, 41, 0.7))'
                        : 'linear-gradient(135deg, rgba(25, 17, 17, 0.7), rgba(17, 19, 35, 0.7))',
                      border: isCorrect
                        ? '1px solid rgba(76, 175, 80, 0.3)'
                        : '1px solid rgba(244, 67, 54, 0.3)',
                      boxShadow: isCorrect
                        ? '0 0 20px rgba(76, 175, 80, 0.2)'
                        : '0 0 20px rgba(244, 67, 54, 0.2)',
                      animation: isCorrect
                        ? 'pulseGreen 2s infinite ease-in-out'
                        : 'pulseRed 2s infinite ease-in-out',
                    }}>
                      <Box display="flex" alignItems="center" justifyContent="center">
                        {isCorrect ? (
                          <>
                            <CheckCircle style={{ 
                              color: '#4caf50', 
                              fontSize: 28, 
                              marginRight: 8,
                              filter: 'drop-shadow(0 0 5px rgba(76, 175, 80, 0.5))',
                              animation: 'spinCorrect 1s ease-out',
                            }} />
                            <Typography variant="h6" style={{ 
                              color: '#4caf50', 
                              fontWeight: 600,
                              textShadow: '0 0 10px rgba(76, 175, 80, 0.5)'
                            }}>
                              正確！
                            </Typography>
                            <Box ml={2} px={2} py={0.5} style={{ 
                              backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                              borderRadius: '12px',
                              border: '1px solid rgba(76, 175, 80, 0.3)',
                              boxShadow: '0 0 10px rgba(76, 175, 80, 0.2)',
                              animation: 'bounce 0.5s ease',
                            }}>
                              <Typography variant="subtitle1" style={{ 
                                color: '#4caf50',
                                fontWeight: 'bold',
                                textShadow: '0 0 5px rgba(76, 175, 80, 0.3)'
                              }}>
                                +10 分
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Cancel style={{ 
                              color: '#f44336', 
                              fontSize: 28, 
                              marginRight: 8,
                              filter: 'drop-shadow(0 0 5px rgba(244, 67, 54, 0.5))',
                              animation: 'shake 0.5s ease-out',
                            }} />
                            <Typography variant="h6" style={{ 
                              color: '#f44336', 
                              fontWeight: 600,
                              textShadow: '0 0 10px rgba(244, 67, 54, 0.5)'
                            }}>
                              不正確！請再試一次。
                            </Typography>
                          </>
                        )}
                      </Box>
                      <Typography variant="body1" style={{ 
                        color: '#a0a8d9', 
                        marginTop: 8,
                        textAlign: 'center',
                        maxWidth: '80%',
                        margin: '8px auto 0',
                      }}>
                        {isCorrect 
                          ? '您的音樂理論知識非常扎實！' 
                          : '別擔心，音樂理論需要時間來掌握。再聽一次音頻，仔細分辨和弦的特性。'}
                      </Typography>
                    </Box>
                  </Fade>
                )}
              </Box>
            </Paper>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Zoom in timeout={1800}>
            <Paper className={classes.gameCard}>
              <Box p={3}>
                {renderGameOptions()}
              </Box>
            </Paper>
          </Zoom>
        </Grid>
      </Grid>

      {/* 音量警告對話框 */}
      <Dialog
        open={showVolumeWarning}
        onClose={handleCloseVolumeWarning}
        PaperProps={{
          style: {
            borderRadius: '16px',
            backgroundColor: '#151933',
            boxShadow: '0 0 30px rgba(63, 81, 181, 0.4)',
            border: '1px solid rgba(63, 81, 181, 0.3)',
          },
        }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography>
            <VolumeUp style={{ marginRight: 8 }} />
            音量提示
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography style={{ marginBottom: 20 }}>
            即將播放音頻，請注意您的裝置音量已適當調整，以避免音量過大造成不適。
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button 
            onClick={handleCloseVolumeWarning}
            style={{
              background: 'linear-gradient(90deg, #3f51b5, #00f2fe)',
              color: 'white',
              borderRadius: '8px',
              padding: '6px 16px',
            }}
          >
            我了解了
          </Button>
        </DialogActions>
      </Dialog>

      {/* 幫助對話框 */}
      <Dialog
        open={showHelpDialog}
        onClose={toggleHelpDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '16px',
            backgroundColor: '#151933',
            boxShadow: '0 0 30px rgba(63, 81, 181, 0.4)',
            border: '1px solid rgba(63, 81, 181, 0.3)',
          },
        }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography>
            <Help style={{ marginRight: 8 }} />
            遊戲幫助
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6" gutterBottom style={{ color: '#00f2fe' }}>
            <MusicNote style={{ marginRight: 8 }} />
            如何遊玩
          </Typography>
          <Box component="ol" style={{ color: '#a0a8d9', paddingLeft: '24px' }}>
            <li style={{ margin: '8px 0' }}>選擇學習模式：單和弦聽辨或和弦進行練習</li>
            <li style={{ margin: '8px 0' }}>點擊播放按鈕聆聽音樂</li>
            <li style={{ margin: '8px 0' }}>根據聽到的內容，選擇正確的和弦類型或和弦進行</li>
            <li style={{ margin: '8px 0' }}>每次正確回答可獲得10分</li>
          </Box>
          
          <hr className={classes.cyberpunkDivider} />
          
          <Typography variant="h6" gutterBottom style={{ color: '#00f2fe' }}>
            <MusicNote style={{ marginRight: 8 }} />
            創作應用
          </Typography>
          <Typography variant="body2" style={{ color: '#a0a8d9', marginBottom: '16px' }}>
            理解和弦類型及其進行是音樂創作的核心要素。這些知識將直接幫助您：
          </Typography>
          <Grid container spacing={2} style={{ marginTop: '8px' }}>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ color: '#a0a8d9' }}>
                • <b>豐富情感表達</b>：不同和弦具有獨特的情感特性，讓您能精確表達作品的情感色彩。
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ color: '#a0a8d9' }}>
                • <b>建立和聲架構</b>：流行音樂中的經典和弦進行能為您的創作提供穩固的和聲基礎。
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ color: '#a0a8d9' }}>
                • <b>創造曲風特色</b>：特定的和弦組合和進行能塑造不同音樂風格的獨特特徵。
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ color: '#a0a8d9' }}>
                • <b>突破創作瓶頸</b>：掌握多種和弦進行模式，幫助您在創作停滯時找到新的靈感。
              </Typography>
            </Grid>
          </Grid>
          
          <Typography variant="body2" style={{ color: '#00f2fe', marginTop: '16px', fontStyle: 'italic' }}>
            練習辨識這些和弦及其進行能讓您在創作時更有意識地選擇合適的和聲結構，為聽眾帶來更豐富的音樂體驗。
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button 
            onClick={toggleHelpDialog} 
            style={{
              background: 'linear-gradient(90deg, #3f51b5, #00f2fe)',
              color: 'white',
              borderRadius: '8px',
              padding: '6px 16px',
            }}
          >
            了解了
          </Button>
        </DialogActions>
      </Dialog>

      {/* 音頻啟動提示 */}
      <Dialog
        open={showAudioPrompt && !audioContextStarted}
        onClose={handleAudioPromptClick}
        PaperProps={{
          style: {
            borderRadius: '16px',
            backgroundColor: '#151933',
            boxShadow: '0 0 30px rgba(63, 81, 181, 0.4)',
            border: '1px solid rgba(63, 81, 181, 0.3)',
          },
        }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography>
            <MusicNote style={{ marginRight: 8 }} />
            啟動音頻
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography style={{ marginBottom: 20 }}>
            為了能夠播放音頻，瀏覽器需要您的交互操作。請點擊下面的按鈕來啟動音頻。
          </Typography>
          <Typography style={{ marginBottom: 20, color: '#f8d568' }}>
            注意：音量已預設為較低水平，請確保您的裝置音量設置得當，以獲得最佳體驗。
          </Typography>
          <Typography style={{ color: '#00f2fe' }}>
            本遊戲專為音樂創作學習設計，通過聆聽和辨識不同和弦類型，幫助您在實際創作中選擇合適的和聲色彩。
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button 
            onClick={handleAudioPromptClick}
            style={{
              background: 'linear-gradient(90deg, #3f51b5, #00f2fe)',
              color: 'white',
              borderRadius: '8px',
              padding: '6px 16px',
            }}
          >
            啟動音頻
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GamePlay;