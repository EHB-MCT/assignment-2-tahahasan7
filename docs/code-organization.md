# Code Organization

## Directory Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication-related components
│   ├── expense/        # Expense-related components
│   └── shared/         # Shared/common components
├── hooks/              # Custom React hooks
├── lib/                # Core functionality and API
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## File Organization Principles

### 1. Small, Focused Files

- Each file has a single responsibility
- Clear and descriptive file names
- Related files grouped in directories

### 2. Component Structure

- One component per file
- Co-located test files
- Shared component logic in hooks

### 3. Code Splitting

Components are split based on:

- Functionality
- Reusability
- Complexity

### 4. Naming Conventions

- Components: PascalCase

  ```typescript
  ExpenseList.tsx;
  AuthModal.tsx;
  ```

- Hooks: camelCase with 'use' prefix

  ```typescript
  useAuth.ts;
  useExpenses.ts;
  ```

- Utilities: camelCase
  ```typescript
  formatters.ts;
  validators.ts;
  ```

### 5. Import Organization

```typescript
// External imports
import React from "react";
import { useQuery } from "react-query";

// Internal imports - hooks
import { useAuth } from "../hooks/useAuth";

// Internal imports - components
import { ExpenseList } from "./ExpenseList";

// Internal imports - utilities
import { formatCurrency } from "../utils/formatters";
```
