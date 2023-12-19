"use client";

import { ElementRef, useRef, useState } from "react";

import { List } from "@prisma/client";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { updateList } from "@/actions/update-list";
import { ListOptions } from "./list-options";

type ListHeaderProps = {
  data: List;
  onAddCard: () => void;
};

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} updated successfully!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    setTitle(title);
    disableEditing();

    if (title === data.title) return disableEditing();

    execute({
      id,
      boardId,
      title,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="p-2 pb-0 text-sm font-semibold flex justify-center items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} className="flex-1 px-[2px]" ref={formRef}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            placeholder="Enter list title"
            defaultValue={title}
            className="text-sm px-[7px] py-1 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
