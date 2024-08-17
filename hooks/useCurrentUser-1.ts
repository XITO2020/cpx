import useSWR, {SWRResponse} from 'swr';
import { User } from '@/lib/types'; 
import fetcher from '@/lib/fetcher';

const useCurrentUser = (): SWRResponse<User, Error> => {
    const { data, error, isLoading, isValidating, mutate} = useSWR('/api/current', fetcher)

    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }
};

export default useCurrentUser;