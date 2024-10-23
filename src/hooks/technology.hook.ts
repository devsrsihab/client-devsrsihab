import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  createTechnology,
  deleteTechnology,
  getTechnologyDetails,
  getTechnologies,
  updateTechnology,
} from "../services/Technology";

// create technologys
export const useCreateTechnologyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_TECHNOLOGY"],
    mutationFn: async (postData) => await createTechnology(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TECHNOLOGIES"] });
      toast.success("Technology Created Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// get all technologys based user createdBy
export const useGetTechnologies = () => {
  return useQuery({
    queryKey: ["GET_TECHNOLOGIES"],
    queryFn: async () => await getTechnologies(),
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

// get technology details
export const useGetTechnologyDetails = (technologyId: string) => {
  return useQuery({
    queryKey: ["GET_TECHNOLOGY_DETAILS", technologyId],
    queryFn: async () => {
      const res = await getTechnologyDetails(technologyId);
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

// update technology
export const useUpdateTechnologyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_TECHNOLOGY"],
    mutationFn: async ({ id, data }) => await updateTechnology(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TECHNOLOGIES"] });
      toast.success("Technology Updated Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// delete technology
export const useDeleteTechnologyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_TECHNOLOGY"],
    mutationFn: async (technologyId) => await deleteTechnology(technologyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TECHNOLOGIES"] });
      toast.success("Technology Deleted Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};
