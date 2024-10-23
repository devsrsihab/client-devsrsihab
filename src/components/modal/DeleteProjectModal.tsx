"use client";

import { useDeleteBlogMutation } from "@/src/hooks/project.hook";
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

export default function DeleteBlogModal({
  projectId,
  buttonContent,
}: {
  projectId?: string;
  buttonContent?: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteBlog, isPending: deleteBlogLoading } =
    useDeleteBlogMutation();

  // handle delete project
  const handleDeleteBlog = (id: string) => {
    deleteBlog(id);
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
                Delete Blog
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this project?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => handleDeleteBlog(projectId as string)}
                  color="danger"
                  onPress={onClose}
                  isLoading={deleteBlogLoading}
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
