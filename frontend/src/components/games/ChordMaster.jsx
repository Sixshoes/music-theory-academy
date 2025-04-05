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
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayArrow, VolumeUp, Help, MusicNote } from '@material-ui/icons';
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
  keyboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    overflowX: 'auto',
    padding: theme.spacing(2),
  },
  pianoKey: {
    height: 120,
    borderRadius: '0 0 4px 4px',
    border: '1px solid #ccc',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.1s',
    '&:active': {
      backgroundColor: '#e0e0e0',
    },
  },
  whiteKey: {
    width: 40,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  blackKey: {
    width: 24,
    backgroundColor: '#333',
    height: 80,
    position: 'absolute',
    zIndex: 1,
    '&:hover': {
      backgroundColor: '#555',
    },
  },
  keyHighlighted: {
    backgroundColor: '#bbdefb',
    '&:hover': {
      backgroundColor: '#bbdefb',
    },
  },
  blackKeyHighlighted: {
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#2196f3',
    },
  },
  chordDiagram: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
}));

// 和弦定義
const chords = {
  major: {
    name: '大三和弦',
    symbol: '',
    description: '大三和弦由根音、大三度、純五度組成，聽起來明亮、穩定。',
    intervals: [0, 4, 7], // 根音、大三度、純五度
  },
  minor: {
    name: '小三和弦',
    symbol: 'm',
    description: '小三和弦由根音、小三度、純五度組成，聽起來較為憂鬱、柔和。',
    intervals: [0, 3, 7], // 根音、小三度、純五度
  },
  diminished: {
    name: '減三和弦',
    symbol: 'dim',
    description: '減三和弦由根音、小三度和減五度組成，有緊張、不穩定的音色。',
    intervals: [0, 3, 6], // 根音、小三度、減五度
  },
  augmented: {
    name: '增三和弦',
    symbol: 'aug',
    description: '增三和弦由根音、大三度和增五度組成，有神秘、懸疑的音色。',
    intervals: [0, 4, 8], // 根音、大三度、增五度
  },
  dominant7: {
    name: '屬七和弦',
    symbol: '7',
    description: '屬七和弦由大三和弦加上小七度組成，有強烈的解決傾向。',
    intervals: [0, 4, 7, 10], // 根音、大三度、純五度、小七度
  },
  major7: {
    name: '大七和弦',
    symbol: 'maj7',
    description: '大七和弦由大三和弦加上大七度組成，有豐富、溫暖的音色。',
    intervals: [0, 4, 7, 11], // 根音、大三度、純五度、大七度
  },
  minor7: {
    name: '小七和弦',
    symbol: 'm7',
    description: '小七和弦由小三和弦加上小七度組成，常用於爵士和流行音樂。',
    intervals: [0, 3, 7, 10], // 根音、小三度、純五度、小七度
  },
  major1stInv: {
    name: '大三和弦第一轉位',
    symbol: '6',
    description: '大三和弦的第一轉位，將根音移到最高聲部，具有較為溫和的音色。',
    intervals: [-8, 0, 3], // 三度、五度、根音（以三度為基準）
    rootOffset: 4, // 原本的根音上移四個半音
  },
  minor1stInv: {
    name: '小三和弦第一轉位',
    symbol: 'm6',
    description: '小三和弦的第一轉位，將根音移到最高聲部，常用於連接和弦。',
    intervals: [-9, 0, 4], // 三度、五度、根音（以三度為基準）
    rootOffset: 3, // 原本的根音上移三個半音
  },
  major2ndInv: {
    name: '大三和弦第二轉位',
    symbol: '64',
    description: '大三和弦的第二轉位，將根音和三度音移到最高聲部，具有不穩定感。',
    intervals: [-5, 0, 7], // 五度、根音、三度（以五度為基準）
    rootOffset: 7, // 原本的根音上移七個半音
  },
  minor2ndInv: {
    name: '小三和弦第二轉位',
    symbol: 'm64',
    description: '小三和弦的第二轉位，將根音和三度音移到最高聲部，常用於經過和弦。',
    intervals: [-5, 0, 8], // 五度、根音、三度（以五度為基準）
    rootOffset: 7, // 原本的根音上移七個半音
  },
  dom7_1stInv: {
    name: '屬七和弦第一轉位',
    symbol: '65',
    description: '屬七和弦的第一轉位，低音是三度音，有柔和的推動感。',
    intervals: [-8, 0, 3, 6], // 三度、五度、七度、根音（以三度為基準）
    rootOffset: 4, // 原本的根音上移四個半音
  },
  dom7_2ndInv: {
    name: '屬七和弦第二轉位',
    symbol: '43',
    description: '屬七和弦的第二轉位，低音是五度音，有明顯的不穩定感。',
    intervals: [-5, 0, 3, 6], // 五度、七度、根音、三度（以五度為基準）
    rootOffset: 7, // 原本的根音上移七個半音
  },
  dom7_3rdInv: {
    name: '屬七和弦第三轉位',
    symbol: '2',
    description: '屬七和弦的第三轉位，低音是七度音，有強烈的解決傾向。',
    intervals: [-2, 0, 5, 9], // 七度、根音、三度、五度（以七度為基準）
    rootOffset: 10, // 原本的根音上移十個半音
  },
  sus4: {
    name: '掛四和弦',
    symbol: 'sus4',
    description: '掛四和弦將三度音替換為四度音，有開放、懸置的音色。',
    intervals: [0, 5, 7], // 根音、四度、五度
  },
  sus2: {
    name: '掛二和弦',
    symbol: 'sus2',
    description: '掛二和弦將三度音替換為二度音，有開放、明亮的音色。',
    intervals: [0, 2, 7], // 根音、二度、五度
  },
  ninth: {
    name: '九和弦',
    symbol: '9',
    description: '九和弦在屬七和弦的基礎上加入九度音，豐富了和聲色彩。',
    intervals: [0, 4, 7, 10, 14], // 根音、大三度、純五度、小七度、九度
  },
  minorMaj7: {
    name: '小大七和弦',
    symbol: 'mM7',
    description: '小大七和弦由小三和弦加上大七度組成，帶有獨特的緊張感。',
    intervals: [0, 3, 7, 11], // 根音、小三度、純五度、大七度
  },
};

// 根音列表
const rootNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// 鋼琴鍵盤配置
const keyboardLayout = [
  { note: 'C', type: 'white', offset: 0 },
  { note: 'C#', type: 'black', offset: -12 },
  { note: 'D', type: 'white', offset: 0 },
  { note: 'D#', type: 'black', offset: -12 },
  { note: 'E', type: 'white', offset: 0 },
  { note: 'F', type: 'white', offset: 0 },
  { note: 'F#', type: 'black', offset: -12 },
  { note: 'G', type: 'white', offset: 0 },
  { note: 'G#', type: 'black', offset: -12 },
  { note: 'A', type: 'white', offset: 0 },
  { note: 'A#', type: 'black', offset: -12 },
  { note: 'B', type: 'white', offset: 0 },
];

const ChordMaster = ({ level = 1, onComplete }) => {
  const classes = useStyles();
  const [currentChord, setCurrentChord] = useState(null);
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
  const [highlightedKeys, setHighlightedKeys] = useState([]);

  // 根據級別選擇可用的和弦
  const getAvailableChords = () => {
    switch (level) {
      case 1: // 初級：基本三和弦
        return ['major', 'minor', 'diminished', 'augmented'];
      case 2: // 中級：加上七和弦
        return ['major', 'minor', 'diminished', 'augmented', 'dominant7', 'major7', 'minor7'];
      case 3: // 高級：加上轉位和弦
        return ['major1stInv', 'minor1stInv', 'major2ndInv', 'minor2ndInv', 'dom7_1stInv', 'dom7_2ndInv', 'dom7_3rdInv'];
      case 4: // 擴展和弦
        return ['sus4', 'sus2', 'ninth', 'minorMaj7'];
      case 5: // 高級和弦識別
        return ['major', 'minor', 'dominant7', 'major7', 'minor7', 'sus4', 'sus2', 'ninth', 'minorMaj7'];
      default:
        return ['major', 'minor'];
    }
  };

  // 初始化合成器
  useEffect(() => {
    // 修正PolySynth的創建方式
    const newSynth = new Tone.PolySynth().toDestination();
    setSynth(newSynth);

    // 生成第一個問題
    generateQuestion();

    return () => {
      newSynth.dispose();
    };
  }, []);

  // 生成新問題
  const generateQuestion = () => {
    const availableChords = getAvailableChords();
    const randomChordType = availableChords[Math.floor(Math.random() * availableChords.length)];
    const randomRoot = rootNotes[Math.floor(Math.random() * rootNotes.length)];
    
    setCurrentChord(chords[randomChordType]);
    setRootNote(randomRoot);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowAnswer(false);
    setFeedback('');
    
    // 計算要高亮的琴鍵
    const chord = chords[randomChordType];
    const rootOffset = chord.rootOffset || 0;
    const adjustedRootNote = rootOffset ? 
      rootNotes[(rootNotes.indexOf(randomRoot) + Math.floor(rootOffset / 12)) % rootNotes.length] : 
      randomRoot;
    
    const chordIntervals = chord.intervals;
    const rootIndex = rootNotes.indexOf(adjustedRootNote);
    const chordNotes = [];
    
    for (let i = 0; i < chordIntervals.length; i++) {
      const interval = chordIntervals[i];
      const noteIndex = (rootIndex + Math.floor((interval) / 2)) % rootNotes.length;
      const note = rootNotes[noteIndex];
      const isSharp = interval % 2 !== 0;
      
      if (isSharp) {
        chordNotes.push(note + '#');
      } else {
        chordNotes.push(note);
      }
    }
    
    setHighlightedKeys(chordNotes);
  };

  // 播放和弦
  const playChord = async () => {
    if (!synth || !currentChord || isPlaying) return;
    
    setIsPlaying(true);
    
    // 計算根音的MIDI編號 (C4 = 60)
    const rootMidiNote = 60 + rootNotes.indexOf(rootNote);
    
    // 獲取當前時間
    const currentTime = Tone.now();
    
    // 收集和弦的所有音符
    const chord = currentChord;
    const rootOffset = chord.rootOffset || 0;
    const adjustedRootNote = rootOffset ? rootMidiNote + rootOffset : rootMidiNote;
    
    const noteArray = chord.intervals.map(interval => adjustedRootNote + interval);
    
    // 將MIDI音符轉換為頻率
    const frequencyArray = noteArray.map(midiNote => new Tone.Frequency(midiNote, 'midi').toFrequency());
    
    // 播放和弦
    synth.triggerAttackRelease(frequencyArray, 1, currentTime);
    
    // 1.5秒後重置狀態
    setTimeout(() => {
      setIsPlaying(false);
    }, 1500);
  };

  // 選擇答案
  const handleOptionSelect = (chordType) => {
    if (showAnswer) return;
    
    setSelectedOption(chordType);
    const correct = chordType === Object.keys(chords).find(
      (key) => chords[key].name === currentChord.name
    );
    
    setIsCorrect(correct);
    setShowAnswer(true);
    
    if (correct) {
      setScore(score + 1);
      setFeedback(`正確！${currentChord.description}`);
    } else {
      setFeedback(`不正確。正確答案是${currentChord.name}。${currentChord.description}`);
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
  const getOptionCardClass = (chordType) => {
    if (!showAnswer || selectedOption !== chordType) {
      return selectedOption === chordType ? classes.selectedOption : classes.optionCard;
    }
    
    const isOptionCorrect = Object.keys(chords).find(
      (key) => chords[key].name === currentChord.name
    ) === chordType;
    
    if (isOptionCorrect) {
      return `${classes.optionCard} ${classes.correctOption}`;
    }
    
    return selectedOption === chordType
      ? `${classes.optionCard} ${classes.incorrectOption}`
      : classes.optionCard;
  };

  // 渲染鋼琴鍵盤
  const renderKeyboard = () => {
    return (
      <Box className={classes.keyboardContainer}>
        {keyboardLayout.map((key, index) => {
          const isHighlighted = highlightedKeys.includes(index);
          const keyClass = key.type === 'white'
            ? `${classes.pianoKey} ${classes.whiteKey} ${isHighlighted ? classes.keyHighlighted : ''}`
            : `${classes.pianoKey} ${classes.blackKey} ${isHighlighted ? classes.blackKeyHighlighted : ''}`;
          
          const style = key.type === 'black'
            ? { left: `${index * 20 + key.offset}px` }
            : {};
          
          return (
            <div
              key={index}
              className={keyClass}
              style={style}
              onClick={() => playNote(index)}
            />
          );
        })}
      </Box>
    );
  };

  // 播放單個音符
  const playNote = (noteIndex) => {
    if (!synth) return;
    
    const rootMidiNote = 60; // C4
    const midiNote = rootMidiNote + noteIndex;
    const frequency = new Tone.Frequency(midiNote, 'midi');
    
    synth.triggerAttackRelease(frequency, '8n');
  };

  // 渲染和弦圖表
  const renderChordDiagram = () => {
    if (!currentChord) return null;
    
    return (
      <Box className={classes.chordDiagram}>
        <Typography variant="subtitle1" gutterBottom>
          {rootNote}{currentChord.symbol} 和弦圖表
        </Typography>
        <Divider />
        <Box mt={2} display="flex" justifyContent="center">
          <Typography variant="body1">
            {rootNote}{currentChord.symbol} = {currentChord.intervals.map((interval, index) => {
              // 將音程轉換為音符名稱
              const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
              const rootIndex = noteNames.indexOf(rootNote);
              const noteName = noteNames[(rootIndex + interval) % 12];
              return index > 0 ? ` + ${noteName}` : noteName;
            })}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Paper className={classes.gameContainer}>
      <Typography variant="h5" gutterBottom>
        和弦大師 - 級別 {level}
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
          onClick={playChord}
          disabled={isPlaying}
          className={classes.playButton}
        >
          播放和弦
        </Button>
        <Typography variant="subtitle1">
          根音: {rootNote}
        </Typography>
        <Tooltip title="聆聽和弦並選擇正確的和弦類型。">
          <IconButton>
            <Help />
          </IconButton>
        </Tooltip>
      </Box>
      
      {showAnswer && renderChordDiagram()}
      
      {renderKeyboard()}
      
      <Typography variant="subtitle1" gutterBottom>
        選擇正確的和弦類型:
      </Typography>
      
      <Grid container spacing={2}>
        {getAvailableChords().map((chordType) => (
          <Grid item xs={12} sm={6} md={4} key={chordType}>
            <Card 
              className={getOptionCardClass(chordType)}
              onClick={() => handleOptionSelect(chordType)}
            >
              <CardContent className={classes.optionContent}>
                <Typography variant="h6">{chords[chordType].name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {rootNote}{chords[chordType].symbol}
                </Typography>
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

export default ChordMaster;