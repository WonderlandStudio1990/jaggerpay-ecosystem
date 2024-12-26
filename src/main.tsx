import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TempoDevtools } from "tempo-devtools"
import App from './App.tsx'
import './index.css'

// Initialize Tempo Devtools
if (import.meta.env.VITE_TEMPO) {
  TempoDevtools.init();
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);