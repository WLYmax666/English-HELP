# 英语学习助手 — CET-4/6 智能备考

一个面向大学生的英语学习 Web 应用，专注于**大学英语四级（CET-4）和六级（CET-6）词汇与听力训练**。采用卡片翻转记忆 + 语音合成 + 语音识别 三大核心交互，配合艾宾浩斯遗忘曲线数据库设计，帮助用户高效备考。

## 功能

### 📖 单词学习
- **翻转卡片** — 正面显示单词/音标，背面展示释义、词根记忆法、英文例句、电影原声例句
- **TTS 发音** — 点击喇叭按钮，浏览器原生语音合成朗读当前单词
- **语音跟读** — 内置 Web Speech Recognition，用户朗读后与标准拼写比对，给出"完美/接近/再试试"实时反馈
- **每日目标** — 默认每日 10 个单词，完成后显示「继续学习」入口，每次额外学习 5 个单词
- **学习记录** — 每次学习会话自动保存（认识/不认识数量），按日期分组展示，支持一键复习

### 🎧 电影听力精听
- **电影经典台词** — 精选《当幸福来敲门》《阿甘正传》《狮子王》等经典片段，每篇约 2 分钟
- **逐句揭示** — 听一句显示一句，未播放的句子完全隐藏，播放过的句子半透明可点击跳转
- **可拖拽进度滑块** — 自定义滑块支持鼠标拖拽和触摸滑动，实时预览时间，松手跳转至对应句子
- **倍速播放** — 0.5x / 0.75x / 1.0x / 1.25x / 1.5x
- **中英对照** — 一键切换显示/隐藏中文翻译
- **单词查询** — 选中文本弹出释义（含该篇电影生词表），可加入生词本
- **完成记录** — 自动或手动标记完成，历史记录按日期分组

### 🏠 首页仪表盘
- **进度环** — 环形进度展示今日学习完成度（单词 70% + 听力 30%）
- **连续打卡** — 展示连续学习天数
- **今日任务** — 单词目标（10 词）+ 听力任务（1 篇）+ 单词 Quiz 复习
- **继续学习** — 每日任务完成后，可继续额外学习（再学 5 词 / 再听一篇）
- **统计栏** — 学习天数 / 已背单词 / 听力练习 三栏统计

### 🎯 Quiz 单词复习
- **四选一** — 显示单词，从四个释义中选出正确项
- **自动批改** — 选对绿色高亮，选错红色提示并记录至错词本
- **错词本** — 答错的词自动加入错词本，在「我的」页面可查看详情（按错误日期分组）

### 📊 学习记录
- **单词 Tab** — 按日期分组展示已完成的学习会话，含认识/不认识统计、进度条、单词标签云，支持一键复习
- **听力 Tab** — 按日期分组展示已完成的精听记录，支持再次精听

### 👤 用户系统
- **注册/登录** — 用户名唯一，各用户数据独立存储
- **数据隔离** — 每个用户的学习记录、错词本存储在独立的 localStorage key 下
- **自动恢复** — 关闭页面后重新打开，自动恢复上次登录用户的进度

### 🗄️ 数据库（MySQL / PostgreSQL）
- 8 张核心表：用户、词库、学习进度（SM-2 算法）、听力材料、句子级结构化、每日打卡、学习目标、生词本
- CET-4 / CET-6 各 100 个词汇数据（含音标、词根记忆、电影例句）
- 音频字段仅存 URL 引用，不存储二进制文件

## 技术栈

| 层        | 技术                                    |
| --------- | --------------------------------------- |
| 框架      | React 19 + TypeScript 6                 |
| 构建      | Vite 8                                  |
| 样式      | Tailwind CSS 4（`@tailwindcss/vite`）  |
| 语音      | Web Speech API（SpeechSynthesis + SpeechRecognition） |
| 持久化    | localStorage（前端），MySQL/PostgreSQL（数据库） |
| 数据库    | 8 表关系型设计，SM-2 间隔重复算法        |

## 环境要求

- **Node.js 18+**（推荐使用最新的 LTS 版本）
- **npm**（随 Node.js 一起安装）
- **Chrome 浏览器**（推荐，语音识别功能仅 Chrome 支持）

> 如果 `npm install` 报错，请先执行 `node -v` 确认 Node.js 版本 ≥ 18。

## 快速开始

```bash
# 1. 进入项目目录
cd 英语学习助手

# 2. 安装依赖
npm install

# 3. 启动开发服务器（会自动打开浏览器）
npm run dev -- --open

# 4. 构建生产版本
npm run build

# 5. 预览构建结果
npm run preview
```

### 常见问题

| 问题 | 解决方法 |
| --- | --- |
| `npm install` 报错 | 更新 Node.js 到 18 以上版本 |
| 启动后浏览器无法访问 | 检查终端输出的端口号（默认 5173），访问对应地址 |
| 页面空白无内容 | 按 `Ctrl+Shift+R` 强制刷新，或 `Ctrl+Shift+Delete` 清除缓存 |
| 语音无法播放 | Chrome 浏览器需要允许页面使用麦克风和音频权限 |
| 端口被占用 | 关闭其他项目的开发服务器，或修改 `vite.config.ts` 中的 `port` 配置 |

## 项目结构

```
src/
├── main.tsx                 # 入口
├── App.tsx                  # 应用根组件：路由 + 全局状态 + localStorage 持久化
├── index.css                # Tailwind 配置 + 自定义主题 + 动画关键帧
├── types.ts                 # 共享 TypeScript 类型定义
├── data/
│   ├── wordBank.ts          # 55 个 CET-4/6 词汇（含音标/释义/词根/例句/电影例句）+ 选取工具函数
│   └── movieClips.ts        # 电影经典台词听力素材（含时间戳 + 生词表）
└── pages/
    ├── AuthPage.tsx          # 登录/注册页面
    ├── Home.tsx              # 首页：进度环、统计、任务列表、继续学习入口
    ├── WordLearning.tsx      # 单词学习：翻转卡片、TTS、语音识别、认识/不认识
    ├── ListeningPlayer.tsx   # 电影听力播放：逐句揭示、可拖拽滑块、倍速、单词查询
    ├── ListeningPage.tsx     # 听力历史记录
    ├── VocabPage.tsx         # 单词学习历史记录
    ├── QuizReview.tsx        # Quiz 单词复习（四选一）
    ├── WrongWordsPage.tsx    # 错词本详情（按日期分组）
    └── ProfilePage.tsx       # 个人中心：统计、错词本入口、退出登录

database/
├── schema.sql               # 核心表结构（8 表）
├── setup.sql                # 建库脚本
└── data/
    ├── cet4.sql              # CET-4 词汇数据（100 词）
    └── cet6.sql              # CET-6 词汇数据（100 词）
```

## 本地存储

前端使用 `localStorage` 持久化学习记录，数据按用户名隔离：

| Key                                        | 说明                     |
| ------------------------------------------ | ------------------------ |
| `english_app_users`                        | 用户列表                 |
| `english_app_current_user`                 | 当前登录用户             |
| `english_app_word_sessions_<username>`     | 单词学习会话记录         |
| `english_app_listening_sessions_<username>` | 听力完成记录             |
| `english_app_wrong_words_<username>`       | 错词本记录               |

## 数据库（可选）

项目附带完整的 MySQL/PostgreSQL 建表脚本和词汇数据。如需启用后端：

```bash
# 创建数据库
mysql -u root -p < database/setup.sql

# 建表
mysql -u root -p english_app < database/schema.sql

# 导入词汇数据
mysql -u root -p english_app < database/data/cet4.sql
mysql -u root -p english_app < database/data/cet6.sql
```

音频文件按约定路径存放：`/audio/cet4/<word>.mp3` / `/audio/cet6/<word>.mp3`。

## 浏览器兼容

- **语音合成（TTS）**：Chrome / Edge / Safari 全支持
- **语音识别**：仅 Chrome 支持 `webkitSpeechRecognition`
- 推荐使用 **Chrome** 获得完整体验
