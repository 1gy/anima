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

### **Directory Structure**
```
docs/dev-sessions/
├── issues/                    # Issue駆動セッション
│   └── {issue-number}-{description}/
│       └── YYYYMMDDhhmmss-{session-topic}.md
└── consultations/             # 相談セッション
    └── YYYYMMDDhhmmss-{topic}.md
```

### **Naming Rules**

**Issue-driven Sessions:**
```
docs/dev-sessions/issues/{issue-number}-{description}/YYYYMMDDhhmmss-{session-topic}.md
```

**Consultation Sessions:**
```
docs/dev-sessions/consultations/YYYYMMDDhhmmss-{topic}.md
```

**Date Format:**
- Use `TZ=Asia/Tokyo date +"%Y%m%d%H%M%S"` command to get current JST timestamp
- Always verify the current timestamp before creating session files

**Examples:**
- `issues/123-anime-comparison/20250615142900-api-investigation.md`
- `issues/123-anime-comparison/20250616093000-ui-implementation.md`
- `consultations/20250612225623-project-initialization.md`
- `consultations/20250614230000-architecture-design.md`

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

## Session Management Flow

### **Consultation Session**
```
1. セッション開始: 相談・質問
2. consultations/YYYYMMDDhhmmss-{topic}.md 作成
3. 相談完了でセッション終了
```

### **Issue-driven Session**
```
1. Issue確認/作成 (#123)
2. issues/123-{description}/ フォルダ作成
3. README.md作成（Issue概要・進捗管理）
4. YYYYMMDDhhmmss-{session-topic}.md作成
5. 実装・セッション記録
6. README.md更新（進捗・決定事項）
```

### **Consultation → Implementation**
```
1. consultations/でセッション開始
2. 実装決定 → Issue作成
3. 相談セッション終了・記録
4. 新しいIssue駆動セッション開始
5. 相互参照リンクで関連付け
```

## Example Usage

### Consultation Session
```markdown
### 1. API Integration Discussion
**User**: AniList APIを使いたいのですが、どういう手順で統合すべきでしょうか？

**Claude**: AniList APIの調査から始めることを提案。GraphQL endpointの確認、認証方法の調査、基本的なクエリの実装手順を説明。
```

### Issue-driven Session
```markdown
### 2. Feature Implementation Session
**User**: Issue #123のアニメ比較機能を実装します

**Claude**: issues/123-anime-comparison/20250615142900-api-investigation.mdを作成して実装を開始。GraphQL クライアントの設定から始めます。
```

## セッション記録の確実な実行戦略

### Claude Codeのコンテキスト制限への対応

**制約の認識**:
- コンテキストウィンドウの制限により、長いセッションでは古い情報が圧縮される
- セッション間での完全な記憶連続性は保証できない
- 自動的な「定期記録」の実行は現実的でない

### 実現可能な記録アプローチ

#### 1. **ユーザー主導の記録促進**
```
重要なタイミングでユーザーから記録作成を促す：
- 「ここまでの内容を記録しましょう」
- 「この技術決定を記録してください」  
- 「セッションをまとめておきましょう」
```

#### 2. **段階的記録戦略**
```
a) 小刻み記録 (リアルタイム)
   - 重要な技術決定: 決定直後に記録
   - 複雑な問題解決: 解決プロセスを即座に記録
   - 新機能完成: 実装詳細を記録

b) 統合記録 (セッション終了時)  
   - 全体の流れと成果をまとめる
   - 小さな記録を統合して包括的な記録作成
```

#### 3. **記録トリガーポイント**
```
以下の状況で記録作成を積極的に提案：
- 新しいファイル/機能作成完了後
- 重要なリファクタリング完了後
- エラー・問題の解決後
- 大きなコミット作成前
- セッション時間が1-2時間経過時
```

#### 4. **コンテキスト保持の工夫**
```
記録以外の方法での情報保持：
- TODOコメントによる進捗・課題の追跡
- 詳細なコミットメッセージでの履歴保存
- 重要な決定事項のドキュメント外部化
- .md ファイルでの技術メモ蓄積
```

### 相互の役割分担

#### ユーザーの役割
- 重要な節目での記録作成の促進
- 「記録しましょう」の積極的な発言
- セッション終了前の記録確認

#### Claude Codeの役割  
- 記録作成タイミングの積極的な提案
- 詳細で価値のある記録内容の作成
- 技術的決定プロセスの正確な記録

### 記録品質の確保

#### 即座記録 (リアルタイム)
```
- 技術決定の背景と理由
- 問題解決の具体的ステップ
- 実装時の重要な考慮事項
- エラーと解決方法
```

#### 統合記録 (セッション終了時)
```
- セッション全体の流れと成果
- 学習内容と今後への応用
- 次回セッションへの引き継ぎ事項
- プロジェクト全体への影響
```

### 継続性の確保

**現実的な目標設定**:
- 完璧な記録より継続的な記録を重視
- 記録作成の負担を最小化
- 価値のある情報の確実な保存

**改善サイクル**:
- 記録プロセスの定期的な見直し
- より効率的な記録方法の模索
- ユーザーフィードバックに基づく改善

## Benefits

1. **Knowledge Transfer**: 他の開発者がプロジェクトの経緯を理解
2. **Decision Tracking**: 技術選択の理由を後から参照可能
3. **Learning Resource**: Claude Codeとの効果的な対話方法の例示
4. **Project Documentation**: 開発プロセスの透明性確保
5. **Context Preservation**: コンテキスト制限を補完する外部記憶
6. **Quality Assurance**: 継続的な開発品質の向上