# 前端Dockerfile - 多阶段构建优化版
# 阶段1: 构建
FROM node:18-alpine as build

WORKDIR /app

# 先复制package.json和lock文件,利用Docker缓存层
COPY package.json package-lock.json* ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . ./

# 构建应用 (设置内存限制避免OOM)
ARG NODE_OPTIONS=--max_old_space_size=2048
ENV NODE_OPTIONS=$NODE_OPTIONS
RUN npm run build

# 阶段2: 生产环境
FROM nginx:alpine

# 复制构建产物到 /charmview 子目录
COPY --from=build /app/build /usr/share/nginx/html/charmview

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 创建健康检查页面
RUN echo "OK" > /usr/share/nginx/html/health

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
