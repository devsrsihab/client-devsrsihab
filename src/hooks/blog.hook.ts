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

// create blogs
export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_BLOG"],
    mutationFn: async (postData) => await createBlog(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOGS"] });
      toast.success("Blog Created Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// get all blogs based user createdBy
export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["GET_BLOGS"],
    queryFn: async () => await getBlogs(),
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

// get blog details
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

// update blog
export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_BLOG"],
    mutationFn: async ({ id, data }) => await updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOGS"] });
      toast.success("Blog Updated Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// delete blog
export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: async (blogId) => await deleteBlog(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOGS"] });
      toast.success("Blog Deleted Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};
