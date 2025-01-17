import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconSignature, IconTableColumn } from "@tabler/icons-react";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AnimatedTooltipPreview } from "@/components/tooltipRegistered";

export default function BentoGridSecondDemo() {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center -z-10 dark:bg-black w-full bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <BentoGrid className="w-[80%] mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    header: (
      <div className="flex relative items-center justify-center h-full w-full">
        <Image
          alt="bg"
          height={500}
          width={500}
          className="w-full relative h-full"
          src="/bg.png"
        />
      </div>
    ),
    className: "md:col-span-2",
  },
  {
    header: (
      <div className="flex h-full w-full ">
        <div className="flex gap-4 flex-col justify-center  h-full w-full">
          <div>
            <TextGenerateEffect
              className="-z-10"
              duration={1}
              filter={false}
              words="Endevour 2K25"
            />
          </div>

          <p className="opacity-40">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <AnimatedTooltipPreview />

          <button className="border-2 bg-white text-black mt-4 hover:-translate-y-2 p-2 w-[60%] font-semibold">
            Register Now
          </button>
        </div>
      </div>
    ),
    className: "md:col-span-1",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
