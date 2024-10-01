import Image from "next/image";
import { Button } from "./ui/button";

export default function ProductCard() {
  const products = [
    {
      id: 1,
      name: "Android 14",
      description: "Latest Android OS with 99 vulnerabilities",
      vulnerabilities: 99,
      severityLevels: [
        { level: "Critical", count: 25 },
        { level: "High", count: 40 },
        { level: "Medium", count: 20 },
        { level: "Low", count: 14 },
      ],
    },
  ];

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-14 p-4 bg-[#F4F4F4] dark:bg-[#2D2D2D] rounded-lg border border-[#BCBCBC] dark:border-[#434343] w-full max-w-2/5 transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <div className="flex justify-between gap-16">
            <div>
              <h1 className="text-xl font-semibold max-w-30">Mircrosoft Edge</h1>
              <h1 className="">128.0.21451.8</h1>
            </div>

            <div className="font-semibold">
              <h1 className="flex gap-1">
                <Image
                  src={"/red_ellipse.svg"}
                  height={20}
                  width={20}
                  alt="red_ellipse"
                />
                Critical: 15
              </h1>
              <h1 className="flex gap-1">
                <Image
                  src={"/yellow_ellipse.svg"}
                  height={20}
                  width={20}
                  alt="yellow_ellipse"
                />
                High: 15
              </h1>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <Button className="">View Details</Button>
          </div>
        </div>
      ))}
    </>
  );
}
