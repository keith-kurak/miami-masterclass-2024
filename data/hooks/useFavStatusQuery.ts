import { useQuery, useQueryClient } from "@tanstack/react-query";

const data = require("../api/cma_artwork.json");

export const useFavStatusQuery = function(id: string) {
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: [`works:fav:${id}`],
    queryFn: async () => {
      const response = await fetch(`/works/${id}/fav`);
      return await response.json();
    },
  });

  return query;
}