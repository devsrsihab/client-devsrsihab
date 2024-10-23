import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  createProject,
  deleteProject,
  getProjectDetails,
  getProjects,
  updateProject,
} from "../services/Project";

// create projects
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_PROJECT"],
    mutationFn: async (postData) => await createProject(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PROJECTS"] });
      toast.success("Project Created Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// get all projects based user createdBy
export const useGetProjects = () => {
  return useQuery({
    queryKey: ["GET_PROJECTS"],
    queryFn: async () => await getProjects(),
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

// get project details
export const useGetProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: ["GET_PROJECT_DETAILS", projectId],
    queryFn: async () => {
      const res = await getProjectDetails(projectId);
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

// update project
export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_PROJECT"],
    mutationFn: async ({ id, data }) => await updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PROJECTS"] });
      toast.success("Project Updated Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// delete project
export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_PROJECT"],
    mutationFn: async (projectId) => await deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PROJECTS"] });
      toast.success("Project Deleted Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};
