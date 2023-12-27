import { auth, currentUser } from "@clerk/nextjs";
import { ENTITY_TYPE, ACTION } from "@prisma/client";

import { db } from "@/lib/db";

interface Props {
  entityType: ENTITY_TYPE;
  entityId: string;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async ({
  entityType,
  entityId,
  entityTitle,
  action,
}: Props) => {
  try {
    const user = await currentUser();
    const { orgId } = auth();

    if (!user || !orgId) {
      throw new Error("Usernot found");
    }

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("AUDIT LOG ERROR: ", error);
  }
};
