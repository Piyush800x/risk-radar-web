import Image from "next/image";

export default function SideBar() {
  const selected = true;
  return (
    <div className="bg-stone-100 dark:bg-stone-100/10 flex flex-col w-max h-dvh">
      <Image
        src={"/main_logo.svg"}
        height={200}
        width={200}
        alt="main logo"
        className="m-8"
      />
      <h1 className="font-semibold text-[#707070] text-sm ml-3 mb-3">
        DASHBOARD
      </h1>

      <div
        className={`${
          selected == true ? "bg-neutral-800/10" : ""
        } flex font-semibold items-center`}
      >
        <span
          className={`${
            selected == true ? "bg-zinc-800 w-max h-full" : "invisible"
          }`}
        >
          |
        </span>
        <div className="flex gap-3 items-center justify-center mx-3 my-3 h-max">
          <span>
            <Image
              src={selected ? "/sidebar_icons/home_filled.svg" : "/sidebar_icons/home.svg"}
              width={25}
              height={25}
              alt="home icon"
            />
          </span>
          <h1 className="text-md font-bold">Home</h1>
        </div>
      </div>
    </div>
  );
}
