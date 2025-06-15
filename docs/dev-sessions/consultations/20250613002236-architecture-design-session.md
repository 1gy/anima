# 開発セッション: Architecture Design and Development Guidelines

**日時**: 2025-01-13
**時間**: 00:22:36 (JST)
**参加者**: User, Claude Code

## 概要

Animaプロジェクトの包括的なアーキテクチャ設計と開発ガイドラインを策定。関数型プログラミング、テスト戦略、コーディング規約を確立し、高品質で保守性の高いコードベースの基盤を構築した。

## 重要な決定事項

### アーキテクチャ方針
- **関数型プログラミング**: TypeScriptクラスを避け、純粋関数中心の設計
- **Arrow Functions**: すべての関数でアロー構文を採用 (`export const fn = () => {}`)
- **jotai + Pure Functions**: 状態管理をレンダリングキャッシュに限定、ビジネスロジックは純粋関数に分離
- **Atom命名規約**: `$` 記号で状態を明示 (`user1Anime$`, `commonAnime$`)

### テスト戦略  
- **高速Node.js環境**: Vitest + @testing-library/react + MSW
- **テストピラミッド**: Unit Tests 80%, Integration 15%, E2E 5% (将来対応)
- **パフォーマンス目標**: Unit <50ms, 全体 <30s
- **カバレッジ目標**: Utilities 95%+, Services 90%+

### モジュール構成
- **Barrel Export戦略**: 全てのクロスフォルダインポートは`index.ts`経由必須
- **Module Encapsulation**: `index.ts`で公開APIを制御、内部実装を隠蔽
- **Feature-First Organization**: 機能ごとの独立モジュール構成

## 会話の流れ

### 1. プロジェクト現状確認
**User**: 開発に取り掛かりましょう！どこから手を付けましょうか

**Claude**: 現在の構造確認後、Phase 1のアニメ比較機能からの提案

### 2. アーキテクチャ設計要求
**User**: アーキテクチャについて考えたいです。メンテナンス性の高いアーキテクチャにすることで、コードの品質が高い状態にしたいです

**Claude**: Feature-First Organization、責任分離、依存性逆転、段階的拡張の4つの設計原則を提案

### 3. テスト戦略優先要求
**User**: 特に重視したいのは、自動単体テストの戦略です。基本的には、安定して高速に回せるテストで戦略を積み重ねたいです

**Claude**: 高速Node.js環境中心のテストピラミッド設計を提案。Vitest + Testing Library + MSW構成

### 4. ツール選定
**User**: vitest, @testing-library/react, msw を使うことを考えています。playwrightなどを使った、実際にブラウザを使うテストは将来対応

**Claude**: Node.js環境での高速テスト戦略を詳細設計。テストパターンとパフォーマンス指標を定義

### 5. jotai使用方針
**User**: jotaiの使い方については少し検討したいです。jotaiはできるだけレンダリングのキャッシュに徹するようにして、十分にテストされた関数を呼び出して計算済みの値のツリーを表現するようにしたいです

**Claude**: Pure Functions + jotaiキャッシュレイヤーのパターンを提案。ビジネスロジックと状態管理の明確な分離

### 6. Atom命名規約
**User**: atomは変数名を工夫したいです。たとえば、`user1AnimeAtom`は`user1Anime$`などのように、末尾に記号をつけることで区別する

**Claude**: `$` 記号でのatom命名規約を確立。RxJS風の明確な識別

### 7. 関数型プログラミング徹底
**User**: できるだけTypeScriptのクラスは使わずに実装したいです

**Claude**: Repository PatternやService Layerをファクトリ関数とオブジェクトリテラルで実装する関数型アプローチに変更

### 8. Arrow Functions統一
**User**: 関数はアローを使う構文で書きたいです。アーキテクチャとは別に、コードの書き方のドキュメントも書きましょう

**Claude**: 全関数でアロー構文統一のコーディングスタイルガイド作成

### 9. Barrel Export戦略
**User**: index.tsについても決めたいです。基本的にindex.tsは同じフォルダ内のモジュールからエクスポートをするだけにして、別のフォルダからのインポートは必ず index.tsを経由する

**Claude**: 厳格なBarrel Export戦略を定義。クロスフォルダインポートの完全制御

### 10. ドキュメント圧縮とカプセル化追記
**User**: index.tsの記述が多すぎるので圧縮、eslintは使わないので削除、カプセル化の利点も追記

**Claude**: ドキュメントを実用的にリファクタリング、プライベートAPIの隠蔽メリットを追加

## 作成・変更されたファイル

### 新規作成
- `docs/architecture.md` - 包括的なアーキテクチャ設計文書
- `docs/testing-strategy.md` - テスト戦略とパターン集
- `docs/coding-style.md` - コーディング規約とベストプラクティス

### 主な内容
- **アーキテクチャ**: 関数型 + jotai + Pure Functions パターン
- **テスト**: Vitest中心の高速テスト戦略
- **スタイル**: Arrow Functions + Barrel Exports + 型安全性

## 次のステップ

1. **開発環境セットアップ**: Vitest、Testing Library、MSWの設定
2. **フォルダ構造実装**: 設計したディレクトリ構造の作成  
3. **Phase 1実装**: アニメ比較機能の開発開始
4. **テスト環境構築**: テスト設定ファイルとモックの準備

## 技術メモ

### アーキテクチャパターン
```typescript
// Pure Functions (ビジネスロジック)
export const calculateCommonAnime = (user1: AnimeList, user2: AnimeList): CommonAnime[] => {
  // 十分にテストされたロジック
};

// jotai Atoms (レンダリングキャッシュ)
export const commonAnime$ = atom((get) => {
  const user1 = get(user1Anime$);
  const user2 = get(user2Anime$);
  return calculateCommonAnime(user1, user2); // Pure function呼び出し
});
```

### Barrel Export例
```typescript
// components/index.ts
export { UserInputForm } from './user-input-form';

// 他フォルダから
import { UserInputForm } from './components'; // ✅ 必須
import { UserInputForm } from './components/user-input-form'; // ❌ 禁止
```

### テスト構成
- **Unit Tests**: Pure functions中心の高速テスト
- **Component Tests**: @testing-library/reactでのUI検証
- **Integration Tests**: MSWでのAPI連携テスト

このセッションで、Animaプロジェクトの開発基盤が完全に確立された。高品質で保守性の高いコードベース実現への道筋が明確になった。