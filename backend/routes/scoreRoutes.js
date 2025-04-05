const express = require('express');
const router = express.Router();

// 模擬分數數據
const userScores = {};

// @route   POST /api/scores
// @desc    保存遊戲分數
// @access  Public
router.post('/', (req, res) => {
  const { userId, gameId, score } = req.body;
  
  if (!userId || !gameId || score === undefined) {
    return res.status(400).json({ message: '缺少必要參數' });
  }
  
  // 使用複合鍵 userId_gameId 來存儲用戶在特定遊戲中的分數
  const key = `${userId}_${gameId}`;
  userScores[key] = score;
  
  res.json({ success: true, message: '分數已保存', score });
});

// @route   GET /api/scores/:userId/:gameId
// @desc    獲取用戶在特定遊戲中的分數
// @access  Public
router.get('/:userId/:gameId', (req, res) => {
  const { userId, gameId } = req.params;
  const key = `${userId}_${gameId}`;
  
  const score = userScores[key] || 0;
  
  res.json({ success: true, score });
});

// @route   DELETE /api/scores/:userId/:gameId
// @desc    重置用戶在特定遊戲中的分數
// @access  Public
router.delete('/:userId/:gameId', (req, res) => {
  const { userId, gameId } = req.params;
  const key = `${userId}_${gameId}`;
  
  // 刪除特定用戶在特定遊戲中的分數
  delete userScores[key];
  
  res.json({ success: true, message: '分數已重置' });
});

// @route   DELETE /api/scores/:userId
// @desc    重置用戶的所有分數
// @access  Public
router.delete('/:userId', (req, res) => {
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