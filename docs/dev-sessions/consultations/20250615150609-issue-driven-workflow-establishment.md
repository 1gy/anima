# 開発セッション: Issue駆動ワークフロー確立

**日時**: 2025-06-15
**時間**: 15:06:09 (JST)
**参加者**: User, Claude Code

## 概要
GitHub Issue Templatesの導入からdev-sessionファイル構造化まで、包括的なIssue駆動開発ワークフローを確立した。相談セッションと実装セッションの明確な分離、ファイル管理の体系化を実現。

## 重要な決定事項

### Issue駆動開発の統一原則
- **全実装 = Issue必須**: コード・設定・ドキュメントの変更は全てIssue起点
- **相談のみ = Issue不要**: 知識共有・質問・レビューのみのセッション
- **PR自動リンク**: 「Closes #123」でIssue自動クローズ

### Issue Template設計
- **3つのテンプレート**: Feature, Bug, Task
- **Feature/Enhancement統合**: 新機能と既存機能拡張を統合
- **Task統合**: Setup/Investigation/Documentationを集約
- **汎用的記載**: Claude特化記載を削除し人間も使用可能に

### dev-session構造化
- **ディレクトリ分離**: issues/ と consultations/ で明確に分離
- **Issue駆動**: `issues/{number}-{description}/YYYYMMDDhhmmss-{topic}.md`
- **相談**: `consultations/YYYYMMDDhhmmss-{topic}.md`
- **命名規則統一**: YYYYMMDDhhmmss（既存ルール維持）

### Branch命名規則
- **シンプル維持**: Issue番号を含めず `feature/description` 
- **PR/コミットで関連付け**: GitHub自動リンク機能を活用

## 会話の流れ

### 1. 開発フロー検討開始
**User**: 都度セッション立ち上げからGitHub Issue管理への移行を検討

**Claude**: Issue駆動と非Issue駆動の作業分類、Issue Template設計を提案

### 2. 作業境界の明確化
**User**: Issue駆動作業とそうでない作業の深堀り

**Claude**: 「成果物が生まれる作業」vs「知識を得る作業」の境界線を整理

### 3. Issue Template作成
**User**: Issue Templateから開始

**Claude**: 6種類のテンプレート提案→3種類に統合（Feature/Bug/Task）

### 4. Branch命名・PR Template
**User**: Branch名にIssue番号は一般的か？

**Claude**: シンプルな命名+PR自動リンクがより一般的と説明、PR Template作成

### 5. development-workflow.md更新
**Claude**: Issue駆動ワークフローを既存ワークフローに統合

### 6. dev-session構造検討
**User**: dev-sessionとIssueの対応関係を整理したい

**Claude**: フォルダ構造化案を提案

### 7. ファイル命名詳細化
**User**: 日付だけだとソート不安定、時間も含めたい

**Claude**: YYYYMMDDhhmmss（既存ルール）の維持を提案

### 8. 構造実装・移行
**User**: フォルダ構造化の実装依頼

**Claude**: 既存9ファイルをconsultationsに移行、新構造ドキュメント更新

## 作成・変更されたファイル

### 新規作成
- `.github/ISSUE_TEMPLATE/feature.yml` - Feature/Enhancement統合テンプレート
- `.github/ISSUE_TEMPLATE/bug.yml` - Bug修正テンプレート
- `.github/ISSUE_TEMPLATE/task.yml` - Task（Setup/Investigation等）テンプレート
- `.github/pull_request_template.md` - Issue自動リンク機能付きPRテンプレート

### 更新
- `docs/development-workflow.md` - Issue駆動ワークフロー統合
- `docs/dev-session-guidelines.md` - 新ファイル構造・セッション管理フロー

### ファイル移行
- 既存dev-sessionファイル9個をconsultations/に移行
- 新しいissues/ディレクトリ作成

## 次のステップ
- 実際のIssue作成でテンプレートの有効性検証
- Issue駆動セッションの実運用開始
- 新しいワークフローの習熟と必要に応じた調整

## 技術メモ

### GitHub機能活用
- Issue Templates（YAML form形式）
- PR自動リンク（Closes/Fixes/Resolves #123）
- 自動ラベル付与機能

### ワークフロー統合ポイント
- セッション開始時のタイプ判断フロー
- 相談→実装発展時の切り替え手順
- Issue受け入れ条件とセッション完了条件の対応

### ファイル管理効率化
- Issue中心の情報集約（README.md）
- 時系列保証（YYYYMMDDhhmmss）
- 検索性向上（ディレクトリ分離）

## PR情報
**PR #5**: https://github.com/1gy/anima/pull/5
- GitHub Issue templates and Issue-driven workflow implementation
- dev-session file structure reorganization
- Comprehensive workflow documentation updates