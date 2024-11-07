'use client';
import { useEffect, useState } from "react";
import NotificationCard from "@/components/NotificationCard";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface Notification {
  id: string;
  header: string;
  time: string;
}


export default function Notifications() {
  const {isAuthenticated, user} = useKindeBrowserClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getNotifications = async () => {
    setLoading(true);
    try {
      const req = await fetch('/api/get-notifications', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"authId": user?.id})
      });
  
      const res = await req.json();
      if (res.success) {
        setNotifications(res.data.notifications);
        console.log(JSON.stringify(res.data.notifications));
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      getNotifications();
    };
  }, [isAuthenticated, user]);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="py-4 px-5 flex flex-col">
      {/* Titles and stuffs */}
      <h1 className="text-neutral-600 text-lg font-semibold dark:invert">
        Notifications
      </h1>
      <div className="mt-6 ">
        <span className="text-neutral-900 text-3xl font-extrabold tracking-wide dark:text-white">
          Welcome, Mr. {user?.family_name}
          <br />
        </span>
        <span className="text-neutral-700 text-lg font-medium tracking-wide dark:invert">
          See all your notifications here
        </span>
      </div>

      {/* Notification bars */}
      <div className="m-2 grid grid-cols-1 w-full">
        {notifications.map((notification) => (
          <NotificationCard title={notification.header} time={notification.time} id={notification.id} authEmailId={user?.email!}/>
        ))}
      </div>
    </div>
  );
}
