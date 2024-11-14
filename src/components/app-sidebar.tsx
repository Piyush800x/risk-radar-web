"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, BellRing, CreditCard } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();

  const pathname = usePathname();

  let homeSelected;
  let notiSelected;
  let settingsSelected;
  let billingSelected;

  switch (pathname) {
    case "/dashboard/home":
      homeSelected = true;
      break;
    case "/dashboard/view-details":
      homeSelected = true;
      break;
    case "/dashboard/notifications":
      notiSelected = true;
      break;
    case "/dashboard/settings":
      settingsSelected = true;
      break;
    case "/dashboard/billing":
      billingSelected = true;
      break;
    default:
      break;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <Link href={"/"}>
            <Image
              src={"/main_logo.svg"}
              height={200}
              width={200}
              alt="main logo"
              className={`${
                state === "collapsed" ? "hidden" : ""
              } ml-3 mt-3 dark:invert`}
            />
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase font-semibold">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex flex-col gap-1">
                <SidebarMenuButton
                  asChild
                  className={`${
                    homeSelected
                      ? "bg-black/10 dark:bg-slate-200/10 hover:bg-black/15"
                      : ""
                  } `}
                >
                  <Link href={"/dashboard/home"}>
                    <Home className="" />

                    <span className="text-md font-semibold tracking-wide">
                      Home
                    </span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuButton
                  asChild
                  className={`${
                    notiSelected
                      ? "bg-black/10 dark:bg-slate-200/10 hover:bg-black/15"
                      : ""
                  } `}
                >
                  <Link href={"/dashboard/notifications"}>
                    <BellRing className="" />
                    <span className="text-md font-semibold tracking-wide">
                      Notifications
                    </span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuButton
                  asChild
                  className={`${
                    settingsSelected
                      ? "bg-black/10 dark:bg-slate-200/10 hover:bg-black/15"
                      : ""
                  } `}
                >
                  <Link href={"/dashboard/settings"}>
                    <Settings className="" />
                    <span className="text-md font-semibold tracking-wide">
                      Settings
                    </span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuButton
                  asChild
                  className={`${
                    billingSelected
                      ? "bg-black/10 dark:bg-slate-200/10 hover:bg-black/15"
                      : ""
                  } `}
                >
                  <Link href={"/dashboard/billing"}>
                    <CreditCard className="" />
                    <span className="text-md font-semibold tracking-wide">
                      Billing
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* System Status */}
        <div className="w-full flex gap-2 items-center border-t pt-2 border-stone-300">
          <div>
            <Image
              src={"/green_tick_icon.svg"}
              height={30}
              width={30}
              alt="green tick icon"
            />
          </div>
          <div className={`${state === "collapsed" ? "hidden" : ""}`}>
            <h1 className="font-semibold text-sm">
              Status: All Systems Operational
            </h1>
            <h1 className="text-xs">
              Last Updated:{" "}
              {new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}{" "}
              IST
            </h1>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
