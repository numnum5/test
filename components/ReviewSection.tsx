import Review from '@/app/review/page';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';

const ReviewSection = () => {


  return (
    <div className="space-y-4">
      {/* Header with Write Review Button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white/90 font-medium">Reviews</h3>
        <button
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors"
        >
          Write Review
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-3 custom-scrollbar">
    

        {/* Reviews List */}
        {sampleReviews.length > 0 ? (
          sampleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-white/50 text-sm">
              No reviews yet. Be the first to review!
            </p>
          </div>
        )}
      </div>

      {/* Empty State */}
      {sampleReviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-white/50 text-sm">
            No reviews yet. Be the first to review!
          </p>
        </div>
      )}
    </div>
  );
};





export const RevisedReviewSection = ({unit}) =>  {


  const [reviews, setReviews] = useState([]);
  const fetchReviews = async () => {
    try{
      console.log("fetching!!");
      const {data} = await axios.get(`http://localhost:5280/api/review/unit/${unit.unitCode}`);
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

              {reviews.map(review => (

                <ReviewCard review={review}/>

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

export const ReviewCard = ({ review }) => {
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
        <span className="text-xs">{review.likes}</span>
      </button>
      <button className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5">
        <BiDislike size={18} />
        <span className="text-xs">{review.dislikes}</span>
      </button>
    </div>
  </div>
)
};

export default ReviewSection;




const sampleReviews = [
  {
    id: 1,
    author: "Sarah Chen",
    timestamp: "2024-02-08T15:30:00Z",
    overallRating: 8,
    workload: 7,
    difficulty: 6,
    teaching: 9,
    content: 8,
    reviewContent: "The professor's teaching style is excellent! While the workload can be heavy at times, the content is well-structured and engaging. The weekly tutorials really helped reinforce the concepts.",
    likes: 12,
    dislikes: 1
  },
  {
    id: 2,
    author: "Michael Park",
    timestamp: "2024-02-07T09:15:00Z",
    overallRating: 7,
    workload: 9,
    difficulty: 8,
    teaching: 6,
    content: 7,
    reviewContent: "Challenging but rewarding subject. The workload is quite heavy, especially during mid-semester. Some concepts were difficult to grasp initially, but the online resources provided were helpful.",
    likes: 8,
    dislikes: 2
  },
  // Added more reviews...
  {
    id: 3,
    author: "Emma Wilson",
    timestamp: "2024-02-06T14:20:00Z",
    overallRating: 9,
    workload: 6,
    difficulty: 7,
    teaching: 9,
    content: 9,
    reviewContent: "One of the best subjects I've taken! The lecturer makes complex topics easy to understand and is always willing to help during consultations.",
    likes: 15,
    dislikes: 0
  },
  {
    id: 4,
    author: "James Rodriguez",
    timestamp: "2024-02-05T11:45:00Z",
    overallRating: 8,
    workload: 8,
    difficulty: 7,
    teaching: 8,
    content: 8,
    reviewContent: "Great balance of theory and practical work. The assignments were challenging but very relevant to real-world applications.",
    likes: 10,
    dislikes: 1
  },
  {
      id: 4,
      author: "James Rodriguez",
      timestamp: "2024-02-05T11:45:00Z",
      overallRating: 8,
      workload: 8,
      difficulty: 7,
      teaching: 8,
      content: 8,
      reviewContent: "Great balance of theory and practical work. The assignments were challenging but very relevant to real-world applications.",
      likes: 10,
      dislikes: 1
    }
    ,
    {
      id: 4,
      author: "James Rodriguez",
      timestamp: "2024-02-05T11:45:00Z",
      overallRating: 8,
      workload: 8,
      difficulty: 7,
      teaching: 8,
      content: 8,
      reviewContent: "Great balance of theory and practical work. The assignments were challenging but very relevant to real-world applications.",
      likes: 10,
      dislikes: 1
    },
    {
      id: 4,
      author: "James Rodriguez",
      timestamp: "2024-02-05T11:45:00Z",
      overallRating: 8,
      workload: 8,
      difficulty: 7,
      teaching: 8,
      content: 8,
      reviewContent: "Great balance of theory and practical work. The assignments were challenging but very relevant to real-world applications.",
      likes: 10,
      dislikes: 1
    },    {
      id: 4,
      author: "James Rodriguez",
      timestamp: "2024-02-05T11:45:00Z",
      overallRating: 8,
      workload: 8,
      difficulty: 7,
      teaching: 8,
      content: 8,
      reviewContent: "Great balance of theory and practical work. The assignments were challenging but very relevant to real-world applications.",
      likes: 10,
      dislikes: 1
    }
];