"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";

const ClickHereButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.push("/interview");
    });
  };

  return (
    <>
      {isPending && <FullScreenLoader loaderLabel="Opening generator..." />}

      <button
        onClick={handleClick}
        className="text-primary-200 font-semibold hover:underline"
      >
         Click Here.
      </button>
    </>
  );
};

export default ClickHereButton;
