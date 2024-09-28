"use client";

import NavBar from "@/components/NavBar";
import ProductCard from "@/components/productCard";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <NavBar />

      {isAuthenticated ? (
        <div className="grid sm:grid-cols-4 gap-2 px-4 py-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      ) : (
        redirect("/")
      )}
    </>
  );
}
