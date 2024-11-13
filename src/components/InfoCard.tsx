"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion for animation

interface InfoCardProps {
  open: boolean;
  onClose: () => void;
  details: {
    title: string;
    description: string;
    image: string;
    info: any[];
  };
}

const InfoCard = ({ open, onClose, details }: InfoCardProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="bg-white/50 backdrop-blur-lg shadow-lg rounded-lg p-6 h-svh overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-black text-5xl">
            {details.title.split("").map((char, index) => (
              <span
                className="animate-text-reveal inline-block [animation-fill-mode:backwards]"
                key={`${char}-${index}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </SheetTitle>
          <SheetDescription>
            <div className="pt-2">
              <Image
                src={details.image}
                alt={details.title}
                width={1000}
                height={1000}
                className="w-full h-auto"
              />
              <p className="pt-2 text-black">{details.description}</p>
            </div>

            {/* Loop through info and render sections */}
            {details.info.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} // Initial state: invisible and slightly below
                whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
                viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% is in view
                transition={{
                  duration: 1,
                  delay: index * 0.3, // Stagger animations
                }}
                className="transition-all transform py-4"
              >
                <p className="text-black text-lg font-bold">{info.title}</p>
                <Image
                  src={info.image}
                  alt={info.title}
                  width={1000}
                  height={1000}
                  className="w-full h-auto"
                />
                <p className="pt-2 text-black">{info.description}</p>
              </motion.div>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default InfoCard;
