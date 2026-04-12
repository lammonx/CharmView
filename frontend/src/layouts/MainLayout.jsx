import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          <h1>学无止境</h1>
        </Link>
        <nav className="main-nav">
          <Link to="/" className="nav-item">首页</Link>
          <Link to="/gallery" className="nav-item">图片画廊</Link>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 学无止境. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;