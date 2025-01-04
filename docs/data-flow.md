# Data Flow Documentation

## Local vs. Authenticated Storage Flow

```mermaid
flowchart TD
    A[User Action] --> B{User Authenticated?}
    B -->|Yes| C[Supabase Storage]
    B -->|No| D[Local Storage]
    C --> E[Database]
    D --> F[Browser localStorage]
    E & F --> G[Update UI]
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant AuthUI
    participant useAuth
    participant Supabase
    participant Database

    User->>AuthUI: Enter credentials
    AuthUI->>useAuth: Submit credentials
    useAuth->>Supabase: Sign in/up request
    Supabase->>Database: Validate & store
    Database-->>Supabase: Success/Error
    Supabase-->>useAuth: Session
    useAuth-->>AuthUI: Update UI state
    AuthUI-->>User: Show result
```

## Expense Management Flow

```mermaid
sequenceDiagram
    participant UI
    participant App
    participant Storage
    participant Database

    UI->>App: Add/Update/Delete expense
    alt Authenticated
        App->>Storage: Call Supabase operation
        Storage->>Database: Apply RLS policies
        Database-->>Storage: Return result
        Storage-->>App: Update state
    else Not Authenticated
        App->>Storage: Update localStorage
        Storage-->>App: Return updated data
    end
    App-->>UI: Re-render with new data
```

## Component Hierarchy

```mermaid
flowchart TD
    A[App] --> B[Navbar]
    A --> C[ExpenseSummary]
    A --> D[ExpenseForm]
    A --> E[ExpenseList]
    D & E --> F[UI Components]
    F --> G[Button]
    F --> H[Input]
    F --> I[Select]
    F --> J[Card]
    F --> K[Modal]
```

## State Management Flow

```mermaid
flowchart TD
    A[User Action] --> B{Auth State}
    B -->|Authenticated| C[Remote State]
    B -->|Not Authenticated| D[Local State]
    C --> E[Supabase]
    D --> F[localStorage]
    E & F --> G[UI Update]
```

## Error Handling Flow

```mermaid
sequenceDiagram
    participant Component
    participant App
    participant Storage
    participant ErrorState

    Component->>App: Operation request
    alt Authenticated
        App->>Storage: Execute Supabase operation
        Storage-->>App: Success/Error
    else Not Authenticated
        App->>Storage: Update localStorage
        Storage-->>App: Success/Error
    end
    App->>ErrorState: Set error message
    ErrorState-->>Component: Show error UI
```
