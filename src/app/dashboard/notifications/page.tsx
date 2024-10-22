import NotificationCard from "@/components/NotificationCard";

export default function Notifications() {
  return (
    <div className="py-4 px-5 flex flex-col">
      {/* Titles and stuffs */}
      <h1 className="text-neutral-600 text-lg font-semibold dark:invert">
        Notifications
      </h1>
      <div className="mt-6 ">
        <span className="text-neutral-900 text-3xl font-extrabold tracking-wide dark:text-white">
          Welcome,
          <br />
        </span>
        <span className="text-neutral-700 text-lg font-medium tracking-wide dark:invert">
          See all your notifications here
        </span>
      </div>

      {/* Notification bars */}
      <div className="m-2 grid grid-cols-1 w-full">
        <NotificationCard title="new heading" description="new desc" time="15:12"/>
      </div>
    </div>
  );
}
