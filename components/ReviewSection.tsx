import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';


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

interface ReviewData {
  id : string,
  unitCode : string,
  username : string,
  overallRating : number,
  teachingRating : number,
  workloadRating : number,
  difficultyRating : number,
  contentRating : number,
  timestamp : EpochTimeStamp,
  comment : string
  like : number,
  dislike : number,
  
}



export const RevisedReviewSection = ({unit} : {unit : UnitData}) =>  {

  const [reviews, setReviews] = useState<ReviewData[]>([]);
  
  const fetchReviews = async () => {
    try{
      console.log("fetching!!");

      const {data} = await axios.get(`http://localhost:5280/api/review/unit/${unit.unitCode}`);
      console.log("Reviews: ");
      console.log(data);
      
      setReviews(data);
    
    }
    catch(e){
      console.log(e);
    }

  }
  useEffect(() => {
      fetchReviews();
  }, []);

  return (

     <div className="h-[800px] flex flex-col bg-gray-900">
            {/* Header */}
            <div className="flex justify-between items-center p-6 sticky top-0 bg-gray-900 border-b border-white/10">
              <h3 className="text-white font-semibold text-xl">Reviews</h3>
              <Link href={{ pathname : `/review/rate/${unit.unitCode}`}}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Write Review
              </Link>
            </div>
      
            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">

              {reviews.map((review : ReviewData) => (

                <ReviewCard key={review.id} review={review}/>

              ))}
              
              
            </div>
      
            {/* Custom Scrollbar Styles */}
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
              }
            `}</style>
          </div>
  );
}




export const ReviewCard = ({ review } : {review : ReviewData}) => {
  console.log(review);
  return (
  <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-4 mb-4">
    {/* Header - Author and Rating */}
    <div className="flex justify-between items-start mb-3">
      <div className="flex flex-col">
        <span className="text-white font-medium">{review.username}</span>
        <span className="text-white/40 text-xs">
          {new Date(review.timestamp).toLocaleDateString()}
        </span>
      </div>
      <div className="bg-purple-500/20 px-2.5 py-1 rounded-md">
        <span className="text-purple-400 font-medium">{review.overallRating}/10</span>
      </div>
    </div>

    {/* Review Content */}
    <p className="text-white/70 text-sm mb-4">{review.comment}</p>

    {/* Metrics Grid with Visual Bars */}
    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 max-w-[400px]">
      {[
        { label: 'Workload', value: review.workloadRating, color: 'bg-blue-500/50' },
        { label: 'Difficulty', value: review.difficultyRating, color: 'bg-red-500/50' },
        { label: 'Teaching', value: review.teachingRating, color: 'bg-green-500/50' },
        { label: 'Content', value: review.contentRating, color: 'bg-yellow-500/50' }
      ].map(metric => (
        <div key={metric.label} className="w-[calc(50%-12px)] space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-white/40">{metric.label}</span>
            <span className="text-white/80">{metric.value}/10</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden w-24">
            <div
              className={`h-full ${metric.color} transition-all duration-300`}
              style={{ width: `${(metric.value / 10) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Like/Dislike Buttons - Bottom Right */}
    <div className="flex justify-end gap-3">
      <button className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5">
        <BiLike size={18} />
        <span className="text-xs">{review.like}</span>
      </button>
      <button className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5">
        <BiDislike size={18} />
        <span className="text-xs">{review.dislike}</span>
      </button>
    </div>
  </div>
)
};
