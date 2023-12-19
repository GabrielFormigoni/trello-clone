"use client";

import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";

type CardActionsProps = {
  data: CardWithList;
};

export const CardActions = ({ data }: CardActionsProps) => {
  const params = useParams();

  const onClose = useCardModal((state) => state.onClose);

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted successfully`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied successfully`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onDelete = () => {
    const id = data.id as string;
    const boardId = params.boardId as string;

    executeDelete({
      id,
      boardId,
    });
  };

  const onCopy = () => {
    const id = data.id as string;
    const boardId = params.boardId as string;

    executeCopy({
      id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

CardActions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 bg-neutral-200 h-4" />
      <Skeleton className="w-full bg-neutral-200 h-8" />
      <Skeleton className="w-full bg-neutral-200 h-8" />
    </div>
  );
};
