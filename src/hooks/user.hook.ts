import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  changeRole,
  changeStatus,
  createUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../services/UserService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { getUserRecipes } from "../services/UserProfile";

//  get all users
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["ALL_USERS"],
    queryFn: async () => await getAllUsers(),
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

//  get user by id
export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["SINGLE_USER", id],
    queryFn: async () => await getUserById(id),
    refetchOnWindowFocus: false,
  });
};

// delete user by id
export const useDeleteUserByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER_BY_ID"],
    mutationFn: async (id) => await deleteUserById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS", "SINGLE_USER"] });
      toast.success("User Deleted Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

//  change role
export const useChangeRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_ROLE"],
    mutationFn: async ({ id, role }) => await changeRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS", "SINGLE_USER"] });
      toast.success("User Role Updated Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

// change status
export const useChangeStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_STATUS"],
    mutationFn: async ({ id, status }) => await changeStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS", "SINGLE_USER"] });
      toast.success("User Status Updated Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

//  create user
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_USER"],
    mutationFn: async (postData) => await createUser(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS"] });
      toast.success("User Created Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

//  update user by id
export const useUpdateUserByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_USER_BY_ID"],
    mutationFn: async ({ id, data }) => await updateUserById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS", "SINGLE_USER"] });
      toast.success("User Updated Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

// user recipes
export const useGetRecipeComments = (
  recipeId: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["USER_RECIPES", recipeId, page, limit],
    queryFn: async () => {
      const response = await getUserRecipes(recipeId);
      return {
        recipes: response.data,
        meta: response.meta,
      };
    },
    select: (data) => ({
      recipes: data.recipes,
      meta: data.meta,
    }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
};
