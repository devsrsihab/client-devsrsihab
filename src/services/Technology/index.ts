"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { ITechnology } from "@/src/types";

// get all technologies based user createdBy
export const getTechnologies = async () => {
  try {
    const res = await axiosInstance.get("/technologies");
    return res.data;
  } catch (error: any) {
    const errData = {
      success: false,
      message: error?.message,
    };

    return errData;
  }
};

// create technology
export const createTechnology = async (
  technologyData: Partial<ITechnology>
) => {
  try {
    const res = await axiosInstance.post("/technologies", technologyData);
    return res.data;
  } catch (error: any) {
    const errData = {
      success: false,
      message: error?.message,
    };

    return errData;
  }
};

// get technology details
export const getTechnologyDetails = async (technologyId: string) => {
  try {
    const res = await axiosInstance.get(`/technologies/${technologyId}`);
    return res.data;
  } catch (error: any) {
    const errData = {
      success: false,
      message: error?.message,
    };

    return errData;
  }
};

// update technology
export const updateTechnology = async (
  technologyId: string,
  technologyData: Partial<ITechnology>
) => {
  try {
    const res = await axiosInstance.put(
      `/technologies/${technologyId}`,
      technologyData
    );
    return res.data;
  } catch (error: any) {
    const errData = {
      success: false,
      message: error?.message,
    };

    return errData;
  }
};

// delete technology
export const deleteTechnology = async (technologyId: string) => {
  try {
    const res = await axiosInstance.delete(`/technologies/${technologyId}`);
    return res.data;
  } catch (error: any) {
    const errData = {
      success: false,
      message: error?.message,
    };

    return errData;
  }
};
