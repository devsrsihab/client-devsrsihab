"use client";

import { useDeleteBlogMutation } from "@/src/hooks/blog.hook";
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
  blogid,
  buttonContent,
}: {
  blogid?: string;
  buttonContent?: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteBlog, isPending: deleteBlogLoading } =
    useDeleteBlogMutation();

  // handle delete blog
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
                <p>Are you sure you want to delete this blog?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => handleDeleteBlog(blogid as string)}
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
