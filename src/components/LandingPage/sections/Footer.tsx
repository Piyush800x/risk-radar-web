import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-[150px] relative flex">
      <div className="absolute inset-0 bg-gray-600 opacity-50 blur-lg -z-50" />

      {/* Actual working div */}
      <div className="sm:flex grid sm:justify-between  sm:px-24 py-4 px-4 w-full bg-neutral-900 shadow border-t border-zinc-700">
        {/* Logo and Copyright */}
        <div className="flex flex-col sm:gap-28 sm:mb-0 mb-4">
          <Image
            src={"/main_logo.svg"}
            width={160}
            height={160}
            alt="main logo"
            className="invert opacity-90"
          />
          <h1 className="text-neutral-600 text-sm">
            &copy; {new Date().getFullYear()} - Copyright
          </h1>
        </div>

        {/* Query email */}
        <div className="flex flex-col">
          <div>
            <span className="text-zinc-400 text-md font-normal">
              Queries?
              <br />
              Drop a mail at
              <br />
            </span>
            <a
              href="mailto:support@riskradar.tech"
              className="text-white text-lg font-semibold"
            >
              support@riskradar.tech
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-col sm:gap-4 gap-2 sm:mt-0 mt-4">
          <div className="text-stone-300 text-md font-normal">Risk Radar</div>
          <Link href={"/"}>
            <div className="text-gray-200 text-sm font-semibold">Home</div>
          </Link>
          <Link href={"#"}>
            <div className="text-gray-200 text-sm font-semibold">Features</div>
          </Link>
          <Link href={"/pricing"}>
            <div className="text-gray-200 text-sm font-semibold">Pricing</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
