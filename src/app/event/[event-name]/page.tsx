import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AnimatedTooltipPreview } from "@/components/landing-page/tooltipRegistered";
import InfoCard from "@/components/landing-page/DetailCard";
import ToggleTabs from "@/components/landing-page/ToggleTabs";

export default function BentoGridSecondDemo() {
  return (
    <div className=" pt-8 pb-8 w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center -z-10 dark:bg-black w-full bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <BentoGrid className="w-[80%] mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            header={item.header}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
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

          <p className="opacity-60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <AnimatedTooltipPreview />

          <button className="border-2 bg-white text-black mt-4 hover:-translate-y-2 p-2 rounded-lg w-[60%] font-semibold">
            Register Now
          </button>
        </div>
      </div>
    ),
    className: "md:col-span-1",
  },
  {
    header:
        <InfoCard/>

 ,
    className: "md:col-span-1",
  },
  {
    header: <div className="h-full overflow-scroll p-0 m-0">
              <ToggleTabs />

    </div> ,
    className: "md:col-span-2",
  },
];


