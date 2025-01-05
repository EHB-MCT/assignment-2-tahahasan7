# State Management Documentation

## Overview

The Budget Tracker application uses a combination of local and remote state management strategies to handle both authenticated and non-authenticated user experiences.

## State Types

### Authentication State

```typescript
// Managed by useAuth hook
type AuthState = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
};
```

### Expense State

```typescript
// App component state
type ExpenseState = {
  expenses: Expense[]; // Authenticated user expenses
  localExpenses: Expense[]; // Non-authenticated user expenses
  error: string | null;
};
```

## State Management Strategies

### 1. Authentication State

- Managed by `useAuth` custom hook
- Persisted through Supabase session
- Provides user and profile information

### 2. Expense State

- Authenticated: Stored in Supabase
- Non-authenticated: Stored in localStorage
- Automatic switching based on auth state

### 3. UI State

- Component-level state for forms
- Modal visibility state
- Loading and error states

## Data Persistence

### Authenticated Storage

```typescript
// Supabase storage
async function persistExpense(expense: NewExpense, userId: string) {
  const { data, error } = await supabase
    .from("expenses")
    .insert([{ ...expense, user_id: userId }]);
  // Handle result
}
```

### Local Storage

```typescript
// localStorage persistence
function persistLocalExpense(expense: Expense) {
  const expenses = getLocalExpenses();
  localStorage.setItem("localExpenses", JSON.stringify([expense, ...expenses]));
}
```

## State Updates

### 1. Adding Expenses

```typescript
const handleAddExpense = async (newExpense: NewExpense) => {
  if (user) {
    // Add to Supabase
    const expense = await addExpense(newExpense, user.id);
    setExpenses((prev) => [expense, ...prev]);
  } else {
    // Add to localStorage
    const localExpense = { id: crypto.randomUUID(), ...newExpense };
    setLocalExpenses((prev) => [localExpense, ...prev]);
  }
};
```

### 2. Updating Expenses

```typescript
const handleUpdateExpense = async (updatedExpense: Expense) => {
  if (user) {
    // Update in Supabase
    const expense = await updateExpense(updatedExpense, user.id);
    setExpenses((prev) => prev.map((e) => (e.id === expense.id ? expense : e)));
  } else {
    // Update in localStorage
    setLocalExpenses((prev) =>
      prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    );
  }
};
```

## Error Handling

```typescript
try {
  // Perform operation
} catch (err) {
  setError("Operation failed");
  console.error("Error:", err);
} finally {
  // Cleanup if needed
}
```
