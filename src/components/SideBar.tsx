"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  let homeSelected;
  let notiSelected;
  let settingsSelected;
  let billingSelected;

  switch (pathname) {
    case "/dashboard/home":
      homeSelected = true;
      break;
    case "/dashboard/notifications":
      notiSelected = true;
      break;
    case "/dashboard/settings":
      settingsSelected = true;
      break;
    case "/dashboard/billing":
      billingSelected = true;
      break;
    default:
      break;
  }

  return (
    <div className="bg-stone-100 dark:bg-stone-100/10 flex flex-col justify-between w-max h-dvh drop-shadow-md ">
      {/* Logo and heading with Sidebar menu items */}
      <div>
        <Image
          src={"/main_logo.svg"}
          height={200}
          width={200}
          alt="main logo"
          className="m-8 dark:invert"
        />
        <h1 className="font-semibold text-[#707070] text-sm ml-3 mb-3">
          DASHBOARD
        </h1>

        {/* Sidebar Menu Items */}

        <Link href={"/dashboard/home"}>
          <div
            className={`${
              homeSelected == true
                ? "bg-neutral-800/10 dark:bg-neutral-700/30"
                : ""
            } flex font-semibold items-center`}
          >
            <span
              className={`${
                homeSelected == true
                  ? "bg-zinc-800 dark:bg-zinc-500 w-max h-full text-zing-800 dark:text-zinc-500"
                  : "invisible"
              }`}
            >
              |
            </span>
            <div className="flex gap-3 items-center justify-center mx-3 my-3 h-max">
              <span>
                <Image
                  src={
                    homeSelected
                      ? "/sidebar_icons/home_filled.svg"
                      : "/sidebar_icons/home.svg"
                  }
                  width={25}
                  height={25}
                  alt="home icon"
                  className="dark:invert"
                />
              </span>
              <h1 className="text-md font-semibold tracking-wide">Home</h1>
            </div>
          </div>
        </Link>
        <Link href={"/dashboard/notifications"}>
          <div
            className={`${
              notiSelected == true
                ? "bg-neutral-800/10 dark:bg-neutral-700/30"
                : ""
            } flex font-semibold items-center`}
          >
            <span
              className={`${
                notiSelected == true
                  ? "bg-zinc-800 dark:bg-zinc-500 w-max h-full text-zing-800 dark:text-zinc-500"
                  : "invisible"
              }`}
            >
              |
            </span>
            <div className="flex gap-3 items-center justify-center mx-3 my-3 h-max">
              <span>
                <Image
                  src={
                    notiSelected
                      ? "/sidebar_icons/notification_filled.svg"
                      : "/sidebar_icons/notification.svg"
                  }
                  width={25}
                  height={25}
                  alt="home icon"
                  className="dark:invert"
                />
              </span>
              <h1 className="text-md font-semibold tracking-wide">
                Notifications
              </h1>
            </div>
          </div>
        </Link>

        <Link href={"/dashboard/settings"}>
          <div
            className={`${
              settingsSelected == true
                ? "bg-neutral-800/10 dark:bg-neutral-700/30"
                : ""
            } flex font-semibold items-center`}
          >
            <span
              className={`${
                settingsSelected == true
                  ? "bg-zinc-800 dark:bg-zinc-500 w-max h-full text-zing-800 dark:text-zinc-500"
                  : "invisible"
              }`}
            >
              |
            </span>
            <div className="flex gap-3 items-center justify-center mx-3 my-3 h-max">
              <span>
                <Image
                  src={
                    settingsSelected
                      ? "/sidebar_icons/settings_filled.svg"
                      : "/sidebar_icons/settings.svg"
                  }
                  width={25}
                  height={25}
                  alt="home icon"
                  className="dark:invert"
                />
              </span>
              <h1 className="text-md font-bold tracking-wide">Settings</h1>
            </div>
          </div>
        </Link>

        <Link href={"/dashboard/billing"}>
          <div
            className={`${
              billingSelected == true
                ? "bg-neutral-800/10 dark:bg-neutral-700/30"
                : ""
            } flex font-semibold items-center`}
          >
            <span
              className={`${
                billingSelected == true
                  ? "bg-zinc-800 dark:bg-zinc-500 w-max h-full text-zing-800 dark:text-zinc-500"
                  : "invisible"
              }`}
            >
              |
            </span>
            <div className="flex gap-3 items-center justify-center mx-3 my-3 h-max">
              <span>
                <Image
                  src={
                    billingSelected
                      ? "/sidebar_icons/credit_card_filled.svg"
                      : "/sidebar_icons/credit_card.svg"
                  }
                  width={25}
                  height={25}
                  alt="home icon"
                  className="dark:invert"
                />
              </span>
              <h1 className="text-md font-bold tracking-wide">Billing</h1>
            </div>
          </div>
        </Link>
      </div>

      {/* System Status */}
      <div className="mx-2 my-2 pt-1 flex gap-2 items-center border-t border-stone-300">
        <div>
          <Image
            src={"/green_tick_icon.svg"}
            height={30}
            width={30}
            alt="green tick icon"
          />
        </div>
        <div>
          <h1 className="font-semibold">Status: All Systems Operational</h1>
          <h1 className="text-sm">
            Last Updated:{" "}
            {new Date().toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}{" "}
            IST
          </h1>
        </div>
      </div>
    </div>
  );
}
