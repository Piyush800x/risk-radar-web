import Image from "next/image";

export default function Trust() {
  return (
    <div className="mt-[150px] w-full">
      {/* Heading text */}
      <div className="">
        <h1 className="text-neutral-700 sm:text-md font-semibold uppercase">
          Trust
        </h1>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#FFFFFF] to-[#9999998F]/55 bg-clip-text text-transparent">
          Backed with cutting-edge technology
        </h1>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 w-full mt-8">
        {/* Card 1 */}
        <div className="relative bg-neutral-900 rounded-lg shadow border border-neutral-600 flex flex-col gap-8 w-full py-10 px-4 justify-center items-center text-center">
          <div className="absolute -z-50 inset-0 bg-gray-600 opacity-50 blur-lg" />
          <Image
            src={"/trust/gcp_full.svg"}
            width={350}
            height={350}
            alt="gcp logo"
          />
          <p className="text-zinc-400">
            Powered by GCP for fast, scalable, and secure data processing to
            deliver real-time insights.
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative bg-neutral-900 rounded-lg shadow border border-neutral-600 flex flex-col gap-8 w-full py-10 px-4 justify-center items-center text-center">
          <div className="absolute -z-50 inset-0 bg-gray-600 opacity-50 blur-lg" />
          <Image
            src={"/trust/mongodb_full.svg"}
            width={350}
            height={350}
            alt="gcp logo"
          />
          <p className="text-zinc-400">
            Built on MongoDB for secure, flexible data storage, enabling
            efficient data management at scale.
          </p>
        </div>
      </div>
    </div>
  );
}
