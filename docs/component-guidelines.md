# Component Documentation

## Overview

This document outlines both the guidelines for component development and the available UI components in the Budget Tracker application.

## Component Guidelines

### 1. Component Structure

```typescript
// 1. Imports
import React from "react";
import { useAuth } from "../hooks/useAuth";

// 2. Types
type Props = {
  // ...
};

// 3. Component
export function MyComponent({ prop1, prop2 }: Props) {
  // ...
}
```

### 2. Best Practices

- One component per file
- Clear and descriptive prop types
- Proper error handling
- Consistent naming conventions
- Reusable and focused components

### 3. State Management

```typescript
// Local state
const [value, setValue] = useState("");

// Grouped related state
const [form, setForm] = useState({
  username: "",
  email: "",
});
```

### 4. Event Handlers

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Implementation
};
```

## UI Components

### Button

A versatile button component supporting different variants and states.

```tsx
<Button
  variant="primary" // 'primary' | 'secondary' | 'danger' | 'ghost'
  size="md" // 'sm' | 'md' | 'lg'
  isLoading={false}
>
  Click me
</Button>
```

### Input

Form input component with label and error state support.

```tsx
<Input label="Email" type="email" error="Please enter a valid email" required />
```

### Select

Dropdown selection component with label support.

```tsx
<Select
  label="Category"
  options={[
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
  ]}
/>
```

### Card

Container component for grouping related content.

```tsx
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Modal

Dialog component for important interactions.

```tsx
<Modal isOpen={true} onClose={() => {}} title="Dialog Title">
  Modal content
</Modal>
```

## Component Types

### 1. Presentational Components

Pure rendering components focused on UI.

```typescript
function ExpenseList({ expenses, onDelete }: Props) {
  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.amount}
          <button onClick={() => onDelete(expense.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

### 2. Container Components

Components that manage data and state.

```typescript
function ExpenseListContainer() {
  const { expenses, deleteExpense } = useExpenses();
  return <ExpenseList expenses={expenses} onDelete={deleteExpense} />;
}
```

### 3. Layout Components

Components that handle page structure.

```typescript
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
  );
}
```

## Accessibility Guidelines

1. Always provide labels for form inputs
2. Ensure keyboard navigation
3. Use appropriate ARIA attributes
4. Maintain proper contrast ratios
5. Support screen readers
