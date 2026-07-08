-- ============================================================================
-- 英语学习助手 · 数据库核心表结构 (MySQL / PostgreSQL 兼容)
-- 支撑功能：打卡提醒、单词记忆(艾宾浩斯)、听力精听
-- ============================================================================

-- --------------------------------------------------------------------------
-- 1. 用户表
-- --------------------------------------------------------------------------
CREATE TABLE users (
    user_id         INT PRIMARY KEY AUTO_INCREMENT,
    username        VARCHAR(50)  NOT NULL UNIQUE,
    email           VARCHAR(100) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    avatar_url      VARCHAR(255),
    current_streak  INT          DEFAULT 0 COMMENT '当前连续打卡天数',
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) COMMENT '用户基本信息与账号数据';

-- --------------------------------------------------------------------------
-- 2. 单词库表
-- 存储所有单词数据，所有用户共享
-- --------------------------------------------------------------------------
CREATE TABLE vocabulary (
    word_id          INT PRIMARY KEY AUTO_INCREMENT,
    word             VARCHAR(100)   NOT NULL,
    phonetic         VARCHAR(100)   COMMENT '音标，如 /æmˈbɪɡjuəs/',
    definition       TEXT           NOT NULL COMMENT '中文释义',
    example_sentence TEXT           COMMENT '英文例句',
    audio_url        VARCHAR(255)   COMMENT '发音音频链接',
    difficulty_level TINYINT        COMMENT '难度等级 1-5',

    -- 词根记忆法与电影例句（对应翻转卡片背面内容）
    root_memory      TEXT           COMMENT '词根词缀记忆法',
    movie_example    TEXT           COMMENT '电影原声例句（英文）',
    movie_example_cn TEXT           COMMENT '电影例句中文翻译'
) COMMENT '单词库，所有用户共享';

-- --------------------------------------------------------------------------
-- 3. 用户单词学习记录表（核心表）
-- 记录每个用户对每个单词的掌握进度，基于 SM-2 算法驱动复习间隔
-- --------------------------------------------------------------------------
CREATE TABLE user_word_progress (
    id               INT PRIMARY KEY AUTO_INCREMENT,
    user_id          INT          NOT NULL,
    word_id          INT          NOT NULL,
    next_review_date DATE         NOT NULL COMMENT '下次复习日期',
    review_interval  INT          DEFAULT 1   COMMENT '当前复习间隔（天）',
    ease_factor      DECIMAL(3,2) DEFAULT 2.50 COMMENT '难度系数 1.3-3.0，用于 SM-2 动态调整',
    last_reviewed_at TIMESTAMP,
    familiarity      TINYINT      DEFAULT 0   COMMENT '熟悉度 0-5（0=从未见过, 5=完全掌握）',

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (word_id) REFERENCES vocabulary(word_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_word (user_id, word_id)
) COMMENT '核心表：用户-单词学习进度，驱动艾宾浩斯复习队列';

-- --------------------------------------------------------------------------
-- 4. 听力材料表
-- --------------------------------------------------------------------------
CREATE TABLE listening_materials (
    material_id      INT PRIMARY KEY AUTO_INCREMENT,
    title            VARCHAR(200) NOT NULL,
    audio_url        VARCHAR(255) NOT NULL,
    transcript       TEXT         COMMENT '完整原文（纯文本备份）',
    duration_seconds INT          COMMENT '音频总时长（秒）',
    category         VARCHAR(50)  COMMENT '分类：TED / News / CET-4 / CET-6 / IELTS',
    difficulty_level TINYINT      COMMENT '难度等级 1-5',
    cover_url        VARCHAR(255) COMMENT '封面图链接',
    speaker          VARCHAR(100) COMMENT '演讲者/播讲人',
    created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) COMMENT '听力素材库';

-- --------------------------------------------------------------------------
-- 5. 听力句子表
-- 逐句结构化，支撑 高亮跟随 + 点击跳转 核心交互
-- --------------------------------------------------------------------------
CREATE TABLE listening_sentences (
    sentence_id      INT PRIMARY KEY AUTO_INCREMENT,
    material_id      INT          NOT NULL,
    sentence_order   INT          NOT NULL COMMENT '句子序号（从 0 开始）',
    english_text     TEXT         NOT NULL,
    chinese_text     TEXT,
    start_time       DECIMAL(6,2) COMMENT '该句起始秒数',
    end_time         DECIMAL(6,2) COMMENT '该句结束秒数',

    FOREIGN KEY (material_id) REFERENCES listening_materials(material_id) ON DELETE CASCADE,
    UNIQUE KEY unique_sentence (material_id, sentence_order)
) COMMENT '听力句子级别数据，驱动逐句高亮与点击跳转';

-- --------------------------------------------------------------------------
-- 6. 每日打卡记录表
-- --------------------------------------------------------------------------
CREATE TABLE daily_checkins (
    checkin_id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id             INT  NOT NULL,
    checkin_date        DATE NOT NULL,
    study_minutes       INT  DEFAULT 0 COMMENT '当日学习总时长（分钟）',
    words_completed     INT  DEFAULT 0 COMMENT '当日完成单词数',
    listening_completed INT  DEFAULT 0 COMMENT '当日完成听力篇数',
    is_completed        BOOLEAN DEFAULT FALSE COMMENT '是否达成全部今日目标',

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_date (user_id, checkin_date)
) COMMENT '每日打卡记录，支撑打卡日历与连续天数统计';

-- --------------------------------------------------------------------------
-- 7. 用户学习目标配置表
-- 允许用户自定义每日任务量，替代硬编码
-- --------------------------------------------------------------------------
CREATE TABLE user_goals (
    user_id                INT PRIMARY KEY,
    daily_word_goal        INT  DEFAULT 20  COMMENT '每日单词目标',
    daily_listening_goal   INT  DEFAULT 1   COMMENT '每日听力目标',
    daily_minutes_goal     INT  DEFAULT 30  COMMENT '每日学习时长目标（分钟）',
    remind_time            TIME DEFAULT '20:00' COMMENT '每日提醒时间',
    enable_push            BOOLEAN DEFAULT TRUE COMMENT '是否开启推送提醒',

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) COMMENT '用户自定义每日学习目标配置';

-- --------------------------------------------------------------------------
-- 8. 生词本表
-- 听力 / 阅读过程中手动加入的生词，独立于 vocabulary 主词库
-- --------------------------------------------------------------------------
CREATE TABLE user_vocab_book (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT      NOT NULL,
    word        VARCHAR(100) NOT NULL,
    definition  TEXT,
    source      VARCHAR(50)  COMMENT '来源：listening / reading / manual',
    source_id   INT          COMMENT '来源素材 ID（如 listening_materials.material_id）',
    added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_word (user_id, word)
) COMMENT '用户生词本，听力/阅读中收藏的生词';


-- ============================================================================
-- 常用查询示例
-- ============================================================================

-- 1. 查询用户今日待复习单词（含逾期未复习的）
--    SELECT v.*, uwp.ease_factor, uwp.review_interval
--    FROM user_word_progress uwp
--    JOIN vocabulary v ON uwp.word_id = v.word_id
--    WHERE uwp.user_id = ?
--      AND uwp.next_review_date <= CURDATE()
--      AND uwp.word_id NOT IN (
--          SELECT word_id FROM user_word_progress
--          WHERE user_id = ? AND DATE(last_reviewed_at) = CURDATE()
--      )
--    ORDER BY uwp.next_review_date ASC;

-- 2. 统计用户连续打卡天数
--    SELECT current_streak FROM users WHERE user_id = ?;

-- 3. 查询今日打卡状态
--    SELECT * FROM daily_checkins
--    WHERE user_id = ? AND checkin_date = CURDATE();

-- 4. 获取某篇听力的逐句文本（驱动前端高亮）
--    SELECT * FROM listening_sentences
--    WHERE material_id = ?
--    ORDER BY sentence_order ASC;

-- 5. 查询用户首页进度环数据
--    SELECT
--      COALESCE(dc.words_completed, 0) AS words_completed,
--      ug.daily_word_goal,
--      COALESCE(dc.listening_completed, 0) AS listening_completed,
--      ug.daily_listening_goal
--    FROM user_goals ug
--    LEFT JOIN daily_checkins dc
--      ON dc.user_id = ug.user_id AND dc.checkin_date = CURDATE()
--    WHERE ug.user_id = ?;
