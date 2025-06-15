# Development Workflow

## Overview

Claude Codeとの開発セッションにおける標準的なワークフローを定義する。

## Git Branch Strategy

### Branch Types
- **main**: プロダクション用ブランチ（常にデプロイ可能状態）
- **feature/***: 機能開発用ブランチ（関連ドキュメントも含む）
- **fix/***: バグ修正用ブランチ
- **docs/***: 独立したドキュメント更新用ブランチ

### Branch Naming Convention
```
feature/anime-comparison       # 機能開発
feature/tier-list-ui          # UI機能
fix/api-error-handling        # バグ修正
docs/workflow-update          # 独立したドキュメント更新
```

### Development Flow with Branches
1. **ブランチ作成**: `git checkout -b feature/feature-name`
2. **開発・コミット**: 機能実装とドキュメント更新を同じブランチで
3. **プルリクエスト作成**: GitHub上でPR作成
4. **レビュー・マージ**: mainブランチにマージ後、ブランチ削除

### Documentation Strategy
- **機能関連ドキュメント**: 同じfeatureブランチに含める
  - API仕様書、機能説明、README更新など
- **独立したドキュメント**: 別途docs/*ブランチで管理
  - 開発ルール変更、アーキテクチャ見直しなど

## Workflow Steps

### 1. Session Start
- `TZ=Asia/Tokyo date +"%Y-%m-%d"`で現在日付を確認
- セッションのトピック・目標を明確化

#### セッションタイプの判断
```
□ 今日何をしますか？
  ├─ 相談・質問のみ → Issue不要セッション
  └─ 何かを作る・変更する → Issue駆動セッション
      ├─ 既存Issue → Issue番号確認・ブランチ作成
      └─ 新規作業 → Issue作成・ブランチ作成
```

#### Issue駆動セッションの開始手順
1. **Issue確認/作成**: GitHub Issue Templateを使用
   - 🚀 Feature: 新機能・機能拡張
   - ⚠️ Bug: バグ修正  
   - ⚙️ Task: 開発タスク・環境構築・調査
2. **ブランチ作成**: `git checkout -b {type}/{description}`
3. **作業開始**: Issue内容に従って実装

### 2. Development Phase
- **User**: 依頼内容・要件を明確に伝達
- **Claude**: 要件確認、技術選択肢の提示、実装方針の相談
- **User**: 方針への合意・修正指示
- **Claude**: コード実装・修正
- **User**: 実装内容の確認・承認

### 3. Commit Phase
- **Claude**: `git status`と`git diff`で全ての変更を確認
  - 自分が作成/修正したファイル
  - ユーザーが独自に変更した可能性のあるファイル
- **Claude**: 変更内容をユーザーに報告・確認
- **Claude**: 適切なコミット単位でcommit実行
- **User**: コミット内容の確認・承認
- 必要に応じて追加の修正・コミット

### 4. Session Documentation
- **Claude**: 会話ログをdev-sessionファイルに記録
- **User**: セッション記録内容の確認
- **Claude**: セッション記録をコミット

### 5. Session End

#### Issue駆動セッションの完了手順
1. **PR作成**: GitHub PR Templateを使用
   - Issue番号を「Closes #123」形式で記載
   - 変更内容・テスト結果を詳細に記載
   - 適切なラベルを設定
2. **Issue自動クローズ**: PRマージ時にIssueが自動でクローズ
3. **ブランチ削除**: マージ後にfeatureブランチを削除

#### 相談セッションの完了
- 次回への引き継ぎ事項の確認
- セッション完了の確認

## Commit Guidelines

### Code Commits
- 意味のある最小単位でコミット
- Conventional Commits形式を使用
- ビルド・lint・テストが通る状態を保持

### Session Record Commits
- セッション終了時に必ず実行
- コミットメッセージ例:
  ```
  docs: add dev session record for [topic]
  
  Record development session covering [brief description]
  - Key decisions made
  - Implementation details
  - Next steps identified
  ```

## Communication Rules

### User Responsibilities
- **明確な要件伝達**: 何を実現したいかを具体的に説明
- **合意の明示**: 提案された方針に対する承認・修正を明確化
- **完了確認**: 実装内容やコミットの最終承認

### Claude Responsibilities
- **要件確認**: 不明な点は必ず質問
- **選択肢提示**: 技術的な選択肢と理由を説明
- **段階的実装**: 大きな変更は段階的に進める
- **全変更確認**: コミット前に`git status`/`git diff`で全ファイル変更を確認
- **変更報告**: ユーザーの独自変更を含めて全変更内容を報告
- **記録作成**: セッション内容を正確に記録

## Session Types

### 1. Feature Implementation
- 新機能の設計・実装
- 既存機能の拡張・修正

### 2. Refactoring
- コード品質改善
- アーキテクチャ変更

### 3. Setup/Configuration
- 開発環境構築
- ツール・ライブラリ追加

### 4. Bug Fix
- 問題の調査・修正
- テストケース追加

### 5. Documentation
- ドキュメント作成・更新
- API仕様書作成

## Quality Assurance

### Before Commit
- [ ] `git status`で全変更ファイルを確認
- [ ] `git diff`で全変更内容を確認
- [ ] ユーザーの独自変更があれば内容を確認・報告
- [ ] コードがビルドできる
- [ ] Linting/Formatting規則に準拠
- [ ] 機能が期待通りに動作する
- [ ] 破壊的変更がないか確認

### Before Session End (Issue駆動セッション)
- [ ] 全ての変更がコミット済み
- [ ] セッション記録が作成済み
- [ ] PRが作成済み（Issue番号含む）
- [ ] Issue受け入れ条件が満たされている
- [ ] 作業ツリーがクリーン (`git status`)

### Before Session End (相談セッション)
- [ ] セッション記録が作成済み（必要に応じて）
- [ ] 次回の作業項目が明確
- [ ] 作業ツリーがクリーン (`git status`)

## Example Session Flow

### Issue駆動セッション例
```
1. User: "AniList APIの統合を始めたいです"
2. Claude: "新しい機能ですね。まずIssueを作成しましょう"
3. User: "Feature Issueを作成しました (#123)"
4. Claude: "feature/anilist-api-integrationブランチを作成して開始します"
5. Claude: [API調査・基本実装]
6. User: "実装内容を確認しました。コミットしてください"
7. Claude: [コミット実行]
8. Claude: "PRを作成してIssue #123をクローズします"
9. User: "PR内容を確認しました。マージしてください"
```

### 相談セッション例
```
1. User: "AniList APIの制限について教えて下さい"
2. Claude: "AniList APIの制限について調査・説明します"
3. User: "理解しました。ありがとうございます"
4. User: "セッション完了です"
```

### 相談から実装に発展する例
```
1. User: "パフォーマンス改善のアプローチを相談したいです"
2. Claude: "現状分析と改善案を提示します"
3. User: "2番目の案で実装したいです"
4. Claude: "Task Issueを作成しましょう"
5. User: "Issue #456を作成しました"
6. Claude: [同一セッション内でブランチ作成・実装継続]
```

## Benefits

1. **Predictable Process**: 毎回同じ流れで開発進行
2. **Quality Assurance**: 各段階でのチェックポイント
3. **Complete Documentation**: 全ての変更と決定が記録
4. **Clear Handoffs**: 次回セッションへの明確な引き継ぎ
5. **Knowledge Transfer**: 他の開発者が流れを理解可能