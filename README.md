# 思考随笔 - 个人博客网站

这是一个基于 Astro、React 和 TailwindCSS 构建的个人博客网站，旨在分享技术、设计和生活相关的内容。

## 特点

- 使用 Astro 框架构建，实现了高性能的静态站点生成
- 使用 React 组件实现交互功能
- 使用 TailwindCSS 和 shadcn/ui 构建美观的 UI
- 支持深色/浅色模式，默认跟随系统设置
- 完整的博客系统，支持 MDX 格式文章
- 响应式设计，适配各种设备
- 优雅的动画和微交互效果

## 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [React](https://reactjs.org/) - 用户界面库
- [TailwindCSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [MDX](https://mdxjs.com/) - Markdown + JSX

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
/
├── public/             # 静态资源
├── src/
│   ├── components/     # 组件
│   │   ├── blog/       # 博客相关组件
│   │   ├── home/       # 首页组件
│   │   ├── layout/     # 布局组件
│   │   ├── shared/     # 共享组件
│   │   └── ui/         # UI组件
│   ├── content/        # 内容集合
│   │   └── blog/       # 博客文章(MDX)
│   ├── layouts/        # 页面布局
│   ├── lib/            # 工具函数
│   ├── pages/          # 页面
│   └── styles/         # 样式
└── package.json        # 项目配置
```

## 许可证

MIT
