-- ============================================================================
-- 英语学习助手 · 数据库完整部署脚本
-- 按顺序执行即可完成建库、建表、导入数据
-- ============================================================================

-- 第一步：创建数据库（PostgreSQL 使用 CREATE SCHEMA）
-- MySQL:
CREATE DATABASE IF NOT EXISTS english_app DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE english_app;

-- 第二步：创建表结构
SOURCE database/schema.sql;

-- 第三步：导入四级词汇（100 词）
SOURCE database/data/cet4.sql;

-- 第四步：导入六级词汇（200 词）
SOURCE database/data/cet6.sql;

-- 第五步：验证数据
SELECT 'Vocabulary Count' AS info, COUNT(*) AS total FROM vocabulary
UNION ALL
SELECT 'CET-4 Count', COUNT(*) FROM vocabulary WHERE difficulty_level = 4
UNION ALL
SELECT 'CET-6 Count', COUNT(*) FROM vocabulary WHERE difficulty_level = 6;
