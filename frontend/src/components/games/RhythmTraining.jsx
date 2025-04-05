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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayArrow, Stop, Refresh, Help, TouchApp } from '@material-ui/icons';
import { Sampler, Transport, Time, now } from 'tone';

const useStyles = makeStyles((theme) => ({
  gameContainer: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    backgroundColor: '#f8f9fa',
  },
  progressContainer: {
    marginBottom: theme.spacing(3),
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  playButton: {
    marginRight: theme.spacing(2),
  },
  rhythmDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  },
  beatBox: {
    width: 40,
    height: 40,
    margin: theme.spacing(0, 0.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ccc',
    fontWeight: 'bold',
  },
  activeBeat: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  tapArea: {
    height: 120,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: '2px dashed #ccc',
    marginBottom: theme.spacing(3),
    transition: 'background-color 0.1s',
    '&:active': {
      backgroundColor: '#e0e0e0',
    },
  },
  feedbackContainer: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  accuracyMeter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  rhythmPattern: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  rhythmNote: {
    margin: theme.spacing(0, 0.5),
    textAlign: 'center',
  },
  quarterNote: {
    width: 30,
    height: 30,
    backgroundColor: '#333',
    borderRadius: '50%',
    display: 'inline-block',
  },
  eighthNote: {
    width: 20,
    height: 20,
    backgroundColor: '#333',
    borderRadius: '50%',
    display: 'inline-block',
  },
  sixteenthNote: {
    width: 15,
    height: 15,
    backgroundColor: '#333',
    borderRadius: '50%',
    display: 'inline-block',
  },
  rest: {
    width: 30,
    height: 30,
    border: '2px solid #333',
    borderRadius: '50%',
    display: 'inline-block',
  },
}));

// 節奏模式定義
const rhythmPatterns = {
  level1: [
    {
      name: '基本四拍子',
      description: '四個等距的四分音符',
      pattern: [1, 1, 1, 1], // 1代表四分音符
      tempo: 80,
    },
    {
      name: '基本切分音',
      description: '強拍休止，弱拍發聲的節奏型',
      pattern: [0, 1, 0, 1], // 0代表休止符
      tempo: 80,
    },
    {
      name: '八分音符節奏',
      description: '包含八分音符的基本節奏',
      pattern: [1, 0.5, 0.5, 1], // 0.5代表八分音符
      tempo: 80,
    },
  ],
  level2: [
    {
      name: '複合節奏',
      description: '混合了四分音符和八分音符的節奏',
      pattern: [1, 0.5, 0.5, 0.5, 0.5, 1],
      tempo: 90,
    },
    {
      name: '三連音節奏',
      description: '包含三連音的節奏型',
      pattern: [1, 0.33, 0.33, 0.33, 1], // 0.33代表三連音
      tempo: 90,
    },
    {
      name: '十六分音符節奏',
      description: '包含十六分音符的節奏',
      pattern: [1, 0.25, 0.25, 0.25, 0.25, 1], // 0.25代表十六分音符
      tempo: 85,
    },
  ],
  level3: [
    {
      name: '變換拍號',
      description: '在4/4和3/4之間變換的節奏',
      pattern: [1, 1, 1, 1, 1, 1, 1], // 前四個是4/4，後三個是3/4
      tempo: 100,
    },
    {
      name: '複雜切分音',
      description: '包含多種切分音的節奏型',
      pattern: [0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, 0.5],
      tempo: 95,
    },
    {
      name: '混合節奏',
      description: '混合了各種音符時值的複雜節奏',
      pattern: [1, 0.25, 0.25, 0.5, 0.5, 0.25, 0.25, 0.5, 0.5],
      tempo: 90,
    },
  ],
};

const RhythmTraining = ({ level = 1, onComplete }) => {
  const classes = useStyles();
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
  
  const metronomeRef = useRef(null);
  const playerRef = useRef(null);
  const startTimeRef = useRef(0);
  const tapTimesRef = useRef([]);
  
  // 根據級別獲取節奏模式
  const getPatterns = () => {
    switch (level) {
      case 1:
        return rhythmPatterns.level1;
      case 2:
        return rhythmPatterns.level2;
      case 3:
        return rhythmPatterns.level3;
      default:
        return rhythmPatterns.level1;
    }
  };
  
  // 初始化音頻
  useEffect(() => {
    // 創建節拍器 - 確保Sampler的創建方式正確
    metronomeRef.current = new Tone.Sampler({
      urls: {
        C4: 'https://tonejs.github.io/audio/berklee/click1.mp3',
      },
      onload: () => {
        console.log('Metronome loaded');
      }
    }).toDestination();
    
    // 創建播放器 - 確保Sampler的創建方式正確
    playerRef.current = new Tone.Sampler({
      urls: {
        C4: 'https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3',
      },
      onload: () => {
        console.log('Player loaded');
      }
    }).toDestination();
    
    // 生成第一個問題
    generateQuestion();
    
    return () => {
      if (metronomeRef.current) {
        metronomeRef.current.dispose();
      }
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      Transport.stop();
      Transport.cancel();
    };
  }, []);
  
  // 生成新問題
  const generateQuestion = () => {
    const patterns = getPatterns();
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    setCurrentPattern(randomPattern);
    setIsPlaying(false);
    setIsRecording(false);
    setActiveBeat(-1);
    setUserTaps([]);
    setAccuracy(0);
    setShowResult(false);
    setFeedback('');
    
    // 重置計時器
    tapTimesRef.current = [];
  };
  
  // 播放節奏模式
  const playPattern = () => {
    if (!currentPattern || isPlaying) return;
    
    setIsPlaying(true);
    setActiveBeat(-1);
    
    // 設置節拍器速度
    Transport.bpm.value = currentPattern.tempo;
    
    // 清除之前的事件
    Tone.Transport.cancel();
    
    // 計算總拍數
    const totalBeats = currentPattern.pattern.reduce((sum, val) => sum + (val > 0 ? 1 : 0), 0);
    
    // 設置節拍器事件
    let beatIndex = 0;
    let scheduleTime = 0;
    
    currentPattern.pattern.forEach((beat, index) => {
      if (beat > 0) {
        // 安排播放聲音
        Transport.schedule((time) => {
          metronomeRef.current.triggerAttackRelease('C4', '16n', time);
          setActiveBeat(index);
        }, scheduleTime);
        
        beatIndex++;
      }
      
      // 更新下一個事件的時間
      scheduleTime += beat * (60 / Transport.bpm.value) * 4; // 將節拍轉換為秒
    });
    
    // 安排結束事件
    Transport.schedule((time) => {
      setIsPlaying(false);
      setActiveBeat(-1);
    }, scheduleTime);
    
    // 啟動節拍器
    Transport.start();
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
    
    setIsRecording(true);
    setUserTaps([]);
    tapTimesRef.current = [];
    startTimeRef.current = now();
    
    // 設置節拍器速度
    Transport.bpm.value = currentPattern.tempo;
    
    // 清除之前的事件
    Tone.Transport.cancel();
    
    // 計算總時長
    const totalDuration = currentPattern.pattern.reduce((sum, val) => sum + val, 0) * 60 / currentPattern.tempo;
    
    // 設置結束錄製的計時器
    setTimeout(() => {
      endRecording();
    }, totalDuration * 1000 + 500); // 額外添加500ms的緩衝時間
  };
  
  // 記錄用戶的點擊
  const handleTap = () => {
    if (!isRecording) return;
    
    const tapTime = now() - startTimeRef.current;
    tapTimesRef.current.push(tapTime);
    
    // 播放敲擊聲音
    playerRef.current.triggerAttackRelease('C4', '16n');
    
    // 更新用戶點擊顯示
    setUserTaps([...tapTimesRef.current]);
  };
  
  // 結束記錄並評估
  const endRecording = () => {
    setIsRecording(false);
    setShowResult(true);
    
    // 計算預期的敲擊時間
    const expectedTaps = [];
    let currentTime = 0;
    
    currentPattern.pattern.forEach((beat) => {
      if (beat > 0) {
        expectedTaps.push(currentTime);
      }
      currentTime += beat * Time('4n').toSeconds();
    });
    
    // 如果用戶沒有敲擊，給出0分
    if (tapTimesRef.current.length === 0) {
      setAccuracy(0);
      setFeedback('您沒有進行任何敲擊。請嘗試跟隨節奏模式敲擊。');
      return;
    }
    
    // 計算準確度
    let totalError = 0;
    let matchedTaps = 0;
    
    // 對每個預期的敲擊，找到最接近的用戶敲擊
    expectedTaps.forEach((expectedTime) => {
      let minError = Infinity;
      let bestMatch = -1;
      
      tapTimesRef.current.forEach((tapTime, index) => {
        const error = Math.abs(tapTime - expectedTime);
        if (error < minError) {
          minError = error;
          bestMatch = index;
        }
      });
      
      // 如果找到了匹配且誤差在可接受範圍內
      if (bestMatch !== -1 && minError < 0.3) { // 300ms的容許誤差
        totalError += minError;
        matchedTaps++;
      }
    });
    
    // 計算最終準確度分數 (0-100)
    const accuracyScore = Math.max(
      0,
      100 - (totalError / Math.max(1, matchedTaps)) * 100 - 
      Math.abs(expectedTaps.length - tapTimesRef.current.length) * 10
    );
    
    setAccuracy(Math.round(accuracyScore));
    
    // 更新問題計數和分數
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);
    
    // 如果準確度超過70%，算作通過
    if (accuracyScore >= 70) {
      setScore(score + 1);
      setFeedback(`很好！您的節奏準確度為${Math.round(accuracyScore)}%。`);
    } else {
      setFeedback(`需要改進。您的節奏準確度為${Math.round(accuracyScore)}%。嘗試更準確地跟隨節奏模式。`);
    }
    
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
      // 3秒後生成新問題
      setTimeout(generateQuestion, 3000);
    }
  };
  
  // 渲染節奏顯示
  const renderRhythmDisplay = () => {
    if (!currentPattern) return null;
    
    return (
      <Box className={classes.rhythmDisplay}>
        {currentPattern.pattern.map((beat, index) => {
          // 確定顯示的內容
          let content;
          if (beat === 0) {
            content = 'R'; // 休止符
          } else if (beat === 1) {
            content = '♩'; // 四分音符
          } else if (beat === 0.5) {
            content = '♪'; // 八分音符
          } else if (beat === 0.25) {
            content = '♬'; // 十六分音符
          } else if (beat === 0.33) {
            content = '3'; // 三連音
          } else {
            content = beat;
          }
          
          return (
            <Box
              key={index}
              className={`${classes.beatBox} ${activeBeat === index ? classes.activeBeat : ''}`}
            >
              {content}
            </Box>
          );
        })}
      </Box>
    );
  };
  
  // 渲染節奏圖示
  const renderRhythmPattern = () => {
    if (!currentPattern) return null;
    
    return (
      <Box className={classes.rhythmPattern}>
        {currentPattern.pattern.map((beat, index) => {
          let noteComponent;
          
          if (beat === 0) {
            noteComponent = <div className={classes.rest} />;
          } else if (beat === 1) {
            noteComponent = <div className={classes.quarterNote} />;
          } else if (beat === 0.5) {
            noteComponent = <div className={classes.eighthNote} />;
          } else if (beat === 0.25 || beat === 0.33) {
            noteComponent = <div className={classes.sixteenthNote} />;
          }
          
          return (
            <Box key={index} className={classes.rhythmNote}>
              {noteComponent}
            </Box>
          );
        })}
      </Box>
    );
  };
  
  return (
    <Paper className={classes.gameContainer}>
      <Typography variant="h5" gutterBottom>
        節奏訓練營 - 級別 {level}
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
      
      {currentPattern && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            {currentPattern.name} - {currentPattern.description}
          </Typography>
          <Typography variant="body2" gutterBottom>
            速度: {currentPattern.tempo} BPM
          </Typography>
          
          {renderRhythmPattern()}
          {renderRhythmDisplay()}
          
          <Box className={classes.controlsContainer}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrow />}
              onClick={playPattern}
              disabled={isPlaying || isRecording}
              className={classes.playButton}
            >
              播放節奏
            </Button>
            
            {isPlaying && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Stop />}
                onClick={stopPlaying}
                className={classes.playButton}
              >
                停止
              </Button>
            )}
            
            <Tooltip title="先聆聽節奏，然後嘗試重現它。">
              <IconButton>
                <Help />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Divider className={classes.divider} />
          
          <Typography variant="subtitle1" gutterBottom>
            現在輪到您了 - 點擊下方區域跟隨節奏模式
          </Typography>
          
          <Box
            className={classes.tapArea}
            onClick={handleTap}
            onTouchStart={(e) => {
              e.preventDefault();
              handleTap();
            }}
          >
            {!isRecording ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<TouchApp />}
                onClick={(e) => {
                  e.stopPropagation();
                  startRecording();
                }}
                disabled={isPlaying || showResult}
              >
                開始敲擊
              </Button>
            ) : (
              <Typography variant="h6">點擊這裡跟隨節奏！</Typography>
            )}
          </Box>
          
          {showResult && (
            <Box className={classes.feedbackContainer}>
              <Typography variant="subtitle1" gutterBottom>
                準確度: {accuracy}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={accuracy} 
                color={accuracy >= 70 ? 'primary' : 'secondary'}
                className={classes.accuracyMeter}
              />
              <Typography variant="body1">{feedback}</Typography>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default RhythmTraining;