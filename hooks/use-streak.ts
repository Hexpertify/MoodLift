import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { rewardsService } from '@/lib/rewards-service';
import {
  calculateStreakUpdate,
  getToday,
  StreakData,
  StreakUpdateResult,
} from '@/lib/streak-utils';

interface UseStreakResult {
  streakData: StreakData | null;
  loading: boolean;
  error: string | null;
  updateStreak: () => Promise<StreakUpdateResult | null>;
  refetchStreak: () => Promise<void>;
}

export function useStreak(): UseStreakResult {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreak = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setStreakData(null);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('user_streaks')
        .select('current_streak, longest_streak, last_login_date')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      if (data) {
        setStreakData({
          currentStreak: data.current_streak,
          longestStreak: data.longest_streak,
          lastLoginDate: data.last_login_date,
        });
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch streak');
      setLoading(false);
    }
  }, []);

  const updateStreak = useCallback(async (): Promise<StreakUpdateResult | null> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return null;
      }

      const today = getToday();

      // Record daily login activity (used by Dashboard Check-in Log)
      try {
        const alreadyLogged = await rewardsService.hasActivityToday(user.id, 'daily_login');
        if (!alreadyLogged) {
          await rewardsService.addActivity(user.id, 'daily_login', 'Daily Login');
        }
      } catch (e) {
        // Don't block streak updates if rewards logging fails
        console.error('Failed to log daily_login activity:', e);
      }

      if (!streakData) {
        // New user, create initial streak record
        const { error: insertError } = await supabase
          .from('user_streaks')
          .insert({
            user_id: user.id,
            current_streak: 1,
            longest_streak: 1,
            last_login_date: today,
            updated_at: new Date().toISOString(),
          });

        if (insertError) {
          setError(insertError.message);
          return null;
        }

        const newStreakData = {
          currentStreak: 1,
          longestStreak: 1,
          lastLoginDate: today,
        };

        setStreakData(newStreakData);

        return {
          currentStreak: 1,
          longestStreak: 1,
          isNewStreak: true,
          streakBroken: false,
        };
      }

      const streakUpdate = calculateStreakUpdate(
        streakData.currentStreak,
        streakData.longestStreak,
        streakData.lastLoginDate
      );

      const { error: updateError } = await supabase
        .from('user_streaks')
        .update({
          current_streak: streakUpdate.currentStreak,
          longest_streak: streakUpdate.longestStreak,
          last_login_date: today,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateError) {
        setError(updateError.message);
        return null;
      }

      setStreakData({
        currentStreak: streakUpdate.currentStreak,
        longestStreak: streakUpdate.longestStreak,
        lastLoginDate: today,
      });

      return streakUpdate;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update streak';
      setError(errorMessage);
      return null;
    }
  }, [streakData]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return {
    streakData,
    loading,
    error,
    updateStreak,
    refetchStreak: fetchStreak,
  };
}