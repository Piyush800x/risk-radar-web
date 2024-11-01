"use client";

import NavBar from "@/components/NavBar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Loader } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading)
    return (
      <div className="flex flex-col w-full h-screen items-center justify-center">
          <Loader className="animate-spin size-10" />
      </div>
    );

  return (
    <>
      <NavBar />
      <SidebarProvider>
        <AppSidebar />
        {isAuthenticated ? (
          <>
            <div className="flex w-full">
              {/* <SideBar /> */}
              <div className="w-full">
                <SidebarTrigger className="fixed bottom-1/2 z-99" />
                {children}
              </div>
            </div>
          </>
        ) : (
          redirect("/")
        )}
      </SidebarProvider>
    </>
  );
}
