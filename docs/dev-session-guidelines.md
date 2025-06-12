# Development Session Guidelines

## Purpose

Development sessionの記録を残すことで、開発の流れと意思決定プロセスを追跡し、他の開発者がClaude Codeとの効果的な対話方法を学習できるようにする。

## When to Record

以下のタイミングでセッション記録を作成する：

1. **Major milestones達成時**
   - 新機能の実装完了
   - 重要な技術選択の決定
   - アーキテクチャの変更

2. **Significant commits後**
   - 複数のコミットが完了したタイミング
   - 一つの作業フェーズが完了したとき

3. **Session終了時**
   - 長時間のセッション終了時
   - 次回への引き継ぎが必要な場合

## File Naming Convention

```
docs/dev-sessions/YYYYMMDDhhmmss-session-topic.md
```

**Date Format:**
- Use `TZ=Asia/Tokyo date +"%Y%m%d%H%M%S"` command to get current JST timestamp
- Always verify the current timestamp before creating session files

**Examples:**
- `20250612225623-project-initialization.md`
- `20250613230000-anilist-api-integration.md`
- `20250614230000-comparison-feature-implementation.md`

## Document Structure

### Required Sections

```markdown
# 開発セッション: [セッションタイトル]

**日時**: YYYY-MM-DD
**時間**: hh:mm:ss (JST)
**参加者**: User, Claude Code

## 概要
[セッション全体の要約を2-3文で]

## 重要な決定事項
[重要な技術選択や方針決定]

## 会話の流れ
[会話の流れを要約]

## 作成・変更されたファイル
[作成・変更されたファイル一覧]

## 次のステップ
[次回への引き継ぎ事項]

## 技術メモ
[技術的な注意点やメモ]
```

### 会話の流れフォーマット

```markdown
### [番号]. [トピックタイトル]
**User**: [ユーザーの発言原文]

**Claude**: [Claudeの回答要約]
```

## Content Guidelines

### What to Include
- **User messages**: 完全な原文
- **Claude responses**: 要約（長い場合）
- **Technical decisions**: 選択理由を含む
- **Code changes**: 重要な変更のみ
- **Problem solving**: 解決プロセス

### What to Exclude
- 些細な質問・回答
- 単純な確認作業
- エラーの修正（重要でない場合）

## Maintenance

### File Organization
- `docs/dev-sessions/` ディレクトリに時系列で保存
- 月ごとのサブディレクトリは作らない（検索性重視）

### Updates
- セッション中にリアルタイム更新は不要
- セッション終了時にまとめて作成

### Review
- 定期的に古いセッション記録を確認
- 重要な情報を`docs/`の他のファイルに移行

## Example Usage

```markdown
### 1. API Integration Discussion
**User**: AniList APIを使いたいのですが、どういう手順で統合すべきでしょうか？

**Claude**: AniList APIの調査から始めることを提案。GraphQL endpointの確認、認証方法の調査、基本的なクエリの実装手順を説明。
```

## Benefits

1. **Knowledge Transfer**: 他の開発者がプロジェクトの経緯を理解
2. **Decision Tracking**: 技術選択の理由を後から参照可能
3. **Learning Resource**: Claude Codeとの効果的な対話方法の例示
4. **Project Documentation**: 開発プロセスの透明性確保