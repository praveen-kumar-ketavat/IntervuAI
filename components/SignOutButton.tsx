"use client";

import { useTransition } from "react";
import { signOut } from "@/lib/actions/auth.action";
import { usePathname } from "next/navigation";

import FullScreenLoader from "./FullScreenLoader";

const SignOutButton = () => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  if (pathname !== "/") return null;

  return (
    <button
      onClick={() => startTransition(() => signOut())}
      disabled={isPending}
      className="cursor-pointer disabled:cursor-not-allowed text-xs sm:text-sm 
      px-1.5 py-1 sm:px-3 sm:py-1.5 rounded-md bg-red-500/10 text-red-400
      hover:bg-red-500/20 transition disabled:opacity-50"
    >
      {isPending ? <FullScreenLoader loaderLabel="IntervuAI..." /> : "Sign out"}
    </button>
  );
};

export default SignOutButton;
