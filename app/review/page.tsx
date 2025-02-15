"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import { HorizontalScroll } from "@/components/Slider";
// import api from "@/lib/api";
import axios from "axios";

function Review(){
  return (
    <>
      <div>
        <ReviewContent />
      </div>
    </>
  );
}




const ReviewContent = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try{
      // console.log("ADDA");
      // const {data} = await axios.get("http://localhost:5280/api/units");
      const {data } = await axios.get("api/proxy/units");
      console.log(data);
      setData(data);
    
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=> {
    fetchData();
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-[#0E0E10]">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-[#0E0E10] to-blue-900/20" />
      
      {/* Animated Gradient */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, purple 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, blue 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, purple 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, blue 0%, transparent 50%)
          `,
          filter: 'blur(100px)',
        }}
      />

      {/* Grid Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Radial Fade Overlay */}
      <div className="fixed inset-0 bg-[#0E0E10] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto pt-24">
        <div className='w-full'>
          {/* Search and Filter Section */}
          <div className="relative flex flex-col items-center w-4/5 max-w-3xl mx-auto z-10 mb-12">
            {/* Title Section */}
            <div className="w-full text-left mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Unit Reviews
              </h1>
              <p className="text-white/60">
                Discover and compare units based on student experiences
              </p>
            </div>
          </div>

          {/* Sliders Section */}
          <div className="mt-5 w-full justify-start items-start pb-1000">
            <HorizontalScroll subjects={data} category='Highest Rated'/>
            <HorizontalScroll subjects={data} category='Trending'/>
            <HorizontalScroll subjects={data} category='More'/>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Review;