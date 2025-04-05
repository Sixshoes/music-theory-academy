const express = require('express');
const router = express.Router();

// 模擬遊戲數據
const games = [
  {
    id: 1,
    title: '音階識別挑戰',
    description: '訓練您識別不同的音階和調式，從大調和小調開始，逐步進階到更複雜的調式。',
    category: '音階理論',
    difficulty: '初級',
    popularity: 95,
    levels: [
      {
        level: 1,
        name: '大調與小調基礎',
        description: '學習識別基本的大調和小調音階',
        questions: 10,
        passingScore: 70,
      },
      {
        level: 2,
        name: '和聲小調與旋律小調',
        description: '區分自然小調、和聲小調和旋律小調',
        questions: 12,
        passingScore: 75,
      },
      {
        level: 3,
        name: '教會調式入門',
        description: '學習識別七種基本的教會調式',
        questions: 15,
        passingScore: 80,
      },
    ],
  },
  {
    id: 2,
    title: '和弦大師',
    description: '學習和識別各種和弦，從基本三和弦到複雜的七和弦和擴展和弦。',
    category: '和聲理論',
    difficulty: '中級',
    popularity: 88,
    levels: [
      {
        level: 1,
        name: '基本三和弦',
        description: '學習識別大三和弦、小三和弦、增三和弦和減三和弦',
        questions: 12,
        passingScore: 75,
      },
      {
        level: 2,
        name: '三和弦轉位',
        description: '識別三和弦的原位、第一轉位和第二轉位',
        questions: 15,
        passingScore: 80,
      },
    ],
  },
  {
    id: 3,
    title: '節奏訓練營',
    description: '提高您的節奏感和時值理解，從基本節奏模式到複雜的節奏型態。',
    category: '節奏理論',
    difficulty: '初級',
    popularity: 92,
    levels: [
      {
        level: 1,
        name: '基本節奏模式',
        description: '學習基本的節奏符號和簡單拍子',
        questions: 10,
        passingScore: 70,
      },
      {
        level: 2,
        name: '複合拍子',
        description: '探索複合拍子和相關的節奏模式',
        questions: 12,
        passingScore: 75,
      },
    ],
  },
];

// 模擬分數數據
const userScores = {};

// @route   GET /api/games
// @desc    獲取所有遊戲
// @access  Public
router.get('/', (req, res) => {
  // 返回遊戲列表，但不包含完整的關卡詳情
  const gamesList = games.map(({ id, title, description, category, difficulty, popularity }) => ({
    id,
    title,
    description,
    category,
    difficulty,
    popularity,
  }));
  res.json(gamesList);
});

// @route   GET /api/games/:id
// @desc    獲取特定遊戲詳情
// @access  Public
router.get('/:id', (req, res) => {
  const game = games.find((g) => g.id === parseInt(req.params.id));

  if (!game) {
    return res.status(404).json({ message: '遊戲不存在' });
  }

  res.json(game);
});

// @route   GET /api/games/:id/levels/:levelId
// @desc    獲取特定遊戲的特定關卡
// @access  Public
router.get('/:id/levels/:levelId', (req, res) => {
  const game = games.find((g) => g.id === parseInt(req.params.id));

  if (!game) {
    return res.status(404).json({ message: '遊戲不存在' });
  }

  const level = game.levels.find((l) => l.level === parseInt(req.params.levelId));

  if (!level) {
    return res.status(404).json({ message: '關卡不存在' });
  }

  res.json(level);
});

// @route   POST /api/games/score
// @desc    保存遊戲分數
// @access  Public
router.post('/score', (req, res) => {
  const { userId, gameId, score } = req.body;
  
  if (!userId || !gameId || score === undefined) {
    return res.status(400).json({ message: '缺少必要參數' });
  }
  
  // 使用複合鍵 userId_gameId 來存儲用戶在特定遊戲中的分數
  const key = `${userId}_${gameId}`;
  userScores[key] = score;
  
  res.json({ success: true, message: '分數已保存', score });
});

// @route   GET /api/games/score/:userId/:gameId
// @desc    獲取用戶在特定遊戲中的分數
// @access  Public
router.get('/score/:userId/:gameId', (req, res) => {
  const { userId, gameId } = req.params;
  const key = `${userId}_${gameId}`;
  
  const score = userScores[key] || 0;
  
  res.json({ score });
});

// @route   DELETE /api/games/score/:userId/:gameId
// @desc    重置用戶在特定遊戲中的分數
// @access  Public
router.delete('/score/:userId/:gameId', (req, res) => {
  const { userId, gameId } = req.params;
  const key = `${userId}_${gameId}`;
  
  // 刪除特定用戶在特定遊戲中的分數
  delete userScores[key];
  
  res.json({ success: true, message: '分數已重置' });
});

// @route   DELETE /api/games/score/:userId
// @desc    重置用戶的所有分數
// @access  Public
router.delete('/score/:userId', (req, res) => {
  const { userId } = req.params;
  
  // 刪除所有以該用戶ID開頭的分數記錄
  Object.keys(userScores).forEach(key => {
    if (key.startsWith(`${userId}_`)) {
      delete userScores[key];
    }
  });
  
  res.json({ success: true, message: '所有分數已重置' });
});

module.exports = router;