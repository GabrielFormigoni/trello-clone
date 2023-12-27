import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/activity-list";
import { Suspense } from "react";
import { Info } from "../_components/info";
import { checkSubscription } from "@/lib/subscription";

type Props = {};

const ActivityPage = async (props: Props) => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
