import EditProject from "@/src/components/modules/dashboard/project/EditProject";

const ProjectUpdate = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;
  return <EditProject projectId={projectId} />;
};

export default ProjectUpdate;
