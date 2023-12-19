import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";

import { Card } from "@prisma/client";

type CardItemProps = {
  index: number;
  data: Card;
};

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="truncate border-2 border-transparent hover:border-black bg-white px-3 py-2 text-sm rounded-md shadow-sm"
          onClick={() => cardModal.onOpen(data.id)}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
