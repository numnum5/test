'use client'
import { useState,useEffect, useRef, RefObject, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

interface HorizontalScrollProps {
  category : string;
  subjects : UnitData[];

}

export const HorizontalScroll = ({category, subjects} : HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showControls, setShowControls] = useState(false);

  const scroll = (direction: "left" | "right") => { // typing direction correctly
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      console.log(scrollRef.current);
      scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  console.log("", scrollRef.current);
  return (
    <div className='relative'>

      <div className='relative flex flex-row gap-20'>
      <h2 className="text-2xl font-bold mb-3">{category}</h2>
      <button className="text-2xl flex items-center gap-1">
     
      <ChevronRight />
        </button>
      </div>
    <div
      className="relative w-full"
      
      style={{ padding: "40px 0"}}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}

    >
      {/* Scroll Controls */}
      <AnimatePresence>
        {showControls && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-[100] bg-black/50 p-2 rounded-full"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="text-white" size={24} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-[100] bg-black/50 p-2 rounded-full"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="text-white" size={24} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Scrollable Container */}
      <div className="relative" >
      <div
        key={category}
        ref={scrollRef}
        className="relative flex gap-4 w-full scrollbar-hide overflow-x-scroll whitespace-nowrap scroll-container border-solid"
        style={{
          padding: "20px",
          margin: "-20px",
          position: "relative"
        }}
      >
        {/* Sample Cards */}


        {subjects.length > 0 ? subjects.map(unit => (
            <Unit 
              key={unit.unitCode}
              unit={unit}
              scrollRef={scrollRef}
            />)
        )
        :
        <span className='h-[200px]'>
          No units
        </span>
        }
        </div>
      </div> 
    </div>
  </div> 
  );
};



interface UnitData {
  id: string;
  unitCode: string;
  unitName: string;
  faculty: string;
  description: string;
  area: string;
  content: string[]; 
  weeklyTopics: string[];
  assessments: string[]; 
  prerequisites: string[];
  postrequisites: string[]; 
  reviews: string[];
}
interface UnitProps {
  unit: UnitData;
  scrollRef?: RefObject<HTMLDivElement | null>;
}
export const Unit = ({ unit, scrollRef}: UnitProps) => {
  const { unitCode, unitName, description, prerequisites } = unit;
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Memoized and optimized position update function
  const updatePosition = useCallback(() => {
    if (cardRef.current) {
      // Cancel any previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Use requestAnimationFrame for smoother updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const scaleFactor = 1.1;
        const rect = cardRef.current!.getBoundingClientRect();
        const scaledWidth = rect.width * scaleFactor;
    
        setPosition({
          top: rect.bottom + window.scrollY + 10,
          left: rect.left + window.scrollX - (scaledWidth - rect.width) / 2,
          width: scaledWidth,
        });
      });
    }
  }, []);

  // Simplified effect for event listeners
  useEffect(() => {
    const scrollContainer = scrollRef?.current;

    if (isHovered) {
      updatePosition(); // Initial position

      const handleUpdate = () => {
        if (isHovered) updatePosition();
      };

      // Use passive listeners for better performance
      window.addEventListener("scroll", handleUpdate, { passive: true });
      window.addEventListener("resize", handleUpdate, { passive: true });
      scrollContainer?.addEventListener("scroll", handleUpdate, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleUpdate);
        window.removeEventListener("resize", handleUpdate);
        scrollContainer?.removeEventListener("scroll", handleUpdate);
        
        // Cancel any pending animation frame
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isHovered]);

  return (
    <>
      {/* Main Card */}
      <div
        className="relative flex-shrink-0 inline-block"
        style={{ width: "300px" }}
        ref={cardRef}
        onMouseEnter={() => {
          setIsHovered(true);
          updatePosition(); // Ensure position is up-to-date
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg border border-white/10 shadow-lg"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >


<Link href={`/review/${unitCode}`}>
       <div className="aspect-[16/9] relative">
                  
                   <div className="absolute inset-0 p-4 flex flex-col justify-between">
                     <div className="flex items-start justify-between">
                       <span className="text-2xl font-bold text-white">{unitCode}</span>
                     <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">
                         Core Unit
                       </span>
                     </div>
                  <h3 className="text-white font-semibold">{unitName}</h3>
                  </div>
        </div>
        
        </Link>

          {isHovered &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.0 }}
              className="absolute bg-black rounded-b-lg shadow-xl p-4 space-y-4 w-[300px]"
              style={{
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${position.width}px`,
                background: "black",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                zIndex : 5000,
  //  transform: `translateX(${position.left}px)`
              }}
            >
             <div className="p-4 space-y-4">
                  {/* Brief Description */}
                  {/* <CollapsibleText title={"DSD"} content={"DAJDIOJDOIAJODJADOIJDAOIJDOOOOOOOOOOOOOOOOOOOOI"}/> */}
                  <p className="text-white/80 text-sm">
                    {description}
              </p>

                  {/* Key Information */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="space-y-1">
                       <p className="text-white/60">Credit Points</p>
                     {/* <p className="text-white">{creditPoints}</p> */}
                    </div>
                   <div className="space-y-1">
                     <p className="text-white/60">Semester</p>
                      {/* <p className="text-white">{semester}</p> */}
                   </div>
                   </div>


                   <div className="space-y-2">
                     <p className="text-white/60 text-sm">Prerequisites</p>
                     <div className="flex flex-wrap gap-2">
                       {prerequisites.map((name, index) => (
                        <span key={name || index} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90">
                        {name}
                      </span>

                    ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-cyan-400 text-lg font-semibold">1/10</p>
                      <p className="text-white/60 text-xs">Rating</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-cyan-400 text-lg font-semibold">85%</p>
                      <p className="text-white/60 text-xs">Pass Rate</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-cyan-400 text-lg font-semibold">12h</p>
                      <p className="text-white/60 text-xs">Weekly</p>
                    </div>
                  </div>
                </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
        </motion.div>
      </div>

     

    </>
  );
};


