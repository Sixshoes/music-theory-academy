import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayArrow, VolumeUp, Help } from '@material-ui/icons';
import * as Tone from 'tone';

const useStyles = makeStyles((theme) => ({
  gameContainer: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    backgroundColor: '#f8f9fa',
  },
  optionCard: {
    height: '100%',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  },
  selectedOption: {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  correctOption: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  incorrectOption: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  optionContent: {
    textAlign: 'center',
  },
  playButton: {
    marginRight: theme.spacing(2),
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  progressContainer: {
    marginBottom: theme.spacing(3),
  },
  feedbackContainer: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}));

// 音階定義
const scales = {
  major: {
    name: '大調音階',
    description: '大調音階是最常見的音階之一，有明亮、快樂的音色。',
    intervals: [0, 2, 4, 5, 7, 9, 11, 12], // 全全半全全全半
  },
  minor: {
    name: '自然小調音階',
    description: '自然小調音階有較為憂鬱、柔和的音色。',
    intervals: [0, 2, 3, 5, 7, 8, 10, 12], // 全半全全半全全
  },
  harmonicMinor: {
    name: '和聲小調音階',
    description: '和聲小調音階將自然小調的第七音升高半音，創造出獨特的東方風格音色。',
    intervals: [0, 2, 3, 5, 7, 8, 11, 12], // 全半全全半全半半
  },
  melodicMinor: {
    name: '旋律小調音階',
    description: '旋律小調音階在上行時將第六、七音升高，下行時恢復為自然小調。',
    intervals: [0, 2, 3, 5, 7, 9, 11, 12], // 上行：全半全全全全半
  },
  dorian: {
    name: '多利安調式',
    description: '多利安調式是一種教會調式，有輕微憂鬱但不太暗沉的音色。',
    intervals: [0, 2, 3, 5, 7, 9, 10, 12], // 全半全全全半全
  },
  phrygian: {
    name: '弗里幾亞調式',
    description: '弗里幾亞調式有強烈的西班牙或中東風格。',
    intervals: [0, 1, 3, 5, 7, 8, 10, 12], // 半全全全半全全
  },
};

// 根音列表
const rootNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const ScaleIdentification = ({ level = 1, onComplete }) => {
  const classes = useStyles();
  const [currentScale, setCurrentScale] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuestions] = useState(10); // 每個級別10個問題
  const [feedback, setFeedback] = useState('');
  const [synth, setSynth] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rootNote, setRootNote] = useState('C');

  // 根據級別選擇可用的音階
  const getAvailableScales = () => {
    switch (level) {
      case 1: // 初級：大調和自然小調
        return ['major', 'minor'];
      case 2: // 中級：加上和聲小調和旋律小調
        return ['major', 'minor', 'harmonicMinor', 'melodicMinor'];
      case 3: // 高級：加上教會調式
        return ['major', 'minor', 'harmonicMinor', 'melodicMinor', 'dorian', 'phrygian'];
      default:
        return ['major', 'minor'];
    }
  };

  // 初始化合成器
  useEffect(() => {
    // 確保Synth的創建方式正確
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);
  
    // 生成第一個問題
    generateQuestion();
  
    return () => {
      newSynth.dispose();
    };
  }, []);

  // 生成新問題
  const generateQuestion = () => {
    const availableScales = getAvailableScales();
    const randomScaleType = availableScales[Math.floor(Math.random() * availableScales.length)];
    const randomRoot = rootNotes[Math.floor(Math.random() * rootNotes.length)];
    
    setCurrentScale(scales[randomScaleType]);
    setRootNote(randomRoot);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowAnswer(false);
    setFeedback('');
  };

  // 播放音階
  const playScale = async () => {
    if (!synth || !currentScale || isPlaying) return;

    setIsPlaying(true);
    
    // 設置音符持續時間和間隔
    const noteDuration = 0.4; // 秒
    const noteSpacing = 0.5; // 秒
    
    // 獲取當前時間
    const currentTime = Tone.now();
    
    // 播放音階的每個音符
    currentScale.intervals.forEach((interval, index) => {
      // 計算MIDI音符編號 (C4 = 60)
      const rootMidiNote = 60 + rootNotes.indexOf(rootNote);
      const midiNote = rootMidiNote + interval;
      
      // 將MIDI音符轉換為頻率
      const frequency = new Tone.Frequency(midiNote, 'midi').toFrequency();
      
      // 在適當的時間播放音符
      synth.triggerAttackRelease(frequency, noteDuration, currentTime + index * noteSpacing);
    });
    
    // 設置計時器以在音階播放完畢後重置isPlaying狀態
    setTimeout(() => {
      setIsPlaying(false);
    }, currentScale.intervals.length * noteSpacing * 1000 + 500);
  };

  // 選擇答案
  const handleOptionSelect = (scaleType) => {
    if (showAnswer) return;
    
    setSelectedOption(scaleType);
    const correct = scaleType === Object.keys(scales).find(
      (key) => scales[key].name === currentScale.name
    );
    
    setIsCorrect(correct);
    setShowAnswer(true);
    
    if (correct) {
      setScore(score + 1);
      setFeedback(`正確！${currentScale.description}`);
    } else {
      setFeedback(`不正確。正確答案是${currentScale.name}。${currentScale.description}`);
    }
    
    // 更新問題計數
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);
    
    // 檢查是否完成所有問題
    if (newQuestionCount >= totalQuestions) {
      setTimeout(() => {
        if (onComplete) {
          onComplete({
            score,
            totalQuestions,
            level,
          });
        }
      }, 2000);
    } else {
      // 2秒後生成新問題
      setTimeout(generateQuestion, 2000);
    }
  };

  // 獲取選項卡片的類名
  const getOptionCardClass = (scaleType) => {
    if (!showAnswer || selectedOption !== scaleType) {
      return selectedOption === scaleType ? classes.selectedOption : classes.optionCard;
    }
    
    const isOptionCorrect = Object.keys(scales).find(
      (key) => scales[key].name === currentScale.name
    ) === scaleType;
    
    if (isOptionCorrect) {
      return `${classes.optionCard} ${classes.correctOption}`;
    }
    
    return selectedOption === scaleType
      ? `${classes.optionCard} ${classes.incorrectOption}`
      : classes.optionCard;
  };

  return (
    <Paper className={classes.gameContainer}>
      <Typography variant="h5" gutterBottom>
        音階識別挑戰 - 級別 {level}
      </Typography>
      
      <Box className={classes.progressContainer}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">
            問題 {questionCount + 1} / {totalQuestions}
          </Typography>
          <Typography variant="body2">
            得分: {score} / {questionCount}
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={(questionCount / totalQuestions) * 100} 
        />
      </Box>
      
      <Box className={classes.controlsContainer}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
          onClick={playScale}
          disabled={isPlaying}
          className={classes.playButton}
        >
          播放音階
        </Button>
        <Typography variant="subtitle1">
          根音: {rootNote}
        </Typography>
        <Tooltip title="聆聽音階並選擇正確的音階類型。">
          <IconButton>
            <Help />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Typography variant="subtitle1" gutterBottom>
        選擇正確的音階類型:
      </Typography>
      
      <Grid container spacing={2}>
        {getAvailableScales().map((scaleType) => (
          <Grid item xs={12} sm={6} md={4} key={scaleType}>
            <Card 
              className={getOptionCardClass(scaleType)}
              onClick={() => handleOptionSelect(scaleType)}
            >
              <CardContent className={classes.optionContent}>
                <Typography variant="h6">{scales[scaleType].name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {showAnswer && (
        <Box className={classes.feedbackContainer}>
          <Typography variant="body1">{feedback}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ScaleIdentification;