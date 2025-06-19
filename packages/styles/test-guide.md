# テストガイド

## 最重要指標
- 安定性: Flaky test（不安定なテスト）を徹底的に排除
- 高速性: 全テストスイートを1分以内で実行
- 保守性: テストのメンテナンスコストを最小化

## 命名規則

### 基本ルール
- `*.unit.test.ts` - 純粋関数、ビジネスロジックのテスト
- `*.component.test.tsx` - Reactコンポーネントのテスト
- `*.integration.test.tsx` - 複数要素が連携する統合テスト

## 具体例

### 1. Unit Test（単体テスト）

**対象**: 外部依存のない純粋な関数、ロジック

```typescript
// ❌ 悪い例
userValidator.test.ts     // テスト種別が不明
test-userValidator.ts     // 命名規則に従っていない

// ✅ 良い例
userValidator.unit.test.ts
calculatePrice.unit.test.ts
formatDate.unit.test.ts
authService.unit.test.ts    // サービスクラスのメソッドも対象
useCounter.unit.test.ts     // カスタムフックの純粋なロジック部分
```

**実装例**:
```typescript
// packages/shop/src/utils/calculatePrice.unit.test.ts
import { describe, it, expect } from 'vitest'
import { calculateTotalPrice, applyDiscount } from './calculatePrice'

describe('calculateTotalPrice', () => {
  it('商品の合計金額を計算する', () => {
    const items = [
      { price: 1000, quantity: 2 },
      { price: 500, quantity: 3 }
    ]
    expect(calculateTotalPrice(items)).toBe(3500)
  })

  it('空の配列の場合は0を返す', () => {
    expect(calculateTotalPrice([])).toBe(0)
  })
})
```

### 2. Component Test（コンポーネントテスト）

**対象**: Reactコンポーネント、UI要素

```typescript
// ✅ 良い例
Button.component.test.tsx
LoginForm.component.test.tsx
UserProfile.component.test.tsx
Header.component.test.tsx
Modal.component.test.tsx
```

**実装例**:
```typescript
// packages/ui/src/components/Button/Button.component.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('クリックイベントが発火する', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>送信</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disabled時はクリックできない', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>送信</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
```

### 3. Integration Test（統合テスト）

**対象**: API連携、複数コンポーネントの協調、ユーザーフロー

```typescript
// ✅ 良い例
LoginFlow.integration.test.tsx      // ログイン全体のフロー
CartCheckout.integration.test.tsx   // カートから決済までの流れ
UserRegistration.integration.test.tsx
SearchFeature.integration.test.tsx  // 検索機能全体
```

**実装例**:
```typescript
// packages/auth/src/features/login/LoginFlow.integration.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '@/App'
import { server } from '@/test/mocks/server'
import { rest } from 'msw'

describe('ログインフロー', () => {
  it('正常にログインしてダッシュボードに遷移する', async () => {
    // MSWでAPIレスポンスをモック
    server.use(
      rest.post('/api/login', (req, res, ctx) => {
        return res(ctx.json({ token: 'mock-token', user: { name: '山田太郎' } }))
      })
    )

    render(<App />)
    
    // ログインフォームに入力
    await userEvent.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await userEvent.type(screen.getByLabelText('パスワード'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: 'ログイン' }))
    
    // ダッシュボードへの遷移を確認
    await waitFor(() => {
      expect(screen.getByText('ようこそ、山田太郎さん')).toBeInTheDocument()
    })
  })
})
```


## 実行コマンド

```bash
# 開発
pnpm run test               # CUIモードでテスト実行
pnpm run test:ui            # WebUIモードでテスト実行
pnpm run test:unit          # 単体テストのみ
pnpm run test:component     # コンポーネントテストのみ
pnpm run test:integration   # インテグレーションテストのみ
pnpm run test:fast          # 単体 + コンポーネントテストのみ

# CI/CD/AI
pnpm run test:ci
```

## 判断基準

### Unit Test を選ぶ場合
- 外部依存（DOM、API、ストレージ）がない
- 入力と出力が明確
- 実行時間が数ミリ秒
- ビジネスロジックの検証

### Component Test を選ぶ場合
- UIの表示確認が必要
- ユーザーインタラクション（クリック、入力）のテスト
- 条件付きレンダリングの確認
- アクセシビリティの基本確認

### Integration Test を選ぶ場合
- 複数のコンポーネントが協調する
- APIとの連携が必要（MSWでモック）
- ユーザーストーリー全体の検証
- ルーティングを含む画面遷移

## ベストプラクティス

1. **迷ったら小さく始める**
   - まずは unit test で書けないか検討
   - 必要に応じて component test に昇格

2. **適切な粒度を保つ**
   - Integration test は重要なフローのみ
   - 細かい挙動は unit/component test で

3. **パフォーマンスを意識**
   - Unit test: < 10ms
   - Component test: < 100ms  
   - Integration test: < 1000ms

4. **命名で意図を明確に**
   - ファイル名だけで何をテストしているか分かる
   - テストの種類が一目瞭然
