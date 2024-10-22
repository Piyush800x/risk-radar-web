"use client";

import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import { ShieldCheck, Shield } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function NavBar() {
  const { isAuthenticated } = useKindeBrowserClient();
  const { user, getUser } = useKindeBrowserClient();

  return (
    <header className="h-14 flex items-center mx-4">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        {isAuthenticated ? (
          <ShieldCheck className="h-6 w-6" />
        ) : (
          <Shield className="h-6 w-6" />
        )}
      </Link>
      <nav className="ml-auto flex gap-4 items-center sm:gap-6">
        {!isAuthenticated && (
          <>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Contact
            </Link>

            <RegisterLink className="text-sm font-medium hover:underline underline-offset-4">
              Register
            </RegisterLink>
            <LoginLink
              className="text-sm font-medium hover:underline underline-offset-4"
              postLoginRedirectURL="/"
            >
              Sign in
            </LoginLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#262626] text-white">
                        {user?.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="">{user?.email}</span>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex items-center justify-center w-full">
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} `}
                    >
                      <LogoutLink
                        className="text-sm font-medium"
                        postLogoutRedirectURL="/"
                      >
                        Log out
                      </LogoutLink>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </>
        )}
        <DarkModeToggle />
      </nav>
    </header>
  );
}
