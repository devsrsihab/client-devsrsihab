import ViewBlog from "@/src/components/modules/dashboard/blog/ViewBlog";

const BlogDetailsView = ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;

  return <ViewBlog blogId={blogId} />;
};

export default BlogDetailsView;
