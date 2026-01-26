"use client";

import Link from "next/link";
import { useTransition } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import { Button } from "@/components/ui/button";

type FeedbackPageButtonProps = {
  href: string;
  variant: "primary" | "secondary";
  label: string;
  loaderLabel?: string;
};

const FeedbackPageButton = ({
  href,
  variant,
  label,
  loaderLabel,
}: FeedbackPageButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending && <FullScreenLoader loaderLabel={loaderLabel} />}

      <Button
        className={
          variant === "primary" ? "btn-primary flex-1" : "btn-secondary flex-1"
        }
      >
        <Link
          href={href}
          className="flex w-full justify-center"
          onClick={() => startTransition(() => {})}
        >
          <p
            className={`text-sm font-semibold text-center ${
              variant === "primary" ? "text-black" : "text-primary-200"
            }`}
          >
            {label}
          </p>
        </Link>
      </Button>
    </>
  );
};

export default FeedbackPageButton;
