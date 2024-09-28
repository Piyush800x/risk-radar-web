"use client";

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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


const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function LandingPage() {
  const {isAuthenticated} = useKindeBrowserClient();
  const [open, setOpen] = React.useState(false);
  const [vendorValue, setVendorValue] = React.useState("");
  const [versionValue, setVersionValue] = React.useState("");
  const [productValue, setProductValue] = React.useState("");

  const handleAddClick = () => {
    console.log(vendorValue, versionValue, productValue);
  };

  const handleClearClick = () => {
    setVendorValue("");
    setVersionValue("");
    setProductValue("");
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {isAuthenticated && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <Link href="#" prefetch={false}>
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
                      {vendorValue
                        ? frameworks.find(
                            (framework) => framework.value === vendorValue
                          )?.label
                        : "Select framework..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Vendor Name" />
                      <CommandList>
                        <CommandEmpty>No vendor name found.</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setVendorValue(
                                  currentValue === vendorValue
                                    ? ""
                                    : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  vendorValue === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <label className="block text-sm font-medium text-muted-foreground">
                  Version
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {versionValue
                        ? frameworks.find(
                            (framework) => framework.value === versionValue
                          )?.label
                        : "Select framework..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Version" />
                      <CommandList>
                        <CommandEmpty>No version found.</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setVersionValue(
                                  currentValue === versionValue
                                    ? ""
                                    : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  versionValue === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <label className="block text-sm font-medium text-muted-foreground">
                  Product Name
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {productValue
                        ? frameworks.find(
                            (framework) => framework.value === productValue
                          )?.label
                        : "Select framework..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search product name" />
                      <CommandList>
                        <CommandEmpty>No product name found.</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setProductValue(
                                  currentValue === productValue
                                    ? ""
                                    : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  productValue === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <div className="flex justify-end gap-2">
                  <div className="flex gap-2">
                    <Button
                    onClick={handleClearClick}
                      variant={"outline"}
                      className="flex gap-1 items-center justify-center"
                    >
                      <h1>Clear</h1>
                    </Button>
                    <Button
                      onClick={handleAddClick}
                      className="w-max flex gap-1 items-center justify-center"
                    >
                      <h1>Add</h1>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Link>
          <Link href="/dashboard" prefetch={false}>
            <Button variant={"outline"} className="w-36">
              Go to dashboard
            </Button>
          </Link>
        </div>
      )}

      {!isAuthenticated && (
        <>
          <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-12">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Secure Your Software with Automated Vulnerability
                        Scanning
                      </h1>
                      <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        Protect your software from cyber threats with our
                        powerful vulnerability scanning solution. Identify and
                        address vulnerabilities before they can be exploited.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Link
                        href="#"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                      >
                        Try for Free
                      </Link>
                      <Link
                        href="#"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                  <Image
                    src={"https://placehold.co/550"}
                    width="550"
                    height="550"
                    alt="Hero"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  />
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                      Key Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Comprehensive Vulnerability Scanning
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Our advanced scanning engine identifies a wide range of
                      vulnerabilities, from common misconfigurations to
                      sophisticated zero-day exploits, helping you stay ahead of
                      potential threats.
                    </p>
                  </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                  <Image
                    src={"https://placehold.co/550x310"}
                    width="550"
                    height="310"
                    alt="Image"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  />
                  <div className="flex flex-col justify-center space-y-4">
                    <ul className="grid gap-6">
                      <li>
                        <div className="grid gap-1">
                          <h3 className="text-xl font-bold">
                            Automated Scanning
                          </h3>
                          <p className="text-muted-foreground">
                            Schedule regular scans to continuously monitor your
                            software for vulnerabilities.
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="grid gap-1">
                          <h3 className="text-xl font-bold">
                            Detailed Reporting
                          </h3>
                          <p className="text-muted-foreground">
                            Receive comprehensive reports with clear
                            recommendations for remediation.
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="grid gap-1">
                          <h3 className="text-xl font-bold">
                            Secure Data Storage
                          </h3>
                          <p className="text-muted-foreground">
                            Your scan data is securely stored and protected with
                            industry-leading encryption.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Protect Your Software with Confidence
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our vulnerability scanning solution is designed to keep your
                    software secure and your data protected. Trust us to help
                    you identify and address vulnerabilities before they can be
                    exploited.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Try for Free
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
              <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Secure Your Software, Protect Your Business
                  </h2>
                  <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our vulnerability scanning solution is designed to keep your
                    software secure and your data protected. Trust us to help
                    you identify and address vulnerabilities before they can be
                    exploited.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                  <form className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="max-w-lg flex-1"
                    />
                    <Button type="submit">Try for Free</Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    Sign up to get started. No credit card required.{" "}
                    <Link
                      href="#"
                      className="underline underline-offset-2"
                      prefetch={false}
                    >
                      Terms &amp; Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 border-t">
              <div className="container px-4 md:px-6">
                <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                      Security
                    </div>
                    <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                      Protect Your Data with Industry-Leading Security
                    </h2>
                    <Link
                      href="#"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Learn More
                    </Link>
                  </div>
                  <div className="flex flex-col items-start space-y-4">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                      Privacy
                    </div>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                      We take your privacy seriously. Your scan data is securely
                      stored and protected with industry-leading encryption. We
                      never share or sell your information to third parties.
                    </p>
                    <Link
                      href="#"
                      className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">
              &copy; 2024 Secure Scan. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-xs hover:underline underline-offset-4"
                prefetch={false}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs hover:underline underline-offset-4"
                prefetch={false}
              >
                Privacy Policy
              </Link>
            </nav>
          </footer>
        </>
      )}
    </div>
  );
}
