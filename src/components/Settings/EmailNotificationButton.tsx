"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

interface EmailNotificationProps {
  authId: string;
  status: boolean;
  activeStatus: boolean;
  btnState: boolean;
}

export default function EmailNotificationButton({
  authId,
  status,
  activeStatus,
  btnState,
}: EmailNotificationProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [emailingStatus, setEmailingStatus] = useState<boolean>(activeStatus);
  // const btnState =
  //   planType == "Standard" || planType == "Premium" ? false : true;

  // if (planType == "Standard" || planType == "Premium" ) {
  //     setBtnState(false);
  // }

  const setNotification = async () => {
    console.log(loading);
    setLoading(true);
    try {
      const req = await fetch("/api/settings/set-emailing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authId: authId, status: status }),
      });

      if (req.status === 429) {
        toast.success(`Too many requests! Please try again after a minute.`);
        return;
      }

      if (req.status === 200) {
        const res = await req.json();
        if (res.status == 200) {
          if (status) {
            setEmailingStatus(true);
            toast.success(`Email notifications turned on!`);
          } else {
            setEmailingStatus(false);
            toast.success(`Email notifications turned off!`);
          }
        } else {
          toast.error("Can't set email notification!");
        }
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Switch
        checked={emailingStatus}
        onCheckedChange={() => setNotification()}
        disabled={btnState}
      />
      {/* <Button onClick={() => setNotification()} disabled={btnState}>Toggle</Button> */}
    </div>
  );
}
