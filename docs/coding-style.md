# Coding Style Guide

## Overview

Animaプロジェクトでは、関数型プログラミングアプローチを採用し、一貫性のあるコードスタイルを維持します。

## Core Principles

### 1. Functional Programming First
- **クラスを避ける**: 可能な限り関数とオブジェクトリテラルを使用
- **Pure Functions**: 副作用のない関数を優先
- **Immutability**: データの不変性を保持
- **Composition**: 関数の組み合わせによる機能構築

### 2. Arrow Functions Preferred
- **すべての関数**: アロー関数構文を使用
- **一貫性**: export、内部関数、メソッドも含めて統一
- **型安全性**: TypeScriptの型推論との親和性

### 3. Explicit Type Annotations
- **関数シグネチャ**: 引数と戻り値の型を明示
- **複雑な型**: typeエイリアスで可読性向上
- **Generic Types**: 再利用性の向上

## Function Declaration Patterns

### Basic Functions
```typescript
// ✅ Good: Arrow function with explicit types
export const calculateCommonAnime = (
  user1Anime: AnimeList,
  user2Anime: AnimeList
): CommonAnime[] => {
  return user1Anime.filter(anime1 => 
    user2Anime.some(anime2 => anime2.id === anime1.id)
  );
};

// ❌ Avoid: Function declaration
export function calculateCommonAnime(
  user1Anime: AnimeList,
  user2Anime: AnimeList
): CommonAnime[] {
  // ...
}
```

### Async Functions
```typescript
// ✅ Good: Async arrow function
export const fetchUserAnimeList = async (userId: string): Promise<AnimeList> => {
  const response = await apiClient.post('/graphql', {
    query: USER_ANIME_QUERY,
    variables: { userId }
  });
  return transformAniListResponse(response.data);
};

// ✅ Good: Async function in object
export const createAnimeRepository = (httpClient: HttpClient) => ({
  getUserAnimeList: async (userId: string): Promise<AnimeList> => {
    const response = await httpClient.post('/graphql', {
      query: USER_ANIME_QUERY,
      variables: { userId }
    });
    return transformAniListResponse(response.data);
  },
  
  getAnimeDetails: async (animeId: number): Promise<AnimeDetails> => {
    // Implementation
  }
});
```

### Higher-Order Functions
```typescript
// ✅ Good: HOF with arrow functions
export const createMemoizedCalculator = <T, R>(
  calculator: (input: T) => R
) => {
  const cache = new Map<string, R>();
  
  return (input: T): R => {
    const key = JSON.stringify(input);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = calculator(input);
    cache.set(key, result);
    return result;
  };
};

// Usage
export const memoizedCommonAnimeCalculator = createMemoizedCalculator(
  ({ user1Anime, user2Anime }: { user1Anime: AnimeList; user2Anime: AnimeList }) =>
    calculateCommonAnime(user1Anime, user2Anime)
);
```

### Utility Functions
```typescript
// ✅ Good: Simple utility functions
export const isValidUserId = (userId: string): boolean => {
  return userId.trim().length > 0 && /^[a-zA-Z0-9_]+$/.test(userId);
};

export const formatAnimeTitle = (title: string): string => {
  return title.trim().replace(/\s+/g, ' ');
};

export const safeParseJson = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};
```

## Object and Type Patterns

### Object Creation
```typescript
// ✅ Good: Factory functions instead of classes
export const createAnimeCard = (anime: Anime) => ({
  id: anime.id,
  title: formatAnimeTitle(anime.title),
  imageUrl: anime.coverImage?.large ?? '/default-cover.jpg',
  score: anime.averageScore ?? 0,
  
  // Methods as arrow functions
  getDisplayTitle: (): string => {
    return anime.title.english ?? anime.title.romaji ?? anime.title.native;
  },
  
  isHighRated: (): boolean => {
    return (anime.averageScore ?? 0) >= 80;
  }
});

// ❌ Avoid: Classes
class AnimeCard {
  constructor(private anime: Anime) {}
  
  getDisplayTitle(): string {
    return this.anime.title.english ?? this.anime.title.romaji ?? this.anime.title.native;
  }
}
```

### Type Definitions
```typescript
// ✅ Good: Type aliases for complex types
export type AnimeRepository = {
  readonly getUserAnimeList: (userId: string) => Promise<AnimeList>;
  readonly getAnimeDetails: (animeId: number) => Promise<AnimeDetails>;
  readonly searchAnime: (query: string) => Promise<AnimeSearchResult>;
};

export type ComparisonResult = {
  readonly commonAnime: CommonAnime[];
  readonly user1Stats: UserStats;
  readonly user2Stats: UserStats;
  readonly similarityScore: number;
};

// ✅ Good: Readonly properties for immutability
export type AnimeFilter = {
  readonly genres?: readonly string[];
  readonly year?: number;
  readonly status?: AnimeStatus;
  readonly minScore?: number;
};
```

## React Component Patterns

### Component Definition
```typescript
// ✅ Good: Arrow function components
export const UserInputForm = ({ onSubmit }: UserInputFormProps) => {
  const [userId, setUserId] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValidUserId(userId)) {
      onSubmit(userId.trim());
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter AniList User ID"
      />
      <button type="submit">Compare</button>
    </form>
  );
};

// ✅ Good: Custom hooks as arrow functions
export const useAnimeComparison = () => {
  const [user1Anime] = useAtom(user1Anime$);
  const [user2Anime] = useAtom(user2Anime$);
  const [commonAnime] = useAtom(commonAnime$);
  
  const compare = useCallback(async (userId1: string, userId2: string) => {
    // Implementation
  }, []);
  
  return {
    user1Anime,
    user2Anime,
    commonAnime,
    compare
  };
};
```

### Event Handlers
```typescript
// ✅ Good: Inline arrow functions for simple handlers
export const AnimeCard = ({ anime, onSelect }: AnimeCardProps) => {
  return (
    <div 
      className={animeCardStyle}
      onClick={() => onSelect(anime.id)}
    >
      <img src={anime.coverImage} alt={anime.title} />
      <h3>{anime.title}</h3>
    </div>
  );
};

// ✅ Good: Extracted handlers for complex logic
export const ComparisonForm = ({ onCompare }: ComparisonFormProps) => {
  const [userIds, setUserIds] = useState<string[]>([]);
  
  const handleAddUser = (userId: string) => {
    if (isValidUserId(userId) && !userIds.includes(userId)) {
      setUserIds(prev => [...prev, userId]);
    }
  };
  
  const handleRemoveUser = (userId: string) => {
    setUserIds(prev => prev.filter(id => id !== userId));
  };
  
  const handleSubmit = () => {
    if (userIds.length >= 2) {
      onCompare(userIds);
    }
  };
  
  return (
    // JSX implementation
  );
};
```

## Error Handling Patterns

### Functional Error Handling
```typescript
// ✅ Good: Result type pattern
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

export const safeParseAnimeData = (rawData: unknown): Result<AnimeList> => {
  try {
    const parsed = parseAnimeData(rawData);
    return { success: true, data: parsed };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Parse failed') 
    };
  }
};

// ✅ Good: Error transformation functions
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      type: 'api_error' as const,
      message: error.message,
      timestamp: Date.now()
    };
  }
  
  return {
    type: 'unknown_error' as const,
    message: 'An unexpected error occurred',
    timestamp: Date.now()
  };
};
```

## Testing Patterns

### Test Structure
```typescript
// ✅ Good: Arrow functions in tests
describe('calculateCommonAnime', () => {
  const mockUser1Anime: AnimeList = [
    { id: 1, title: 'Naruto' },
    { id: 2, title: 'Bleach' }
  ];
  
  const mockUser2Anime: AnimeList = [
    { id: 1, title: 'Naruto' },
    { id: 3, title: 'One Piece' }
  ];
  
  it('should return intersection of anime lists', () => {
    const result = calculateCommonAnime(mockUser1Anime, mockUser2Anime);
    
    expect(result).toEqual([
      { id: 1, title: 'Naruto' }
    ]);
  });
  
  it('should handle empty lists', () => {
    const result = calculateCommonAnime([], []);
    expect(result).toEqual([]);
  });
});

// ✅ Good: Test helpers as arrow functions
export const createMockAnimeList = (count: number): AnimeList => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Anime ${index + 1}`,
    averageScore: 80 + index
  }));
};
```

## Import/Export Patterns

### Module Organization
```typescript
// ✅ Good: Named exports with arrow functions
export const calculateCommonAnime = (user1: AnimeList, user2: AnimeList): CommonAnime[] => {
  // Implementation
};

export const calculateSimilarityScore = (common: CommonAnime[], total1: number, total2: number): number => {
  // Implementation
};

// ✅ Good: Grouped exports
export const animeUtils = {
  calculateCommonAnime,
  calculateSimilarityScore,
  formatAnimeTitle,
  isValidUserId
} as const;

// ✅ Good: Re-exports
export { createAnimeRepository } from './repository';
export { handleApiError } from './errorHandling';
export type { AnimeList, CommonAnime } from './types';
```

## jotai Atom Patterns

### Atom Definitions
```typescript
// ✅ Good: Arrow functions for derived atoms
export const commonAnime$ = atom((get) => {
  const user1Anime = get(user1Anime$);
  const user2Anime = get(user2Anime$);
  return calculateCommonAnime(user1Anime, user2Anime);
});

export const comparisonStats$ = atom((get) => {
  const commonAnime = get(commonAnime$);
  const user1Anime = get(user1Anime$);
  const user2Anime = get(user2Anime$);
  
  return calculateComparisonStats(
    commonAnime,
    user1Anime.length,
    user2Anime.length
  );
});

// ✅ Good: Async atoms with arrow functions
export const fetchUserAnime$ = atom(
  null,
  async (get, set, userId: string) => {
    try {
      const repository = get(animeRepository$);
      const animeList = await repository.getUserAnimeList(userId);
      const processedList = processAnimeList(animeList);
      set(user1Anime$, processedList);
      set(errorState$, null);
    } catch (error) {
      set(errorState$, handleApiError(error));
    }
  }
);
```

## Naming Conventions

### Variables and Functions
```typescript
// ✅ Good: Descriptive camelCase
const currentUserAnimeList = getCurrentUserAnimeList();
const isAnimeListEmpty = checkIfAnimeListIsEmpty(animeList);

// ✅ Good: Boolean predicates
const isValidUserId = (userId: string): boolean => { /* */ };
const hasCommonAnime = (user1: AnimeList, user2: AnimeList): boolean => { /* */ };
const canCompareUsers = (userIds: string[]): boolean => { /* */ };

// ✅ Good: Event handlers
const handleUserSubmit = (userId: string) => { /* */ };
const handleAnimeSelect = (animeId: number) => { /* */ };
const handleComparisonComplete = (result: ComparisonResult) => { /* */ };
```

### Types and Interfaces
```typescript
// ✅ Good: PascalCase for types
export type AnimeComparisonResult = {
  readonly commonAnime: CommonAnime[];
  readonly similarityScore: number;
};

export type UserAnimeFilter = {
  readonly status?: AnimeStatus;
  readonly genres?: readonly string[];
};

// ✅ Good: Props suffix for component props
export type UserInputFormProps = {
  readonly onSubmit: (userId: string) => void;
  readonly isLoading?: boolean;
  readonly error?: string;
};
```

## File Organization

### File Naming
```
// ✅ Good: kebab-case for files
anime-utils.ts
comparison-service.ts
user-input-form.tsx
anime-card.css.ts

// ✅ Good: Feature-based organization
features/
  comparison/
    services/
      comparison-service.ts
      anime-utils.ts
      index.ts              # Barrel export
    components/
      user-input-form.tsx
      comparison-result.tsx
      index.ts              # Barrel export
    store/
      comparison-atoms.ts
      index.ts              # Barrel export
    types/
      index.ts              # Barrel export
    index.ts                # Feature barrel export
```

### Barrel Export Strategy (index.ts)

#### Rule: All cross-folder imports MUST go through index.ts
```typescript
// ❌ Forbidden: Direct file imports across folders
import { UserInputForm } from './components/user-input-form';
import { calculateCommonAnime } from './services/comparison-service';

// ✅ Required: Import through index.ts only
import { UserInputForm } from './components';
import { calculateCommonAnime } from './services';
```

#### index.ts Patterns
```typescript
// ✅ Folder-level: Export only from same folder
// components/index.ts
export { UserInputForm } from './user-input-form';
export { ComparisonResult } from './comparison-result';

// ✅ Feature-level: Aggregate from subfolders
// features/comparison/index.ts
export { UserInputForm, ComparisonResult } from './components';
export { calculateCommonAnime } from './services';
export { user1Anime$, commonAnime$ } from './store';
export type { ComparisonResult, AnimeList } from './types';
```

#### Import Rules
```typescript
// ✅ Same folder - direct import allowed
import { helperFunction } from './helper-utils';

// ✅ Cross-folder - must use index.ts
import { UserInputForm } from './components';
import { calculateCommonAnime } from './services';

// ❌ Never: Direct file import across folders
import { UserInputForm } from './components/user-input-form';
```

#### Benefits
- **Module Encapsulation**: Control what is exposed outside the folder
- **Private vs Public API**: Keep internal utilities private while exposing public interface
- **Refactoring Safety**: Move/rename files without breaking external imports

```typescript
// services/internal-helper.ts - Private to services folder
export const privateCalculation = (data: number[]) => { /* */ };

// services/comparison-service.ts - Uses private helper
import { privateCalculation } from './internal-helper'; // ✅ Same folder

// services/index.ts - Only export public API
export { calculateCommonAnime } from './comparison-service';
// privateCalculation is NOT exported - remains private

// Other folders cannot access private functions
import { privateCalculation } from './services'; // ❌ Not available
import { calculateCommonAnime } from './services'; // ✅ Public API only
```

## Performance Considerations

### Memoization Patterns
```typescript
// ✅ Good: useMemo with arrow functions
export const ExpensiveAnimeList = ({ animeList }: { animeList: AnimeList }) => {
  const sortedAnime = useMemo(
    () => animeList.sort((a, b) => b.averageScore - a.averageScore),
    [animeList]
  );
  
  const genreStats = useMemo(
    () => calculateGenreStatistics(animeList),
    [animeList]
  );
  
  return (
    // JSX implementation
  );
};

// ✅ Good: useCallback with arrow functions
export const useAnimeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AnimeSearchResult[]>([]);
  
  const search = useCallback(async (searchQuery: string) => {
    const repository = await getAnimeRepository();
    const searchResults = await repository.searchAnime(searchQuery);
    setResults(searchResults);
  }, []);
  
  return { query, setQuery, results, search };
};
```

## Documentation Patterns

### JSDoc Comments
```typescript
/**
 * Calculates the common anime between two users' anime lists
 * 
 * @param user1Anime - First user's anime list
 * @param user2Anime - Second user's anime list
 * @returns Array of common anime with metadata
 * 
 * @example
 * ```typescript
 * const common = calculateCommonAnime(user1List, user2List);
 * console.log(`Found ${common.length} common anime`);
 * ```
 */
export const calculateCommonAnime = (
  user1Anime: AnimeList,
  user2Anime: AnimeList
): CommonAnime[] => {
  // Implementation
};
```

## Anti-Patterns to Avoid

### ❌ Avoid These Patterns
```typescript
// ❌ Avoid: Function declarations
function calculateCommonAnime() { /* */ }

// ❌ Avoid: Classes when functions suffice
class AnimeCalculator {
  calculate() { /* */ }
}

// ❌ Avoid: Mutable objects
const stats = {
  total: 0,
  common: 0
};
stats.total = 100; // Mutation

// ❌ Avoid: Non-descriptive names
const calc = (a, b) => { /* */ };
const handleClick = () => { /* */ }; // Too generic

// ❌ Avoid: Mixed function styles
export function someFunction() { /* */ }
export const anotherFunction = () => { /* */ };
```

## Conclusion

このコーディングスタイルガイドに従うことで：

1. **一貫性**: プロジェクト全体で統一されたコードスタイル
2. **可読性**: 明確で理解しやすいコード
3. **保守性**: リファクタリングしやすい構造
4. **テスタビリティ**: 純粋関数による高いテスト可能性
5. **型安全性**: TypeScriptの恩恵を最大限活用

関数型プログラミングとアロー関数を中心とした、モダンで保守性の高いコードベースを構築します。