import { useMutation, useQueryClient } from "@tanstack/react-query";

const data = require("../api/cma_artwork.json");

export const useFavStatusMutation = function () {
  const queryClient = useQueryClient();

  // Queries
  const query = useMutation({
    mutationFn: async (favStatus: { id: string; status: boolean }) => {
      const { id, status } = favStatus;
      return false
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData([`works:fav:${variables.id}`], variables.status);
      queryClient.invalidateQueries({ queryKey: ['favs'] })
    },
  });

  return query;
};
