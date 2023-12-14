import { notFound, redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { BoardNavbar } from "./_components/board-navbar";

type Props = {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Select an organization",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({ children, params }: Props) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative bg-cover bg-center bg-no-repeat h-full"
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10"></div>
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
