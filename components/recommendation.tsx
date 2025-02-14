import { useEffect, useState } from "react";
import { HorizontalScroll } from "./Slider";
import axios from "axios";

export function RecommendationsSection() {
  const [units, setUnits] = useState([]);

  const fetchData = async () => {
    try{
      
      const {data} = await axios.get("http://localhost:5280/api/units");
      // console.log(data);
      setUnits(data);
    
    }
    catch(e){
      console.log(e);
    }
  }


  useEffect(()=>{
    fetchData();
  }, [])

  return (
    <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold text-xl">Recommendations</h2>
      </div>

      <HorizontalScroll category="Recommendations "subjects={units} />
    </div>
  );
}
