// 測試路由文件
const express = require('express');
const router = express.Router();

// 簡單的測試路由
router.get('/test', (req, res) => {
  res.json({ message: '測試路由正常工作' });
});

// 測試帶參數的路由
router.get('/test/:id', (req, res) => {
  res.json({ message: `參數值為: ${req.params.id}` });
});

// 測試分數路由格式
router.get('/score/:userId/:gameId', (req, res) => {
  const { userId, gameId } = req.params;
  res.json({ 
    message: '測試分數路由正常工作',
    userId,
    gameId,
    score: 100
  });
});

module.exports = router; 