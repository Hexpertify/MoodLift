'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Completing sign-in…');

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const url = new URL(window.location.href);
        const error = url.searchParams.get('error');
        const errorDescription = url.searchParams.get('error_description');
        const code = url.searchParams.get('code');

        if (error) {
          setMessage(errorDescription ? decodeURIComponent(errorDescription) : error);
          return;
        }

        if (!code) {
          setMessage('Missing OAuth code. Please try again.');
          return;
        }

        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          setMessage(exchangeError.message || 'Failed to complete sign-in.');
          return;
        }

        if (!cancelled) {
          router.replace('/');
        }
      } catch {
        setMessage('Failed to complete sign-in.');
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-xl font-semibold">Signing you in</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      </div>
    </main>
  );
}
