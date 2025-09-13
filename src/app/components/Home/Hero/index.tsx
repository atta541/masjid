import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full h-screen z-10 pt-20">
      {/* Background Image */}
      {
        /* <Image
        src="/images/hero/buildingone.jpg" // must be inside /public
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      /> */
      }
      <Image
        src="/images/hero/buildingone.jpg"
        alt="Hero Background"
        fill
        className="object-cover brightness-110 contrast-105"
        priority
      />

      {/* Overlay (optional, for dark effect) */}
      <div className="absolute inset-0 "></div>

      {/* Content on top of the background */}
    </section>
  );
};

export default Hero;
