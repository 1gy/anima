# Architecture Design

## Overview

Animaは3つのフェーズで段階的に開発される、メンテナンス性の高いReactベースのWebアプリケーションです。高速で安定したテストと、責任分離による高品質なコードベースを実現します。

## Design Principles

### 1. Feature-First Organization
- 各機能を独立したモジュールとして組織化
- 機能間の依存関係を最小化
- 新機能追加時の影響範囲を限定

### 2. Separation of Concerns
- **UI Layer**: React コンポーネント（表示・ユーザー操作）
- **Business Logic Layer**: Pure functions（ビジネスルール・データ変換）
- **State Layer**: jotai atoms（レンダリングキャッシュ・状態管理）
- **Data Layer**: API クライアント・Repository（データ取得・永続化）

### 3. Dependency Inversion
- 具象実装ではなく抽象インターフェースに依存
- テスタビリティと柔軟性の向上
- モジュール間の疎結合を実現

### 4. Progressive Enhancement
- フェーズごとに機能を段階的に追加
- 既存機能への影響を最小化
- 後方互換性を保持

## Tech Stack

### Core Technologies
- **React 19**: UI フレームワーク
- **TypeScript**: 型安全性
- **Vite**: ビルドツール・開発サーバー
- **jotai**: 状態管理（レンダリング最適化）

### Styling
- **vanilla-extract**: Type-safe CSS-in-JS
- **Responsive Design**: モバイルファースト

### Quality Assurance
- **Vitest**: テストフレームワーク（高速・Node.js環境）
- **@testing-library/react**: React コンポーネントテスト
- **MSW**: API モッキング
- **Biome**: Linting・Formatting

## Project Structure

### Directory Organization
```
src/
├── app/                    # Application initialization
│   ├── providers/         # Global providers (jotai Provider, etc.)
│   └── router/           # Routing configuration
├── shared/               # Shared utilities and libraries
│   ├── api/             # API clients and types
│   ├── types/           # Global type definitions
│   ├── utils/           # Pure utility functions
│   └── store/           # Global state atoms
├── features/            # Feature modules (Phase-based)
│   ├── comparison/      # Phase 1: Anime comparison
│   ├── tier-list/       # Phase 2: Tier list management
│   └── dashboard/       # Phase 3: Integrated UI
├── components/          # Shared UI components
└── __tests__/           # Global test setup and mocks
```

### Feature Module Structure
```
features/comparison/
├── components/          # Feature-specific UI components
│   ├── UserInput.tsx
│   ├── ComparisonResult.tsx
│   └── *.test.tsx      # Component tests
├── services/           # Business logic (pure functions)
│   ├── comparisonService.ts
│   ├── animeUtils.ts
│   └── *.test.ts      # Service tests
├── store/             # Feature-specific state management
│   ├── comparisonAtoms.ts
│   └── *.test.ts      # State tests
├── types/             # Feature-specific type definitions
├── utils/             # Feature-specific utilities
└── __tests__/         # Integration tests
```

## State Management Strategy

### jotai Architecture Pattern

#### Core Philosophy
jotaiを**レンダリングキャッシュレイヤー**として活用し、ビジネスロジックは十分にテストされた純粋関数に分離する。

#### Atom Naming Convention
```typescript
// Primitive atoms (data sources)
export const user1Anime$ = atom<AnimeList>([]);
export const user2Anime$ = atom<AnimeList>([]);
export const selectedUserIds$ = atom<string[]>([]);

// Derived atoms (computed cache)
export const commonAnime$ = atom((get) => {
  const user1Anime = get(user1Anime$);
  const user2Anime = get(user2Anime$);
  // Call pure function
  return calculateCommonAnime(user1Anime, user2Anime);
});

// Async atoms (side effects)
export const fetchUserAnime$ = atom(
  null,
  async (get, set, userId: string) => {
    const animeList = await fetchAnimeListFromAPI(userId);
    const processedList = processAnimeList(animeList); // Pure function
    set(user1Anime$, processedList);
  }
);
```

#### Pattern Benefits
- **Pure Functions**: 高速で信頼性の高い単体テスト
- **jotai Atoms**: レンダリング最適化とメモ化
- **Clear Separation**: ロジックとUI状態の完全な分離

### State Categories

#### Global State
```typescript
// User preferences, theme, etc.
export const userPreferences$ = atom({
  theme: 'light' as 'light' | 'dark',
  language: 'ja' as 'ja' | 'en'
});
```

#### Feature State
```typescript
// Feature-specific state in each feature module
export const comparisonUsers$ = atom<string[]>([]);
export const tierListData$ = atom<TierListItem[]>([]);
```

#### Local State
```typescript
// Use React's useState for simple local component state
const [inputValue, setInputValue] = useState('');
```

## API Layer Design

### Repository Pattern (Functional Approach)
```typescript
// Type definitions for repository functions
type AnimeRepository = {
  getUserAnimeList(userId: string): Promise<AnimeList>;
  getAnimeDetails(animeId: number): Promise<AnimeDetails>;
  searchAnime(query: string): Promise<AnimeSearchResult>;
};

// Factory function to create repository
export const createAniListRepository = (httpClient: HttpClient): AnimeRepository => {
  return {
    async getUserAnimeList(userId: string): Promise<AnimeList> {
      const response = await httpClient.post('/graphql', {
        query: USER_ANIME_QUERY,
        variables: { userId }
      });
      // Transform raw data with pure functions
      return transformAniListResponse(response.data);
    },
    
    async getAnimeDetails(animeId: number): Promise<AnimeDetails> {
      const response = await httpClient.post('/graphql', {
        query: ANIME_DETAILS_QUERY,
        variables: { animeId }
      });
      return transformAnimeDetailsResponse(response.data);
    },
    
    async searchAnime(query: string): Promise<AnimeSearchResult> {
      const response = await httpClient.post('/graphql', {
        query: SEARCH_ANIME_QUERY,
        variables: { search: query }
      });
      return transformSearchResponse(response.data);
    }
  };
}
```

### Service Layer (Pure Functions)
```typescript
// Pure business logic functions
export const calculateCommonAnime = (
  user1Anime: AnimeList,
  user2Anime: AnimeList
): CommonAnime[] => {
  return user1Anime.filter(anime1 => 
    user2Anime.some(anime2 => anime2.id === anime1.id)
  );
};

export const calculateSimilarityScore = (
  commonAnime: CommonAnime[],
  totalAnime1: number,
  totalAnime2: number
): number => {
  const minTotal = Math.min(totalAnime1, totalAnime2);
  return minTotal > 0 ? (commonAnime.length / minTotal) * 100 : 0;
};

export const groupAnimeByGenre = (animeList: AnimeList): GenreGroup[] => {
  // Pure function implementation
};
```

### Data Flow Pattern
```
UI Component
    ↓ (user action)
Async Atom
    ↓ (side effect)
Repository
    ↓ (API call)
Pure Function (transform)
    ↓ (processed data)
Primitive Atom
    ↓ (state update)
Derived Atom (pure function)
    ↓ (computed value)
UI Component (re-render)
```

## Development Phases

### Phase 1: Anime Comparison (MVP)
**Goal**: ユーザー比較機能の実装

**Features**:
- AniList ユーザーID入力
- 共通視聴アニメの表示
- localStorage での設定保存

**Architecture Focus**:
- API クライアントの基盤構築
- 状態管理パターンの確立
- Pure function ライブラリの開始
- テスト戦略の実装

**Key Components**:
```
features/comparison/
├── components/
│   ├── UserInputForm.tsx
│   ├── ComparisonResult.tsx
│   └── AnimeCard.tsx
├── services/
│   ├── comparisonService.ts
│   └── animeUtils.ts
└── store/
    └── comparisonAtoms.ts
```

### Phase 2: Tier List
**Goal**: アニメランキング機能の追加

**Features**:
- S/A/B/C/D ランク分類
- ドラッグ&ドロップ機能
- 複数ティアリスト対応
- 季節別プリセット

**Architecture Focus**:
- 複雑な UI インタラクション
- データ永続化戦略の拡張
- パフォーマンス最適化
- アニメーション・UX向上

### Phase 3: Integrated UI
**Goal**: 統合されたユーザー体験

**Features**:
- 統一されたトップページ
- 機能間のナビゲーション
- ユーザー設定管理

**Architecture Focus**:
- ルーティング戦略
- 全体的なUX改善
- 最終的なパフォーマンス調整
- アクセシビリティ対応

## Testing Strategy Integration

### Architecture Testing Approach
```typescript
// 1. Pure Functions (80% of tests)
describe('calculateCommonAnime', () => {
  it('should return intersection of anime lists', () => {
    const result = calculateCommonAnime(mockUser1Anime, mockUser2Anime);
    expect(result).toEqual(expectedCommonAnime);
  });
});

// 2. Atom Logic (15% of tests)
describe('commonAnime$', () => {
  it('should compute common anime from user atoms', () => {
    const store = createStore();
    store.set(user1Anime$, mockUser1Anime);
    store.set(user2Anime$, mockUser2Anime);
    
    expect(store.get(commonAnime$)).toEqual(expectedCommonAnime);
  });
});

// 3. Component Integration (5% of tests)
describe('ComparisonPage', () => {
  it('should complete comparison workflow', async () => {
    render(<ComparisonPage />);
    // Integration test with MSW
  });
});
```

## Performance Considerations

### Code Splitting
```typescript
// Phase-based lazy loading
const ComparisonFeature = lazy(() => import('./features/comparison'));
const TierListFeature = lazy(() => import('./features/tier-list'));
const DashboardFeature = lazy(() => import('./features/dashboard'));
```

### State Optimization
```typescript
// jotai's automatic dependency tracking
export const expensiveCalculation$ = atom((get) => {
  const data = get(sourceData$);
  // Only recalculates when sourceData changes
  return computeExpensiveValue(data);
});
```

### Bundle Optimization
- Tree shaking for unused code
- Feature-based chunk splitting
- Minimal external dependencies

## Security Considerations

### Data Protection
- ユーザーデータの適切な取り扱い
- localStorage データの検証
- XSS対策（TypeScript + React）

### API Security
- レート制限の考慮
- エラーハンドリングの適切な実装
- 機密情報の漏洩防止

## Quality Assurance Strategy

### Code Quality
- **TypeScript Strict Mode**: 型安全性の確保
- **Biome**: 一貫したコードスタイル
- **Pure Functions**: テスタブルなビジネスロジック
- **Atomic Design**: 再利用可能なコンポーネント

### Performance Monitoring
- **Bundle Size**: 各フェーズでのサイズ監視
- **Render Performance**: jotaiによる最適化効果測定
- **Test Performance**: <30秒の高速テストスイート

### Error Handling (Functional Approach)
```typescript
// Pure function for error handling
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      type: 'api_error',
      message: error.message,
      timestamp: Date.now()
    };
  }
  return {
    type: 'unknown_error',
    message: 'An unexpected error occurred',
    timestamp: Date.now()
  };
}

// Async atom with functional error handling
export const fetchUserAnime$ = atom(
  null,
  async (get, set, userId: string) => {
    try {
      const repository = get(animeRepository$);
      const animeList = await repository.getUserAnimeList(userId);
      const processedList = processAnimeList(animeList); // Pure function
      set(user1Anime$, processedList);
      set(errorState$, null);
    } catch (error) {
      set(errorState$, handleApiError(error)); // Pure function
    }
  }
);
```

## Maintenance Strategy

### Documentation
- **Architecture Decision Records**: 重要な設計判断の記録
- **API Documentation**: OpenAPI/GraphQL スキーマ
- **Component Documentation**: Storybook（Phase 2以降検討）

### Monitoring & Observability
- **Performance Metrics**: Core Web Vitals
- **Error Tracking**: 本番環境での問題監視
- **User Analytics**: 機能使用状況の分析

### Scalability Planning
- **Feature Flags**: 段階的機能リリース
- **A/B Testing**: UI/UX改善の検証
- **Internationalization**: 多言語対応の準備

## Development Workflow Integration

### Git Strategy
- **Feature Branches**: フェーズ/機能ごとのブランチ
- **Conventional Commits**: 一貫したコミットメッセージ
- **Atomic Commits**: 意味のある最小単位

### CI/CD Pipeline
```yaml
# GitHub Actions example
- name: Test
  run: |
    pnpm test:run          # < 30s target
    pnpm biome check       # < 10s
    pnpm build            # < 60s
```

### Code Review Focus
- **Pure Function Quality**: ビジネスロジックの正確性
- **Atom Design**: 適切な責任分離
- **Test Coverage**: 重要機能の十分なカバレッジ
- **Performance Impact**: バンドルサイズ・レンダリング影響

## Migration Strategy

### Phase Transitions
- **Backward Compatibility**: 既存機能の保護
- **Feature Flags**: 段階的な機能有効化
- **Data Migration**: localStorage スキーマの進化

### Technology Updates
- **Dependency Updates**: 定期的な依存関係更新
- **React Evolution**: React 19+ の新機能活用
- **jotai Updates**: 新しいパターン・最適化の採用

## Conclusion

この設計により以下を実現します：

1. **高品質**: Pure function中心の十分にテストされたコードベース
2. **高性能**: jotaiによる効率的なレンダリング最適化
3. **保守性**: 明確な責任分離と段階的な機能追加
4. **スケーラビリティ**: フェーズごとの成長に対応できる柔軟な構造

各フェーズで学習・改善を重ね、最終的に高品質なアニメファン向けWebアプリケーションを構築します。