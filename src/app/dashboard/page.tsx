"use client";

import NavBar from "@/components/NavBar";
import ProductCard from "@/components/productCard";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <NavBar />

      {isAuthenticated ? (
        <div className="flex flex-col gap-4">
          <div className="w-1/4 flex items-center">
            <Search className="left-6 absolute size-5" />
            <Input placeholder="Search by product name" className="px-9"/>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 w-full">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      ) : (
        redirect("/")
      )}
    </>
  );
}
