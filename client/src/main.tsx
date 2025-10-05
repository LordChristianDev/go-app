import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import '@/index.css';
import App from '@/App.tsx';

const queryClient = new QueryClient()

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, config);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);