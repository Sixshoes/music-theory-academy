const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    獲取當前用戶資料
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: '用戶不存在' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: '服務器錯誤' });
  }
});

// @route   PUT /api/users/profile
// @desc    更新用戶資料
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    
    // 構建更新對象
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    
    // 更新用戶
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: '用戶不存在' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) { // 重複鍵錯誤
      return res.status(400).json({ message: '用戶名或電子郵件已被使用' });
    }
    res.status(500).json({ message: '服務器錯誤' });
  }
});

// @route   GET /api/users/progress
// @desc    獲取用戶學習進度
// @access  Private
router.get('/progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('progress');
    if (!user) {
      return res.status(404).json({ message: '用戶不存在' });
    }
    res.json(user.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: '服務器錯誤' });
  }
});

// @route   PUT /api/users/progress
// @desc    更新用戶學習進度
// @access  Private
router.put('/progress', auth, async (req, res) => {
  try {
    const { gameType, level, score } = req.body;
    
    // 驗證輸入
    if (!gameType || !level) {
      return res.status(400).json({ message: '遊戲類型和級別是必需的' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: '用戶不存在' });
    }
    
    // 更新進度
    if (!user.progress) {
      user.progress = {};
    }
    
    if (!user.progress[gameType]) {
      user.progress[gameType] = {};
    }
    
    // 只有當新分數更高時才更新
    if (!user.progress[gameType][level] || score > user.progress[gameType][level]) {
      user.progress[gameType][level] = score;
    }
    
    await user.save();
    res.json(user.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: '服務器錯誤' });
  }
});

module.exports = router;