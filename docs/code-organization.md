# Code Organization

## Directory Structure

```
src/
├── components/       # React components
│   ├── auth/        # Authentication components
│   │   ├── AuthModal.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── budget/      # Budget management components
│   │   ├── BudgetLimitForm.tsx
│   │   ├── BudgetLimitList.tsx
│   │   └── BudgetProgress.tsx
│   ├── expense/     # Expense tracking components
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseList.tsx
│   │   └── ExpenseSummary.tsx
│   ├── navigation/  # Navigation components
│   │   └── Navbar.tsx
│   └── ui/          # Shared UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── Select.tsx
├── hooks/           # Custom React hooks
│   └── useAuth.ts
├── lib/            # Core functionality and API
│   ├── budgetLimits.ts
│   ├── expenses.ts
│   └── supabase.ts
├── types/          # TypeScript type definitions
│   └── index.ts
└── utils/          # Utility functions
    ├── budgetCalculations.ts
    ├── cn.ts
    └── formatters.ts
```

## Component Organization

### 1. Domain-based Organization

- Components are organized by domain/feature
- Clear separation between features
- Easy to locate related components

### 2. Component Structure

- One component per file
- Clear and focused responsibilities
- Consistent naming conventions

### 3. Code Splitting

Components are split based on:

- Domain/Feature
- Reusability
- Complexity

### 4. Naming Conventions

- Components: PascalCase

  ```typescript
  ExpenseList.tsx;
  BudgetLimitForm.tsx;
  ```

- Hooks: camelCase with 'use' prefix

  ```typescript
  useAuth.ts;
  ```

- Utilities: camelCase
  ```typescript
  formatters.ts;
  budgetCalculations.ts;
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
