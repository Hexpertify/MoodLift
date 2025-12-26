'use client';

import { useEffect, useRef } from 'react';
import { useRewards } from '@/hooks/use-rewards';

export function useLogGameActivity(gameName: string, when: boolean, description?: string) {
  const { addActivity } = useRewards();
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!when || loggedRef.current) return;

    loggedRef.current = true;

    addActivity('game', description ?? gameName).catch((error) => {
      // Avoid spamming retries; failing to log should not break gameplay.
      console.error('Failed to log game activity:', error);
    });
  }, [when, addActivity, description, gameName]);
}
