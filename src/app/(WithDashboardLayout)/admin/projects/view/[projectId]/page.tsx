import ViewProject from "@/src/components/modules/dashboard/project/ViewProject";

const ProjectDetailsView = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;

  return <ViewProject projectId={projectId} />;
};

export default ProjectDetailsView;
