# React Hooks Best Practices Guide

## Overview

ReactフックスはReactアプリケーションで状態管理と副作用処理を行うための重要な仕組みです。特にuseEffectは誤用されやすいため、適切な使用方法を理解することが重要です。

## useEffect Best Practices

### Core Principle: "ReactはUIライブラリである"

useEffectを使用する前に、**ReactはUIライブラリである**ことを常に念頭に置く必要があります。useEffectの本来の目的は、UIライブラリとして通常のレンダリングでは実現できない操作を行うことです。

### ✅ 適切な使用例

#### 1. DOM操作
```typescript
useEffect(() => {
  const element = elementRef.current;
  if (!element) return;
  
  element.focus();
  
  return () => {
    element.blur();
  };
}, []);
```

#### 2. イベントリスナーの登録・削除
```typescript
useEffect(() => {
  const handleScroll = () => {
    // スクロール処理
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

#### 3. タイマーやインターバルの管理
```typescript
useEffect(() => {
  const timer = setInterval(() => {
    // 定期実行処理
  }, 1000);
  
  return () => {
    clearInterval(timer);
  };
}, []);
```

#### 4. 外部ライブラリの初期化・クリーンアップ
```typescript
useEffect(() => {
  const chart = new Chart(canvasRef.current, chartConfig);
  
  return () => {
    chart.destroy();
  };
}, []);
```

### ❌ 避けるべきアンチパターン

#### 1. 値の変化に単純に反応するエフェクト
```typescript
// ❌ アンチパターン
useEffect(() => {
  if (shouldClear) {
    setFormData({});
  }
}, [shouldClear]);
```

**正しい解決策:**
```typescript
// ✅ key propによるリマウント (React公式推奨)
<FormComponent key={resetKey} />

// ✅ useCallbackによるイベントハンドラ
const handleClear = useCallback(() => {
  setFormData({});
}, []);
```

#### 2. データ取得（API呼び出し）
```typescript
// ❌ アンチパターン
useEffect(() => {
  fetchUserData(userId).then(setUser);
}, [userId]);
```

**正しい解決策:**
```typescript
// ✅ jotaiのasync atom
export const userDataAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  return await fetchUserData(userId);
});

// ✅ React Query / SWR
const { data: user } = useQuery(['user', userId], () => fetchUserData(userId));
```

#### 3. 単純な状態の同期
```typescript
// ❌ アンチパターン
useEffect(() => {
  setLocalState(propValue);
}, [propValue]);
```

**正しい解決策:**
```typescript
// ✅ 直接propsを使用
const displayValue = propValue;

// ✅ derived state
const processedValue = useMemo(() => processValue(propValue), [propValue]);
```

#### 4. クリーンアップ関数のないエフェクト
```typescript
// ❌ アンチパターン
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);
```

**正しい解決策:**
```typescript
// ✅ 適切なクリーンアップ
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### useEffect使用の判断基準

useEffectを使用する前に、以下の質問を自問してください：

1. **UIライブラリとしての操作か？**
   - DOM操作、イベントリスナー、外部ライブラリとの連携など

2. **クリーンアップが必要か？**
   - ほとんどのuseEffectはクリーンアップ関数が必要

3. **より適切な代替手段はないか？**
   - useState、useMemo、useCallback、状態管理ライブラリなど

4. **コンポーネント内のロジックか？**
   - グローバルな処理は別の仕組みで行う

### 代替手段の選択指針

#### 状態管理
```typescript
// Local state
const [value, setValue] = useState(initialValue);

// Derived state
const computedValue = useMemo(() => compute(value), [value]);

// Global state (jotai)
export const globalValueAtom = atom(initialValue);
```

#### データ取得
```typescript
// jotai async atom
export const userDataAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  return await api.fetchUser(userId);
});

// Suspense境界内で使用
const UserProfile = () => {
  const userData = useAtomValue(userDataAtom);
  return <div>{userData.name}</div>;
};
```

#### イベント処理
```typescript
// Event handlers
const handleSubmit = useCallback((event: FormEvent) => {
  event.preventDefault();
  onSubmit(formData);
}, [formData, onSubmit]);

// Event delegation
<form onSubmit={handleSubmit}>
```

#### フォームリセット
```typescript
// key propによるリマウント (React公式推奨)
const [resetKey, setResetKey] = useState(0);
const handleReset = () => setResetKey(prev => prev + 1);

<FormComponent key={resetKey} />
```

## Project-Specific Guidelines

### 1. 状態管理パターン
- **jotai atoms**: グローバル状態とasyncな処理
- **useState**: ローカルな状態
- **useMemo**: 派生状態の計算

### 2. フォーム管理
- 可能な限りControlled Components
- リセットにはkey propを使用
- バリデーションはsubmit時に実行

### 3. API呼び出し
- jotaiのasync atomsを使用
- useEffectでのデータ取得は避ける
- エラーハンドリングはatomレベルで実装

### 4. テスト戦略
- useEffectに依存しない純粋関数を優先
- MSWでAPI呼び出しをモック
- 副作用の最小化により、テストを簡潔に保つ

## React公式推奨: key propによる状態リセット

### 公式ドキュメントからの推奨事項

React公式の「**You Might Not Need an Effect**」および「**Preserving and Resetting State**」では、コンポーネントの状態をリセットする際に**key propを使用することを明確に推奨**しています。

#### 公式の説明
> "By passing a userId as a key to the Profile component, you're asking React to treat two Profile components with different userId as two different components that should not share any state. Whenever the key changes, React will recreate the DOM and reset the state of the Profile component and all of its children."

#### 公式推奨パターン
```typescript
// React公式ドキュメントからの例
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId} // ← これによりuserIdが変わるたびに完全リセット
    />
  );
}

function Profile({ userId }) {
  // userIdが変わると自動的にリセットされる
  const [comment, setComment] = useState('');
  // 他の全ての状態も自動リセット
}
```

#### なぜkey propが推奨されるのか

1. **効率性**: useEffectよりも効率的
2. **完全性**: ネストしたコンポーネントの状態も含めて完全にリセット
3. **シンプル性**: 手動での状態リセットが不要
4. **予測可能性**: コンポーネント全体が新しいインスタンスとして作成される

#### 公式が推奨する場面
- フォームの完全なリセット
- propsの変更に応じた状態の完全初期化
- useEffectで状態同期を行っているケース

## Example: Before/After Refactoring

### Before (Anti-pattern)
```typescript
const UserInputForm = ({ clearTrigger, ...props }) => {
  const [formData, setFormData] = useState({});
  
  // ❌ 値の変化に単純に反応
  useEffect(() => {
    if (clearTrigger) {
      setFormData({});
    }
  }, [clearTrigger]);
  
  return <form>...</form>;
};
```

### After (Best practice)
```typescript
const UserInputForm = ({ ...props }) => {
  const [formData, setFormData] = useState({});
  
  // useEffect不要 - key propでリマウント
  return <form>...</form>;
};

// 親コンポーネント
const ParentComponent = () => {
  const [formKey, setFormKey] = useState(0);
  
  const handleReset = () => {
    setFormKey(prev => prev + 1); // フォームをリマウント
  };
  
  return (
    <>
      <UserInputForm key={formKey} />
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
```

## References

- [過激派が教える！　useEffectの正しい使い方](https://zenn.dev/uhyo/articles/useeffect-taught-by-extremist)
- [useEffect – React](https://react.dev/reference/react/useEffect)
- [You Might Not Need an Effect – React](https://react.dev/learn/you-might-not-need-an-effect)
- [Preserving and Resetting State – React](https://react.dev/learn/preserving-and-resetting-state)

## Checklist for Code Review

useEffectの使用を見つけた際の確認項目：

- [ ] UIライブラリとしての操作を行っているか？
- [ ] クリーンアップ関数が実装されているか？
- [ ] より適切な代替手段（useState、useMemo、jotai）は検討したか？
- [ ] 値の変化に単純に反応するだけではないか？
- [ ] データ取得やグローバルな処理を行っていないか？
- [ ] テストが困難になっていないか？

このガイドラインに従うことで、保守性が高く、バグの少ないReactアプリケーションを構築できます。