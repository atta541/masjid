// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useInView } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import SingleService from "./SingleService";

// const Services = () => {
//   const [services, setServices] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const ref = useRef(null);
//   const inView = useInView(ref);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/service");
//         if (!res.ok) throw new Error("Failed to fetch");

//         const data = await res.json();
//         console.log(data);
//         setServices(data.ServicesData || []);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const TopAnimation = {
//     animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
//     transition: { duration: 1, delay: 0.4 },
//   };

//   return (
//     <section className="relative overflow-hidden">
//       {/* Background Image with blur + soft overlay */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/images/services/imageone.png"
//           alt="Background"
//           fill
//           className="object-cover object-center filter blur-sm brightness-90"
//           priority
//         />
//       </div>

//       {/* Optional overlay for even softer effect */}
//       <div className="absolute inset-0 bg-white/30 -z-5"></div>

//       <div
//         ref={ref}
//         className="container mx-auto lg:max-w-xl md:max-w-screen-md px-4 relative z-10"
//       >
//         <motion.div {...TopAnimation} className="mb-17">
//           <p className="text-black/50 dark:text-white/50 text-lg lg:text-start text-center">
//             Services We Provide
//           </p>
//           <div className="flex lg:flex-row flex-col lg:gap-0 gap-10 justify-between items-center mt-5">
//             <h2 className="font-semibold md:text-6xl sm:text-40 text-3xl text-black dark:text-white lg:text-start text-center">
//               Innovative Apps for <br /> Your Business Needs
//             </h2>
//             <Link
//               href="/services"
//               className="py-1.125 px-2.188 bg-primary rounded-lg hover:bg-orange-600 duration-300 text-white font-semibold"
//             >
//               All Services
//             </Link>
//           </div>
//         </motion.div>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-12 gap-6">
//             {services.slice(0, 3).map((item, index) => (
//               <SingleService key={index} service={item} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Services;


// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useInView } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";

// const Services = () => {
//   const [services, setServices] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const ref = useRef(null);
//   const inView = useInView(ref);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/service");
//         if (!res.ok) throw new Error("Failed to fetch");

//         const data = await res.json();
//         setServices(data.ServicesData || []);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const TopAnimation = {
//     animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
//     transition: { duration: 1, delay: 0.4 },
//   };

//   return (
//     <section className="relative overflow-hidden py-20">
//       {/* Background Image with blur + soft overlay */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/images/services/imageone.png"
//           alt="Background"
//           fill
//           className="object-cover object-center filter blur-sm brightness-90"
//           priority
//         />
//       </div>
//       <div className="absolute inset-0 bg-white/30 -z-5"></div>

//       <div
//         ref={ref}
//         className="container mx-auto lg:max-w-6xl md:max-w-screen-md px-4 relative z-10"
//       >
//         <motion.div {...TopAnimation} className="mb-10 text-center">
//           <p className="text-black/50 dark:text-white/50 text-lg">
//             Services We Provide
//           </p>
//           <h2 className="font-semibold md:text-5xl sm:text-4xl text-3xl text-black dark:text-white mt-2">
//             Innovative Apps for Your Business Needs
//           </h2>
//         </motion.div>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
//           </div>
//         ) : (
//           <Swiper
//             modules={[Navigation]}
//             spaceBetween={30}
//             slidesPerView={1}
//             navigation
//             breakpoints={{
//               640: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//           >
//             {services.map((service) => (
//               <SwiperSlide key={service._id}>
//                 <div className="bg-white dark:bg-darklight rounded-xl shadow-lg overflow-hidden">
//                   {/* Service Image */}
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={service.image}
//                       alt={service.title}
//                       fill
//                       className="object-cover object-center"
//                     />
//                   </div>

//                   {/* Card Content */}
//                   <div className="p-5">
//                     <h3 className="font-semibold text-xl text-black dark:text-white mb-2">
//                       {service.title}
//                     </h3>
//                     <p className="text-black/60 dark:text-white/60 text-sm mb-3">
//                       {service.description}
//                     </p>
//                     <Link
//                       href={`/services/${service.slug}`}
//                       className="text-primary font-semibold hover:underline"
//                     >
//                       Learn More
//                     </Link>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Services;


"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SingleService from "./SingleService";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/service");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log(data);
        setServices(data.ServicesData || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (services.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }
  }, [services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const TopAnimation = {
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  const getVisibleServices = () => {
    if (services.length === 0) return [];
    
    // For desktop, show 3 cards
    const visibleCount = 3;
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentSlide + i) % services.length;
      result.push(services[index]);
    }
    
    return result;
  };

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background Image with blur + soft overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/services/imageone.png"
          alt="Background"
          fill
          className="object-cover object-center filter blur-sm brightness-90"
          priority
        />
      </div>

      {/* Optional overlay for even softer effect */}
      <div className="absolute inset-0 bg-white/30 -z-5"></div>

      <div
        ref={ref}
        className="container mx-auto lg:max-w-7xl md:max-w-screen-lg px-4 relative z-10"
      >
        <motion.div {...TopAnimation} className="mb-12">
          <p className="text-black/50 dark:text-white/50 text-lg lg:text-start text-center">
            Services We Provide
          </p>
          <div className="flex lg:flex-row flex-col lg:gap-0 gap-10 justify-between items-center mt-5">
            <h2 className="font-semibold md:text-6xl sm:text-4xl text-3xl text-black dark:text-white lg:text-start text-center">
              Innovative Apps for <br /> Your Business Needs
            </h2>
            <Link
              href="/services"
              className="py-3 px-6 bg-primary rounded-lg hover:bg-orange-600 duration-300 text-white font-semibold transition-all hover:scale-105"
            >
              All Services
            </Link>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <motion.div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${(currentSlide * 100) / services.length}%)` }}
              >
                {services.map((service, index) => (
                  <div key={service._id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                    <ServiceCard service={service} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({ service }: { service: any }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        {service.image && (
          <Image
            src={service.image.startsWith('http') ? service.image : `/images${service.image}`}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon overlay */}
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
          <span className="text-2xl">{service.icon}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Features Preview */}
        {service.features && service.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {service.features.slice(0, 2).map((feature: any, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {feature.title}
                </span>
              ))}
              {service.features.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{service.features.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Learn More Button */}
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-300"
        >
          Learn More
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Services;