"use client";

import { useDeleteRecipeMutation } from "@/src/hooks/recipe.hook";
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

export default function DeleteRecipeModal({
  recipeid,
  buttonContent,
}: {
  recipeid?: string;
  buttonContent?: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteRecipe, isPending: deleteRecipeLoading } =
    useDeleteRecipeMutation();

  // handle delete recipe
  const handleDeleteRecipe = (id: string) => {
    deleteRecipe(id);
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
                Delete Recipe
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this recipe?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => handleDeleteRecipe(recipeid as string)}
                  color="danger"
                  onPress={onClose}
                  isLoading={deleteRecipeLoading}
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
