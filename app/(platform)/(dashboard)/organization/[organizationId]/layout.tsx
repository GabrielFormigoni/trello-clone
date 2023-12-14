import { startCase } from "lodash";

import OrgControl from "./_components/OrgControl";
import { auth } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
}

function OrganizationIdLayout({ children }: Props) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default OrganizationIdLayout;
