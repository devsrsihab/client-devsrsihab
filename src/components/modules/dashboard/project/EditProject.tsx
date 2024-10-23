"use client";

import FXInput from "@/src/components/Form/FXInput";
import { IProject } from "@/src/types";
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

import {
  useGetProjectDetails,
  useUpdateProjectMutation,
} from "@/src/hooks/project.hook";
import LoadingSpinner from "@/src/components/UI/LoadingSpinner";
import { useGetTechnologies } from "@/src/hooks/technology.hook";
import { updateProjectSchema } from "@/src/schemas/projectSchema";
import { Select, SelectItem } from "@nextui-org/select";
import { Switch } from "@nextui-org/switch";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type FormValues = {
  content: string;
  technologies: string[];
  title: string;
  description: string;
  frontendGithubLink: string;
  backendGithubLink: string;
  frontendLiveLink: string;
  backendLiveLink: string;
  isFeatured: boolean;
};

function EditProject({ projectId }: { projectId: string }) {
  const contentConfig = useMemo(
    () => ({
      theme: "default",
      minHeight: 200,
      maxHeight: 400,
      placeholder: "Use description to edit your project",
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
    mutate: updateProject,
    isPending: projectPending,
    isSuccess,
  } = useUpdateProjectMutation();
  const { data: projectData, isLoading: isProjectLoading } =
    useGetProjectDetails(projectId);

  // get technologies
  const { data: technologiesData, isLoading: technologyLoading } =
    useGetTechnologies();

  // define option let
  let technologiesOptions: { key: string; label: string }[] = [];

  if (technologiesData?.data && !technologyLoading) {
    technologiesOptions = technologiesData?.data?.map(
      (technology: { _id: string; name: string }) => ({
        key: technology._id,
        label: technology.name,
      })
    );
  }

  // define methods
  const methods = useForm<FormValues>({
    resolver: zodResolver(updateProjectSchema),
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
    if (projectData?.data) {
      const project = projectData.data;
      setValue("title", project.title);
      setValue(
        "technologies",
        project.technologies.map(
          (tech: { _id: string; name: string }) => tech._id
        )
      );
      setValue("description", project.description);
      setValue("content", project.content);
      setValue("frontendGithubLink", project.frontendGithubLink);
      setValue("backendGithubLink", project.backendGithubLink);
      setValue("frontendLiveLink", project.frontendLiveLink);
      setValue("backendLiveLink", project.backendLiveLink);
      setValue("isFeatured", project.isFeatured);
      setImagePreview(project.image ? [project.image] : []);
    }
  }, [projectData, setValue]);

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = projectData?.data?.image || "";

    if (imageFile.length > 0) {
      imageUrl = await cloudinaryUpload(imageFile[0]);
    }
    const projectUpdateData: Partial<IProject> = {
      ...data,
      technologies: data.technologies,
      image: imageUrl,
    };

    updateProject({ id: projectId, data: projectUpdateData });
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

  if (isProjectLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-20 py-12">
      <h1 className="text-2xl font-semibold">Edit Project</h1>
      <Divider className="my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title and technologies */}
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
                      label="Technologies"
                      placeholder="Select technologies"
                      disabled={technologyLoading}
                      variant="bordered"
                      selectionMode="multiple"
                      className="max-w-xs"
                      selectedKeys={field.value}
                      onSelectionChange={(keys) => {
                        const selectedKeys = Array.from(keys as Set<Key>);
                        field.onChange(selectedKeys);
                      }}
                    >
                      {technologiesOptions.map((technology) => (
                        <SelectItem key={technology.key} value={technology.key}>
                          {technology.label}
                        </SelectItem>
                      ))}
                    </Select>
                    {errors.technologies && (
                      <span className="text-red-500">
                        {errors.technologies.message as string}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          {/* description and isFeatured */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="description" label="Description" />
            </div>
            <div className="min-w-fit flex-1">
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Switch
                    isSelected={field.value}
                    onValueChange={field.onChange}
                  >
                    Featured Project
                  </Switch>
                )}
              />
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

          {/* Links */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="frontendGithubLink" label="Frontend Github Link" />
            </div>
            <div className="min-w-fit flex-1">
              <FXInput name="backendGithubLink" label="Backend Github Link" />
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
            isLoading={projectPending}
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

export default EditProject;
