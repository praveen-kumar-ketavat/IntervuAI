"use client";

import { useTransition } from "react";
import { signOut } from "@/lib/actions/auth.action";
import { usePathname } from "next/navigation";

const SignOutButton = () => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  if (pathname !== "/") return null;

  return (
    <button
      onClick={() => startTransition(() => signOut())}
      disabled={isPending}
      className="cursor-pointer disabled:cursor-not-allowed text-sm px-3 py-1.5 rounded-md
                 bg-red-500/10 text-red-400
                 hover:bg-red-500/20 transition
                 disabled:opacity-50"
    >
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
};

export default SignOutButton;
