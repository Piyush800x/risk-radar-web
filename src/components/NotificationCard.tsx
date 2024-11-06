import Image from "next/image";

interface notificationDetails {
  title: string;
  time: string;
}

export default function NotificationCard({
  title,
  time,
}: notificationDetails) {
  return (
    <div className="flex ">
      <div className="flex bg-[#F4F4F4] dark:bg-[#2D2D2D] rounded-l-lg border border-[#BCBCBC] dark:border-[#434343] justify-between rounded-tl-lg rounded-bl-lg  px-2 py-1  w-full">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div>
          <h1>{time}</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center cursor-pointer px-3 bg-[#F4F4F4] dark:bg-[#2D2D2D] rounded-r-lg border border-[#BCBCBC] dark:border-[#434343] transition-all duration-300 hover:bg-red-500 dark:hover:bg-red-500 group">
        <Image
          src="/delete_icon.svg"
          width={20}
          height={20}
          alt="delete icon"
          className="group-hover:invert dark:invert"
        />
      </div>
    </div>
  );
}
