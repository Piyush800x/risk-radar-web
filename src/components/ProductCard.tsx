import { Bug } from "lucide-react";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
        <div key={product.id} className="flex flex-col gap-4 border rounded-md p-4 w-max max-w-2/5">
          <div>
            <h1 className="text-xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Bug className="" />
              <p className="font-bold">{product.vulnerabilities}</p>
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex flex-col gap-2">
                  {product.severityLevels.map((level) => (
                    <Badge key={level.level} variant="outline">
                      <div className="flex justify-between w-full">
                        <h1>{level.level}</h1>
                        <h1>{level.count}</h1>
                      </div>
                    </Badge>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      ))}
    </>
  );
}
