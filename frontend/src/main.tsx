/**
 * main.tsx - React Application Entry Point
 * 
 * This file serves as the entry point for the React application.
 * It sets up:
 * - React Query for data fetching and caching
 * - Root element mounting
 * - Application providers
 * 
 * Key Concepts:
 * - React Query configuration
 * - React DOM rendering
 * - Application providers
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import './i18n';

/**
 * QueryClient Configuration
 * 
 * Sets up React Query with custom options:
 * - retry: false - Prevents automatic retries on failed requests
 * - refetchOnWindowFocus: false - Prevents refetching when window regains focus
 * - staleTime: 5 minutes - How long data is considered fresh before refetching
 * 
 * These settings optimize performance and user experience
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

/**
 * Root Element Setup
 * 
 * 1. Gets the root DOM element
 * 2. Throws error if root element not found
 * 3. Creates React root for concurrent rendering
 */
const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

/**
 * Application Rendering
 * 
 * Renders the application with:
 * - React.StrictMode for development checks
 * - QueryClientProvider for data fetching
 * - Main App component
 */
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
