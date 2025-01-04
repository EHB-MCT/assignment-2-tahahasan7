# Budget Tracker

A modern expense tracking application built with React, TypeScript, and Supabase, following best practices and a component-based architecture.

## 🏗️ Architecture

The application follows a modern, component-based architecture with clear separation of concerns. For detailed architecture information, see [Architecture Documentation](docs/architecture.md).

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: React Hooks with Context
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Linting**: ESLint

## 🛠️ Development Setup

1. **Prerequisites**

   - Node.js 18+
   - npm 9+

2. **Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=https://najjgwkuynuoghlauowy.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hampnd2t1eW51b2dobGF1b3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3MzEzNzcsImV4cCI6MjA1MTMwNzM3N30.CpA4AGnte-fMB8PnzycbT9TGoAOePEF6Q9-OCmQ0fCg
   ```

3. **Installation**

   ```bash
   npm install
   ```

4. **Development Server**

   ```bash
   npm run dev
   ```

5. **Build**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── lib/           # Core functionality
├── types/         # TypeScript types
└── utils/         # Utility functions
```

See [Code Organization](docs/code-organization.md) for detailed structure information.

## 🏛️ Design Patterns

The project uses several key design patterns:

- Container/Presentational Pattern
- Custom Hooks Pattern
- Render Props Pattern

For more details, see [Design Patterns](docs/design-patterns.md).

## 🔐 Authentication

Authentication is handled through Supabase Auth with:

- Email/Password authentication
- Protected routes
- User profiles
- Session management

See [Authentication Flow](docs/data-flow.md) for implementation details.

## 💾 Database Schema

The application uses Supabase with the following main tables:

- `profiles`: User profiles
- `expenses`: User expenses
- `budget_limits`: Budget limits per category

For complete schema information, see [Database Schema](docs/database-schema.md).

## 🎯 Key Design Decisions

1. **State Management**

   - Used React Context and Hooks instead of Redux for simplicity
   - Local state for UI components
   - Global state for auth and shared data

2. **Component Architecture**

   - Small, focused components
   - Clear separation of concerns
   - Reusable UI components

3. **Type Safety**

   - Strict TypeScript configuration
   - Shared type definitions
   - Runtime type checking where necessary

4. **Performance**
   - Code splitting
   - Lazy loading
   - Optimistic updates
   - Efficient re-rendering strategies

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [Code Organization](docs/code-organization.md)
- [Component Guidelines](docs/component-guidelines.md)
- [Data Flow](docs/data-flow.md)
- [Database Schema](docs/database-schema.md)
- [Design Patterns](docs/design-patterns.md)
- [State Management](docs/state-management.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

see the [CONTRIBUTION GUIDELINES](CONTRIBUTION_GUIDELINES.md) file for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## 📚 References

### Official Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Design Patterns & Best Practices

- [React Patterns](https://reactpatterns.com/)
- [TypeScript Design Patterns](https://refactoring.guru/design-patterns/typescript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### UI/UX

- [Lucide Icons](https://lucide.dev/)

### Videos

- [React Supabase CRUD Tutorial](https://www.youtube.com/watch?v=tW1HO7i9EIM&ab_channel=PedroTech)

### Chatgpt

- [Commits](https://chatgpt.com/share/67794611-d050-8011-9bb0-f5de01bec02e)
- [supabase extension and migration](https://chatgpt.com/share/6779471a-3734-8011-922a-956e6b3091db)

## 👤 Taha Hasan

- ✉️ **Email**: taha.hasan@student.ehb.be
- 💻 **GitHub**: [tahahasan7](https://github.com/tahahasan7)
