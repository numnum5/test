import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  category: string;
}
const units = [
  {
    title: "Microprocessor and Digital Systems",
    unitCode: "CAB202",
    rating: 4.5,
    reviews: 128,
    passRate: "85%",
    weeklyHours: "12h",
    type: "Core Unit",
    description: "Learn about digital systems, microprocessors, and embedded systems programming. This unit covers both theoretical concepts and practical applications.",
    creditPoints: 12,
    semester: "Sem 1, 2024",
    prerequisites: ["CAB201", "MXB103"]
  },
  // ... other units
];

const Slider = ({ category }: SliderProps) => {
  const [showControls, setShowControls] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-bold text-white">{category}</h2>
        <Link href="#" className="text-white hover:text-white/80 flex items-center gap-1">
          See more
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Slider Container */}
      <div 
        className="relative group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth px-4"
        >
          {units.map((unit, index) => (
            <div key={index} className="relative flex-shrink-0">
              {/* Card Container */}
              <div className="group/card relative w-[300px] h-[169px]">
                {/* Base Card */}
                <div className="absolute w-full h-full rounded-lg bg-gradient-to-br from-purple-900 to-blue-900">
                  <div className="p-4 h-full flex flex-col justify-between">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold text-white">{unit.unitCode}</span>
                      <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">
                        {unit.type}
                      </span>
                    </div>
                    <h3 className="text-white font-medium">{unit.title}</h3>
                  </div>
                </div>

                {/* Hover Expansion - Position fixed */}
                <div className="fixed left-0 w-[300px] bg-gradient-to-br from-purple-900 to-blue-900 
                               rounded-lg shadow-xl opacity-0 invisible pointer-events-none
                               group-hover/card:opacity-100 group-hover/card:visible group-hover/card:pointer-events-auto
                               transition-all duration-200 z-[100]"
                     style={{
                       top: '0',
                       transform: 'translate3d(var(--card-left), var(--card-top), 0)',
                     }}>
                  {/* Original Content */}
                  <div className="p-4 h-[169px] flex flex-col justify-between">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold text-white">{unit.unitCode}</span>
                      <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">
                        {unit.type}
                      </span>
                    </div>
                    <h3 className="text-white font-medium">{unit.title}</h3>
                  </div>

                  {/* Extra Details */}
                  <div className="p-4 border-t border-white/10">
                    <p className="text-white/80 text-sm mb-4">{unit.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-cyan-400 text-lg font-semibold">{unit.rating}</p>
                        <p className="text-white/60 text-xs">Rating</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-cyan-400 text-lg font-semibold">{unit.passRate}</p>
                        <p className="text-white/60 text-xs">Pass Rate</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-cyan-400 text-lg font-semibold">{unit.weeklyHours}</p>
                        <p className="text-white/60 text-xs">Weekly</p>
                      </div>
                    </div>

                    <Link href={`/unit/${unit.unitCode}`}>
                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg 
                                     transition-colors text-sm">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showControls && (
          <>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40"
            >
              <div className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors mx-2">
                <ChevronLeft className="w-6 h-6 text-white" />
              </div>
            </button>

            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40"
            >
              <div className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors mx-2">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;