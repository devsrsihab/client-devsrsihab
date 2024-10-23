"use client";

import { useGetRecipeDetails } from "@/src/hooks/blog.hook";
import { IIngredient } from "@/src/types";
import {
  ClockIcon,
  BeakerIcon,
  FireIcon,
  UserIcon,
  CalendarIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftIcon,
  CameraIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const ViewBlog = ({ blogId }: { blogId: string }) => {
  const { data, isLoading, isError } = useGetRecipeDetails(blogId as string);

  const recipe = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 text-xl mt-10">
        Error loading recipe.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-800 dark:text-gray-100">
      <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
        <Image
          src={recipe?.image}
          alt={recipe?.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <h1 className="text-4xl capitalize font-bold text-gray-800 dark:text-gray-100 mb-4">
        {recipe?.title}
      </h1>

      <p
        className="text-gray-600 dark:text-gray-300 mb-6 text-lg"
        dangerouslySetInnerHTML={{ __html: recipe?.description || "" }}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <ClockIcon className="h-6 w-6 text-blue-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            Prep: {recipe?.prepTime} mins
          </span>
        </div>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <FireIcon className="h-6 w-6 text-orange-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            Cook: {recipe?.cookTime} mins
          </span>
        </div>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <BeakerIcon className="h-6 w-6 text-purple-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            Total: {Number(recipe?.prepTime) + Number(recipe?.cookTime)} mins
          </span>
        </div>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <CameraIcon className="h-6 w-6 text-green-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            {recipe?.category?.name}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <UserIcon className="h-6 w-6 text-gray-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            {recipe?.createdBy?.username}
          </span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="h-6 w-6 text-gray-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            {new Date(recipe?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <HandThumbUpIcon className="h-6 w-6 text-green-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            {recipe?.upvotes} Upvotes
          </span>
        </div>
        <div className="flex items-center">
          <HandThumbDownIcon className="h-6 w-6 text-red-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            {recipe?.downvotes} Downvotes
          </span>
        </div>
        <div className="flex items-center">
          <ChatBubbleLeftIcon className="h-6 w-6 text-blue-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            {recipe?.comments.length} Comments
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Ingredients
          </h2>
          <ul>
            {recipe?.ingredients?.map(
              (ingredient: IIngredient, index: number) => (
                <div className="flex items-center gap-2 mb-3" key={index}>
                  <CheckCircleIcon className="size-4 mt-1 text-green-500" />
                  <li className="text-gray-700 capitalize dark:text-gray-300">
                    {ingredient.name}: {ingredient.quantity}
                  </li>
                </div>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Instructions
          </h2>
          <div
            className="text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: recipe?.instructions || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
