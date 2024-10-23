import EditBlog from "@/src/components/modules/dashboard/blog/EditBlog";

const RecipeUpdate = ({ params }: { params: { updateRecipe: string } }) => {
  const { updateRecipe } = params;
  return <EditBlog recipeId={updateRecipe} />;
};

export default RecipeUpdate;
