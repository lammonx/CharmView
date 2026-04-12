import React, { useState, useCallback } from 'react';

const API_CONFIG = {
  beauty: {
    title: '美女图片',
    apis: [
      { name: '自适应', url: 'https://pic.ltywl.top/mn/api.php' },
      { name: 'PC端', url: 'https://pic.ltywl.top/mn/pc.php' },
      { name: '手机端', url: 'https://pic.ltywl.top/mn/pe.php' },
    ],
  },
  scenery: {
    title: '风景图片',
    apis: [
      { name: '自适应', url: 'https://pic.ltywl.top/fj/api.php' },
      { name: 'PC端', url: 'https://pic.ltywl.top/fj/pc.php' },
      { name: '手机端', url: 'https://pic.ltywl.top/fj/pe.php' },
    ],
  },
  video: {
    title: '随机视频',
    apis: [
      { name: '热门视频', url: 'https://dh.lt6.ltd/xjj/video.php' },
    ],
  },
};

const RefreshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

const OnlineGallery = ({ type }) => {
  const config = API_CONFIG[type];
  const [selectedApi, setSelectedApi] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [gridSize, setGridSize] = useState(type === 'video' ? 1 : 5);
  const [viewMode, setViewMode] = useState('grid');
  const [modalImage, setModalImage] = useState(null);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const currentApi = config.apis[selectedApi];

  const renderContent = () => {
    if (type === 'video') {
      return (
        <div className="video-container">
          <video
            key={refreshKey}
            src={`${currentApi.url}?t=${refreshKey}`}
            controls
            autoPlay
            loop
            className="video-player"
          />
        </div>
      );
    }

    const images = Array.from({ length: gridSize }, (_, i) => {
      const imageUrl = `${currentApi.url}?t=${refreshKey}-${i}`;
      return (
        <div key={`${refreshKey}-${i}`} className="image-card">
          <img
            src={imageUrl}
            alt={`${config.title} ${i + 1}`}
            loading="lazy"
            onClick={() => setModalImage({ url: imageUrl, index: i })}
          />
        </div>
      );
    });

    return (
      <div className={`gallery-grid ${viewMode}`}>
        {images}
      </div>
    );
  };

  return (
    <div className="online-gallery">
      <div className="gallery-controls">
        <div className="api-selector">
          <span className="label">来源：</span>
          {config.apis.map((api, index) => (
            <button
              key={index}
              className={`api-btn ${selectedApi === index ? 'active' : ''}`}
              onClick={() => {
                setSelectedApi(index);
                setRefreshKey(prev => prev + 1);
              }}
            >
              {api.name}
            </button>
          ))}
        </div>

        {type !== 'video' && (
          <div className="size-selector">
            <span className="label">数量：</span>
            {[5, 10, 15, 20].map(size => (
              <button
                key={size}
                className={`size-btn ${gridSize === size ? 'active' : ''}`}
                onClick={() => setGridSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {type !== 'video' && (
          <div className="view-selector">
            <span className="label">布局：</span>
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              网格
            </button>
            <button
              className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
              onClick={() => setViewMode('masonry')}
            >
              瀑布流
            </button>
          </div>
        )}

        <button className="refresh-btn" onClick={handleRefresh} title="刷新">
          <RefreshIcon />
        </button>
      </div>

      {renderContent()}

      {type !== 'video' && (
        <div className="gallery-actions">
          <button className="load-more" onClick={handleRefresh}>
            加载更多
          </button>
        </div>
      )}

      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <span className="modal-close" onClick={() => setModalImage(null)}>&times;</span>
          <img
            className="modal-content"
            src={modalImage.url}
            alt="Full size"
          />
        </div>
      )}
    </div>
  );
};

export default OnlineGallery;