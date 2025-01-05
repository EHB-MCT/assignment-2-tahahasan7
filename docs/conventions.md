# Language and System Conventions

## TypeScript Conventions

### Code Style

- Use camelCase for variable and function names.
- Use PascalCase for class and component names.
- Use single quotes for strings, except to avoid escaping.
- End statements with semicolons.

### Project Structure

- Organize files by feature or domain.
- Keep components small and focused.
- Use index files for re-exports.

### Best Practices

- Write descriptive comments and JSDoc for functions and classes.
- Use TypeScript for type safety.
- Follow the DRY (Don't Repeat Yourself) principle.
- Use meaningful names for variables and functions.

## React Conventions

### Component Structure

- Use functional components with hooks.
- Separate presentational and container components.
- Use prop-types or TypeScript for type checking.

### State Management

- Use React Context for global state.
- Use custom hooks for reusable logic.
- Keep local state within components when possible.

### Styling

- Use CSS-in-JS or utility-first CSS frameworks like Tailwind CSS.
- Keep styles scoped to components.

## Supabase Conventions

### Database Schema

- Use UUIDs for primary keys.
- Include created_at and updated_at timestamps.
- Use foreign keys for relationships.

## References

- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Supabase Documentation](https://supabase.com/docs)
