# E-Commerce Application

A simple e-commerce app built with Next.js. This project demonstrates a full-stack implementation with secure authentication, cart management, and a responsive user interface.

## Tech Stack

### Core Technologies

- **Next.js 15.1.7** - React framework for production
- **TypeScript** - For type-safe code
- **tRPC** - End-to-end typesafe API
- **MongoDB & Mongoose** - Database and ODM
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library

## Key Features

### Authentication & Security

- JWT-based authentication flow with secure token management
- Password encryption using bcrypt
- Protected API routes using tRPC middleware
- Client-side token storage

### API Integration & Data Management

- **tRPC Implementation**

  - Strongly typed procedures for user, product, and cart operations
  - Protected routes using middleware authentication
  - Custom error handling and response formatting
  - Integration with Mongoose models for type safety

- **Database Structure**
  - MongoDB integration using Mongoose schemas
  - Type-safe models for Users and Cart items
  - Efficient data relationships between users and their carts

### Type Safety & Validation

- TypeScript implementation throughout
- Zod schemas for validation:
  - User registration and login data
  - Cart operations
  - Product interactions
- Shared types between frontend and backend using tRPC inference

### Frontend Architecture

- **Custom Hooks**

  - `useGetUserInfo` - Managing user authentication state
  - `useLocalStorage` - Type-safe wrapper for browser's localStorage

- **Responsive Design**
  - Mobile-first approach using Tailwind CSS
  - Smooth transitions and animations
  - Adaptive layouts for different screen sizes
  - Custom component styling with shadcn/ui integration

### External API Integration

- Integration with <a href="https://fakestoreapi.com/" target="_blank" rel="noopener noreferrer">FakeStore API</a> for product data
- Axios implementation for external API calls
- Type-safe product interfaces matching external data

## Development Practices

- Monorepo structure for efficient code organization
- Component-driven development with shadcn/ui and custom components
- Mobile-first responsive design
- Type-safe development throughout
- Clean code architecture following SOLID principles

## Getting Started

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev
```

## Design Process

The application's UI/UX was roughly prototyped in Figma, focusing on:

- Clean, minimalist e-commerce layout
- Consistent spacing and typography
- Darker theme color palette

View the Figma design: <a href="https://www.figma.com/design/jp9wHpJqBnak7PVewDk9RG/Untitled?node-id=0-1&t=6lm8b6l1MioD6DAy-1" target="_blank" rel="noopener noreferrer">E-commerce UI Design</a>

## Deployment

This application is deployed on Vercel and can be accessed at:
<a href="https://e-commerce-app-amber-nine.vercel.app/" target="_blank" rel="noopener noreferrer">https://e-commerce-app-amber-nine.vercel.app/</a>
