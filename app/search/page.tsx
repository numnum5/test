'use client'
import React, { useEffect,useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Unit } from '@/components/Slider'
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search units..."
                  className="pl-10 w-full bg-white/5 border-white/10 text-white 
                           placeholder:text-white/40 focus:ring-purple-500 focus:border-purple-500
                           hover:bg-white/10 transition-colors"
                  onChange={searchOnChange}
                />
              </div> 

              {/* Filter dropdown with updated styling */}
              <Select>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  <SelectGroup>
                    <SelectLabel className="text-white/60">Categories</SelectLabel>
                    <SelectItem value="all" className="text-white hover:bg-white/10">All Units</SelectItem>
                    <SelectItem value="core" className="text-white hover:bg-white/10">Core Units</SelectItem>
                    <SelectItem value="elective" className="text-white hover:bg-white/10">Electives</SelectItem>
                    <SelectItem value="major" className="text-white hover:bg-white/10">Major Units</SelectItem>
                    <SelectItem value="minor" className="text-white hover:bg-white/10">Minor Units</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> 
            </div>
            </div>
    </form>
  );
}



const Page = () => {
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


interface GridContentProps {
  query: string;
}


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
function GridContent({ query }: GridContentProps) {
  const [units, setUnits] = useState([]);
  const fetchUnits = async (query : string) => {
    try{
      console.log("fetching!!");
      const {data} = await axios.get(`http://localhost:5280/api/units`);
      console.log(data);

      const filteredUnits = data.filter((item : UnitData) =>
          item.unitName.toLowerCase().includes(query.toLowerCase()) ||
          item.unitCode.toLowerCase().includes(query.toLowerCase()) || 
          item.description.toLowerCase().includes(query.toLowerCase())
        );
      setUnits(filteredUnits);
    }
    catch(e){
      console.log(e);
    }

  }
  useEffect(() =>  {
    fetchUnits(query);
  }, [query])


  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
     {units.map((unit : UnitData) => (
        <Unit
          key={unit.unitCode}
          unit={unit}
        />

     ))}
    </div>
  );
}
export default Page;

