import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  createBlog,
  deleteBlog,
  getBlogDetails,
  getBlogs,
  updateBlog,
} from "../services/Blog";

// create recipes
export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_RECIPE"],
    mutationFn: async (postData) => await createBlog(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_RECIPE_FEEDS"] });
      toast.success("Blog Created Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// get all recipes based user createdBy
export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["GET_RECIPES"],
    queryFn: async () => await getBlogs(),
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

// get recipe details
export const useGetBlogDetails = (blogId: string) => {
  return useQuery({
    queryKey: ["GET_BLOG_DETAILS", blogId],
    queryFn: async () => {
      const res = await getBlogDetails(blogId);
      if (res?.success === false) {
        toast.error(res?.message);
        return res;
      } else {
        return res;
      }
    },
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

// update recipe
export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_RECIPE"],
    mutationFn: async ({ id, data }) => await updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_RECIPE_FEEDS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_RECIPES"] });
      toast.success("Blog Updated Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// delete recipe
export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async (recipeId) => await deleteBlog(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_RECIPES"] });
      toast.success("Blog Deleted Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};
