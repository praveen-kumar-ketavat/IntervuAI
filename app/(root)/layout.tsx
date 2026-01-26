import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import SignOutButton from "@/components/SignOutButton";
import HomeLink from "@/components/HomeLink";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  const user = await getCurrentUser();

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between px-6 py-2 border-b border-white/10">
        <HomeLink />
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <span className="text-sm text-white/90 cursor-default">
              Welcome, <span className="text-lg">{user?.name}</span>
            </span>

            {/* Tooltip */}
            <div
              className="
      absolute right-0 mt-2 w-56
      rounded-md border border-white/10
      bg-black/90 px-4 py-2 text-sm
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
      z-50
    "
            >
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-white/80 text-xs">{user?.email}</p>
            </div>
          </div>

          <SignOutButton />
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
