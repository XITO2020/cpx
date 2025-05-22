import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useSubwayAccess = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.isPremium && router.pathname.startsWith('/subway')) {
      router.push('/premium?redirect=subway');
    }
  }, [session, router]);

  return {
    hasAccess: !!session?.user?.isPremium,
    isLoading: !session
  };
};