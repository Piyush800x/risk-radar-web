"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        redirect("/")
      )}
    </>
  );
}
