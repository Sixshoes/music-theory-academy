import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Zoom,
  Fade,
  Paper,
  IconButton,
  Divider,
  Chip,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MusicNote, LibraryMusic, Equalizer, School, Headset, EmojiEvents, Palette, KeyboardArrowDown, Code as CodeIcon, Star, Forum, Alarm, ArrowForward, Info as InfoIcon, PersonAdd as PersonAddIcon, LockOpen as LockOpenIcon } from '@material-ui/icons';
import { MusicNote as MusicNoteIcon, QueueMusic as QueueMusicIcon, GraphicEq as GraphicEqIcon, Radio as RadioIcon, Album as AlbumIcon } from '@material-ui/icons';
import { theme } from '../App';

const useStyles = makeStyles((theme) => ({
  heroSection: {
    background: 'linear-gradient(135deg, var(--dark-bg) 0%, var(--card-bg) 100%)',
    padding: theme.spacing(12, 0, 10),
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '0 0 0 70px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1,
    zIndex: 0,
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
  },
  heroTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    textShadow: '0 0 15px rgba(0, 242, 254, 0.5)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -15,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120px',
      height: '3px',
      background: 'var(--cyberpunk-line)',
    },
  },
  heroSubtitle: {
    fontWeight: 400,
    marginBottom: theme.spacing(4),
    maxWidth: '800px',
    margin: '0 auto',
    color: 'var(--text-secondary)',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  scanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'var(--secondary-color)',
    opacity: 0.5,
    zIndex: 2,
    animation: '$scanAnimation 4s linear infinite',
    boxShadow: '0 0 15px var(--secondary-color), 0 0 30px var(--secondary-color)',
  },
  '@keyframes scanAnimation': {
    '0%': {
      top: 0,
      opacity: 0.5,
    },
    '100%': {
      top: '100%',
      opacity: 0,
    },
  },
  scrollDown: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    animation: '$bounce 2s infinite',
    color: 'var(--secondary-color)',
    zIndex: 5,
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0) translateX(-50%)',
    },
    '40%': {
      transform: 'translateY(-15px) translateX(-50%)',
    },
    '60%': {
      transform: 'translateY(-7px) translateX(-50%)',
    },
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
    position: 'relative',
  },
  cyberpunkHeading: {
    position: 'relative',
    display: 'inline-block',
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    fontWeight: 700,
    letterSpacing: '2px',
    marginBottom: theme.spacing(6),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '-60px',
      width: '40px',
      height: '2px',
      background: 'var(--secondary-color)',
      transform: 'translateY(-50%)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: '-60px',
      width: '40px',
      height: '2px',
      background: 'var(--secondary-color)',
      transform: 'translateY(-50%)',
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s ease',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'var(--card-bg)',
    border: '1px solid rgba(0, 242, 254, 0.1)',
    position: 'relative',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    background: 'var(--darker-bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cardMediaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%)',
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position: 'relative',
    zIndex: 1,
    background: 'rgba(26, 31, 53, 0.5)',
    backdropFilter: 'blur(5px)',
  },
  cardTitle: {
    color: 'var(--text-primary)',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  cardDescription: {
    color: 'var(--text-secondary)',
  },
  featureIcon: {
    fontSize: 50,
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
    padding: theme.spacing(2),
    borderRadius: '12px',
    color: 'white',
    boxShadow: 'var(--neon-glow)',
  },
  featureTitle: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    textTransform: 'uppercase',
  },
  featureDescription: {
    color: 'var(--text-secondary)',
  },
  featureBox: {
    padding: theme.spacing(3),
    borderRadius: '12px',
    height: '100%',
    transition: 'all 0.3s ease',
    background: 'var(--card-bg)',
    border: '1px solid rgba(0, 242, 254, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  section: {
    padding: theme.spacing(12, 0),
    position: 'relative',
  },
  sectionTitle: {
    marginBottom: theme.spacing(5),
    fontWeight: 700,
    position: 'relative',
    display: 'inline-block',
    color: 'var(--text-primary)',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -10,
      left: '50%',
      width: '80px',
      height: '3px',
      background: 'var(--cyberpunk-line)',
      transform: 'translateX(-50%)',
      borderRadius: '2px',
    },
  },
  ctaSection: {
    background: 'linear-gradient(135deg, var(--dark-bg) 0%, var(--card-bg) 100%)',
    padding: theme.spacing(8, 0),
    color: 'white',
    borderRadius: '12px',
    margin: theme.spacing(6, 0),
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(0, 242, 254, 0.2)',
  },
  ctaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.05,
    zIndex: 0,
  },
  ctaContent: {
    position: 'relative',
    zIndex: 1,
  },
  ctaButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 4),
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '6px',
    background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      height: '3px',
      background: 'var(--secondary-color)',
      boxShadow: 'var(--neon-glow)',
      transition: 'all 0.3s',
    },
    '&:hover': {
      background: 'linear-gradient(45deg, var(--secondary-color), var(--primary-color))',
      transform: 'translateY(-2px)',
      '&::after': {
        transform: 'scaleX(0.8)',
      },
    },
  },
  gameButton: {
    background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
    color: '#fff',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    fontWeight: 600,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.2)',
      transition: 'all 0.5s',
    },
    '&:hover::before': {
      left: '100%',
    },
  },
  floatingNotes: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    overflow: 'hidden',
    opacity: 0.6,
    pointerEvents: 'none',
  },
  musicNote: {
    position: 'absolute',
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0 0 5px rgba(0, 242, 254, 0.5))',
    opacity: 0,
    animation: '$floatAnimation 25s linear infinite',
  },
  '@keyframes floatAnimation': {
    '0%': {
      transform: 'translateY(100vh) rotate(0deg)',
      opacity: 0,
    },
    '10%': {
      opacity: 0.6,
    },
    '90%': {
      opacity: 0.6,
    },
    '100%': {
      transform: 'translateY(-100px) rotate(360deg)',
      opacity: 0,
    },
  },
  dataLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
  },
  glitchEffect: {
    animation: '$glitch 3s infinite',
    position: 'relative',
  },
  '@keyframes glitch': {
    '0%': {
      textShadow: '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)',
    },
    '14%': {
      textShadow: '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)',
    },
    '15%': {
      textShadow: '-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)',
    },
    '49%': {
      textShadow: '-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)',
    },
    '50%': {
      textShadow: '0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75)',
    },
    '99%': {
      textShadow: '0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75)',
    },
    '100%': {
      textShadow: '-0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75)',
    },
  },
  sectionContainer: {
    padding: theme.spacing(8, 0),
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  sectionSubtitle: {
    color: 'var(--text-secondary)',
  },
  featureGrid: {
    marginTop: theme.spacing(4),
  },
  featurePaper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    borderRadius: '12px',
    background: 'var(--card-bg)',
    border: '1px solid rgba(0, 242, 254, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  featureIconWrap: {
    marginBottom: theme.spacing(2),
  },
  courseCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s ease',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'var(--card-bg)',
    border: '1px solid rgba(0, 242, 254, 0.1)',
    position: 'relative',
  },
  courseMedia: {
    paddingTop: '56.25%', // 16:9
    background: 'var(--darker-bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  courseContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position: 'relative',
    zIndex: 1,
    background: 'rgba(26, 31, 53, 0.5)',
    backdropFilter: 'blur(5px)',
  },
  courseTitle: {
    color: 'var(--text-primary)',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  courseDescription: {
    color: 'var(--text-secondary)',
  },
  courseMetaInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseChip: {
    marginRight: theme.spacing(1),
  },
  courseActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseButton: {
    marginRight: theme.spacing(1),
  },
  courseButtonOutlined: {
    marginRight: theme.spacing(1),
  },
  viewAllButton: {
    marginTop: theme.spacing(4),
  },
  introductionBox: {
    padding: theme.spacing(8),
  },
  introTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    textShadow: '0 0 15px rgba(0, 242, 254, 0.5)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -15,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120px',
      height: '3px',
      background: 'var(--cyberpunk-line)',
    },
  },
  introText: {
    color: 'var(--text-secondary)',
  },
  introButton: {
    marginTop: theme.spacing(3),
  },
  introImageBox: {
    padding: theme.spacing(2),
    borderRadius: '12px',
    background: 'var(--card-bg)',
    border: '1px solid rgba(0, 242, 254, 0.1)',
  },
  introImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
  },
  callToAction: {
    background: 'linear-gradient(135deg, var(--dark-bg) 0%, var(--card-bg) 100%)',
    padding: theme.spacing(8, 0),
    color: 'white',
    borderRadius: '12px',
    margin: theme.spacing(6, 0),
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(0, 242, 254, 0.2)',
  },
  ctaTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    textShadow: '0 0 15px rgba(0, 242, 254, 0.5)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -15,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120px',
      height: '3px',
      background: 'var(--cyberpunk-line)',
    },
  },
  ctaSubtitle: {
    fontWeight: 400,
    marginBottom: theme.spacing(4),
    maxWidth: '800px',
    margin: '0 auto',
    color: 'var(--text-secondary)',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
  },
  ctaSecondaryButton: {
    marginLeft: theme.spacing(2),
  },
}));

const FloatingNotes = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    // 檢查是否為移動設備
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // 在移動設備上不顯示音符
    
    const generateNotes = () => {
      const newNotes = [];
      const icons = [
        <MusicNoteIcon />,
        <QueueMusicIcon />,
        <GraphicEqIcon />,
        <RadioIcon />,
        <AlbumIcon />,
      ];
      
      const notesCount = 15; // 減少音符數量以提高性能
      
      for (let i = 0; i < notesCount; i++) {
        const icon = icons[Math.floor(Math.random() * icons.length)];
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${15 + Math.random() * 20}s`;
        const animationDelay = `${Math.random() * 10}s`;
        const size = `${1 + Math.random() * 1.5}rem`;
        const rotation = Math.random() > 0.5 ? 'clockwise' : 'counterclockwise';
        
        newNotes.push(
          <Box
            key={i}
            className={classes.musicNote}
            sx={{
              left,
              fontSize: size,
              animationDuration,
              animationDelay,
              filter: i % 3 === 0 ? 'drop-shadow(0 0 8px rgba(240, 80, 230, 0.5))' : 
                    i % 3 === 1 ? 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.5))' :
                    'drop-shadow(0 0 8px rgba(63, 81, 181, 0.5))',
              color: i % 3 === 0 ? 'var(--accent-color)' : 
                    i % 3 === 1 ? 'var(--secondary-color)' :
                    'var(--primary-color)',
            }}
          >
            {icon}
          </Box>
        );
      }
      setNotes(newNotes);
    };
    
    generateNotes();
    
    // 每隔一段時間重新生成音符
    const interval = setInterval(generateNotes, 30000);
    return () => clearInterval(interval);
  }, [classes]);
  
  return <div className={classes.floatingNotes}>{notes}</div>;
};

const features = [
  {
    icon: <School />,
    title: '系統化學習',
    description: '依照音樂理論的難度和關聯性，提供從基礎到高階的完整學習路徑，確保學習者能循序漸進地掌握專業知識。'
  },
  {
    icon: <LibraryMusic />,
    title: '認知科學導向',
    description: '基於認知科學研究，設計互動式學習模組，強化知識吸收和記憶，提高學習效率與理解深度。'
  },
  {
    icon: <Headset />,
    title: '聽覺與視覺整合',
    description: '結合專業音訊處理和視覺化設計，創造沉浸式學習體驗，幫助學習者建立音樂概念與聽覺感知的連結。'
  },
  {
    icon: <EmojiEvents />,
    title: '專業能力評估',
    description: '精確測量學習成果與音樂素養，提供詳細的進度分析與專業化反饋，協助學習者識別優勢與待改進領域。'
  },
  {
    icon: <Equalizer />,
    title: '個人化學習追蹤',
    description: '智能分析學習者表現，自動調整課程難度與重點，根據個人需求定制專屬學習計劃，實現高效學習。'
  },
  {
    icon: <LibraryMusic />,
    title: '專業教學資源',
    description: '由音樂教育專家精心編寫的輔助教材、進階讀物與參考資料，深化理論理解，拓展音樂視野。'
  },
  {
    icon: <Forum />,
    title: '專業社群交流',
    description: '連接全球音樂學習者與教育者，建立知識共享平台，促進專業討論與合作學習，創造豐富的社群生態系統。'
  },
  {
    icon: <Headset />,
    title: '實時反饋系統',
    description: '透過先進的音訊分析技術，提供即時、精確的學習反饋，加速學習過程並提升學習體驗質量。'
  },
];

// 添加通用的占位圖片
const defaultCourseImage = '/music-theory-academy/images/default-course.jpg';

// 處理圖片加載錯誤的函數
const handleImageError = (e) => {
  console.log('Image failed to load, using fallback');
  e.target.onerror = null; // 防止無限循環
  e.target.src = defaultCourseImage;
};

const featuredCourses = [
  {
    id: 1,
    title: '和聲學基礎',
    description: '深入探索和聲結構與進行原理，從三和弦到七和弦，掌握古典和聲至現代和聲的理論體系。',
    image: defaultCourseImage,
    level: '初級至中級',
    modules: 12,
    duration: '6 週'
  },
  {
    id: 2,
    title: '調式音階研究',
    description: '全面分析西方與東方調式系統，包括教會調式、爵士調式以及各地民族音階的特性與應用。',
    image: defaultCourseImage,
    level: '中級',
    modules: 8,
    duration: '4 週'
  },
  {
    id: 3,
    title: '節奏與韻律精通',
    description: '系統學習複雜節奏型態、節拍變化與多聲部節奏，提升演奏與作曲中的節奏處理能力。',
    image: defaultCourseImage,
    level: '中級至高級',
    modules: 10,
    duration: '5 週'
  },
  {
    id: 4,
    title: '調性與和聲分析',
    description: '學習樂曲結構和和聲分析方法，從巴洛克到現代音樂，培養專業的分析思維與聽辨能力。',
    image: defaultCourseImage,
    level: '高級',
    modules: 14,
    duration: '7 週'
  }
];

const Home = () => {
  const classes = useStyles();
  const [animateFeatures, setAnimateFeatures] = useState(false);
  
  useEffect(() => {
    // 頁面加載後延遲顯示特色動畫
    const timer = setTimeout(() => {
      setAnimateFeatures(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {/* 英雄區塊 */}
      <div className={classes.heroSection}>
        <div className={classes.heroOverlay}></div>
        <div className={classes.scanner}></div>
        <FloatingNotes />
        <Container maxWidth="md" className={classes.heroContent}>
          <Fade in timeout={1000}>
            <Typography component="h1" variant="h2" align="center" gutterBottom className={`${classes.heroTitle} neon-text`}>
              音樂理論互動學習平台
            </Typography>
          </Fade>
          <Fade in timeout={1500}>
            <Typography variant="h5" align="center" paragraph className={classes.heroSubtitle}>
              透過直觀互動的方式深入探索音樂理論，提升您的音樂素養與專業技能。
              <br />
              <Box component="span" className={classes.glitchEffect}>
                創新科技與專業音樂教育的完美結合
              </Box>
            </Typography>
          </Fade>
          <Fade in timeout={2000}>
            <div className={classes.heroButtons}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    component={RouterLink} 
                    to="/games"
                    size="large"
                    className={`${classes.gameButton} pulse-button`}
                  >
                    開始學習
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="outlined" 
                    style={{ color: 'var(--secondary-color)', borderColor: 'var(--secondary-color)' }} 
                    component={RouterLink} 
                    to="/resources"
                    size="large"
                    className="border-glow"
                  >
                    <Box display="flex" alignItems="center">
                      <CodeIcon style={{ marginRight: 8 }} />
                      專業資源
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Container>
        <IconButton className={classes.scrollDown}>
          <KeyboardArrowDown fontSize="large" />
        </IconButton>
      </div>

      {/* 特色課程展示 */}
      <Container maxWidth="lg" className={classes.sectionContainer}>
        <Box className={classes.sectionHeader}>
          <Typography variant="h4" component="h2" className={classes.sectionTitle}>
            精選學習課程
          </Typography>
          <Typography variant="subtitle1" className={classes.sectionSubtitle}>
            精心設計的互動學習模組，專業與趣味並重
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {featuredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.id}>
              <Card className={classes.courseCard}>
                <CardMedia
                  className={classes.courseMedia}
                  title={course.title}
                  component="div"
                >
                  <div
                    style={{
                      backgroundImage: `url(${course.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                  <img 
                    src={course.image}
                    alt={course.title}
                    style={{ display: 'none' }}
                    onError={handleImageError}
                  />
                </CardMedia>
                <CardContent className={classes.courseContent}>
                  <Typography variant="h6" className={classes.courseTitle} gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className={classes.courseDescription}>
                    {course.description}
                  </Typography>
                  <Box className={classes.courseMetaInfo} mt={2}>
                    <Chip
                      size="small"
                      label={`難度: ${course.level}`}
                      className={classes.courseChip}
                      icon={<School fontSize="small" />}
                    />
                    <Chip
                      size="small"
                      label={`${course.modules} 個單元`}
                      className={classes.courseChip}
                      icon={<LibraryMusic fontSize="small" />}
                    />
                    <Chip
                      size="small"
                      label={course.duration}
                      className={classes.courseChip}
                      icon={<Alarm fontSize="small" />}
                    />
                  </Box>
                </CardContent>
                <CardActions className={classes.courseActions}>
                  <Button
                    size="small" 
                    color="primary"
                    variant="contained"
                    className={classes.courseButton}
                    component={RouterLink}
                    to={`/courses/${course.id}`}
                  >
                    開始學習
                  </Button>
                  <Button
                    size="small"
                    className={classes.courseButtonOutlined}
                    component={RouterLink}
                    to={`/courses/${course.id}/preview`}
                  >
                    課程預覽
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={classes.viewAllButton}
            component={RouterLink}
            to="/courses"
            endIcon={<ArrowForward />}
          >
            瀏覽所有課程
          </Button>
        </Box>
      </Container>

      {/* 平台介紹區域 */}
      <Container maxWidth="lg" className={classes.sectionContainer}>
        <Box className={classes.introductionBox}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" className={classes.introTitle} gutterBottom>
                專業音樂理論<br />現代學習方法
              </Typography>
              <Typography variant="body1" paragraph className={classes.introText}>
                音樂理論學院結合傳統音樂教育理念與現代科技，打造全新的音樂理論學習體驗。我們的平台由專業音樂教育者與技術專家共同開發，融合學術嚴謹性與互動科技的優勢。
              </Typography>
              <Typography variant="body1" paragraph className={classes.introText}>
                無論您是音樂學院學生、音樂教師、專業音樂人，還是音樂愛好者，我們提供系統化的學習路徑，助您掌握從基礎到高階的音樂理論知識，提升您的創作、演奏與音樂理解能力。
              </Typography>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.introButton}
                  component={RouterLink}
                  to="/about"
                  startIcon={<InfoIcon />}
                >
                  了解更多
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} className={classes.introImageBox}>
                <img 
                  src="/music-theory-academy/images/music-theory-concept.jpg" 
                  alt="音樂理論概念" 
                  className={classes.introImage} 
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* 號召行動區域 */}
      <Box className={classes.callToAction}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h2" className={classes.ctaTitle}>
                開始您的專業音樂理論學習之旅
              </Typography>
              <Typography variant="subtitle1" className={classes.ctaSubtitle}>
                註冊帳號，立即獲得免費課程與專業學習資源
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.ctaButton}
                  component={RouterLink}
                  to="/signup"
                  startIcon={<PersonAddIcon />}
                >
                  免費註冊
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  className={classes.ctaSecondaryButton}
                  component={RouterLink}
                  to="/login"
                  startIcon={<LockOpenIcon />}
                >
                  會員登入
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 特色區塊 */}
      <Container maxWidth="lg" className={classes.sectionContainer}>
        <Box className={classes.sectionHeader}>
          <Typography variant="h4" component="h2" className={classes.sectionTitle}>
            為何選擇我們的平台
          </Typography>
          <Typography variant="subtitle1" component="p" className={classes.sectionSubtitle}>
            專業、系統、互動的音樂理論學習體驗
          </Typography>
        </Box>
        
        <Grid container spacing={4} className={classes.featureGrid}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} className={classes.featurePaper}>
                <Box className={classes.featureIconWrap}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" className={classes.featureTitle}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" className={classes.featureDescription}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 號召行動 */}
      <Container maxWidth="md">
        <Fade in timeout={1500}>
          <Paper className={`${classes.ctaSection} cyberpunk-border`}>
            <div className={classes.ctaOverlay}></div>
            <div className={classes.scanner}></div>
            <Box textAlign="center" py={6} className={classes.ctaContent}>
              <Typography variant="h3" gutterBottom className="neon-text-primary">
                準備好開始您的音樂理論學習之旅了嗎？
              </Typography>
              <Typography variant="h6" paragraph style={{ color: 'var(--text-secondary)' }}>
                立即加入我們，體驗科技輔助下的專業音樂教育！
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                component={RouterLink} 
                to="/games"
                className={classes.ctaButton}
              >
                立即開始
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </main>
  );
};

export default Home;