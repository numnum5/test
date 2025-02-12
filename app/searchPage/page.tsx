'use client'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'



import { useState } from "react";
import { useSearchParams } from "next/navigation"; // for getting query params
import Link from "next/link";

interface SearchBarProps {

  setQuery : (q : string) => void
}

function SearchBar({setQuery} : SearchBarProps){
  const [search, setSearch] = useState("");

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Update the state with the new search query
  };


  const handleSubmit = (e : React.FormEvent) => {

    e.preventDefault();

    console.log("Sumbmited");
    setQuery(search);
  }


  return(


    <form onSubmit={handleSubmit}>
    <div className="relative flex flex-col items-center w-4/5 max-w-3xl mx-auto z-10">
      <div className="flex items-center w-full gap-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 w-full rounded-xl" // Add padding to accommodate the icon
          value={search} // Bind the value to the search state
          onChange={searchOnChange} // Update search state on input change
        />
      </div>
    </div>
    </form>
  );
}



const page = () => {
  const searchParams = useSearchParams();
  // const query = searchParams.get("query") || ""; // Get query from URL or default to empty string
  const [query, setQuery] = useState("");



  return (
    <div className="">
      {/* Navbar and other content */}


      <div className="relative min-h-screen w-full">
        {/* Main content container */}
        <div className="relative min-h-screen w-full bg-gradient-to-br from-[#000319] via-[#111928] via-purple-900/50 to-[#000319]">
          {/* Fixed background grids and overlays */}
          <div
            className="fixed inset-0 dark:bg-grid-white/[0.03] bg-grid-black/[0.2]"
            style={{
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="fixed inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />

          <div className="relative z-10 container mx-auto px-5 py-16 pt-24">
            {/* Search bar */}


           <SearchBar setQuery={setQuery}/>

            {/* Grid Content filtered by query */}
            <GridContent query={query} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Data for grid content
const units = [
  { title: "Microprocessor and digital systems", unitCode: "CAB202" },
  { title: "Data Structures and Algorithms", unitCode: "IT202" },
  { title: "Database Systems", unitCode: "IT305" },
  { title: "Operating Systems", unitCode: "CS210" },
  { title: "Computer Networks", unitCode: "CS320" },
  { title: "Software Engineering", unitCode: "SE402" },
  { title: "Artificial Intelligence", unitCode: "AI450" },
  { title: "Web Development", unitCode: "WD230" },
  { title: "Cloud Computing", unitCode: "CC310" },
  { title: "Cyber Security", unitCode: "CY400" },
];

interface GridContentProps {
  query: string;
}



function GridContent({ query }: GridContentProps) {
  const filteredUnits = units.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.unitCode.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredUnits.map((item, index) => (
        <div key={index} className="relative group h-[200px] hover:h-auto">
          {/* Card Container */}
          <div className="absolute w-full transform transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:z-50">
            {/* Main Card */}
            <div className="bg-[rgba(17,25,40,0.75)] rounded-lg overflow-hidden border border-white/10">
              {/* Base Content - Always Visible */}
              <div className="aspect-[16/9] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-2xl font-bold text-white">{item.unitCode}</span>
                    <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">
                      Core Unit
                    </span>
                  </div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
              </div>

              {/* Expandable Content */}
              <div className="max-h-0 group-hover:max-h-[500px] transition-all duration-500 ease-in-out overflow-hidden bg-[rgba(17,25,40,0.95)] backdrop-blur-sm">
                <div className="p-4 space-y-4">
                  {/* Brief Description */}
                  <p className="text-white/80 text-sm">
                    Learn about digital systems, microprocessors, and embedded systems programming. 
                    This unit covers both theoretical concepts and practical applications.
                  </p>

                  {/* Key Information */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="space-y-1">
                      <p className="text-white/60">Credit Points</p>
                      <p className="text-white">12 CP</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white/60">Semester</p>
                      <p className="text-white">Sem 1, 2024</p>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="space-y-2">
                    <p className="text-white/60 text-sm">Prerequisites</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90">
                        CAB201
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90">
                        MXB103
                      </span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-cyan-400 text-lg font-semibold">4.5</p>
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

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`unit/${item.unitCode}`} className="flex-1">
                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition-colors text-sm">
                        View Details
                      </button>
                    </Link>
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors text-sm">
                      Add to Planner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default page;

