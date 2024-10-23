"use client";

import FXInput from "@/src/components/Form/FXInput";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { TBlog } from "@/src/types";
import cloudinaryUpload from "@/src/utils/cloudinaryUpload";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import dynamic from "next/dynamic";
import { Key } from "react";

import { updateBlogSchema } from "@/src/schemas/blog.schema";
import { Select, SelectItem } from "@nextui-org/select";
import {
  useGetBlogDetails,
  useUpdateBlogMutation,
} from "@/src/hooks/blog.hook";
import LoadingSpinner from "@/src/components/UI/LoadingSpinner";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type FormValues = {
  content: string;
  categories: string[];
  title: string;
  description: string;
  tags: string;
};

function EditBlog({ blogId }: { blogId: string }) {
  const contentConfig = useMemo(
    () => ({
      theme: "default",
      minHeight: 200,
      maxHeight: 400,
      placeholder: "Use description to edit your blog",
      textColor: "#000000",
      style: {
        color: "#000000",
      },
    }),
    []
  );

  const [imageFile, setImageFile] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const {
    mutate: updateBlog,
    isPending: blogPending,
    isSuccess,
  } = useUpdateBlogMutation();
  const { data: blogData, isLoading: isBlogLoading } =
    useGetBlogDetails(blogId);

  // get categories
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetCategories();

  // define option let
  let categorieOptions: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categorieOptions = categoriesData?.data?.map(
      (category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      })
    );
  }

  // define methods
  const methods = useForm<FormValues>({
    resolver: zodResolver(updateBlogSchema),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  // if the data successfully submit then reset the form
  useEffect(() => {
    if (isSuccess) {
      setImageFile([]);
      setImagePreview([]);
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (blogData?.data) {
      const blog = blogData.data;
      setValue("title", blog.title);
      setValue(
        "categories",
        blog.categories.map((cat: { _id: string; name: string }) => cat._id)
      );
      setValue("description", blog.description);
      setValue("tags", blog.tags.join(", "));
      setValue("content", blog.content);
      setImagePreview(blog.image ? [blog.image] : []);
    }
  }, [blogData, setValue]);

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = blogData?.data?.image || "";

    if (imageFile.length > 0) {
      imageUrl = await cloudinaryUpload(imageFile[0]);
    }
    const blogUpdateData: Partial<TBlog> = {
      ...data,
      title: data.title,
      categories: data.categories,
      tags: data.tags.split(",").map((id: string) => id.trim()),
      content: data.content,
      image: imageUrl,
    };

    updateBlog({ id: blogId, data: blogUpdateData });
  };

  // handle image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFile([file]);

    // if file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview([reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isBlogLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-20 py-12">
      <h1 className="text-2xl font-semibold">Edit blog</h1>
      <Divider className="my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title and category */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="title" label="Title" />
            </div>
            <div className="min-w-fit flex-1">
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      label="Category"
                      placeholder="Select categories"
                      disabled={categoryLoading}
                      variant="bordered"
                      selectionMode="multiple"
                      className="max-w-xs"
                      selectedKeys={field.value}
                      onSelectionChange={(keys) => {
                        const selectedKeys = Array.from(keys as Set<Key>);
                        field.onChange(selectedKeys);
                      }}
                    >
                      {categorieOptions.map((category) => (
                        <SelectItem key={category.key} value={category.key}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </Select>
                    {errors.categories && (
                      <span className="text-red-500">
                        {errors.categories.message as string}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          {/* description and tags */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="description" label="Description" />
            </div>

            <div className="min-w-fit flex-1">
              <FXInput name="tags" label="Tags" />
            </div>
          </div>

          {/* content */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <>
                    <label className="mb-3" htmlFor="content">
                      Content
                    </label>
                    {isMounted && (
                      <JoditEditor
                        value={field.value as string}
                        onChange={(newContent) => field.onChange(newContent)}
                        config={contentConfig}
                      />
                    )}
                    {errors.content && (
                      <span className="text-red-500">
                        {errors.content.message as string}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          {/* image */}
          <div>
            <Divider className="mt-10" />
            <h2 className="text-2xl mt-5">Image</h2>
            <div className="flex flex-wrap gap-4 py-2">
              <div className="min-h-fit flex-1">
                {/* image preview div */}
                {imagePreview.length > 0 &&
                  imagePreview.map((image, index) => (
                    <div
                      className="relative w-full h-[200px] rounded-xl border-2 p-2 border-dashed border-default-100"
                      key={index}
                    >
                      <img
                        className="w-full h-full object-contain rounded-xl"
                        src={image}
                        alt=""
                      />
                    </div>
                  ))}
              </div>

              <div className="min-h-fit flex-1">
                <label
                  htmlFor="image"
                  className="bg-default-100 flex justify-center items-center h-[200px] w-full rounded-md p-4"
                >
                  <span>Upload Image</span>
                </label>
                <input
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                />
              </div>
            </div>
          </div>

          <Button
            isLoading={blogPending}
            className="mt-5"
            radius="none"
            type="submit"
          >
            Update
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default EditBlog;
