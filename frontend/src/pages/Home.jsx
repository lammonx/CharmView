import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: '图片画廊',
      description: '浏览美女、风景图片和随机视频',
      path: '/gallery',
      icon: '🖼️',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h2>欢迎来到学无止境</h2>
        <p>探索各种有趣的工具和资源</p>
      </section>

      <section className="features">
        <h3 className="section-title">功能模块</h3>
        <div className="card-grid">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className="nav-link"
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;