# 前端Dockerfile - 多阶段构建
# 阶段1: 构建
FROM node:18-alpine as build

WORKDIR /app

# 复制package.json
COPY package.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . ./

# 构建应用
RUN npm run build

# 阶段2: 生产环境
FROM nginx:alpine

# 复制构建产物到 /charmview 子目录
COPY --from=build /app/build /usr/share/nginx/html/charmview

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
