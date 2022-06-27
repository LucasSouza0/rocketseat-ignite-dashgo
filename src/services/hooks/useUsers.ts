import { useQuery, UseQueryOptions } from 'react-query';
import { server } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await server.get('/users', { params: { page } });  
  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: any) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    }
  });

  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), { 
    staleTime: 1000 * 60 * 10, 
    initialData: options.initialData,
  });
}