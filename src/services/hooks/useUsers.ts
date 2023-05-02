import { QueryOptions, UseQueryResult, useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type RawUser = Omit<User, 'createdAt'> & {
  created_at: string;
}

type GetUsersResponse = {
  users: User[];
  totalPages: number;
}


export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      page,
    }
  });

  const totalPages = Number(headers['x-total-count']);

  const users = data.users.map((user: RawUser) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return { users, totalPages };
}

export function useUsers(page: number, options?: QueryOptions): UseQueryResult<GetUsersResponse> {
  return useQuery(
    ['users', page], () => getUsers(page),
    {
      staleTime: 1000 * 60 * 20,
      ...options
    }
  );
}