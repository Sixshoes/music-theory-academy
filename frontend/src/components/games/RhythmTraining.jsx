import React, { useState, useEffect, useRef } from 'react';
import {
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  LinearProgress,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Slider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Badge,
  Avatar,
  Chip,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { 
  PlayArrow, Stop, Refresh, Help, TouchApp, 
  Info, LibraryMusic, School, VolumeUp, VolumeOff,
  Add, Edit, Delete, Save, Cancel, ExpandMore, ExpandLess,
  Star, StarBorder, MusicNote, Settings, Assessment, EmojiEvents,
  Timeline, CheckCircle, Error, ShowChart
} from '@mui/icons-material';
import * as Tone from 'tone';

// Styled components
const GameContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
  backgroundColor: 'var(--card-bg)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(63, 81, 181, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'var(--music-gradient)',
    zIndex: 1,
  }
}));

const RhythmPatternDisplay = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'var(--darker-bg)',
  borderRadius: theme.spacing(1),
  minHeight: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const BeatIndicator = styled(Box)(({ active, theme }) => ({
  width: '36px',
  height: '36px',
  margin: theme.spacing(0, 1),
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: active ? 'var(--accent-color)' : 'var(--darker-bg)',
  color: 'var(--text-primary)',
  border: '2px solid var(--primary-color)',
  transition: 'all 0.1s ease-in-out',
  boxShadow: active ? 'var(--accent-glow)' : 'none',
  transform: active ? 'scale(1.1)' : 'scale(1)',
}));

const TapArea = styled(Box)(({ isActive, theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: isActive ? 'rgba(63, 81, 181, 0.2)' : 'rgba(26, 31, 53, 0.7)',
  border: `2px solid ${isActive ? 'var(--primary-color)' : 'var(--darker-bg)'}`,
  cursor: isActive ? 'pointer' : 'default',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  boxShadow: isActive ? 'var(--primary-glow)' : 'none',
  '&:hover': {
    backgroundColor: isActive ? 'rgba(63, 81, 181, 0.3)' : 'rgba(26, 31, 53, 0.7)',
  },
  '&:active': {
    transform: isActive ? 'scale(0.98)' : 'none',
  }
}));

const UserTapDisplay = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'var(--darker-bg)',
  borderRadius: theme.spacing(1),
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

const TapIndicator = styled(Box)(({ isMatch, theme }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  margin: theme.spacing(0, 0.5),
  backgroundColor: isMatch ? 'var(--success-color)' : 'var(--error-color)',
  boxShadow: isMatch ? '0 0 10px var(--success-color)' : '0 0 10px var(--error-color)',
}));

const StyledFeedback = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  color: 'var(--text-primary)',
  textAlign: 'center',
  fontWeight: 'bold',
  backgroundColor: 'rgba(26, 31, 53, 0.7)',
  borderRadius: theme.spacing(1),
  animation: 'fadeInOut 1s ease',
}));

const ProgressBar = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(1),
  width: '100%',
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100%',
  marginTop: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  boxShadow: 'var(--primary-glow)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '10%',
    width: '80%',
    height: '2px',
    backgroundImage: 'var(--cyberpunk-line)',
  }
}));

const DifficultyTag = styled('span')(({ theme }) => ({
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  backgroundColor: 'var(--primary-color)',
  color: 'white',
  marginLeft: theme.spacing(1),
  verticalAlign: 'middle',
}));

const InfoButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: 'var(--secondary-color)',
  backgroundColor: 'rgba(0, 242, 254, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(0, 242, 254, 0.2)',
  }
}));

const TheoryCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: 'var(--card-bg)',
  boxShadow: 'var(--neon-glow)',
  border: '1px solid var(--secondary-color)',
}));

const RhythmPatternVisualization = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minHeight: '120px',
  backgroundImage: 'url(/music-pattern.svg)',
  backgroundRepeat: 'repeat-x',
  backgroundSize: 'auto 100%',
  opacity: 0.8,
}));

const NoteRepresentation = styled(Box)(({ noteType, theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  margin: theme.spacing(0, 0.5),
  opacity: 0.9,
}));

const TheoryDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'var(--card-bg)',
    backgroundImage: 'linear-gradient(145deg, rgba(26, 31, 53, 0.7), rgba(26, 31, 53, 0.9))',
    color: 'var(--text-primary)',
    border: '1px solid var(--secondary-color)',
    boxShadow: 'var(--neon-glow)',
  }
}));

const VolumeControl = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1),
  backgroundColor: 'rgba(26, 31, 53, 0.5)',
  borderRadius: theme.spacing(1),
}));

const VolumeSlider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  flex: 1,
}));

const PerformanceTip = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  margin: theme.spacing(2, 0),
  backgroundColor: 'rgba(255, 203, 107, 0.1)',
  border: '1px solid var(--warning-color)',
  borderRadius: theme.spacing(1),
  color: 'var(--warning-color)',
}));

const BeatAnimation = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  backgroundColor: 'rgba(63, 81, 181, 0.3)',
  animation: 'beatPulse 1s ease-out',
  pointerEvents: 'none',
}));

const SuccessAnimation = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(13, 245, 227, 0.15)',
  animation: 'successFlash.5s ease-out',
  pointerEvents: 'none',
}));

const ResponsiveControls = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '& > button': {
      margin: theme.spacing(0.5, 0),
    }
  }
}));

const AchievementIcon = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: 'rgba(33, 150, 243, 0.1)',
}));

const StatsCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0.5, 0),
}));

const AchievementBadge = styled(Badge)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const AchievementListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const AchievementLocked = styled('div')({
  opacity: 0.5,
  filter: 'grayscale(1)',
});

const HeatmapContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
}));

const HeatmapBlock = styled(Box)(({ theme }) => ({
  width: 16,
  height: 16,
  margin: 2,
  borderRadius: 2,
}));

// 成就定義
const achievements = [
  { 
    id: 'perfect_rhythm', 
    name: '完美節奏', 
    description: '在一次練習中獲得100%的準確度', 
    icon: <Star sx={{ color: 'gold' }} />,
    condition: (stats) => stats.highestAccuracy === 100
  },
  { 
    id: 'rhythm_master', 
    name: '節奏大師', 
    description: '完成所有5個級別的練習', 
    icon: <EmojiEvents sx={{ color: '#c0c0c0' }} />,
    condition: (stats) => stats.completedLevels >= 5
  },
  { 
    id: 'practice_makes_perfect', 
    name: '熟能生巧', 
    description: '累計敲擊超過1000次', 
    icon: <TouchApp sx={{ color: '#cd7f32' }} />,
    condition: (stats) => stats.totalTaps >= 1000
  },
  { 
    id: 'memory_expert', 
    name: '記憶專家', 
    description: '在記憶模式下獲得90%以上的準確度5次', 
    icon: <CheckCircle sx={{ color: 'green' }} />,
    condition: (stats) => stats.memoryModeHighScores.filter(score => score >= 90).length >= 5
  },
  { 
    id: 'follow_king', 
    name: '跟隨之王', 
    description: '在跟隨模式下完成10次練習', 
    icon: <Timeline sx={{ color: 'blue' }} />,
    condition: (stats) => stats.followModeCompletions >= 10
  }
];

const RhythmTraining = ({ level = 1, onComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [currentPattern, setCurrentPattern] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuestions] = useState(5); // 每個級別5個問題
  const [feedback, setFeedback] = useState('');
  const [activeBeat, setActiveBeat] = useState(-1);
  const [userTaps, setUserTaps] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(0); // 添加倒數計時狀態
  const [showTheory, setShowTheory] = useState(false);
  const [currentTheory, setCurrentTheory] = useState('');
  
  const metronomeRef = useRef(null);
  const playerRef = useRef(null);
  const startTimeRef = useRef(0);
  const tapTimesRef = useRef([]);
  const volumeNodeRef = useRef(null);
  
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [showTip, setShowTip] = useState(false);
  
  // 新增狀態
  const [customPatterns, setCustomPatterns] = useState([]);
  const [showCustomPatternDialog, setShowCustomPatternDialog] = useState(false);
  const [newPattern, setNewPattern] = useState({
    name: '',
    description: '',
    pattern: [1, 1, 1, 1],
    tempo: 80
  });
  const [editingPatternIndex, setEditingPatternIndex] = useState(-1);
  const [showCustomPatterns, setShowCustomPatterns] = useState(false);
  const [userProgress, setUserProgress] = useState({
    level1: { completed: 0, stars: 0 },
    level2: { completed: 0, stars: 0 },
    level3: { completed: 0, stars: 0 },
    level4: { completed: 0, stars: 0 },
    level5: { completed: 0, stars: 0 },
  });
  
  // 新增學習模式和樂器相關狀態
  const [selectedInstrument, setSelectedInstrument] = useState('metronome');
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [visualGuide, setVisualGuide] = useState(true);
  const [isLearningPlaying, setIsLearningPlaying] = useState(false);
  const [learningStep, setLearningStep] = useState(0);
  
  // 樂器聲音參考
  const instrumentRef = useRef(null);
  
  // 添加遊戲模式相關狀態
  const [gameMode, setGameMode] = useState('practice');
  const [memoryMode, setMemoryMode] = useState({
    hasListened: false,
    showPattern: false,
  });
  const [followAlongMode, setFollowAlongMode] = useState({
    isFollowing: false,
    expectedBeats: [],
    nextBeatIndex: 0,
    hitBeats: [],
    missedBeats: [],
  });
  
  // 添加統計相關狀態
  const [stats, setStats] = useState({
    totalTaps: 0,
    highestAccuracy: 0,
    averageAccuracy: 0,
    completedExercises: 0,
    completedLevels: 0,
    practiceDays: [],
    memoryModeHighScores: [],
    followModeHighScores: [],
    followModeCompletions: 0,
    unlockedAchievements: [],
  });
  const [showStats, setShowStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  
  // 載入用戶自定義節奏和進度
  useEffect(() => {
    const savedCustomPatterns = localStorage.getItem('rhythmCustomPatterns');
    if (savedCustomPatterns) {
      setCustomPatterns(JSON.parse(savedCustomPatterns));
    }
    
    const savedProgress = localStorage.getItem('rhythmUserProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);
  
  // 保存自定義節奏到本地存儲
  useEffect(() => {
    if (customPatterns.length > 0) {
      localStorage.setItem('rhythmCustomPatterns', JSON.stringify(customPatterns));
    }
  }, [customPatterns]);
  
  // 保存進度到本地存儲
  useEffect(() => {
    localStorage.setItem('rhythmUserProgress', JSON.stringify(userProgress));
  }, [userProgress]);
  
  // 根據級別選擇節奏模式，包括自定義模式
  const getLevelPatterns = () => {
    const defaultPatterns = {
      1: rhythmPatterns.level1,
      2: rhythmPatterns.level2,
      3: rhythmPatterns.level3,
      4: rhythmPatterns.level4,
      5: rhythmPatterns.level5,
    }[level] || rhythmPatterns.level1;
    
    // 如果有和當前級別相關的自定義模式，添加進來
    const levelCustomPatterns = customPatterns.filter(p => p.level === level);
    return [...defaultPatterns, ...levelCustomPatterns];
  };
  
  // 初始化音頻
  useEffect(() => {
    // 創建音量控制
    volumeNodeRef.current = new Tone.Volume(convertVolumeToDb(volume)).toDestination();
    
    // 創建節拍器 - 使用 Tone.js 內建音效
    metronomeRef.current = new Tone.Synth({
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.1,
        release: 0.1
      }
    }).connect(volumeNodeRef.current);
    
    // 創建播放器 - 使用 Tone.js 內建音效
    playerRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
      }
    }).connect(volumeNodeRef.current);
    
    // 生成第一個問題
    generateQuestion();
    
    // 初次加載時顯示提示
    setTimeout(() => {
      setShowTip(true);
      setTimeout(() => setShowTip(false), 5000);
    }, 1000);
    
    return () => {
      if (metronomeRef.current) {
        metronomeRef.current.dispose();
      }
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      if (volumeNodeRef.current) {
        volumeNodeRef.current.dispose();
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);
  
  // 更新音量
  useEffect(() => {
    if (volumeNodeRef.current) {
      volumeNodeRef.current.volume.value = isMuted ? -Infinity : convertVolumeToDb(volume);
    }
  }, [volume, isMuted]);
  
  // 將百分比音量轉換為分貝值
  const convertVolumeToDb = (volumePercent) => {
    if (volumePercent <= 0) return -Infinity;
    // 將 0-100 音量映射到 -40dB 到 0dB
    return 40 * (volumePercent / 100 - 1);
  };
  
  // 處理音量變化
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (newValue > 0 && isMuted) {
      setIsMuted(false);
    }
  };
  
  // 切換靜音
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // 獲取難度標籤
  const getDifficultyLabel = () => {
    switch (level) {
      case 1: return '初級';
      case 2: return '中級';
      case 3: return '進階';
      case 4: return '專家';
      case 5: return '大師';
      default: return '初級';
    }
  };
  
  // 生成新問題
  const generateQuestion = () => {
    const levelPatterns = getLevelPatterns();
    const randomPatternIndex = Math.floor(Math.random() * levelPatterns.length);
    
    setCurrentPattern(levelPatterns[randomPatternIndex]);
    setIsPlaying(false);
    setIsRecording(false);
    setActiveBeat(-1);
    setUserTaps([]);
    setAccuracy(null);
    setShowResult(false);
    setFeedback('');
    
    // 重置記憶模式狀態
    setMemoryMode({
      hasListened: false,
      showPattern: false
    });
    
    // 重置跟隨模式狀態
    setFollowAlongMode({
      isFollowing: false,
      expectedBeats: [],
      nextBeatIndex: 0,
      hitBeats: [],
      missedBeats: [],
    });
    
    // 重置計時器
    tapTimesRef.current = [];
  };
  
  // 播放當前節奏模式
  const playPattern = () => {
    if (isPlaying || !currentPattern) return;
    
    // 記憶模式特殊處理
    if (gameMode === 'memory') {
      startMemoryMode();
    }
    
    // 跟隨模式特殊處理
    if (gameMode === 'followAlong') {
      startFollowAlongMode();
    }
    
    setIsPlaying(true);
    
    // 獲取模式和節拍
    const pattern = currentPattern.pattern;
    const tempo = currentPattern.tempo;
    const beatTime = 60 / tempo; // 每拍時間（秒）
    
    // 計算總時長
    let totalDuration = 0;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] > 0) {
        totalDuration += pattern[i] * beatTime;
      }
    }
    
    // 設置拍速
    Tone.Transport.bpm.value = tempo;
    
    // 清除之前的所有事件
    Tone.Transport.cancel();
    
    // 設置當前播放位置
    let currentBeat = 0;
    
    // 創建節奏序列
    const seq = new Tone.Sequence(
      (time, beat) => {
        // 更新活動拍子顯示
        setActiveBeat(beat);
        
        // 如果不是休止符則播放音效
        if (pattern[beat] > 0) {
          const isFirstBeat = beat === 0 || 
            beat % 4 === 0; // 假設4/4拍子，每小節第一拍
          
          if (isFirstBeat) {
            // 第一拍使用較高的音高
            metronomeRef.current.triggerAttackRelease("C5", "16n", time);
          } else {
            // 其他拍子使用較低的音高
            metronomeRef.current.triggerAttackRelease("G4", "16n", time);
          }
        }
      },
      Array.from({ length: pattern.length }, (_, i) => i),
      "4n" // 四分音符為基本單位
    );
    
    // 啟動序列
    seq.start(0);
    Tone.Transport.start();
    
    // 在節奏播放完畢後停止
    setTimeout(() => {
      Tone.Transport.stop();
      seq.dispose();
      setIsPlaying(false);
      setActiveBeat(-1);
      
      // 如果是記憶模式且還沒開始錄製，自動開始錄製
      if (gameMode === 'memory' && memoryMode.hasListened && !isRecording) {
        startRecording();
      }
      
      // 如果是跟隨模式，完成時評估表現
      if (gameMode === 'followAlong' && followAlongMode.isFollowing) {
        const totalBeats = followAlongMode.expectedBeats.length;
        const hitBeats = followAlongMode.hitBeats.length;
        
        // 計算準確率
        const accuracyRate = Math.round((hitBeats / totalBeats) * 100);
        setAccuracy(accuracyRate);
        
        // 提供反饋
        if (accuracyRate >= 90) {
          setFeedback('太棒了！您的跟隨準確率非常高！');
        } else if (accuracyRate >= 70) {
          setFeedback('很好！您大部分時間都跟上了節奏。');
        } else {
          setFeedback('繼續練習。專注於節奏的強拍，嘗試跟上節奏。');
        }
        
        // 重置狀態
        setIsRecording(false);
        setShowResult(true);
        setFollowAlongMode(prev => ({...prev, isFollowing: false}));
        
        // 更新分數
        updateScore(accuracyRate);
      }
      
      // 如果是即興練習，直接顯示提示讓用戶模仿
      if (currentPattern.isImprovisation) {
        setFeedback('現在嘗試模仿或創作類似的節奏模式！');
        setShowResult(true);
      }
    }, (totalDuration + 0.5) * 1000); // 額外添加0.5秒緩衝
  };
  
  // 停止播放
  const stopPlaying = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setIsPlaying(false);
    setActiveBeat(-1);
  };
  
  // 開始錄製用戶的節奏
  const startRecording = () => {
    if (isRecording) return;
    
    // 添加3秒倒數計時
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startActualRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // 實際開始錄製
  const startActualRecording = () => {
    // 確保 Tone.js 已啟動
    Tone.start();
    
    setIsRecording(true);
    setUserTaps([]);
    tapTimesRef.current = [];
    startTimeRef.current = Tone.now();
    
    // 設置節拍器速度
    Tone.Transport.bpm.value = currentPattern.tempo;
    
    // 清除之前的事件
    Tone.Transport.cancel();
    
    // 計算總時長
    const totalDuration = currentPattern.pattern.reduce((sum, val) => sum + val, 0) * 60 / currentPattern.tempo;
    
    // 設置結束錄製的計時器
    setTimeout(() => {
      endRecording();
    }, totalDuration * 1000 + 1000); // 額外添加1秒的緩衝時間
  };
  
  // 記錄用戶的點擊
  const handleTap = () => {
    if (!isRecording) return;
    
    // 更新總敲擊次數
    updateStats({ addTaps: 1 });
    
    const tapTime = Tone.now();
    
    // 在跟隨模式下檢查敲擊是否正確
    if (gameMode === 'followAlong' && followAlongMode.isFollowing) {
      const isCorrect = checkFollowAlongHit(tapTime);
      
      // 根據敲擊結果提供視覺反饋
      if (isCorrect) {
        // 播放成功的聲音
        playSelectedInstrument();
      } else {
        // 播放失敗的聲音 (更低的音高)
        if (instrumentRef.current && selectedInstrument === 'metronome') {
          instrumentRef.current.triggerAttackRelease("G3", "16n");
        } else {
          playSelectedInstrument();
        }
      }
    } else {
      // 原來的處理方式
      tapTimesRef.current.push(tapTime - startTimeRef.current);
      playSelectedInstrument();
    }
    
    // 更新用戶點擊顯示
    setUserTaps([...tapTimesRef.current]);
  };
  
  // 結束記錄並評估
  const endRecording = () => {
    setIsRecording(false);
    setShowResult(true);
    
    // 如果用戶沒有敲擊，給出0分
    if (tapTimesRef.current.length === 0) {
      setAccuracy(0);
      setFeedback('您沒有進行任何敲擊。請嘗試跟隨節奏模式敲擊。');
      updateScore(0);
      return;
    }
    
    // 計算預期的敲擊時間
    const expectedTaps = [];
    let currentTime = 0;
    
    // 只考慮非休止符的音符
    currentPattern.pattern.forEach((beat) => {
      if (beat > 0) {
        expectedTaps.push(currentTime);
        currentTime += beat * Tone.Time('4n').toSeconds();
      } else {
        // 休止符，只更新時間
        currentTime += Tone.Time('4n').toSeconds();
      }
    });
    
    // 計算準確度
    let totalError = 0;
    let matchedTaps = 0;
    const maxAllowedError = 0.3; // 300ms的容許誤差
    
    // 對每個預期的敲擊，找到最接近的用戶敲擊
    expectedTaps.forEach((expectedTime) => {
      let minError = Infinity;
      let bestMatchIndex = -1;
      
      tapTimesRef.current.forEach((tapTime, index) => {
        const error = Math.abs(tapTime - expectedTime);
        if (error < minError) {
          minError = error;
          bestMatchIndex = index;
        }
      });
      
      // 如果找到了匹配且誤差在可接受範圍內
      if (bestMatchIndex !== -1 && minError < maxAllowedError) {
        totalError += minError;
        matchedTaps++;
      }
    });
    
    // 計算最終準確度分數 (0-100)
    const timingFactor = Math.max(
      0,
      100 - (totalError / Math.max(1, matchedTaps)) * 200
    );
    
    // 考慮節拍數的匹配程度
    const countFactor = Math.max(
      0,
      100 - Math.abs(expectedTaps.length - tapTimesRef.current.length) * 10
    );
    
    // 綜合評分
    const accuracyScore = Math.round((timingFactor * 0.7 + countFactor * 0.3));
    setAccuracy(Math.min(100, Math.max(0, accuracyScore)));
    
    // 更新問題計數和分數
    updateScore(accuracyScore);
  };
  
  // 更新分數和處理遊戲進度 - 修改現有的updateScore函數
  const updateScore = (accuracyScore) => {
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);
    
    // 如果準確度超過70%，算作通過
    const isPassed = accuracyScore >= 70;
    if (isPassed) {
      setScore(score + 1);
      setFeedback(`很好！您的節奏準確度為${accuracyScore}%。`);
    } else {
      setFeedback(`需要改進。您的節奏準確度為${accuracyScore}%。嘗試更準確地跟隨節奏模式。`);
    }
    
    // 更新統計數據
    updateStats({
      accuracy: accuracyScore,
      completedExercise: true
    });
    
    // 檢查是否完成所有問題
    if (newQuestionCount >= totalQuestions) {
      // 計算星級
      const totalCorrect = score + (isPassed ? 1 : 0);
      const starRating = totalCorrect >= totalQuestions ? 3 :
                        totalCorrect >= Math.floor(totalQuestions * 0.7) ? 2 :
                        totalCorrect >= Math.floor(totalQuestions * 0.4) ? 1 : 0;
      
      // 更新用戶進度
      const levelKey = `level${level}`;
      const currentProgress = userProgress[levelKey];
      
      setUserProgress(prev => ({
        ...prev,
        [levelKey]: {
          completed: Math.max(currentProgress.completed, totalCorrect),
          stars: Math.max(currentProgress.stars, starRating)
        }
      }));
      
      // 更新統計
      updateStats({
        completedLevel: level
      });
      
      setTimeout(() => {
        if (onComplete) {
          onComplete({
            score: totalCorrect,
            totalQuestions,
            level,
            stars: starRating
          });
        }
      }, 2000);
    } else {
      // 3秒後生成新問題
      setTimeout(generateQuestion, 3000);
    }
  };
  
  // 渲染節奏顯示
  const renderRhythmDisplay = () => {
    if (!currentPattern) return null;
    
    // 改進節奏顯示，加入更直觀的音符符號
    const getNoteSymbol = (beat) => {
      if (beat === 0) return 'R'; // 休止符
      if (beat === 1) return '♩'; // 四分音符
      if (beat === 0.5) return '♪'; // 八分音符
      if (beat === 0.25) return '♬'; // 十六分音符
      if (beat === 0.33) return '⅓'; // 三連音
      if (beat === 0.2) return '⅕'; // 五連音
      if (beat === 1.5) return '♩.'; // 附點四分音符
      return beat.toString();
    };
    
    return (
      <RhythmPatternDisplay>
        {currentPattern.pattern.map((beat, index) => (
          <BeatIndicator 
            key={index} 
            active={activeBeat === index}
          >
            {getNoteSymbol(beat)}
          </BeatIndicator>
        ))}
      </RhythmPatternDisplay>
    );
  };
  
  // 渲染節奏圖示
  const renderRhythmPattern = () => {
    if (!currentPattern) return null;
    
    return (
      <RhythmPatternDisplay>
        {currentPattern.pattern.map((beat, index) => {
          let noteComponent;
          
          // 根據音符類型選擇合適的圖示
          if (beat === 0) {
            // 休止符
            noteComponent = <div className={classes.rest} />;
          } else if (beat === 1) {
            // 四分音符
            noteComponent = <div className={classes.quarterNote} />;
          } else if (beat === 0.5) {
            // 八分音符
            noteComponent = <div className={classes.eighthNote} />;
          } else if (beat === 0.25) {
            // 十六分音符
            noteComponent = <div className={classes.sixteenthNote} />;
          } else if (beat === 0.33) {
            // 三連音
            noteComponent = (
              <Box display="flex" alignItems="center">
                <div className={classes.sixteenthNote} style={{ marginRight: 2 }} />
                <Typography variant="caption">3</Typography>
              </Box>
            );
          } else if (beat === 1.5) {
            // 附點四分音符
            noteComponent = (
              <Box display="flex" alignItems="center">
                <div className={classes.quarterNote} />
                <Typography variant="caption" style={{ marginLeft: 2 }}>•</Typography>
              </Box>
            );
          } else {
            // 其他音符
            noteComponent = <div className={classes.quarterNote} />;
          }
          
          return (
            <Box key={index} className={classes.rhythmNote}>
              {noteComponent}
            </Box>
          );
        })}
      </RhythmPatternDisplay>
    );
  };
  
  // 提交用戶的節奏模式
  const submitPattern = () => {
    if (userTaps.length === 0 || showResult) return;
    
    // 計算用戶節奏模式與目標模式的相似度
    let targetPattern = [...currentPattern.pattern].filter(val => val > 0); // 排除休止符
    let userTimingPattern = calculateUserTiming(userTaps);
    
    // 即興練習模式下，只檢查節奏的總時值和節拍數
    if (currentPattern.isImprovisation) {
      const targetBeatCount = targetPattern.length;
      const userBeatCount = userTimingPattern.length;
      
      // 節拍數相差不應超過2
      const beatCountDiff = Math.abs(targetBeatCount - userBeatCount);
      const beatAccuracy = beatCountDiff <= 2 ? 100 - (beatCountDiff * 20) : 60;
      
      setAccuracy(beatAccuracy);
      setFeedback(
        beatAccuracy >= 80 
          ? '很好！您的即興節奏模式非常有創意。' 
          : '繼續練習。嘗試更接近原始節奏的拍數和結構。'
      );
    } else {
      // 常規練習模式
      // 規範化兩個模式的長度
      const maxLength = Math.max(targetPattern.length, userTimingPattern.length);
      if (targetPattern.length < maxLength) {
        targetPattern = targetPattern.concat(Array(maxLength - targetPattern.length).fill(0));
      }
      if (userTimingPattern.length < maxLength) {
        userTimingPattern = userTimingPattern.concat(Array(maxLength - userTimingPattern.length).fill(0));
      }
      
      // 計算時值差異
      let totalDiff = 0;
      for (let i = 0; i < maxLength; i++) {
        totalDiff += Math.abs(targetPattern[i] - userTimingPattern[i]);
      }
      
      // 計算準確度百分比 (100% - 差異百分比)
      const maxPossibleDiff = maxLength * 1; // 假設最大差異是每個節拍1
      const diffPercentage = (totalDiff / maxPossibleDiff) * 100;
      const calculatedAccuracy = Math.max(0, Math.min(100, 100 - diffPercentage));
      
      setAccuracy(calculatedAccuracy);
      
      // 根據準確度設置反饋信息
      if (calculatedAccuracy >= 90) {
        setFeedback('太棒了！您的節奏感非常精準。');
      } else if (calculatedAccuracy >= 75) {
        setFeedback('很好！您的節奏大體正確，只有些微不精確。');
      } else if (calculatedAccuracy >= 60) {
        setFeedback('繼續練習。嘗試更精確地跟隨節奏模式。');
      } else {
        setFeedback('需要更多練習。注意聆聽並感受節奏的時值。');
      }
    }
    
    setShowResult(true);
    
    // 如果這是最後一個問題，則完成遊戲
    if (questionCount + 1 >= totalQuestions) {
      setTimeout(() => {
        if (onComplete) {
          onComplete({
            score: Math.round((score + (accuracy || 0)) / totalQuestions),
            totalQuestions,
            level,
          });
        }
      }, 2000);
    } else {
      // 更新問題計數和分數
      setQuestionCount(prevCount => prevCount + 1);
      setScore(prevScore => prevScore + (accuracy || 0));
      
      // 3秒後生成新問題
      setTimeout(generateQuestion, 3000);
    }
  };
  
  // 計算用戶的節奏時值模式
  const calculateUserTiming = (taps) => {
    if (taps.length <= 1) return [];
    
    const userBeatTime = 60 / currentPattern.tempo; // 基礎拍時間
    const result = [];
    
    for (let i = 1; i < taps.length; i++) {
      // 計算相鄰兩次按鍵的時間差
      const timeDiff = taps[i] - taps[i - 1];
      
      // 將時間差轉換為音符時值（相對於一拍）
      let relativeValue = timeDiff / userBeatTime;
      
      // 四捨五入到最接近的標準時值
      if (relativeValue <= 0.25) {
        relativeValue = 0.25; // 十六分音符
      } else if (relativeValue <= 0.375) {
        relativeValue = 0.33; // 三連音
      } else if (relativeValue <= 0.625) {
        relativeValue = 0.5; // 八分音符
      } else if (relativeValue <= 0.875) {
        relativeValue = 0.66; // 擺動八分音符
      } else if (relativeValue <= 1.25) {
        relativeValue = 1; // 四分音符
      } else if (relativeValue <= 1.75) {
        relativeValue = 1.5; // 附點四分音符
      } else {
        relativeValue = 2; // 二分音符
      }
      
      result.push(relativeValue);
    }
    
    return result;
  };
  
  // 獲取當前節奏模式的音樂理論說明
  const getRhythmTheory = () => {
    if (!currentPattern) return '';
    
    // 根據節奏模式和級別提供相關的音樂理論
    let theory = '';
    
    if (level === 1) {
      theory = `
        <h3>基礎節奏理論</h3>
        <p>節奏是音樂中時間的組織方式。它由音符的長短和強弱關係組成。</p>
        <p><strong>四分音符 (♩)</strong>: 標準的一拍音符。在4/4拍中，一小節有4個四分音符。</p>
        <p><strong>八分音符 (♪)</strong>: 每個音符長度是四分音符的一半。</p>
        <p><strong>休止符</strong>: 代表沉默或停頓的時刻。</p>
      `;
    } else if (level === 2) {
      theory = `
        <h3>中級節奏理論</h3>
        <p><strong>附點音符</strong>: 附點增加音符原始時值的一半。例如，附點四分音符 (♩.) 等於一個四分音符加一個八分音符的時值。</p>
        <p><strong>複合拍子</strong>: 如6/8拍，每拍分為三等分，而不是兩等分。</p>
        <p><strong>切分音</strong>: 強調通常不強調的拍子部分，創造節奏上的張力。</p>
      `;
    } else if (level === 3) {
      theory = `
        <h3>進階節奏概念</h3>
        <p><strong>多變拍號</strong>: 音樂中的拍號可以在作品中改變，如從4/4變為3/4。</p>
        <p><strong>複雜切分音</strong>: 多種切分音組合，造成更複雜的節奏感。</p>
        <p><strong>混合節奏</strong>: 結合不同時值的音符創造多層次節奏。</p>
      `;
    } else if (level === 4) {
      theory = `
        <h3>多連音技巧</h3>
        <p><strong>三連音</strong>: 在兩拍時值中平均分配三個音符。</p>
        <p><strong>五連音</strong>: 在四拍時值中平均分配五個音符。</p>
        <p><strong>多連音混合</strong>: 同時包含三連音和二連音的複雜節奏。</p>
      `;
    } else if (level === 5) {
      theory = `
        <h3>風格化節奏與即興</h3>
        <p><strong>擺動節奏</strong>: 爵士樂中常見的節奏感，八分音符不均勻播放，前者較長。</p>
        <p><strong>流行節奏型態</strong>: 流行音樂中常見的重複節奏模式。</p>
        <p><strong>拉丁節奏</strong>: 強調特定拍子並有獨特的節奏模式。</p>
        <p><strong>即興技巧</strong>: 基於基礎節奏，通過增減音符和變化時值創造新節奏。</p>
      `;
    }
    
    // 添加特定節奏模式的說明
    switch (currentPattern.name) {
      case '基本四拍子':
        theory += `<p><strong>${currentPattern.name}</strong>: 最基本的4/4拍節奏，每個拍子都是一個四分音符，均勻分佈的強弱關係為"強-弱-次強-弱"。</p>`;
        break;
      case '基本切分音':
        theory += `<p><strong>${currentPattern.name}</strong>: 強調弱拍而不是強拍的節奏模式，創造前進感和律動。</p>`;
        break;
      case '附點節奏':
        theory += `<p><strong>${currentPattern.name}</strong>: 附點音符的節奏帶有跳躍感，常見於行進曲和舞曲音樂中。</p>`;
        break;
      // 其他情況可以繼續添加
      default:
        theory += `<p><strong>${currentPattern.name}</strong>: ${currentPattern.description}</p>`;
    }
    
    return theory;
  };
  
  // 打開理論說明對話框
  const openTheoryDialog = () => {
    setCurrentTheory(getRhythmTheory());
    setShowTheory(true);
  };
  
  // 顯示節奏模式的標準音樂符號視覺化
  const renderStandardNotation = () => {
    if (!currentPattern) return null;
    
    return (
      <RhythmPatternVisualization>
        {renderStandardNotation()}
      </RhythmPatternVisualization>
    );
  };
  
  // 添加或更新自定義節奏模式
  const handleSaveCustomPattern = () => {
    if (!newPattern.name || newPattern.pattern.length === 0) return;
    
    if (editingPatternIndex === -1) {
      // 添加新模式
      setCustomPatterns([...customPatterns, {...newPattern, level}]);
    } else {
      // 更新現有模式
      const updatedPatterns = [...customPatterns];
      updatedPatterns[editingPatternIndex] = {...newPattern, level};
      setCustomPatterns(updatedPatterns);
    }
    
    handleCloseCustomPatternDialog();
  };
  
  // 刪除自定義節奏模式
  const handleDeleteCustomPattern = (index) => {
    const updatedPatterns = customPatterns.filter((_, i) => i !== index);
    setCustomPatterns(updatedPatterns);
  };
  
  // 編輯現有自定義節奏模式
  const handleEditCustomPattern = (pattern, index) => {
    setNewPattern({...pattern});
    setEditingPatternIndex(index);
    setShowCustomPatternDialog(true);
  };
  
  // 關閉自定義模式對話框
  const handleCloseCustomPatternDialog = () => {
    setShowCustomPatternDialog(false);
    setNewPattern({
      name: '',
      description: '',
      pattern: [1, 1, 1, 1],
      tempo: 80
    });
    setEditingPatternIndex(-1);
  };
  
  // 更新自定義模式的節奏模式
  const handlePatternChange = (value, index) => {
    const updatedPattern = [...newPattern.pattern];
    
    // 確保輸入值有效
    let numValue = parseFloat(value);
    if (isNaN(numValue)) numValue = 0;
    
    // 限制可用的時值類型
    if (numValue > 0 && numValue < 0.25) numValue = 0.25;
    if (numValue > 0.25 && numValue < 0.33) numValue = 0.33;
    if (numValue > 0.33 && numValue < 0.5) numValue = 0.5;
    if (numValue > 0.5 && numValue < 1) numValue = 1;
    if (numValue > 1 && numValue < 1.5) numValue = 1.5;
    if (numValue > 1.5) numValue = 2;
    
    updatedPattern[index] = numValue;
    setNewPattern({...newPattern, pattern: updatedPattern});
  };
  
  // 添加音符到自定義模式
  const handleAddBeat = () => {
    setNewPattern({
      ...newPattern,
      pattern: [...newPattern.pattern, 1]
    });
  };
  
  // 從自定義模式中刪除音符
  const handleRemoveBeat = (index) => {
    const updatedPattern = [...newPattern.pattern];
    updatedPattern.splice(index, 1);
    setNewPattern({...newPattern, pattern: updatedPattern});
  };
  
  // 渲染自定義模式對話框
  const renderCustomPatternDialog = () => {
    return (
      <Dialog 
        open={showCustomPatternDialog} 
        onClose={handleCloseCustomPatternDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingPatternIndex === -1 ? '創建自定義節奏模式' : '編輯節奏模式'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="名稱"
                value={newPattern.name}
                onChange={(e) => setNewPattern({...newPattern, name: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="描述"
                value={newPattern.description}
                onChange={(e) => setNewPattern({...newPattern, description: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="速度 (BPM)"
                type="number"
                value={newPattern.tempo}
                onChange={(e) => setNewPattern({...newPattern, tempo: parseInt(e.target.value) || 80})}
                margin="normal"
                InputProps={{ inputProps: { min: 40, max: 200 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                節奏模式
              </Typography>
              <Box display="flex" flexWrap="wrap" alignItems="center">
                {newPattern.pattern.map((beat, index) => (
                  <Box key={index} m={1} display="flex" alignItems="center">
                    <FormControl style={{ minWidth: 120 }}>
                      <InputLabel>音符時值</InputLabel>
                      <Select
                        value={beat}
                        onChange={(e) => handlePatternChange(e.target.value, index)}
                      >
                        <MenuItem value={0}>休止符</MenuItem>
                        <MenuItem value={0.25}>十六分音符</MenuItem>
                        <MenuItem value={0.33}>三連音</MenuItem>
                        <MenuItem value={0.5}>八分音符</MenuItem>
                        <MenuItem value={1}>四分音符</MenuItem>
                        <MenuItem value={1.5}>附點四分音符</MenuItem>
                        <MenuItem value={2}>二分音符</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton 
                      size="small" 
                      onClick={() => handleRemoveBeat(index)}
                      disabled={newPattern.pattern.length <= 1}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={handleAddBeat}
                  variant="outlined"
                  size="small"
                  style={{ margin: '8px' }}
                >
                  添加音符
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">預覽:</Typography>
              <Box className={classes.rhythmDisplay} mt={2}>
                {newPattern.pattern.map((beat, index) => (
                  <Box
                    key={index}
                    className={classes.beatBox}
                  >
                    {beat === 0 ? 'R' : 
                     beat === 0.25 ? '♬' : 
                     beat === 0.33 ? '⅓' : 
                     beat === 0.5 ? '♪' : 
                     beat === 1 ? '♩' : 
                     beat === 1.5 ? '♩.' : 
                     beat === 2 ? '𝅗𝅥' : beat}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCustomPatternDialog} color="default">
            取消
          </Button>
          <Button 
            onClick={handleSaveCustomPattern} 
            color="primary"
            disabled={!newPattern.name || newPattern.pattern.length === 0}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  // 渲染用戶自定義節奏列表
  const renderCustomPatternsList = () => {
    const levelPatterns = customPatterns.filter(p => p.level === level);
    
    if (levelPatterns.length === 0) {
      return (
        <Typography variant="body2" style={{ fontStyle: 'italic', padding: '16px 0' }}>
          您還沒有創建任何此級別的自定義節奏模式。
        </Typography>
      );
    }
    
    return (
      <Box mt={2}>
        {levelPatterns.map((pattern, index) => {
          const actualIndex = customPatterns.findIndex(p => 
            p.name === pattern.name && p.level === level
          );
          
          return (
            <Card key={index} style={{ marginBottom: '8px' }}>
              <CardContent style={{ padding: '8px 16px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2">{pattern.name}</Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleEditCustomPattern(pattern, actualIndex)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteCustomPattern(actualIndex)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {pattern.description} - {pattern.tempo} BPM
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    );
  };
  
  // 渲染進度指示器
  const renderProgressIndicator = () => {
    const levelKey = `level${level}`;
    const currentLevelProgress = userProgress[levelKey];
    
    return (
      <Box mt={1} mb={2} display="flex" alignItems="center" justifyContent="center">
        <Typography variant="body2" style={{ marginRight: '8px' }}>
          已完成: {currentLevelProgress.completed}/{totalQuestions}
        </Typography>
        <Box display="flex">
          {[1, 2, 3].map((star) => (
            <Box key={star} color={star <= currentLevelProgress.stars ? 'gold' : 'grey'}>
              {star <= currentLevelProgress.stars ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };
  
  // 根據選擇更新樂器
  useEffect(() => {
    if (volumeNodeRef.current && instrumentRef.current) {
      instrumentRef.current.dispose();
    }
    
    // 創建選定的樂器聲音
    switch (selectedInstrument) {
      case 'drum':
        instrumentRef.current = new Tone.MembraneSynth({
          pitchDecay: 0.05,
          octaves: 4,
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.001,
            decay: 0.4,
            sustain: 0.01,
            release: 0.4,
          }
        }).connect(volumeNodeRef.current);
        break;
      case 'clap':
        instrumentRef.current = new Tone.NoiseSynth({
          noise: { type: 'white' },
          envelope: {
            attack: 0.001,
            decay: 0.15,
            sustain: 0,
            release: 0.1,
          }
        }).connect(volumeNodeRef.current);
        break;
      case 'piano':
        instrumentRef.current = new Tone.Sampler({
          urls: {
            C4: "https://tonejs.github.io/audio/salamander/C4.mp3",
          },
          onload: () => console.log("Piano loaded")
        }).connect(volumeNodeRef.current);
        break;
      default: // metronome
        instrumentRef.current = new Tone.Synth({
          oscillator: { type: 'triangle' },
          envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.1,
            release: 0.1
          }
        }).connect(volumeNodeRef.current);
    }
    
    return () => {
      if (instrumentRef.current) {
        instrumentRef.current.dispose();
      }
    };
  }, [selectedInstrument]);
  
  // 播放當前節奏模式（學習模式）
  const playPatternLearningMode = () => {
    if (isLearningPlaying || !currentPattern) return;
    
    setIsLearningPlaying(true);
    setLearningStep(0);
    
    // 獲取模式和節拍
    const pattern = currentPattern.pattern;
    const tempo = currentPattern.tempo;
    
    // 設置拍速
    Tone.Transport.bpm.value = tempo;
    
    // 清除之前的所有事件
    Tone.Transport.cancel();
    
    // 每個音符單獨播放，顯示引導
    let currentBeatIndex = 0;
    
    // 創建序列，逐個強調每個音符
    const seq = new Tone.Sequence(
      (time, beat) => {
        // 只處理當前步驟的音符
        if (beat === currentBeatIndex) {
          setActiveBeat(beat);
          
          // 如果不是休止符則播放音效
          if (pattern[beat] > 0) {
            // 播放選擇的樂器聲音
            playSelectedInstrument(time);
          }
          
          // 移動到下一個音符
          currentBeatIndex = (currentBeatIndex + 1) % pattern.length;
          
          // 更新學習步驟
          setLearningStep(currentBeatIndex);
        }
      },
      Array(pattern.length).fill().map((_, i) => i),
      "4n" // 四分音符為基本單位
    );
    
    // 啟動序列
    seq.start(0);
    Tone.Transport.start();
    
    // 在完成一個完整的循環後停止
    setTimeout(() => {
      Tone.Transport.stop();
      seq.dispose();
      setIsLearningPlaying(false);
      setActiveBeat(-1);
      setLearningStep(0);
    }, (pattern.length * 60 / tempo) * 1000 + 500);
  };
  
  // 根據選擇的樂器播放聲音
  const playSelectedInstrument = (time = '+0.001') => {
    if (!instrumentRef.current) return;
    
    switch (selectedInstrument) {
      case 'drum':
        instrumentRef.current.triggerAttackRelease("C2", "16n", time);
        break;
      case 'clap':
        instrumentRef.current.triggerAttackRelease("16n", time);
        break;
      case 'piano':
        instrumentRef.current.triggerAttackRelease("C4", "16n", time);
        break;
      default: // metronome
        instrumentRef.current.triggerAttackRelease("C5", "16n", time);
    }
  };
  
  // 設置對話框 - 擴展現有的renderSettingsDialog函數
  const renderSettingsDialog = () => {
    return (
      <Dialog 
        open={showSettings} 
        onClose={() => setShowSettings(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Settings style={{ marginRight: 8 }} />
            節奏練習設置
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                遊戲模式
              </Typography>
              <RadioGroup 
                value={gameMode} 
                onChange={(e) => setGameMode(e.target.value)}
              >
                {gameModes.map(mode => (
                  <FormControlLabel 
                    key={mode.id}
                    value={mode.id}
                    control={<Radio color="primary" />}
                    label={
                      <Box>
                        <Typography variant="body2">{mode.name}</Typography>
                        <Typography variant="caption" color="textSecondary">{mode.description}</Typography>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                樂器聲音
              </Typography>
              <RadioGroup 
                value={selectedInstrument} 
                onChange={(e) => setSelectedInstrument(e.target.value)}
              >
                {instrumentOptions.map(option => (
                  <FormControlLabel 
                    key={option.id}
                    value={option.id}
                    control={<Radio color="primary" />}
                    label={option.name}
                  />
                ))}
              </RadioGroup>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                練習模式
              </Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={isLearningMode}
                    onChange={(e) => setIsLearningMode(e.target.checked)}
                    color="primary"
                  />
                }
                label="學習模式（逐個音符播放）"
              />
              
              {isLearningMode && (
                <FormControlLabel
                  control={
                    <Switch 
                      checked={visualGuide}
                      onChange={(e) => setVisualGuide(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="視覺指引（顯示下一個敲擊位置）"
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettings(false)} color="primary">
            確定
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  // 設置記憶模式狀態
  const startMemoryMode = () => {
    setMemoryMode({
      hasListened: true,
      showPattern: false,
    });
    
    // 在記憶模式下播放完節奏後立即開始錄製
    setTimeout(() => {
      startRecording();
    }, (getCurrentPatternDuration() + 1) * 1000);
  };
  
  // 設置跟隨模式狀態和事件
  const startFollowAlongMode = () => {
    // 重置跟隨模式狀態
    setFollowAlongMode({
      isFollowing: true,
      expectedBeats: calculateExpectedBeats(),
      nextBeatIndex: 0,
      hitBeats: [],
      missedBeats: [],
    });
    
    // 在跟隨模式下，播放節奏的同時可以敲擊
    setIsRecording(true);
    userTaps.length = 0;
    tapTimesRef.current = [];
    startTimeRef.current = Tone.now();
  };
  
  // 計算預期敲擊時間點
  const calculateExpectedBeats = () => {
    if (!currentPattern) return [];
    
    const expectedBeats = [];
    let currentTime = 0;
    const tempo = currentPattern.tempo;
    const beatTime = 60 / tempo;
    
    currentPattern.pattern.forEach((beat, index) => {
      if (beat > 0) {
        expectedBeats.push({
          time: currentTime,
          index: index,
          duration: beat * beatTime
        });
      }
      
      currentTime += beat * beatTime;
    });
    
    return expectedBeats;
  };
  
  // 獲取當前模式的總時長
  const getCurrentPatternDuration = () => {
    if (!currentPattern) return 0;
    
    const pattern = currentPattern.pattern;
    const tempo = currentPattern.tempo;
    const beatTime = 60 / tempo;
    
    // 計算總時長（秒）
    let totalDuration = 0;
    for (let i = 0; i < pattern.length; i++) {
      totalDuration += pattern[i] * beatTime;
    }
    
    return totalDuration;
  };
  
  // 檢查跟隨模式的敲擊是否正確
  const checkFollowAlongHit = (tapTime) => {
    const { expectedBeats, nextBeatIndex } = followAlongMode;
    
    if (nextBeatIndex >= expectedBeats.length) return false;
    
    const currentExpectedBeat = expectedBeats[nextBeatIndex];
    const hitTime = tapTime - startTimeRef.current;
    const timeDiff = Math.abs(hitTime - currentExpectedBeat.time);
    
    // 允許的誤差範圍 (300ms)
    const allowedError = 0.3;
    
    if (timeDiff <= allowedError) {
      // 正確敲擊
      setFollowAlongMode(prev => ({
        ...prev,
        nextBeatIndex: prev.nextBeatIndex + 1,
        hitBeats: [...prev.hitBeats, currentExpectedBeat]
      }));
      return true;
    } else if (hitTime > currentExpectedBeat.time + allowedError) {
      // 錯過了當前預期的敲擊
      setFollowAlongMode(prev => ({
        ...prev,
        nextBeatIndex: prev.nextBeatIndex + 1,
        missedBeats: [...prev.missedBeats, currentExpectedBeat]
      }));
      return false;
    }
    
    return false;
  };
  
  // 渲染遊戲模式提示
  const renderGameModeInfo = () => {
    const mode = gameModes.find(m => m.id === gameMode);
    
    return (
      <Box 
        className={classes.gameSettings} 
        style={{ marginTop: 16, padding: 12, backgroundColor: 'rgba(33, 150, 243, 0.05)' }}
      >
        <Typography variant="subtitle2" gutterBottom>
          當前模式: {mode?.name}
        </Typography>
        <Typography variant="body2">
          {mode?.description}
        </Typography>
        {gameMode === 'memory' && (
          <Typography variant="body2" style={{ marginTop: 8, fontStyle: 'italic' }}>
            {memoryMode.hasListened 
              ? '現在請根據您記憶的節奏模式進行敲擊' 
              : '先聆聽節奏模式，播放結束後您將需要從記憶中重現它'}
          </Typography>
        )}
        {gameMode === 'followAlong' && (
          <Typography variant="body2" style={{ marginTop: 8, fontStyle: 'italic' }}>
            在節奏播放的同時跟隨敲擊，嘗試準確地按照節奏模式敲擊
          </Typography>
        )}
      </Box>
    );
  };
  
  // 加載統計數據
  useEffect(() => {
    const savedStats = localStorage.getItem('rhythmStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    
    // 每次打開應用時記錄練習日期
    const today = new Date().toISOString().split('T')[0];
    setStats(prevStats => {
      if (!prevStats.practiceDays.includes(today)) {
        const updatedStats = {
          ...prevStats,
          practiceDays: [...prevStats.practiceDays, today]
        };
        localStorage.setItem('rhythmStats', JSON.stringify(updatedStats));
        return updatedStats;
      }
      return prevStats;
    });
  }, []);
  
  // 更新統計數據
  const updateStats = (newData) => {
    setStats(prevStats => {
      const updatedStats = {
        ...prevStats,
        ...newData,
        totalTaps: prevStats.totalTaps + (newData.addTaps || 0),
        highestAccuracy: Math.max(prevStats.highestAccuracy, newData.accuracy || 0),
        completedExercises: prevStats.completedExercises + (newData.completedExercise ? 1 : 0),
        averageAccuracy: prevStats.completedExercises > 0 
          ? ((prevStats.averageAccuracy * prevStats.completedExercises) + (newData.accuracy || 0)) / 
            (prevStats.completedExercises + (newData.completedExercise ? 1 : 0))
          : newData.accuracy || 0,
      };
      
      // 更新特定模式的統計
      if (newData.completedExercise) {
        if (gameMode === 'memory' && newData.accuracy) {
          updatedStats.memoryModeHighScores = [...prevStats.memoryModeHighScores, newData.accuracy]
            .sort((a, b) => b - a).slice(0, 10); // 保留前10個最高分
        }
        
        if (gameMode === 'followAlong') {
          updatedStats.followModeCompletions = prevStats.followModeCompletions + 1;
          if (newData.accuracy) {
            updatedStats.followModeHighScores = [...prevStats.followModeHighScores, newData.accuracy]
              .sort((a, b) => b - a).slice(0, 10);
          }
        }
      }
      
      // 檢查是否完成了某個級別
      if (newData.completedLevel) {
        const completedLevels = new Set([...prevStats.completedLevels.toString().split(',').map(Number), newData.completedLevel]);
        updatedStats.completedLevels = completedLevels.size;
      }
      
      // 檢查成就解鎖
      const unlockedAchievements = [...prevStats.unlockedAchievements];
      achievements.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition(updatedStats)) {
          unlockedAchievements.push(achievement.id);
          // 顯示成就解鎖通知
          setFeedback(`恭喜！您解鎖了成就「${achievement.name}」：${achievement.description}`);
        }
      });
      updatedStats.unlockedAchievements = unlockedAchievements;
      
      // 保存更新後的統計
      localStorage.setItem('rhythmStats', JSON.stringify(updatedStats));
      return updatedStats;
    });
  };
  
  // 渲染統計數據對話框
  const renderStatsDialog = () => {
    // 計算熱力圖數據 - 過去30天的練習情況
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split('T')[0];
    });
    
    const heatmapData = last30Days.map(date => ({
      date,
      practiced: stats.practiceDays.includes(date)
    }));
    
    return (
      <Dialog 
        open={showStats} 
        onClose={() => setShowStats(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Assessment sx={{ marginRight: 8 }} />
            練習統計
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card className={classes.statsCard}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    基本統計
                  </Typography>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">總敲擊次數:</Typography>
                    <Typography variant="body2"><b>{stats.totalTaps}</b></Typography>
                  </Box>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">最高準確度:</Typography>
                    <Typography variant="body2"><b>{stats.highestAccuracy}%</b></Typography>
                  </Box>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">平均準確度:</Typography>
                    <Typography variant="body2"><b>{Math.round(stats.averageAccuracy)}%</b></Typography>
                  </Box>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">完成的練習:</Typography>
                    <Typography variant="body2"><b>{stats.completedExercises}</b></Typography>
                  </Box>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">完成的級別:</Typography>
                    <Typography variant="body2"><b>{stats.completedLevels}/5</b></Typography>
                  </Box>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">練習天數:</Typography>
                    <Typography variant="body2"><b>{stats.practiceDays.length}</b> 天</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.statsCard}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    模式統計
                  </Typography>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">記憶模式最高分 (前3名):</Typography>
                    <Box>
                      {stats.memoryModeHighScores.slice(0, 3).map((score, index) => (
                        <Chip
                          key={index}
                          label={`${score}%`}
                          size="small"
                          color={index === 0 ? "primary" : "default"}
                          sx={{ margin: '0 2px' }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">跟隨模式完成次數:</Typography>
                    <Typography variant="body2"><b>{stats.followModeCompletions}</b></Typography>
                  </Box>
                  <Box className={classes.statItem}>
                    <Typography variant="body2">跟隨模式最高分 (前3名):</Typography>
                    <Box>
                      {stats.followModeHighScores.slice(0, 3).map((score, index) => (
                        <Chip
                          key={index}
                          label={`${score}%`}
                          size="small"
                          color={index === 0 ? "primary" : "default"}
                          sx={{ margin: '0 2px' }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                練習熱力圖 (過去30天)
              </Typography>
              <Box className={classes.heatmapContainer}>
                {heatmapData.map((day, index) => (
                  <Tooltip
                    key={index}
                    title={`${day.date} ${day.practiced ? '有練習' : '無練習'}`}
                  >
                    <Box
                      className={classes.heatmapBlock}
                      sx={{
                        backgroundColor: day.practiced 
                          ? 'rgba(76, 175, 80, 0.7)' 
                          : 'rgba(200, 200, 200, 0.3)'
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowStats(false)} color="primary">
            關閉
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  // 渲染成就對話框
  const renderAchievementsDialog = () => {
    return (
      <Dialog 
        open={showAchievements} 
        onClose={() => setShowAchievements(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <EmojiEvents sx={{ marginRight: 8 }} />
            節奏訓練成就
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            已解鎖 {stats.unlockedAchievements.length}/{achievements.length} 個成就
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(stats.unlockedAchievements.length / achievements.length) * 100} 
            sx={{ marginBottom: 16 }}
          />
          
          {achievements.map(achievement => {
            const isUnlocked = stats.unlockedAchievements.includes(achievement.id);
            
            return (
              <Box 
                key={achievement.id} 
                className={`${classes.achievementListItem} ${!isUnlocked ? classes.achievementLocked : ''}`}
              >
                <Avatar className={classes.achievementIcon}>
                  {achievement.icon}
                </Avatar>
                <Box ml={2}>
                  <Typography variant="subtitle2">
                    {achievement.name} {isUnlocked && <CheckCircle fontSize="small" sx={{ color: 'green' }} />}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {achievement.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAchievements(false)} color="primary">
            關閉
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  // 在頁面頂部添加成就和統計按鈕
  return (
    <GameContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" gutterBottom>
          節奏訓練營 - 級別 {level}
          <DifficultyTag>{getDifficultyLabel()}</DifficultyTag>
        </Typography>
        
        <Box>
          {/* 成就按鈕 */}
          <AchievementBadge 
            badgeContent={stats.unlockedAchievements.length} 
            color="primary"
          >
            <IconButton onClick={() => setShowAchievements(true)}>
              <EmojiEvents />
            </IconButton>
          </AchievementBadge>
          
          {/* 統計按鈕 */}
          <IconButton onClick={() => setShowStats(true)}>
            <ShowChart />
          </IconButton>
          
          {/* 設置按鈕 */}
          <IconButton onClick={() => setShowSettings(true)}>
            <Settings />
          </IconButton>
        </Box>
      </Box>
      
      {/* 進度條 */}
      <ProgressBar>
        <LinearProgress 
          variant="determinate" 
          value={(questionCount / totalQuestions) * 100} 
          color="primary"
        />
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2">{score} / {questionCount} 正確</Typography>
          <Typography variant="body2">問題 {questionCount} / {totalQuestions}</Typography>
        </Box>
      </ProgressBar>
      
      {/* 操作提示 */}
      {feedback && <StyledFeedback>{feedback}</StyledFeedback>}
      
      {/* 節奏模式顯示 */}
      <RhythmPatternDisplay>
        {currentPattern.map((beat, index) => (
          <BeatIndicator 
            key={index} 
            active={activeBeat === index}
          >
            {beat ? index + 1 : "-"}
          </BeatIndicator>
        ))}
      </RhythmPatternDisplay>
      
      {/* 敲擊區域 */}
      <TapArea 
        isActive={isRecording}
        onClick={handleTap}
      >
        {countdown > 0 ? (
          <Typography variant="h2">{countdown}</Typography>
        ) : (
          <Typography variant="h6">
            {isRecording ? "點擊此處跟隨節奏敲擊" : "準備好後點擊下方的播放按鈕開始"}
          </Typography>
        )}
        {/* 敲擊效果動畫 */}
        {showTapEffect && <BeatAnimation />}
      </TapArea>
      
      {/* 按鈕控制區 */}
      <ButtonContainer>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
          onClick={handlePlayPattern}
          disabled={isPlaying || isRecording || countdown > 0}
        >
          播放節奏
        </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          startIcon={<TouchApp />}
          onClick={handleStartRecording}
          disabled={isRecording || isPlaying || countdown > 0}
        >
          開始敲擊
        </StyledButton>
        <StyledButton
          variant="outlined"
          startIcon={<Refresh />}
          onClick={handleReset}
          disabled={countdown > 0}
        >
          重置
        </StyledButton>
      </ButtonContainer>
      
      {/* 用戶敲擊顯示 */}
      {userTaps.length > 0 && (
        <UserTapDisplay>
          {userTaps.map((tap, index) => (
            <TapIndicator 
              key={index} 
              isMatch={tapMatches[index]}
            />
          ))}
        </UserTapDisplay>
      )}
      
      {/* 音量控制 */}
      <VolumeControl>
        <IconButton onClick={toggleMute}>
          {isMuted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
        <VolumeSlider>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="continuous-slider"
            disabled={isMuted}
          />
        </VolumeSlider>
        <Typography variant="body2">
          {isMuted ? 'Muted' : `${volume}%`}
        </Typography>
      </VolumeControl>
      
      {/* 如果需要顯示提示 */}
      {showTip && (
        <PerformanceTip>
          <Typography variant="body2">
            <InfoIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
            提示: 嘗試使用"踏步"方式來保持節奏，即使在休止符處也保持動作。
          </Typography>
        </PerformanceTip>
      )}
      
      {/* 標準樂譜顯示 */}
      {renderStandardNotation()}
      
      <Box className={`${classes.controlsContainer} ${classes.responsiveControls}`}>
        {/* 理論知識按鈕 */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<School />}
          onClick={openTheoryDialog}
        >
          查看音樂理論
        </Button>
      </Box>
      
      {/* 音樂理論對話框 */}
      <TheoryDialog
        open={showTheory}
        onClose={() => setShowTheory(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>音樂節奏理論</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            當前節奏模式
          </Typography>
          <RhythmPatternDisplay>
            {currentPattern.map((beat, index) => (
              <BeatIndicator 
                key={index} 
                active={false}
              >
                {beat ? index + 1 : "-"}
              </BeatIndicator>
            ))}
          </RhythmPatternDisplay>
          <Typography variant="h6" gutterBottom style={{ marginTop: 16 }}>
            標準音樂符號
          </Typography>
          <RhythmPatternVisualization>
            {renderStandardNotation()}
          </RhythmPatternVisualization>
          <Divider style={{ margin: '16px 0' }} />
          <Typography variant="h6" gutterBottom>
            理論解釋
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTheory.explanation}
          </Typography>
          <Typography variant="h6" gutterBottom>
            練習建議
          </Typography>
          <Typography variant="body1">
            {currentTheory.practice}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTheory(false)} color="primary">
            關閉
          </Button>
        </DialogActions>
      </TheoryDialog>
      
      {/* 遊戲模式信息顯示 */}
      {renderGameModeInfo()}
      
      {/* 添加統計和成就對話框 */}
      {renderStatsDialog()}
      {renderAchievementsDialog()}
    </GameContainer>
  );
};

export default RhythmTraining;