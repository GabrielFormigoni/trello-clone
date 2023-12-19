"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modals/card-modal";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
    </>
  );
};

export default ModalProvider;
