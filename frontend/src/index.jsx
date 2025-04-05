import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import App from './App.jsx';

// Material-UI v4 使用的 findDOMNode 在 React 18 中已棄用，添加臨時解決方案
// 這會禁用使用 findDOMNode 時的控制台警告
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0]?.includes?.('findDOMNode') || String(args[0])?.includes?.('findDOMNode')) {
    return;
  }
  originalConsoleError(...args);
};

// 使用 React 18 的 createRoot API
const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </HashRouter>
);