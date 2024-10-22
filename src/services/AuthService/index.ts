"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// register user service
export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data?.success) {
      cookies().set("srsRecipeAccessToken", data?.data?.accessToken);
      cookies().set("srsRecipeRefreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// login user service
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data?.success) {
      cookies().set("srsRecipeAccessToken", data?.data?.srsRecipeAccessToken);
      cookies().set("srsRecipeRefreshToken", data?.data?.srsRecipeRefreshToken);
    }
    return data;
  } catch (error: any) {
    const errData = {
      success: false,
      message: error?.message,
    };

    return errData;
  }
};

// login out user service
export const logOutUser = () => {
  cookies().delete("srsRecipeAccessToken");
  cookies().delete("srsRecipeRefreshToken");
};

// get user service
export const getCurrentuser = async () => {
  const accessToken = cookies().get("srsRecipeAccessToken")?.value;

  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?._id,
      name: decodedToken?.name,
      email: decodedToken?.email,
      role: decodedToken?.role,
      profilePicture: decodedToken?.profilePicture,
      isPremium: decodedToken?.isPremium,
    };
  }

  return decodedToken;
};

// refresh token service
export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("srsRecipeRefreshToken")?.value;
    const { data } = await axiosInstance({
      method: "POST",
      url: "/auth/refresh-token",
      withCredentials: true,
      headers: {
        cookie: `srsRecipeRefreshToken=${refreshToken}`,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// password change service
export const changePassword = async (changeData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      changeData
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// forget password service
export const forgetPassword = async (forgetData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      forgetData
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// reset password service
export const resetPassword = async (resetData: FieldValues, token: string) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      resetData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  } catch (error: any) {
    if (error && error.message) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while resetting the password");
  }
};
