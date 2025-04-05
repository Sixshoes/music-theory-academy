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
      name: '複合拍子 6/8',
      description: '6/8 拍子的基本節奏模式',
      pattern: [1.5, 0.5, 1, 1.5, 0.5, 1], // 1.5代表附點四分音符
      tempo: 70,
    },
    {
      name: '附點節奏',
      description: '包含附點音符的節奏模式',
      pattern: [1.5, 0.5, 1, 1],  // 附點四分音符+八分音符+四分音符+四分音符
      tempo: 85,
    },
  ],
  level3: [
    {
      name: '變換拍號',
      description: '在4/4和3/4之間變換的節奏',
      pattern: [1, 1, 1, 1, 1, 1, 1], // 前四個是4/4，後三個是3/4
      meterChanges: [{index: 4, meter: "3/4"}],
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
  level4: [
    {
      name: '三連音節奏',
      description: '包含三連音的基本節奏模式',
      pattern: [1, 0.33, 0.33, 0.33, 1], // 0.33代表三連音
      tempo: 85,
      triplets: [{ start: 1, count: 3 }], // 標記三連音位置
    },
    {
      name: '五連音節奏',
      description: '包含五連音的複雜節奏',
      pattern: [1, 0.2, 0.2, 0.2, 0.2, 0.2, 1], // 0.2代表五連音
      tempo: 80,
      quintuplets: [{ start: 1, count: 5 }], // 標記五連音位置
    },
    {
      name: '混合多連音',
      description: '同時包含三連音和二連音的複雜節奏',
      pattern: [0.33, 0.33, 0.33, 0.5, 0.5, 0.33, 0.33, 0.33],
      tempo: 75,
      triplets: [{ start: 0, count: 3 }, { start: 5, count: 3 }], // 標記三連音位置
    },
  ],
  level5: [
    {
      name: '流行樂節奏',
      description: '常見於流行音樂的節奏型態',
      pattern: [0.5, 0.25, 0.25, 0.5, 0, 0.25, 0.25, 0.5, 0.5],
      tempo: 100,
      isImprovisation: true, // 標記為即興練習
    },
    {
      name: '拉丁節奏',
      description: '帶有拉丁風格的複雜節奏型',
      pattern: [0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5],
      tempo: 110,
      isImprovisation: true, // 標記為即興練習
    },
    {
      name: '爵士擺動',
      description: '爵士樂中常見的擺動節奏',
      pattern: [0.66, 0.33, 0.66, 0.33, 0.66, 0.33, 0.66, 0.33], // 模擬擺動八分音符
      tempo: 90,
      isImprovisation: true, // 標記為即興練習
      isSwing: true, // 標記為擺動節奏
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
  
  // 根據級別選擇節奏模式
  const getLevelPatterns = () => {
    switch (level) {
      case 1:
        return rhythmPatterns.level1;
      case 2:
        return rhythmPatterns.level2;
      case 3:
        return rhythmPatterns.level3;
      case 4:
        return rhythmPatterns.level4;
      case 5:
        return rhythmPatterns.level5;
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
    
    // 重置計時器
    tapTimesRef.current = [];
  };
  
  // 播放當前節奏模式
  const playPattern = () => {
    if (isPlaying || !currentPattern) return;
    
    setIsPlaying(true);
    
    // 創建節奏音效
    const click = new Tone.Player('/sounds/click.mp3').toDestination();
    const highClick = new Tone.Player('/sounds/high-click.mp3').toDestination();
    
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
    
    // 設置定時器以便在適當的時間播放每個音符
    let currentTime = Tone.now();
    let elapsedTime = 0;

    // 處理拍號變化
    const meterChanges = currentPattern.meterChanges || [];
    let currentMeter = "4/4"; // 默認拍號
    
    // 播放節奏
    for (let i = 0; i < pattern.length; i++) {
      // 檢查是否需要變更拍號
      for (const change of meterChanges) {
        if (change.index === i) {
          currentMeter = change.meter;
          break;
        }
      }
      
      // 處理三連音和五連音
      const isTripletStart = (currentPattern.triplets || []).some(t => t.start === i);
      const isQuintupletStart = (currentPattern.quintuplets || []).some(q => q.start === i);
      
      if (pattern[i] === 0) {
        // 休止符，不播放聲音但更新時間
        elapsedTime += beatTime;
      } else {
        // 檢查是否是擺動節奏
        const isSwingNote = currentPattern.isSwing && (i % 2 === 0);
        
        // 計算實際時值（考慮三連音和五連音）
        let actualDuration = pattern[i] * beatTime;
        if (isTripletStart || pattern[i] === 0.33) {
          actualDuration = beatTime / 3;
        } else if (isQuintupletStart || pattern[i] === 0.2) {
          actualDuration = beatTime / 5;
        } else if (isSwingNote) {
          actualDuration = beatTime * 0.66; // 擺動音符較長
        }
        
        // 決定使用哪種音效
        const isDownbeat = i === 0 || elapsedTime % (parseInt(currentMeter) * beatTime) < 0.01;
        const sound = isDownbeat ? highClick : click;
        
        // 在適當的時間播放音符
        sound.start(currentTime + elapsedTime);
        
        // 更新時間
        elapsedTime += actualDuration;
      }
    }
    
    // 在節奏播放完畢後重置狀態
    setTimeout(() => {
      setIsPlaying(false);
      
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