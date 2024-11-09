"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function LandingNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();

  const handleMenuClick = () => {
    setIsOpen(true);
  };

  return (
    <nav className="py-6 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Image
          src={"/main_logo.svg"}
          height={150}
          width={150}
          alt="product logo"
          className="invert"
        />
      </div>

      {/* Nav Links */}
      <div className="sm:flex hidden gap-8">
        <Link href={"#"} className="relative group">
          <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
            Home
          </h1>
        </Link>
        <Link href={"#"} className="relative group">
          <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
            Features
          </h1>
        </Link>
        <Link href={"/pricing"} className="relative group">
          <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
            Pricing
          </h1>
        </Link>
        <Link href={"/dashboard/home"} className="relative group">
          <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
            Dashboard
          </h1>
        </Link>
      </div>

      {/* Login and Register button */}
      {!isAuthenticated ? (
        <div className="sm:flex items-center gap-4 hidden">
          <LoginLink className="relative group">
            <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
              Login
            </h1>
          </LoginLink>
          <RegisterLink>
            <Button className="text-sm" size={"sm"}>
              Register
            </Button>
          </RegisterLink>
        </div>
      ) : (
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
      )}

      {/* Hamburger icon for mobile screen */}
      <div className="sm:hidden flex" onClick={handleMenuClick}>
        {!isOpen && (
          <button onClick={() => setIsOpen(!isOpen)}>
            {!isOpen && <Menu />}
          </button>
        )}
      </div>

      {/* div for opening in mobile */}
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#09090B] bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex flex-col fixed inset-y-0 right-0 bg-[#131313] rounded-xl border-l h-sdvh p-8 w-3/5 z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="z-50 absolute top-7 right-8"
              >
                <X />
              </button>
              <div className="">
                {/* Nav links */}
                <div className="flex flex-col gap-4 mt-10">
                  <Link href={"#"} className="relative group">
                    <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
                      Home
                    </h1>
                  </Link>
                  <Link href={"#"} className="relative group">
                    <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
                      Features
                    </h1>
                  </Link>
                  <Link href={"/pricing"} className="relative group">
                    <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
                      Pricing
                    </h1>
                  </Link>
                  <LoginLink className="relative group">
                    <h1 className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 md:group-hover:after:w-full">
                      Login
                    </h1>
                  </LoginLink>
                  <RegisterLink>
                    <h1 className="">Register</h1>
                  </RegisterLink>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </nav>
  );
}
