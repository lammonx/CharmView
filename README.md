# CharmView

图片画廊前端项目

## 功能特性

- 支持美女图片、黑丝图片、风景图片、随机视频展示
- 多源 API 切换（自适应/PC端/手机端）
- 支持网格/瀑布流布局切换
- 图片点击放大预览
- 视频自动播放与循环播放
- Docker 容器化部署
- GitHub Pages 自动部署
- 健康检查

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
- GitHub Pages（GitHub Actions 自动部署）
- Docker + Nginx（可选）

## 本地开发

```bash
cd frontend
npm install
npm start
```

## GitHub Pages 部署（推荐）

项目已配置 GitHub Actions 自动部署，推送到 `main` 分支即可自动构建并发布到 GitHub Pages。

### 首次配置

1. 在 GitHub 仓库启用 Pages：**Settings → Pages → Build and deployment → Source → GitHub Actions**
2. 推送代码到 `main` 分支，自动触发构建与部署

部署完成后访问: https://lammonx.github.io/CharmView/

> 说明：路由采用 HashRouter，页面地址形如 `https://lammonx.github.io/CharmView/#/gallery`

## Docker 部署（可选）

> 已移除 `docker-compose.yml`，改用 `docker build` 直接构建镜像。

```bash
# 构建镜像
cd frontend
docker build -t charmview .

# 运行容器（需挂载 SSL 证书目录，否则 nginx 启动失败）
docker run -d \
  --name charmview \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  charmview
```

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

### 2026-08-29
- 移除 docker-compose.yml，改用 GitHub Actions 自动部署到 GitHub Pages
- 路由由 BrowserRouter 改为 HashRouter，适配静态托管
- 添加 package-lock.json 锁定依赖版本

### 2026-04-12
- 修复视频API参数问题（添加"系列"后缀）
- 移除失效的备用视频源
- 添加视频加载错误提示
- 优化Docker构建配置（资源限制、健康检查）
- 添加黑丝图片分类
- 优化Nginx配置（静态资源缓存、根路径重定向）