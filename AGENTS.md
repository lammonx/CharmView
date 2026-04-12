# AGENTS.md - AI 编码助手指南

## 通用规范

- 使用中文进行思考过程展示和对话
- 所有注释和文档字符串使用中文
- 代码变量名、函数名使用英文

## 项目概述

CharmView - 图片画廊前端项目

- **技术栈**: React 18 + Create React App
- **部署**: Docker + Nginx

## 构建与运行命令

### 前端 (React)

```bash
# 开发环境启动
cd frontend
npm start

# 构建生产版本
npm run build

# 运行测试
npm test

# 运行单个测试文件
npm test -- --testPathPattern=filename.test.js

# 运行特定测试
npm test -- --testNamePattern="test name"
```

### Docker 部署

```bash
# 启动服务
docker-compose up -d

# 重新构建并启动
docker-compose up -d --build

# 查看日志
docker-compose logs -f frontend

# 停止服务
docker-compose down
```

## 代码风格指南

### React 前端

#### 组件结构
```jsx
// 导入顺序：React -> 第三方库 -> 本地组件 -> 样式
import React, { useState, useCallback } from 'react';

// 组件定义使用函数式组件
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  // 使用 useCallback 优化回调函数
  const handleClick = useCallback(() => {
    // 处理逻辑
  }, [dependencies]);
  
  return (
    <div className="component-name">
      {/* JSX 内容 */}
    </div>
  );
};

export default ComponentName;
```

#### Hook 使用
```jsx
// useState
const [activeTab, setActiveTab] = useState('beauty');

// useCallback - 用于事件处理函数
const handleRefresh = useCallback(() => {
  setRefreshKey(prev => prev + 1);
}, []);

// 状态更新使用函数式更新
setState(prev => prev + 1);
```

#### 事件处理
```jsx
// 事件处理函数命名：handle + 事件名
const handleClick = () => {
  // 处理逻辑
};

// JSX 中直接传递函数
<button onClick={handleClick}>按钮</button>

// 或使用箭头函数
<button onClick={() => setActiveTab('new')}>按钮</button>
```

#### 条件渲染
```jsx
// 使用三元运算符
{condition ? <ComponentA /> : <ComponentB />}

// 使用逻辑与运算符
{condition && <Component />}

// 多个条件使用短路评估
{type !== 'video' && (
  <div className="controls">...</div>
)}
```

#### 列表渲染
```jsx
// 使用 map 渲染列表，必须提供 key
{items.map((item, index) => (
  <div key={item.id || index}>
    {item.name}
  </div>
))}
```

#### API 配置
```jsx
// 常量配置对象放在组件外部
const API_CONFIG = {
  beauty: {
    title: '美女图片',
    apis: [
      { name: '自适应', url: 'https://example.com/api.php' },
    ],
  },
};

// 在组件内使用
const config = API_CONFIG[type];
```

### 文件命名约定

```
frontend/
├── src/
│   ├── index.js        # 入口文件
│   ├── App.jsx         # 主组件
│   ├── components/     # 组件目录
│   │   ├── ComponentName.jsx
│   │   └── ComponentName.css
│   └── pages/          # 页面组件
```

### React 配置
```json
// package.json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  }
}
```

### 常见错误处理模式

```jsx
// React 错误边界处理
const [error, setError] = useState(null);

try {
  // 危险操作
} catch (err) {
  setError(err.message);
}

if (error) {
  return <div>错误: {error}</div>;
}
```

### Git 提交信息

```
feat: 添加新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 测试相关
chore: 构建/工具相关
```

### 开发注意事项

1. **前端开发**:
   - 使用函数式组件和 Hooks
   - 组件保持简单，单一职责
   - 使用 `useCallback` 优化回调函数
   - 图片使用 `loading="lazy"` 延迟加载

2. **部署配置**:
   - 应用部署在 `/charmview` 子路径
   - Nginx 配置了 SPA 路由支持
   - 静态资源启用缓存优化