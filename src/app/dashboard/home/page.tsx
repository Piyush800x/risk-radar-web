"use client";

import AddProduct3 from "@/components/AddProduct3";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";


interface CVEData {
  _id: string;
  vendorName: string;
  productName: string;
  productVersion: string;
  critical: number;
  high: number;
  cveResults: {
    aiSolution: string;
    cveId: string;
    epssScore: string;
    maxCvssBaseScore: string;
    nvdVulnStatus: string;
  }[];
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [products, setProducts] = useState<CVEData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CVEData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [planType, setPlanType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      console.log(JSON.stringify(products));
      fetchSubscriptionData();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = products.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 500); // Debounce delay
  
    return () => clearTimeout(handler); // Cleanup timeout
  }, [searchQuery, products]);

  const fetchData = async () => {
    setLoading(true);
    if (user) {
      const data = {
        authId: user?.id,
      };
      try {
        const req = await fetch("/api/get-products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const res = await req.json();
        setProducts(res);
        setFilteredProducts(res); // Initialize filtered products
      } catch (error) {
        console.error(error);
      }
    }
    // setLoading(false);
  };

  const fetchSubscriptionData = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/subscription/get-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authId: user?.id }),
      });
      if (req.ok) {
        const response = await req.json();
        console.log(JSON.stringify(response));
        console.log(response.planType);
        setPlanType(response.planType);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Toggle the visibility when the button is clicked
  const toggleComponent = () => {
    // console.log(planType);
    if (planType == "Premium") {
      if (products.length == 100) {
        toast.error("Maximum product limit reached in your plan!");
      } else {
        setIsVisible(!isVisible);
      }
    } else if (planType == "Standard") {
      if (products.length == 50) {
        toast.error("Maximum product limit reached in your plan!");
      } else {
        setIsVisible(!isVisible);
      }
    } else if (planType == "Basic") {
      if (products.length == 25) {
        toast.error("Maximum product limit reached in your plan!");
      } else {
        setIsVisible(!isVisible);
      }
    }
  };

  if (loading) {
    return (
      <div className="py-4 px-5 w-full flex flex-col justify-center">
        <h1 className="text-neutral-600 text-lg font-semibold dark:invert">
          Home
        </h1>
        <div className="mt-6">
          <div className="flex justify-between items-center text-neutral-900 text-3xl font-extrabold tracking-wide">
            <Skeleton className="w-1/4 h-10" />
            <div className="w-1/4 flex items-center relative">
              <Skeleton className="absolute left-3 size-5" />
              <Skeleton className="w-full h-10 pl-10" />
            </div>
          </div>
          <Skeleton className="w-1/2 h-6 mt-2" />
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="grid grid-cols-1 mt-4 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:space-x-38">
            <Skeleton className="flex flex-col m-3 items-center justify-center w-80 h-60 rounded-lg" />
            <Skeleton className="flex flex-col m-3 items-center justify-center w-80 h-60 rounded-lg" />
            <Skeleton className="flex flex-col m-3 items-center justify-center w-80 h-60 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 px-5 w-full flex flex-col justify-center">
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="fixed bg-[#F4F4F4] dark:bg-[#2D2D2D] p-7 rounded-lg shadow-lg flex flex-col w-[50%]">
            <h2 className="text-xl font-semibold">Add a New Product</h2>
            <p className="text-sm mb-4">
              To add a product, search for each given properties in the fields
              and select from the dropdown menu, then click Add.
            </p>
            <AddProduct3 />
            <button
              onClick={toggleComponent}
              className="absolute top-0 w-10 h-10 justify-center right-0 mt-2 mr-2  bg-[#F4F4F4] hover:bg-red-600 hover:text-white text-black font-bold rounded-full transition-all duration-200 transform translate-x-1/2 -translate-y-1/2"
              title="Closing will reset all fields!"
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
      <h1 className="text-neutral-600 text-lg font-semibold dark:invert">
        Home
      </h1>
      <div className="mt-6">
        <div className="flex justify-between items-center text-neutral-900 text-3xl font-medium tracking-wide">
          <span className="dark:text-white">Welcome, {user?.given_name}</span>

          <div className="w-1/4 flex items-center relative">
            <Search className="absolute left-3 size-5 dark:invert" />
            <Input
              placeholder="Search by product name"
              className="pl-10 dark:bg-[#2D2D2D] dark:text-white font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <span className="text-neutral-700 text-lg font-medium tracking-wide dark:invert">
          Monitor and manage all of your products here
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          <div
            onClick={toggleComponent}
            className="flex flex-col m-3 items-center justify-center bg-[#F4F4F4] dark:bg-[#2D2D2D] rounded-lg border border-[#BCBCBC] dark:border-[#434343] transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <Image
              src={"/plus_icon.svg"}
              width={60}
              height={60}
              alt="plus icon"
            />
            <h1 className="text-lg font-medium">Add Product</h1>
          </div>
          {filteredProducts && filteredProducts .length > 0 ? (
            filteredProducts.map((product: CVEData) => (
              <div className="m-3" key={product._id.toString()}>
                <ProductCard
                  vendorName={product.vendorName}
                  productName={product.productName}
                  productVersion={product.productVersion}
                  criticalCount={product.critical}
                  highCount={product.high}
                  objId={product._id}
                />
              </div>
            ))
          ) : (
            <div className="">
              <h1>No products found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
