import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X, Infinity } from "lucide-react";

export default function Pricing() {
  return (
    <div className="flex justify-center">
      {/* Card div */}
      <div className="flex justify-center items-center gap-2 h-[650px] ">
        {/* ----------CARD 1 - Basic----------- */}
        <div className="bg-gradient-to-b w-max h-max p-4 from-neutral-800 to-neutral-900 rounded-2xl border border-zinc-500">
          {/* Plan type and description */}
          <div className="flex flex-col gap-3">
            {/* Plan type text */}
            <div className="w-max px-7 py-2 rounded-3xl border border-neutral-500 justify-center items-center gap-2.5 inline-flex">
              <div className="text-white/80 text-sm font-semibold uppercase">
                Basic
              </div>
            </div>

            {/* Description */}
            <h1 className="w-[350px] text-zinc-400 text-md font-normal">
              For individuals or small businesses starting with security
            </h1>
          </div>

          {/* Price */}
          <div className="mt-20">
            <span className="text-white text-5xl font-extrabold ">$6.99</span>
            <span className="text-neutral-400 text-md font-normal">/month</span>
          </div>

          <div className="my-3">
            <Separator className="dark:invert dark:bg-black/20" />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-3">
              <Check />
              <span>Upto 25 products</span>
            </h1>
            <h1 className="flex gap-3">
              <Check />
              <span>Vulnerability check every 24 hours</span>
            </h1>
            <h1 className="flex gap-3">
              <X />
              <span>Instant Email Notifications</span>
            </h1>
            <h1 className="flex gap-3">
              <X />
              <span>&quot;Check Now&quot; Function</span>
            </h1>
          </div>

          {/* Button for buying */}
          <div className="w-full mt-20">
            <Button
              variant={"outline"}
              className="w-full bg-transparent border border-neutral-500 font-semibold"
            >
              Buy Now
            </Button>
          </div>
        </div>

        {/* ----------CARD 2 - Standard----------- */}
        <div className="bg-gradient-to-b w-max h-full flex flex-col justify-between p-4 from-neutral-600/50 to-neutral-900 rounded-2xl border border-zinc-500">
          {/* Plan type and description */}
          <div className="flex flex-col gap-3">
            {/* Plan type text */}
            <div className="w-max px-4 py-2 rounded-3xl border bg-white/90 border-neutral-500 justify-center items-center gap-2.5 inline-flex">
              <div className="text-black/80  text-sm font-semibold uppercase">
                Standard
              </div>
            </div>

            {/* Description */}
            <h1 className="w-96 text-zinc-400 text-md font-normal">
              Perfect for growing businesses with an active product portfolio
            </h1>
          </div>

          <div>
            {/* Price */}
            <div className="">
              <span className="text-white text-5xl font-extrabold ">
                $14.99
              </span>
              <span className="text-neutral-400 text-md font-normal">
                /month
              </span>
            </div>

            <div className="my-3">
              <Separator className="dark:invert dark:bg-black/20" />
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4">
              <h1 className="flex gap-3">
                <Check />
                <span>Upto 50 products</span>
              </h1>
              <h1 className="flex gap-3">
                <Check />
                <span>Vulnerability check every 6 hours</span>
              </h1>
              <h1 className="flex gap-3">
                <Check />
                <span>Instant Email Notifications</span>
              </h1>
              <h1 className="flex gap-3">
                <Check />
                <span>&quot;Check Now&quot; Function</span>
              </h1>
            </div>
          </div>
          {/* Button for buying */}
          <div className="w-full mt-20">
            <Button
              variant={"outline"}
              className="w-full bg-neutral-50 hover:bg-neutral-50/90 text-zinc-700 hover:text-zinc-700 border border-neutral-500 font-semibold"
            >
              Buy Now
            </Button>
          </div>
        </div>

        {/* ----------CARD 3 - Premium----------- */}
        <div className="bg-gradient-to-b w-max h-max p-4 from-neutral-800 to-neutral-900 rounded-2xl border border-zinc-500">
          {/* Plan type and description */}
          <div className="flex flex-col gap-3">
            {/* Plan type text */}
            <div className="w-max px-4 py-2 rounded-3xl border bg-gradient-to-r from-stone-500 to-neutral-700 border-neutral-500 justify-center items-center gap-2.5 inline-flex">
              <div className="text-white text-sm font-semibold uppercase">
                Premium
              </div>
            </div>

            {/* Description */}
            <h1 className="w-[350px] text-zinc-400 text-md font-normal">
              For enterprises and security-focused teams managing complex
              systems
            </h1>
          </div>

          {/* Price */}
          <div className="mt-20">
            <span className="text-white text-5xl font-extrabold ">$24.99</span>
            <span className="text-neutral-400 text-md font-normal">/month</span>
          </div>

          <div className="my-3">
            <Separator className="dark:invert dark:bg-black/20" />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-3">
              <Check />
              <span className="flex gap-2">
                <Infinity /> products
              </span>
            </h1>
            <h1 className="flex gap-3">
              <Check />
              <span>Vulnerability check every 1 hours</span>
            </h1>
            <h1 className="flex gap-3">
              <Check />
              <span>Instant Email Notifications</span>
            </h1>
            <h1 className="flex gap-3">
              <Check />
              <span>&quot;Check Now&quot; Function</span>
            </h1>
          </div>

          {/* Button for buying */}
          <div className="w-full mt-20">
            <Button
              variant={"outline"}
              className="w-full bg-gradient-to-r from-stone-700 to-neutral-900 text-white hover:text-white border border-neutral-500 font-semibold"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
