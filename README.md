# CharmView

图片画廊前端项目

## 功能特性

- 支持美女图片、黑丝图片、风景图片、随机视频展示
- 多源 API 切换（自适应/PC端/手机端）
- 支持网格/瀑布流布局切换
- 图片点击放大预览
- 视频自动播放与循环播放
- Docker 容器化部署
- 资源限制与健康检查

## 视频源支持

系列类视频（需添加"系列"后缀）：
- JK系列、帅哥系列、白丝系列、女大系列
- 慢摇系列、COS系列、黑丝系列、女高系列
- 热舞系列、蛇姐系列、穿搭系列、变装系列、汉服系列

非系列类视频：
- 双倍快乐、对脸自拍、完美身材

## 技术栈

- React 18
- Create React App
- Docker + Nginx

## 本地开发

```bash
cd frontend
npm install
npm start
```

## Docker 部署

### 快速启动

```bash
# 构建并启动
docker-compose up -d --build

# 查看日志
docker-compose logs -f frontend

# 停止服务
docker-compose down
```

### 部署配置

- **内存限制**: 512MB 上限，256MB 预留
- **CPU限制**: 0.5核上限，0.25核预留
- **健康检查**: 每30秒检查一次，3次失败标记不健康
- **端口映射**: 80:80

访问地址: http://localhost/charmview/

## 项目结构

```
frontend/
├── src/
│   ├── index.js        # 入口文件
│   ├── App.jsx         # 主组件
│   ├── components/     # 组件目录
│   │   └── gallery/
│   │       └── OnlineGallery.jsx  # 图画廊组件
│   ├── pages/          # 页面组件
│   │   ├── Gallery.jsx # 画廊页面
│   │   └── Home.jsx    # 主页
│   ├── layouts/        # 布局组件
│   └── styles/         # 样式文件
├── public/             # 静态资源
├── Dockerfile           # Docker 构建配置（多阶段构建）
├── nginx.conf          # Nginx 配置
└── .dockerignore       # Docker 忽略文件
```

## 性能优化

1. **Docker多阶段构建**: 构建产物体积小（~54KB gzip）
2. **Docker缓存层**: package.json独立层，加速构建
3. **Nginx缓存**: 静态资源缓存7天
4. **资源限制**: 防止容器占用过多系统资源
5. **健康检查**: 及时发现容器异常

## 更新日志

### 2026-04-12
- 修复视频API参数问题（添加"系列"后缀）
- 移除失效的备用视频源
- 添加视频加载错误提示
- 优化Docker构建配置（资源限制、健康检查）
- 添加黑丝图片分类
- 优化Nginx配置（静态资源缓存、根路径重定向）