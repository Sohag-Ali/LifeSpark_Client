import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router/dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { router } from './routes/router.jsx';
import AuthProvider from './contexts/AuthContexts/AuthProvider.jsx';
import ThemeProvider from './contexts/ThemeContext/ThemeProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "var(--color-card)",
                  color: "var(--color-card-foreground)",
                  border: "1px solid var(--color-border)",
                },
                success: {
                  iconTheme: { primary: "var(--color-success)", secondary: "var(--color-success-content)" },
                },
                error: {
                  iconTheme: { primary: "var(--color-error)", secondary: "var(--color-error-content)" },
                },
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>,
)
