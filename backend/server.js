const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 載入環境變數
dotenv.config();

// 初始化Express應用
const app = express();

// 中間件
app.use(cors());
app.use(express.json());

// 請求日誌中間件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// 定義路由
app.use('/api/games', require('./routes/gameRoutes'));
app.use('/api/scores', require('./routes/scoreRoutes'));
app.use('/api/test', require('./testRoute'));

// 添加一個直接路由用於測試
app.get('/api/direct-test', (req, res) => {
  res.json({ message: '直接路由測試成功' });
});

// 添加一個特殊的分數測試路由
app.get('/api/direct-score/:userId/:gameId', (req, res) => {
  const { userId, gameId } = req.params;
  res.json({ 
    message: '直接分數路由測試成功',
    userId, 
    gameId,
    score: 200
  });
});

// 測試路由
app.get('/', (req, res) => {
  res.json({ message: '歡迎使用音樂理論遊戲API' });
});

// 設置端口
const PORT = process.env.PORT || 8080;

// 啟動服務器
app.listen(PORT, () => {
  console.log(`服務器運行在端口 ${PORT}`);
});