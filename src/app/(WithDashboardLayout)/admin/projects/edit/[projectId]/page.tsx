import EditBlog from "@/src/components/modules/dashboard/blog/EditBlog";

const RecipeUpdate = ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;
  return <EditBlog blogId={blogId} />;
};

export default RecipeUpdate;
