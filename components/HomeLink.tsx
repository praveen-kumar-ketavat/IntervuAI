"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";

const HomeLink = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <>
      {isPending && <FullScreenLoader loaderLabel="IntervuAI..." />}

      <button
        onClick={handleClick}
        className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
      >
        <Image src="/logo.svg" alt="IntervuAI Logo" width={38} height={32} />
        <h2 className="text-primary-100">IntervuAI</h2>
      </button>
    </>
  );
};

export default HomeLink;
