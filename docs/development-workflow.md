# Development Workflow

## Overview

Claude Codeとの開発セッションにおける標準的なワークフローを定義する。

## Workflow Steps

### 1. Session Start
- `date +"%Y-%m-%d"`で現在日付を確認
- セッションのトピック・目標を明確化

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

### Before Session End
- [ ] 全ての変更がコミット済み
- [ ] セッション記録が作成済み
- [ ] 次回の作業項目が明確
- [ ] 作業ツリーがクリーン (`git status`)

## Example Session Flow

```
1. User: "AniList APIの統合を始めたいです"
2. Claude: "AniList APIの調査から始めますか？GraphQL endpointと認証方法を確認しましょう"
3. User: "はい、お願いします"
4. Claude: [API調査・基本実装]
5. User: "実装内容を確認しました。コミットしてください"
6. Claude: [コミット実行]
7. Claude: "セッション記録を作成します"
8. Claude: [dev-session記録作成・コミット]
9. User: "セッション完了です"
```

## Benefits

1. **Predictable Process**: 毎回同じ流れで開発進行
2. **Quality Assurance**: 各段階でのチェックポイント
3. **Complete Documentation**: 全ての変更と決定が記録
4. **Clear Handoffs**: 次回セッションへの明確な引き継ぎ
5. **Knowledge Transfer**: 他の開発者が流れを理解可能