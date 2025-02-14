'use client';
import { useState, useEffect, FormEvent } from 'react';
import { Slider } from "@/components/ui/slider";
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react'

interface RatingMetric {
  name: string;
  label: string;
  value: number;
  description: {
    low: string;
    high: string;
  };
  isNegative : boolean;
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

interface RatingData{
  contentRating : number,
  difficultyRating : number,
  overallRating  : number,
  teachingRating  : number,
  workloadRating : number
}

 const ReviewSubmissionForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login page
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const params = useParams();
  const unitId = params.unitId;
  // const [semester, setSemester] = useState('');
  const [grade, setGrade] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<RatingData | null>(null);
  const [averageRating, setAverageRating] = useState(5.0);
  const [unit, setUnit] = useState<UnitData | null>(null);
  const [metrics, setMetrics] = useState<RatingMetric[]>([
    { 
      name: 'workload', 
      label: 'Workload', 
      value: 5.0,
      isNegative: true, 
      description: {
        low: 'Light',
        high: 'Heavy'
      }
    },
    { 
      isNegative: false,
      name: 'teaching', 
      label: 'Teaching Quality', 
      value: 5.0,
      description: {
        low: 'Poor',
        high: 'Excellent'
      }
    },
    { 
      isNegative: false,
      name: 'content', 
      label: 'Content Quality', 
      value: 5.0,
      description: {
        low: 'Basic',
        high: 'Advanced'
      }
    },
    { 
      name: 'difficulty', 
      label: 'Difficulty', 
      value: 5.0,
      isNegative: true,
      description: {
        low: 'Easy',
        high: 'Challenging'
      }
    }
  ]);
  
  // const semesterOptions = [
  //   { value: '2024S2', label: 'Semester 2, 2024' },
  //   { value: '2024S1', label: 'Semester 1, 2024' },
  //   { value: '2023S2', label: 'Semester 2, 2023' },
  //   { value: '2023S1', label: 'Semester 1, 2023' },
  //   { value: '2022S2', label: 'Semester 2, 2022' },
  // ];
  

  const fetchRatings = async () => {
    try{
      console.log("fetching!!");
      const {data} = await axios.get(`http://localhost:5280/api/review/rating/${unitId}`);
      console.log(data);
      setRating(data);
    
    }
    catch(e){
      console.log(e);
    }

  }

  const fetchInfo = async () => {
    try{
      console.log("fetching unit!!");
      const {data} = await axios.get(`http://localhost:5280/api/units/${unitId}`);
      console.log(data);
      setUnit(data);
    
    }
    catch(e){
      console.log(e);
    }

  }

  useEffect(()=> {
    // console.log("ADADD");
    fetchRatings();
    fetchInfo();
  }, [unitId])

  useEffect(() => {
    // For negative metrics, invert the score (10 - value) before averaging
    const adjustedTotal = metrics.reduce((sum, metric) => {
      const adjustedValue = metric.isNegative ? (10 - metric.value) : metric.value;
      return sum + adjustedValue;
    }, 0);
    
    setAverageRating(Number((adjustedTotal / metrics.length).toFixed(1)));
  }, [metrics]);

  const handleRatingChange = (metricIndex: number, newValue: number[]) => {
    setMetrics(metrics.map((metric, index) => 
      index === metricIndex ? { ...metric, value: Number(newValue[0].toFixed(1)) } : metric
    ));
  };

  
       

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();

    try{

      const formattedMetrics = metrics.reduce((acc, metric) => {
        acc[`${metric.name}Rating`] = metric.value;
        return acc;
      }, {} as Record<string, number>);
  
      // Construct the payload
      const payload = {
        unitCode: unitId,
        username: session?.user?.username, // Ensure session exists before accessing user data
        overallRating: averageRating, 
        comment: comment,
        timestamp: new Date().toISOString(),
        ...formattedMetrics, // Spread the formatted metrics
      };
  
      // await axios.post("http://localhost:5280/api/review/", {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(
      //       {
      //           // unitCode: unitId,
      //           // username: session.user.username,
      //           // overallRating: metrics
      //           // "contentRating": 4.0,
      //           // "teachingRating": 1.1,
      //           // "difficultyRating": 3.5,
      //           // "workloadRating": 3.0,
      //           // comment: comment,
      //           // timestamp: new Date(),
      //       })

      // });        

      // console.log(data);
    }catch(error){
      console.log(error)
    }
  }
    
  return (
    <form onSubmit={handleSubmit}>
    <div className='flex flex-row pt-24 pb-24 p-4'>
     <div className="w-1/3 pr-4">
        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-6 sticky top-24">
          <div className="space-y-6">
            {/* Unit Info */}
            <div>
              <div className="text-purple-400 font-medium mb-1">
                {unit?.unitCode}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                {unit?.unitName}
              </h2>
              <div className="text-white/60 text-sm">
                Faculty of {unit?.faculty}
              </div>
            </div>

            {/* Current Ratings Summary */}

            {
              rating && 
              <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <h3 className="text-white/80 font-medium mb-3">Current Ratings</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Overall</span>
                  <span className="text-white font-medium">{rating?.overallRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Workload</span>
                  <span className="text-white font-medium">{rating.workloadRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Teaching</span>
                  <span className="text-white font-medium">{rating.teachingRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Content</span>
                  <span className="text-white font-medium">{rating.contentRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Difficulty</span>
                  <span className="text-white font-medium">{rating.difficultyRating}</span>
                </div>
              </div>
            </div>
            }
           

            {/* Quick Stats */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-white/40 text-sm mb-1">Reviews</div>
                  <div className="text-white font-medium">1</div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/3 space-y-8 bg-[rgba(255,255,255,0.05)] rounded-lg p-6 ">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Tell us about your experience
        </h1>
        <p className="text-white/60">
          Your review helps other students make informed decisions
        </p>
      </div>

     {/* Rating Metrics */}
     <div className="space-y-8">
        {metrics.map((metric, metricIndex) => (
          <div key={metric.name} className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-white font-medium">
                  {metric.label}
                </label>
                {metric.isNegative && (
                  <span className="ml-2 text-xs text-white/40">
                    (Lower is better)
                  </span>
                )}
              </div>
              <span className="text-white/60 font-medium">
                {metric.value.toFixed(1)}/10
              </span>
            </div>
            
            <div className="space-y-4">
              <Slider
                value={[metric.value]}
                onValueChange={(newValue) => handleRatingChange(metricIndex, newValue)}
                max={10}
                step={0.1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-white/40">
                <span>{metric.description.low}</span>
                <span>{metric.description.high}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Your Rating</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-purple-400">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-white/60">/10</span>
          </div>
        </div>
        <p className="text-sm text-white/40">
          Note: Overall rating considers workload and difficulty inversely 
          (lower workload and difficulty contribute to a higher overall rating)
        </p>
      </div>

      {/* When did you take this unit? */}
      {/* <div className="space-y-2">
          <label className="text-white font-medium">
            When did you take this unit?
          </label>
          <Select
            value={semester}
            onValueChange={setSemester}
          >
            <SelectTrigger className="w-full bg-[rgba(255,255,255,0.1)] border-0 
                                    text-white focus:ring-offset-0 focus:ring-purple-500 
                                    focus:ring-2 h-12">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent className="bg-[rgba(30,30,30,0.95)] border-[rgba(255,255,255,0.1)]">
              {semesterOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="text-white/80 focus:bg-purple-500 focus:text-white
                           data-[highlighted]:bg-purple-500 data-[highlighted]:text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}


      {/* Grade Achieved */}
      <div className="space-y-2">
        <label className="text-white font-medium">Grade Achieved (Optional)</label>
        <div className="flex flex-wrap gap-2">
          {['HD', 'D', 'C', 'P', 'F'].map((gradeOption) => (
            <button
              key={gradeOption}
              onClick={() => setGrade(gradeOption)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                       ${grade === gradeOption
                  ? 'bg-purple-500 text-white'
                  : 'bg-[rgba(255,255,255,0.1)] text-white/60 hover:bg-[rgba(255,255,255,0.15)]'
                }`}
            >
              {gradeOption}
            </button>
          ))}
        </div>
      </div>

      {/* Review Comment */}
      <div className="space-y-2">
        <label className="text-white font-medium">
          Share your experience (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like? What could be improved? Any tips for future students?"
          className="w-full h-32 p-3 rounded-lg bg-[rgba(255,255,255,0.1)] text-white 
                   border border-transparent focus:border-purple-500 outline-none resize-none"
        />
      </div>


      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-purple-500 text-white font-medium
                 hover:bg-purple-600 transition-colors"
      >
        Submit Review
      </button>
    </div>
    </div>
    </form>
  );
};






export default ReviewSubmissionForm;