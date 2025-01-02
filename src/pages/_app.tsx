import type { AppProps } from 'next/app';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
      <Toaster />
    </SettingsProvider>
  );
} 