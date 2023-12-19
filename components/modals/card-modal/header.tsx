"use client";

import { ElementRef, useRef, useState } from "react";
import { Layout } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { FormInput } from "@/components/form/form-input";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

type CardheaderProps = {
  data: CardWithList;
};

export const Cardheader = ({ data }: CardheaderProps) => {
  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card ${data.title} renamed successfully`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const queryClient = useQueryClient();
  const params = useParams();

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) return;

    execute({
      id: data.id,
      boardId,
      title,
    });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            defaultValue={title}
            onBlur={onBlur}
            className="truncate px-1 text-neutral-700 border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 text-xl font-semibold"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Cardheader.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-5 w-5 mt-1 text-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 bg-neutral-200 rounded-md mb-1 animate-pulse" />
        <Skeleton className="h-4 w-12 bg-neutral-200 rounded-md animate-pulse" />
      </div>
    </div>
  );
};
