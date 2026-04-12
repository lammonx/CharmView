import React, { useState } from 'react';
import OnlineGallery from '../components/gallery/OnlineGallery';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('beauty');

  const tabs = [
    { key: 'beauty', label: '美女图片' },
    { key: 'scenery', label: '风景图片' },
    { key: 'video', label: '随机视频' },
  ];

  return (
    <div className="gallery-page">
      <nav className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <OnlineGallery type={activeTab} />
    </div>
  );
};

export default Gallery;