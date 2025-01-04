# Database Schema Documentation

## Overview

The Budget Tracker application uses Supabase as its database backend, with a schema designed for efficient expense tracking and user management.

## Tables

### profiles

User profile information linked to authentication.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### expenses

Core expense tracking table with user association.

```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount >= 0),
  category expense_category NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### budget_limits

User-defined budget limits per category.

```sql
CREATE TABLE budget_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  category expense_category NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount >= 0),
  period budget_period NOT NULL DEFAULT 'monthly',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Enums

### expense_category

```sql
CREATE TYPE expense_category AS ENUM (
  'Food',
  'Transport',
  'Bills',
  'Entertainment',
  'Shopping',
  'Health',
  'Other'
);
```

### budget_period

```sql
CREATE TYPE budget_period AS ENUM (
  'monthly',
  'yearly'
);
```

## Row Level Security (RLS)

### profiles

- Users can create their own profile
- Profiles are publicly readable
- Users can only update their own profile

### expenses

- Users can only CRUD their own expenses
- Enforced through user_id foreign key

### budget_limits

- Users can only CRUD their own budget limits
- Enforced through user_id foreign key

## Indexes

### budget_limits

```sql
CREATE INDEX idx_budget_limits_user_category
  ON budget_limits(user_id, category);
```

## Design Decisions

1. **UUID Primary Keys**

   - Used for global uniqueness
   - Better for distributed systems
   - Prevents ID enumeration attacks

2. **Timestamps**

   - All tables include created_at
   - Profiles track updated_at for cache invalidation

3. **Foreign Keys**

   - Maintain referential integrity
   - Cascade deletes where appropriate

4. **Check Constraints**

   - Ensure non-negative amounts
   - Validate data at database level

5. **Row Level Security**
   - Enforced at database level
   - Prevents unauthorized access
   - Simplifies application logic
