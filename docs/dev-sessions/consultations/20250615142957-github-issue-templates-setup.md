# 開発セッション: GitHub Issue Templates設定

**日時**: 2025-06-15
**時間**: 14:29:57 (JST)
**参加者**: User, Claude Code

## 概要
GitHub Issue Templatesを導入し、Issue駆動開発フローを確立した。相談セッションと実装セッションを明確に分離し、全てのPRをIssueに紐づける仕組みを構築。

## 重要な決定事項

### Issue管理の対象
- **Issue管理する**: 実装・修正・環境構築（成果物が生まれる作業）
- **Issue管理しない**: 技術相談・コード質問（知識を得る作業）
- **統一原則**: 全実装はIssue必須、相談のみはIssue不要

### Issue Template設計
- **Feature/Enhancement統合**: 新機能と既存機能拡張を一つのテンプレートに統合
- **3つのテンプレート**: Feature, Bug, Task（Setup/Investigation/Documentationを統合）
- **Claude特化記載の削除**: 人間も使用するため汎用的な記載に変更

### Branch命名規則
- **Issue番号を含めない**: 一般的なパターンに従い、シンプルな命名を維持
- **PR/コミットで関連付け**: 「Closes #123」でIssue自動リンク

## 会話の流れ

### 1. 開発フロー課題の整理
**User**: Issue駆動の作業とそうでない作業があるので深堀りしたい

**Claude**: 作業タイプを分析。計画的作業（Issue駆動適）vs 対応的作業（Issue管理低）vs 探索的作業など分類を提示

### 2. Issue管理境界の明確化
**User**: ほとんどIssue管理で良い。Issue不要は技術相談・コード質問

**Claude**: 「成果物が生まれる作業」vs「知識を得る・相談する作業」の境界線が明確と理解

### 3. 統合フロー設計
**User**: 相談から実装になったらIssue作成、小さな修正でもIssue管理、探索で大きな変更必要ならIssue作成

**Claude**: 「全てのPRはIssueに紐づける」統一原則を提案

### 4. Issue Template作成
**User**: Issue Templateから始める

**Claude**: Feature, Enhancement, Bug, Setup, Documentation, Investigationの6種類を提案

### 5. テンプレート統合・簡素化
**User**: FeatureとEnhancementを統合したい

**Claude**: 統合のメリット（判断迷い削減、一貫性）を説明し統合実施

**User**: Documentationはコードとセットなので不要、InvestigationやSetupはTaskにまとめる

**Claude**: OSSの一般的パターン（Feature/Bug/Task）を参考に3つのテンプレートに集約

### 6. Branch命名規則検討
**User**: ブランチ名にissue番号を入れるのは一般的か？

**Claude**: 賛否両論あるが、シンプルな命名+PR/コミットでの関連付けがより一般的と説明

### 7. PR Template・Workflow更新
**Claude**: PR Template作成（Issue自動リンク機能付き）
**Claude**: development-workflow.md更新（Issue駆動と相談セッションの分離、具体的手順追加）

## 作成・変更されたファイル

### 新規作成
- `.github/ISSUE_TEMPLATE/feature.yml` - 新機能・機能拡張テンプレート
- `.github/ISSUE_TEMPLATE/bug.yml` - バグ修正テンプレート  
- `.github/ISSUE_TEMPLATE/task.yml` - 開発タスクテンプレート
- `.github/pull_request_template.md` - PR作成テンプレート

### 更新
- `docs/development-workflow.md` - Issue駆動ワークフロー追加

## 次のステップ
- 実際のIssue作成でテンプレートの有効性を検証
- ワークフローの実運用で必要に応じて調整
- GitHub Actionsでの自動化検討（ラベル付け等）

## 技術メモ

### Issue Template Features
- YAML形式で構造化されたフォーム
- 必須項目・選択肢・プレースホルダー設定
- 自動ラベル付与機能

### PR Auto-linking
- 「Closes #123」「Fixes #456」「Resolves #789」でIssue自動クローズ
- コミットメッセージの#123でIssue参照
- PR TemplateでIssue番号記載欄を強制

### Workflow Integration
- Session Start時のタイプ判断フロー
- Issue駆動セッションと相談セッションの明確な分離
- Before Session Endチェックリストの更新