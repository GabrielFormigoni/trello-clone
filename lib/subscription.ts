import { auth } from "@clerk/nextjs";

import { db } from "./db";

const DAYS_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripesubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAYS_IN_MS >
      Date.now();

  return !!isValid;
};
