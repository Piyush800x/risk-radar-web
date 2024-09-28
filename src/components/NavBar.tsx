"use client";

import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import { ShieldCheck } from 'lucide-react';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function NavBar() {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <ShieldCheck className="h-6 w-6" />
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
            <LogoutLink
              className="text-sm font-medium hover:underline underline-offset-4"
              postLogoutRedirectURL="/"
            >
              Log out
            </LogoutLink>
          </>
        )}
        <DarkModeToggle />
      </nav>
    </header>
  );
}
