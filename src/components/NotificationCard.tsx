import Image from "next/image";

interface notificationDetails {
  title: string;
  description: string;
  time: string;
}

export default function NotificationCard({
  title,
  description,
  time,
}: notificationDetails) {
  return (
    <div className="flex">
      <div className="flex justify-between bg-stone-50 rounded-tl-lg rounded-bl-lg border px-2 py-1 border-stone-300 w-full">
        <div>
          <h1 className="text-zinc-800 text-xl font-semibold">{title}</h1>
          <h1>{description}</h1>
        </div>
        <div>
          <h1>{time}</h1>
        </div>
      </div>
    <div className="flex flex-col items-center justify-center cursor-pointer px-3 bg-stone-50 rounded-tr-lg rounded-br-lg border border-stone-300 transition-all duration-300 hover:bg-red-500 group">
      <Image
        src="/delete_icon.svg"
        width={20}
        height={20}
        alt="delete icon"
        className="group-hover:invert"
      />
    </div>
    </div>
  );
}
