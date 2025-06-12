# Testing Strategy

## Overview

高速で安定したNodejs環境でのテストを中心とした、段階的品質保証戦略です。

## Testing Philosophy

### Core Principles
- **Fast Feedback**: 開発中の高速なフィードバックループ
- **Reliability**: 安定して動作するテスト（Flaky test率 <1%）
- **Maintainability**: テストコード自体の保守性
- **Coverage**: 適切なカバレッジによる品質保証

### Test Pyramid Strategy

```
         Future: E2E Tests (Playwright)
       ────────────────────────────────
      Integration Tests (15% - 中程度)
    ────────────────────────────────────
   Unit Tests (80% - 大量・高速・安定)
```

**重点**: Unit Tests中心の高速テストスイート

## Tech Stack

### Core Tools
- **Vitest**: テストフレームワーク（高速・Vite統合）
- **@testing-library/react**: Reactコンポーネントテスト
- **MSW (Mock Service Worker)**: API モッキング
- **@testing-library/jest-dom**: DOM マッチャー拡張

### Future Considerations
- **Playwright**: ブラウザテスト（Phase 2以降で検討）

## Test Categories & Patterns

### 1. Unit Tests (80% of test suite)

#### Pure Functions
```typescript
// utils/animeUtils.test.ts
describe('calculateCommonAnime', () => {
  it('should return intersection of anime lists', () => {
    const user1Anime = [{ id: 1, title: 'Naruto' }, { id: 2, title: 'Bleach' }];
    const user2Anime = [{ id: 1, title: 'Naruto' }, { id: 3, title: 'One Piece' }];
    
    const result = calculateCommonAnime(user1Anime, user2Anime);
    
    expect(result).toEqual([{ id: 1, title: 'Naruto' }]);
  });

  it('should handle empty lists', () => {
    expect(calculateCommonAnime([], [])).toEqual([]);
  });
});
```

#### Service Layer
```typescript
// services/comparisonService.test.ts
describe('ComparisonService', () => {
  const mockRepository = {
    getUserAnimeList: vi.fn(),
  };
  const service = new ComparisonService(mockRepository);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should compare users and return common anime', async () => {
    mockRepository.getUserAnimeList
      .mockResolvedValueOnce(mockUser1Data)
      .mockResolvedValueOnce(mockUser2Data);

    const result = await service.compareUsers(['user1', 'user2']);

    expect(result.commonAnime).toHaveLength(5);
    expect(mockRepository.getUserAnimeList).toHaveBeenCalledTimes(2);
  });
});
```

#### State Management (jotai)
```typescript
// store/comparisonAtoms.test.ts
describe('comparisonAtoms', () => {
  let store: Store;

  beforeEach(() => {
    store = createStore();
  });

  it('should update comparison users', () => {
    const userIds = ['user1', 'user2'];
    
    store.set(comparisonUsersAtom, userIds);
    
    expect(store.get(comparisonUsersAtom)).toEqual(userIds);
  });

  it('should calculate common anime from users', () => {
    store.set(user1AnimeAtom, mockUser1Anime);
    store.set(user2AnimeAtom, mockUser2Anime);
    
    const commonAnime = store.get(commonAnimeAtom);
    
    expect(commonAnime).toEqual(expectedCommonAnime);
  });
});
```

### 2. Component Tests

#### Simple Components
```typescript
// components/UserInput.test.tsx
describe('UserInput', () => {
  it('should render input field and submit button', () => {
    render(<UserInput onSubmit={vi.fn()} />);
    
    expect(screen.getByLabelText(/user id/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /compare/i })).toBeInTheDocument();
  });

  it('should call onSubmit with trimmed user ID', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<UserInput onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/user id/i), '  user123  ');
    await user.click(screen.getByRole('button', { name: /compare/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith('user123');
  });

  it('should not submit empty user ID', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<UserInput onSubmit={mockSubmit} />);
    
    await user.click(screen.getByRole('button', { name: /compare/i }));
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
```

#### Components with State
```typescript
// components/ComparisonResult.test.tsx
describe('ComparisonResult', () => {
  it('should display loading state', () => {
    render(<ComparisonResult isLoading={true} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display common anime list', () => {
    const commonAnime = [
      { id: 1, title: 'Naruto' },
      { id: 2, title: 'Bleach' }
    ];
    
    render(<ComparisonResult commonAnime={commonAnime} />);
    
    expect(screen.getByText('Naruto')).toBeInTheDocument();
    expect(screen.getByText('Bleach')).toBeInTheDocument();
  });
});
```

### 3. Integration Tests (15% of test suite)

#### API Integration with MSW
```typescript
// __tests__/integration/comparison.test.tsx
describe('Comparison Integration', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should complete full comparison workflow', async () => {
    const user = userEvent.setup();
    
    render(<ComparisonPage />);
    
    // Enter user IDs
    await user.type(screen.getByLabelText(/first user/i), 'user1');
    await user.type(screen.getByLabelText(/second user/i), 'user2');
    await user.click(screen.getByRole('button', { name: /compare/i }));
    
    // Wait for API calls and results
    await waitFor(() => {
      expect(screen.getByText(/common anime/i)).toBeInTheDocument();
    });
    
    // Verify results
    expect(screen.getByText('Naruto')).toBeInTheDocument();
    expect(screen.getByText('Bleach')).toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    server.use(
      http.post('https://graphql.anilist.co', () => {
        return HttpResponse.json({ errors: [{ message: 'User not found' }] }, { status: 404 });
      })
    );

    const user = userEvent.setup();
    render(<ComparisonPage />);
    
    await user.type(screen.getByLabelText(/first user/i), 'invaliduser');
    await user.click(screen.getByRole('button', { name: /compare/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/user not found/i)).toBeInTheDocument();
    });
  });
});
```

## Test Configuration

### File Organization
```
src/
├── __tests__/
│   ├── setup.ts              # Global test setup
│   ├── mocks/
│   │   ├── handlers.ts       # MSW handlers
│   │   └── data.ts          # Mock data
│   └── utils.ts             # Test utilities
├── features/
│   └── comparison/
│       ├── __tests__/       # Integration tests
│       ├── components/
│       │   └── *.test.tsx   # Component tests
│       ├── services/
│       │   └── *.test.ts    # Service tests
│       └── store/
│           └── *.test.ts    # State tests
```

### Performance Targets

| Test Type | Target Time | Max Time |
|-----------|-------------|----------|
| Unit Test | <50ms | 100ms |
| Component Test | <200ms | 500ms |
| Integration Test | <2s | 5s |
| Full Suite | <30s | 60s |

### Coverage Targets

| Layer | Minimum | Target |
|-------|---------|--------|
| Utilities | 95% | 100% |
| Services | 90% | 95% |
| Components | 80% | 90% |
| Integration | 70% | 80% |

## MSW Configuration

### Setup
```typescript
// __tests__/setup.ts
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Handlers
```typescript
// __tests__/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://graphql.anilist.co', async ({ request }) => {
    const { query, variables } = await request.json();
    
    if (query.includes('MediaListCollection')) {
      return HttpResponse.json({
        data: {
          MediaListCollection: mockAnimeListData
        }
      });
    }
    
    return HttpResponse.json({ errors: [{ message: 'Unknown query' }] });
  }),
];
```

## Test Scripts

### Package.json Configuration
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  }
}
```

### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test:run
      - run: pnpm test:coverage
      
      - uses: codecov/codecov-action@v4
        with:
          file: ./coverage/lcov.info
```

## Best Practices

### Test Writing
1. **AAA Pattern**: Arrange, Act, Assert
2. **Descriptive Names**: テストの意図を明確に
3. **Single Responsibility**: 1テスト1つの責任
4. **Data Builders**: テストデータの構築パターン

### Performance
1. **Parallel Execution**: テストの並列実行
2. **Selective Testing**: 変更ファイルのみテスト
3. **Mock Optimization**: 軽量なモック使用
4. **Setup Optimization**: 共通セットアップの最適化

### Maintenance
1. **Test Refactoring**: コードと同様にリファクタリング
2. **Flaky Test Monitoring**: 不安定テストの監視
3. **Coverage Monitoring**: カバレッジの継続監視
4. **Performance Monitoring**: テスト実行時間の監視

## Future Enhancements

### Phase 2 Additions
- **Visual Regression Testing**: Drag & Drop UI の検証
- **Performance Testing**: 大量データでのパフォーマンス
- **Accessibility Testing**: a11y テストの追加

### Phase 3 Additions
- **E2E Testing**: Playwright導入
- **Cross-browser Testing**: 主要ブラウザでの検証
- **Mobile Testing**: レスポンシブデザインの検証

## Monitoring & Metrics

### Key Metrics
- Test execution time
- Test coverage percentage
- Flaky test rate
- Failed test trends

### Tools
- **Vitest UI**: テスト実行の可視化
- **Coverage Reports**: カバレッジの詳細分析
- **CI/CD Metrics**: 継続的な品質監視