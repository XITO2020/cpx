import useSwr from 'swr'
import fetcher from '@/lib/fetcher';


//useCurrentUser.ts est un hook personnalisé pour récupérer les 
//informations de l'utilisateur courant depuis l'API /api/current.

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);
  return {
     data,
    error,
    isLoading,
    mutate,
  }
};

export default useCurrentUser;
