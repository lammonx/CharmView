# CharmView

图片画廊前端项目

## 功能特性

- 支持美女图片、风景图片、随机视频展示
- 多源 API 切换（自适应/PC端/手机端）
- 支持网格/瀑布流布局切换
- 图片点击放大预览
- Docker 容器化部署

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

```bash
docker-compose up -d --build
```

访问地址: http://localhost/charmview/

## 项目结构

```
frontend/
├── src/
│   ├── index.js        # 入口文件
│   ├── App.jsx         # 主组件
│   ├── components/     # 组件目录
│   ├── pages/          # 页面组件
│   ├── layouts/        # 布局组件
│   └── styles/         # 样式文件
├── public/             # 静态资源
├── Dockerfile          # Docker 构建配置
└── nginx.conf          # Nginx 配置
```