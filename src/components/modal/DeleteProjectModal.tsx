"use client";

import { useDeleteProjectMutation } from "@/src/hooks/project.hook";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";

export default function DeleteProjectModal({
  projectId,
  buttonContent,
}: {
  projectId?: string;
  buttonContent?: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteProject, isPending: deleteProjectLoading } =
    useDeleteProjectMutation();

  // handle delete project
  const handleDeleteProject = (id: string) => {
    deleteProject(id);
  };

  return (
    <>
      <Button
        className="bg-default"
        isIconOnly={!!buttonContent}
        onPress={onOpen}
      >
        {buttonContent}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Project
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this project?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => handleDeleteProject(projectId as string)}
                  color="danger"
                  onPress={onClose}
                  isLoading={deleteProjectLoading}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
