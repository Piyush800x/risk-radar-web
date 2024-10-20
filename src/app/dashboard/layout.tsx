"use client";

import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavBar />
          <div className="flex w-full">
            <SideBar />
            <div className="w-full">{children}</div>
          </div>
        </>
      ) : (
        redirect("/")
      )}
    </>
  );
}
