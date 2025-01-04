# Design Patterns

## Component Patterns

### 1. Container/Presentational Pattern

Used to separate data fetching from presentation:

```typescript
// Container Component
function ExpenseListContainer() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return <ExpenseList expenses={expenses} />;
}

// Presentational Component
function ExpenseList({ expenses }: ExpenseListProps) {
  return <div>{/* render expenses */}</div>;
}
```

### 2. Custom Hooks Pattern

Extracting reusable logic into hooks:

```typescript
function useExpenses(userId: string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // ... implementation
  return { expenses, addExpense, updateExpense };
}
```

### 3. Render Props Pattern

For flexible component composition:

```typescript
function ExpenseFilter({ children, expenses }) {
  const [filtered, setFiltered] = useState(expenses);
  return children(filtered);
}
```

## State Management Patterns

### 1. Local Component State

For UI-specific state:

```typescript
function ExpenseForm() {
  const [amount, setAmount] = useState("");
  // ... implementation
}
```

### 2. Lifted State

For shared state between components:

```typescript
function ExpenseDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  return (
    <>
      <CategoryFilter onSelect={setSelectedCategory} />
      <ExpenseList category={selectedCategory} />
    </>
  );
}
```

### 3. Custom Hook State

For reusable business logic:

```typescript
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... implementation
}
```

## Error Handling Patterns

### 1. Error Boundaries

For catching and handling React component errors:

```typescript
class ErrorBoundary extends React.Component {
  // ... implementation
}
```

### 2. Try-Catch Pattern

For handling async operations:

```typescript
async function fetchExpenses() {
  try {
    const expenses = await api.getExpenses();
    return expenses;
  } catch (error) {
    handleError(error);
  }
}
```

## Form Patterns

### 1. Controlled Components

For form inputs:

```typescript
function ExpenseForm() {
  const [amount, setAmount] = useState("");
  return <input value={amount} onChange={(e) => setAmount(e.target.value)} />;
}
```

### 2. Form Validation

Using custom hooks:

```typescript
function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  // ... implementation
}
```
