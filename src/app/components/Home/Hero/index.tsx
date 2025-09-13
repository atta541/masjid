import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/images/hero/buildingone.jpg" // must be inside /public
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay (optional, for dark effect) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content on top of the background */}

    </section>
  );
};

export default Hero;
