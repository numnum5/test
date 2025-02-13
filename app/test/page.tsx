// "use client"
// import React from "react";
// import Link from "next/link";
// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import { Grid, Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { HorizontalScroll } from "../fuckoff/page";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// export function SelectDemo() {
//   return (
//     <Select>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select a category" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Categories</SelectLabel>
//           <SelectItem value="action">Action</SelectItem>
//           <SelectItem value="comedy">Comedy</SelectItem>
//           <SelectItem value="drama">Drama</SelectItem>
//           <SelectItem value="horror">Horror</SelectItem>
//           <SelectItem value="sci-fi">Sci-Fi</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )
// }

// // ... other imports remain the same ...

// const ReviewContent = () => {
//   const [search, setSearch] = useState("");

//   const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   }

//   return (
//     <div className="relative min-h-screen w-full bg-[#0E0E10]">
//       {/* Gradient Background */}
//       <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-[#0E0E10] to-blue-900/20" />
      
//       {/* Animated Gradient */}
//       <div 
//         className="fixed inset-0 opacity-30"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 0% 0%, purple 0%, transparent 50%),
//             radial-gradient(circle at 100% 0%, blue 0%, transparent 50%),
//             radial-gradient(circle at 100% 100%, purple 0%, transparent 50%),
//             radial-gradient(circle at 0% 100%, blue 0%, transparent 50%)
//           `,
//           filter: 'blur(100px)',
//         }}
//       />

//       {/* Grid Overlay */}
//       <div 
//         className="fixed inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, white 1px, transparent 1px),
//             linear-gradient(to bottom, white 1px, transparent 1px)
//           `,
//           backgroundSize: '24px 24px',
//         }}
//       />

//       {/* Radial Fade Overlay */}
//       <div className="fixed inset-0 bg-[#0E0E10] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

//       {/* Content Container */}
//       <div className="relative z-10 container mx-auto pt-24">
//         <div className='w-full'>
//           {/* Search and Filter Section */}
//           <div className="relative flex flex-col items-center w-4/5 max-w-3xl mx-auto z-10 mb-12">
//             {/* Title Section */}
//             <div className="w-full text-left mb-8">
//               <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                 Unit Reviews
//               </h1>
//               <p className="text-white/60">
//                 Discover and compare units based on student experiences
//               </p>
//             </div>

//             {/* Search bar and filter */}
//             <div className="flex items-center w-full gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
//                 <Input
//                   type="text"
//                   placeholder="Search units..."
//                   className="pl-10 w-full bg-white/5 border-white/10 text-white 
//                            placeholder:text-white/40 focus:ring-purple-500 focus:border-purple-500
//                            hover:bg-white/10 transition-colors"
//                   onChange={searchOnChange}
//                 />
//               </div>

//               {/* Filter dropdown with updated styling */}
//               <Select>
//                 <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#1a1a1a] border-white/10">
//                   <SelectGroup>
//                     <SelectLabel className="text-white/60">Categories</SelectLabel>
//                     <SelectItem value="all" className="text-white hover:bg-white/10">All Units</SelectItem>
//                     <SelectItem value="core" className="text-white hover:bg-white/10">Core Units</SelectItem>
//                     <SelectItem value="elective" className="text-white hover:bg-white/10">Electives</SelectItem>
//                     <SelectItem value="major" className="text-white hover:bg-white/10">Major Units</SelectItem>
//                     <SelectItem value="minor" className="text-white hover:bg-white/10">Minor Units</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Sliders Section */}
//           <div className="mt-5 w-full justify-start items-start z-10 relative ">
//             <HorizontalScroll category='Highest Rated'/>
//             <HorizontalScroll category='Trending'/>
//             <HorizontalScroll category='More'/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ... rest of the code remains the same ...

// function Review(){


//   return (
//     <>
//         <div>
//       <ReviewContent />
//     </div>
    
//     </>
//   );
// }



// export default Review;