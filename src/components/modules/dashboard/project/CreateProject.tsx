"use client";

import FXInput from "@/src/components/Form/FXInput";
import cloudinaryUpload from "@/src/utils/cloudinaryUpload";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Checkbox } from "@nextui-org/checkbox";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  Controller,
  FieldValues,
} from "react-hook-form";
import dynamic from "next/dynamic";
import { useCreateProjectMutation } from "@/src/hooks/project.hook";

import { Select, SelectItem } from "@nextui-org/select";
import { createProjectSchema } from "@/src/schemas/projectSchema";
import { useGetTechnologies } from "@/src/hooks/technology.hook";
import { IProject } from "@/src/types";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function CreateProject() {
  const contentConfig = useMemo(
    () => ({
      theme: "default",
      minHeight: 200,
      maxHeight: 400,
      placeholder: "Describe your project in detail",
      textColor: "#000000",
      style: {
        color: "#000000",
      },
    }),
    []
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    mutate: createProject,
    isPending: projectPending,
    isSuccess,
  } = useCreateProjectMutation();

  const { data: technologiesData, isLoading: technologiesLoading } =
    useGetTechnologies();

  let technologyOptions: { key: string; label: string }[] = [];

  if (technologiesData?.data && !technologiesLoading) {
    technologyOptions = technologiesData.data.map(
      (tech: { _id: string; name: string }) => ({
        key: tech._id,
        label: tech.name,
      })
    );
  }

  const methods = useForm<FieldValues>({
    resolver: zodResolver(createProjectSchema),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      setImageFile(null);
      setImagePreview(null);
      reset();
    }
  }, [isSuccess, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = "";

    if (imageFile) {
      imageUrl = await cloudinaryUpload(imageFile);
    }

    const projectData: Partial<IProject> = {
      ...data,
      technologies: data.technologies.split(","),
      image: imageUrl || data.image,
    };
    console.log("project data", projectData);

    createProject(projectData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-20 py-12">
      <h1 className="text-2xl font-semibold">Create a new project</h1>
      <Divider className="my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="title" label="Title" />
            </div>
            <div className="min-w-fit flex-1">
              <Controller
                name="technologies"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      label="Technologies"
                      placeholder="Select technologies"
                      disabled={technologiesLoading}
                      variant="bordered"
                      selectionMode="multiple"
                      className="max-w-xs"
                    >
                      {technologyOptions.map((tech) => (
                        <SelectItem key={tech.key} value={tech.key}>
                          {tech.label}
                        </SelectItem>
                      ))}
                    </Select>
                    {errors.technologies && (
                      <span className="text-red-500 block">
                        {errors.technologies.message as string}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="description" label="Description" />
            </div>
          </div>

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
                        value={field.value}
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

          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="frontendGithubLink" label="Frontend GitHub Link" />
            </div>
            <div className="min-w-fit flex-1">
              <FXInput name="backendGithubLink" label="Backend GitHub Link" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="frontendLiveLink" label="Frontend Live Link" />
            </div>
            <div className="min-w-fit flex-1">
              <FXInput name="backendLiveLink" label="Backend Live Link" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    isSelected={field.value}
                    onValueChange={(isSelected) => field.onChange(isSelected)}
                  >
                    Featured Project
                  </Checkbox>
                )}
              />
            </div>
          </div>

          <div>
            <Divider className="mt-10" />
            <h2 className="text-2xl mt-5">Image</h2>
            <div className="flex flex-wrap gap-4 py-2">
              <div className="min-h-fit flex-1">
                {imagePreview && (
                  <div className="relative w-full h-[200px] rounded-xl border-2 p-2 border-dashed border-default-100">
                    <img
                      className="w-full h-full object-contain rounded-xl"
                      src={imagePreview}
                      alt="Project preview"
                    />
                  </div>
                )}
              </div>

              <div className="min-h-fit flex-1">
                <label
                  htmlFor="image"
                  className="bg-default-100 flex justify-center items-center h-[200px] w-full rounded-md p-4"
                >
                  <span>Upload Image</span>
                </label>
                <input
                  onChange={handleImageChange}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <Button
            isLoading={projectPending}
            className="mt-5"
            radius="none"
            type="submit"
          >
            Create Project
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateProject;
