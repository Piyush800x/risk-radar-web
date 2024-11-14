"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

interface EmailNotificationProps {
  authId: string;
  status: boolean;
  activeStatus: boolean;
  planType: string;
}

export default function EmailNotificationButton({
  authId,
  status,
  activeStatus,
  planType,
}: EmailNotificationProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [emailingStatus, setEmailingStatus] = useState<boolean>(activeStatus);
  const btnState =
    planType == "Standard" || planType == "Premium" ? false : true;

  // if (planType == "Standard" || planType == "Premium" ) {
  //     setBtnState(false);
  // }

  const setNotification = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/settings/set-emailing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authId: authId, status: status }),
      });

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
      />
      {/* <Button onClick={() => setNotification()} disabled={btnState}>Toggle</Button> */}
    </div>
  );
}
