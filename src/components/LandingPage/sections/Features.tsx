import Image from "next/image";
import { SquareActivity, FileText, HandHeart, Inbox } from "lucide-react";
import React from "react";

interface FeaturesType {
  image: string;
  icon: React.ElementType;
  heading: string;
  description: string;
  direction: string;
}

const features: FeaturesType[] = [
  {
    image: "/features/real_time_monitoring.png",
    icon: SquareActivity,
    heading: "Real-time Monitoring",
    description:
      "*Constant scanning for up-to-the-minute vulnerability insights.",
    direction: "sm:flex-row",
  },
  {
    image: "/features/reporting.png",
    icon: FileText,
    heading: "Detailed Reporting",
    description:
      "Clear, actionable data to understand and address each threat.",
    direction: "sm:flex-row-reverse",
  },
  {
    image: "/features/user_friendly.png",
    icon: HandHeart,
    heading: "User-Friendly Interface",
    description: "Get insights without the clutter.",
    direction: "sm:flex-row sm:pr-52",
  },
  {
    image: "/features/alerts.png",
    icon: Inbox,
    heading: "Automatic alerts and mail notifications",
    description: "*Get instant vulnerability alerts delivered to your mail.",
    direction: "sm:flex-row-reverse",
  },
];

export default function Features() {
  return (
    <div className="mt-[150px]">
      {/* Heading text */}
      <div>
        <h1 className="text-neutral-700 sm:text-md font-semibold uppercase">
          Features
        </h1>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#FFFFFF] to-[#9999998F]/55 bg-clip-text text-transparent">
          Powerful Tools at Your Fingertips
        </h1>
      </div>

      {/* Features */}
      {features.map((feature) => (
        <div
          key={feature.heading}
          className={`relative w-full sm:flex ${feature.direction} mt-16 justify-between items-center`}
        >
          {/* Image */}
          <div className="relative flex">
            <div className="absolute inset-0 bg-gray-600 opacity-50 blur-lg" />
            <Image
              src={feature.image}
              height={500}
              width={500}
              alt={feature.heading}
              className="relative border-4 rounded-md border-neutral-800"
            />
          </div>

          {/* Heading, icon and description */}
          <div className="relative flex flex-col sm:mt-0 mt-8">
            <feature.icon className="sm:w-10 sm:h-10 w-7 h-7 text-neutral-700 invert" />
            <h1 className="sm:text-2xl text-xl font-semibold">{feature.heading}</h1>
            <p className="text-zinc-400 sm:text-base text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
