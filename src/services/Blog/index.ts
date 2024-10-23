"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { TBlog } from "@/src/types";

// get all blogs based user createdBy
export const getBlogs = async () => {
  try {
    const res = await axiosInstance.get("/blogs");
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// create blog
export const createBlog = async (blogData: Partial<TBlog>) => {
  try {
    const res = await axiosInstance.post("/blogs", blogData);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get blog details
export const getBlogDetails = async (blogId: string) => {
  try {
    const res = await axiosInstance.get(`/blogs/${blogId}`);
    return res.data;
  } catch (error: any) {
    const errData = {
      success: false,
      message: error?.message,
    };

    return errData;
  }
};

// update blog
export const updateBlog = async (blogId: string, blogData: Partial<TBlog>) => {
  try {
    const res = await axiosInstance.put(`/blogs/${blogId}`, blogData);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete blog
export const deleteBlog = async (blogId: string) => {
  try {
    const res = await axiosInstance.delete(`/blogs/${blogId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// make blog comment
export const makeBlogComment = async (blogId: string, comment: string) => {
  try {
    const res = await axiosInstance.post(`/comments`, {
      blogId,
      comment,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get blog comments
export const getBlogComments = async (
  blogId: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const res = await axiosInstance.get(`/comments/blog/${blogId}`, {
      params: { page, limit },
    });
    return {
      data: res.data.data,
      meta: res.data.meta,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
