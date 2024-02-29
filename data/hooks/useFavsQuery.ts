import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useFavsQuery = function() {
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: [`favs`],
    queryFn: async () => {
      const response = await fetch(`/favs`);
      // @ts-ignore
      return await response.json();
    },
  });

  return query;
}