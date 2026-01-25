# Warp AI Rules for Next.js Project

## Framework & Stack
- This is a Next.js application (React framework)
- Use TypeScript for type safety
- Follow Next.js 13+ App Router conventions when applicable

## Code Style
- Use functional components with hooks
- Prefer arrow functions for components
- Use TypeScript interfaces over types when defining component props
- Follow ESLint and Prettier configurations in the project

## File Structure
- Components go in `/components` or `/app/components`
- Pages use App Router (`/app`) or Pages Router (`/pages`) based on project setup
- Utilities in `/lib` or `/utils`
- Types in `/types` or co-located with components

## Next.js Specific
- Use `next/image` for images
- Use `next/link` for navigation
- Use `next/font` for font optimization
- Implement Server Components by default (if using App Router)
- Mark components with 'use client' only when necessary (browser APIs, event handlers, hooks)

## Performance
- Implement code splitting where appropriate
- Use dynamic imports for heavy components
- Optimize images with next/image
- Use React.memo for expensive pure components

## API Routes
- API routes go in `/pages/api` (Pages Router) or `/app/api` (App Router)
- Use proper HTTP methods and status codes
- Implement error handling

## Testing
- Write tests for critical functionality
- Use React Testing Library for component tests
- Mock Next.js router when testing

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm test` - Run tests
