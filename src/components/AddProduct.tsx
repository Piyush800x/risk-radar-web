"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChevronsUpDown, Check } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);

  const [vendorName, setVendorName] = useState("");
  const [productName, setProductName] = useState("");
  const [vendors, setVendors] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);

  const [vendorValue, setVendorValue] = React.useState("");
  const [versionValue, setVersionValue] = React.useState("");
  const [productValue, setProductValue] = React.useState("");

  // Fetch vendors on component mount
  useEffect(() => {
    fetch("/api/vendors")
      .then((response) => response.json())
      .then((data) => setVendors(data.data));
  }, []);

  // Fetch products when vendor is selected
  useEffect(() => {
    if (vendorName) {
      fetch(`/api/products/${vendorName}`)
        .then((response) => response.json())
        .then((data) => setProducts(Object.keys(data.data)));
    }
  }, [vendorName]);

  // Fetch versions when product is selected
  useEffect(() => {
    if (vendorName && productName) {
      fetch(`/api/products/${vendorName}/${productName}`)
        .then((response) => response.json())
        .then((data) => setVersions(data.data));
    }
  }, [vendorName, productName]);

  return (
    <div className="p-4">
      <form className="space-y-4">
        {/* Vendor Dropdown */}
        <Dialog>
          <DialogTrigger className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-36">
            Add product
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Products</DialogTitle>
              <DialogDescription>
                Add products to your dashboard to start scanning for
                vulnerabilities.
              </DialogDescription>
            </DialogHeader>

            {/* FOR SELECTING VENDORS */}
            <label className="block text-sm font-medium text-muted-foreground">
              Vendor name
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {vendorValue || "Select Vendor"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Vendor Name" />
                  <CommandList>
                    <CommandEmpty>No vendor name found.</CommandEmpty>
                    <CommandGroup>
                      {vendors.map((vendor) => (
                        <CommandItem
                          key={vendor}
                          value={vendor}
                          onSelect={(currentValue) => {
                            setVendorValue(
                              currentValue === vendorValue ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              vendorValue === vendor
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {vendor}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* FOR SELECTING PRODUCT */}
            <label className="block text-sm font-medium text-muted-foreground">
              Product name
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {productValue || "Select Product"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Product Name" />
                  <CommandList>
                    <CommandEmpty>No product name found.</CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product}
                          value={product}
                          onSelect={(currentProductValue) => {
                            setProductValue(
                                currentProductValue === productValue ? "" : currentProductValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              vendorValue === product
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {productValue}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
          </DialogContent>
        </Dialog>

        <div>
          <label htmlFor="vendorName">Vendor Name</label>
          <select
            id="vendorName"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="border p-2"
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>

        {/* Product Dropdown */}
        {/* {vendorName && (
          <div>
            <label htmlFor="productName">Product Name</label>
            <select
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
        )} */}

        {/* Version Dropdown */}
        {/* {productName && (
          <div>
            <label htmlFor="version">Version</label>
            <select id="version" className="border p-2">
              <option value="">Select Version</option>
              {versions.map((version, index) => (
                <option key={index} value={version}>
                  {version}
                </option>
              ))}
            </select>
          </div>
        )} */}

        <button type="submit" className="bg-black text-white p-2">
          Add
        </button>
      </form>
    </div>
  );
}
