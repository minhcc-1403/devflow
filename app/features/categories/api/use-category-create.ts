import { QueryClient, useMutation } from "@tanstack/vue-query";
import { categoryApi } from "~/apis/1-category.api";
import { toast } from "~/components/ui/toast";
import type { CreateCategory } from "~/validations/category.validation";
const queryClient = new QueryClient();

export const useCategoryCreate = () => {
  const mutation = useMutation({
    mutationFn: (input: CreateCategory) => categoryApi.create(input!),
    onSuccess: () => {
      toast({ title: "Success", description: "Category created successfully" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return mutation;
};
