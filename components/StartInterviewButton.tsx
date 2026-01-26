"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import FullScreenLoader from "@/components/FullScreenLoader";

const StartInterviewButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending && <FullScreenLoader loaderLabel="Opening generator..." />}

      <Button
        className="btn-primary max-sm:w-full"
        onClick={() =>
          startTransition(() => {
            router.push("/interview");
          })
        }
      >
        Start an Interview
      </Button>
    </>
  );
};

export default StartInterviewButton;
