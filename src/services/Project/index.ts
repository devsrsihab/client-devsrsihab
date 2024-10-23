"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IProject } from "@/src/types";

// get all projects based user createdBy
export const getProjects = async () => {
  try {
    const res = await axiosInstance.get("/projects");
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// create project
export const createProject = async (projectData: Partial<IProject>) => {
  try {
    const res = await axiosInstance.post("/projects", projectData);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get project details
export const getProjectDetails = async (projectId: string) => {
  try {
    const res = await axiosInstance.get(`/projects/${projectId}`);
    return res.data;
  } catch (error: any) {
    const errData = {
      success: false,
      message: error?.message,
    };

    return errData;
  }
};

// update project
export const updateProject = async (
  projectId: string,
  projectData: Partial<IProject>
) => {
  try {
    const res = await axiosInstance.put(`/projects/${projectId}`, projectData);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete project
export const deleteProject = async (projectId: string) => {
  try {
    const res = await axiosInstance.delete(`/projects/${projectId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
