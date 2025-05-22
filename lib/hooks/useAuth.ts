import { useCallback, useMemo } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useSessionContext } from '@/contexts/SessionContext';

export function useAuth() {
  const session = useSessionContext();

  const signInUser = useCallback(async (
    email: string,
    password: string
  ) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }, []);

  const authState = useMemo(() => ({
    isAuthenticated: !!session?.user,
    user: session?.user,
    isAdmin: session?.admin ?? false,
    isPremium: session?.user?.isPremium ?? false,
  }), [session]);

  return {
    ...authState,
    signIn: signInUser,
    signOut: signOutUser,
  };
}