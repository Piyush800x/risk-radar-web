"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface notificationDetails {
  id: string;
  title: string;
  time: string;
  authId: string;
  vendorName: string;
  productName: string;
  productVersion: string;
}

export default function NotificationCard({
  id,
  title,
  time,
  authId,
  vendorName,
  productName,
  productVersion,
}: notificationDetails) {
  const [loading, setLoading] = useState<boolean>(false);

  const removeNotification = async (id: string) => {
    console.log(loading);
    setLoading(true);
    const payload = {
      authId: authId,
      id: id,
    };

    try {
      const req = await fetch("/api/remove-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (req.status == 200) {
        toast.success("Notification removed");
      } else {
        toast.error("Can't remove notification\nPlease try again!");
      }
    } catch (error) {
      toast.error("Can't remove notification\nPlease try again!");
    } finally {
      setLoading(false);
      window.location.reload()
    }
  };

  return (
    <div className="flex" key={id}>
      <div className="flex bg-[#F4F4F4] dark:bg-[#1f1f1f] rounded-l-lg border border-[#BCBCBC] dark:border-[#353535] justify-between rounded-tl-lg rounded-bl-lg  px-3 py-2  w-full">
        <div>
          <h1 className="flex flex-col ">
            <span className="text-xl font-medium">{title}</span>
            <span className="dark:text-[#BCBCBC]">
              {vendorName} {productName} - {productVersion}
            </span>
          </h1>
        </div>
        <div>
          <h1>{time}</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center cursor-pointer px-3 bg-[#F4F4F4] dark:bg-[#1f1f1f] rounded-r-lg border border-[#BCBCBC] dark:border-[#353535] transition-all duration-300 hover:bg-red-500 dark:hover:bg-red-600 group">
        <button onClick={() => removeNotification(id)}>
          <Image
            src="/delete_icon.svg"
            width={20}
            height={20}
            alt="delete icon"
            className="group-hover:invert dark:invert"
          />
        </button>
      </div>
    </div>
  );
}
