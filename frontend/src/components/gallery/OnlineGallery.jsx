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
  heisi: {
    title: '黑丝图片',
    apis: [
      { name: '自适应', url: 'https://api.suyanw.cn/api/hs.php' },
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
      { name: 'JK系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: 'JK系列' },
      { name: '帅哥系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '帅哥系列' },
      { name: '白丝系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '白丝系列' },
      { name: '女大系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '女大系列' },
      { name: '慢摇系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '慢摇系列' },
      { name: 'COS系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: 'COS系列' },
      { name: '黑丝系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '黑丝系列' },
      { name: '女高系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '女高系列' },
      { name: '热舞系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '热舞系列' },
      { name: '蛇姐系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '蛇姐系列' },
      { name: '穿搭系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '穿搭系列' },
      { name: '变装系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '变装系列' },
      { name: '汉服系列', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '汉服系列' },
      { name: '双倍快乐', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '双倍快乐' },
      { name: '对脸自拍', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '对脸自拍' },
      { name: '完美身材', url: 'https://api.suyanw.cn/api/jhsp.php', msg: '完美身材' },
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
  const [videoError, setVideoError] = useState(null);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    setVideoError(null);
  }, []);

  const currentApi = config.apis[selectedApi];

  const handleVideoError = useCallback((e) => {
    console.error('视频加载失败:', e);
    setVideoError('视频加载失败，请点击刷新按钮重试或切换其他来源');
  }, []);

  const renderContent = () => {
    if (type === 'video') {
      return (
        <div className="video-container">
          {videoError && (
            <div className="video-error">
              <p>⚠️ {videoError}</p>
            </div>
          )}
          <video
            key={refreshKey}
            src={currentApi.msg 
              ? `${currentApi.url}?msg=${currentApi.msg}&t=${refreshKey}`
              : `${currentApi.url}?t=${refreshKey}`
            }
            controls
            autoPlay
            loop
            className="video-player"
            onError={handleVideoError}
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
                setVideoError(null);
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