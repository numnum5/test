'use client';

import { FC, useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { BsCalendar4, BsClockFill, BsFileText } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { BsCalendarWeek } from 'react-icons/bs';
import { BsBook } from 'react-icons/bs';
interface Assessment {
  title: string;
  type: string;
  weight: number;
  dueDate: string;
  description: string;
  criteria?: string[];
  duration?: string;
  
}

interface Props {
  assessment: Assessment;
  onReviewClick: (assessment: Assessment) => void;
}


import React from 'react'

const Fuck = () => {
// ... other imports

const sampleAssessments = [
  {
    title: "Machine Learning Project",
    type: "Project",
    weight: 40,
    dueDate: "Week 12",
    description: "Implement a machine learning solution for a real-world problem...",
    criteria: [
      "Problem understanding and analysis (20%)",
      "Implementation quality (40%)",
      "Results and evaluation (25%)",
      "Documentation (15%)"
    ],
    reviews: [
      {
        rating: 4,
        difficulty: 3,
        timeSpent: '15 hours',
        comment: 'Challenging but very practical. Start early!',
        helpful: 12
      }
    ]
  },
  {
    title: "Mid-semester Exam",
    type: "Exam",
    weight: 30,
    dueDate: "Week 6",
    description: "Covers topics from weeks 1-5...",
    duration: "2 hours",
    criteria: [
      "Theory questions (50%)",
      "Problem solving (50%)"
    ],
  },
  // Add more assessments...
];



return (
  <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
    <div className='flex flex-row gap-6'>
      {/* Assessment Details */}
      <div className='w-2/3'>
        <h3 className="text-white font-semibold text-xl mb-6">Assessment Details</h3>
        <div className="space-y-4">
          {sampleAssessments.map((assessment, index) => (
            <AssessmentSection
              key={index}
              assessment={assessment}
              
              onReviewClick={(assessment) => {
                console.log('Review assessment:', assessment);
              }}
            />
          ))}
        </div>
      </div>

      {/* Weekly Topics */}
      <div className='w-1/3'>
        <h3 className="text-white font-semibold text-xl mb-6">Weekly Topics</h3>
        {/* Your existing WeeklyTopics component */}
        <WeeklyTopics/>
      </div>
    </div>
  </div>
);
}

export default Fuck;




export const AssessmentSection: FC<Props> = ({ assessment, onReviewClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAssessmentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'assignment': return 'bg-blue-500/20 text-blue-400';
      case 'exam': return 'bg-red-500/20 text-red-400';
      case 'quiz': return 'bg-green-500/20 text-green-400';
      case 'project': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };


  const reviews = [
    {
      rating: 4,
      difficulty: 3,
      timeSpent: '15 hours',
      comment: 'Challenging but very practical. Start early!',
      helpful: 12
    },
    {
      rating: 4,
      difficulty: 3,
      timeSpent: '15 hours',
      comment: 'Challenging but very practical. Start early!',
      helpful: 12
    },
    {
      rating: 4,
      difficulty: 3,
      timeSpent: '15 hours',
      comment: 'Challenging but very practical. Start early!',
      helpful: 12
    }
  ]

  const sampleReviews: Review[] = [
    {
      id: '1',
      ratings: {
        overall: 8,
        difficulty: 7,
        relevance: 9
      },
      timeSpent: '40-50 hours',
      helpful: 15,
      comment: 'Challenging but rewarding assignment. The instructions were clear, and the learning outcomes were valuable. Would recommend starting early to manage time better.',
      date: 'Mar 15, 2024',
      semester: 'Semester 1, 2024'
    },
    // Add more reviews...
  ];
  

  return (
    <div className={`
      rounded-lg border border-transparent transition-all duration-200
      ${isExpanded 
        ? 'bg-[rgba(255,255,255,0.08)] border-purple-500/20' 
        : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.07)]'
      }
    `}>


      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start">
                  {/* <div> */}
            <h4 className="text-white font-medium">{assessment.title}</h4>
            <div className="flex items-center gap-3 mt-1">
                <span className="text-purple-400">{assessment.weight}%</span>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getAssessmentTypeColor(assessment.type)}`}>
                    {assessment.type}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getAssessmentTypeColor(assessment.type)}`}>
                    Group
                  </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <BsCalendar4 className="w-4 h-4" />
              <span>Due: {assessment.dueDate}</span>
            </div>
          </div>
          {isExpanded ? (
            <IoChevronUpOutline className="w-5 h-5 text-white/60" />
          ) : (
            <IoChevronDownOutline className="w-5 h-5 text-white/60" />
          )}
        </div>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300
          ${isExpanded ? ' opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-4 pt-4 space-y-4 border-t border-white/10">
          {/* Description */}
          <p className="text-white/70 mb-4">{assessment.description}</p>

          {/* Assessment Details */}
          <div className="grid grid-cols-2 gap-4">
            {assessment.duration && (
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <BsClockFill />
                <span>Duration: {assessment.duration}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <BsFileText />
              <span>Weight: {assessment.weight}%</span>
            </div>
          </div>


   
          {sampleReviews && sampleReviews.length > 0 && (
    <AssessmentReviews reviews={sampleReviews} />
  )}

          {/* Marking Criteria */}
          {assessment.criteria && (
            <div className="space-y-2">
              <h5 className="text-white/60 text-sm font-medium">Marking Criteria</h5>
              <ul className="space-y-1 text-sm text-white/60 list-disc list-inside">
                {assessment.criteria.map((criterion, index) => (
                  <li key={index} className="hover:text-white/80 transition-colors">
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>
          )}

{/*           
{sampleReviews && sampleReviews.length > 0 && (
    <AssessmentReviews reviews={sampleReviews} />
  )}  */}

        </div>
      </div>
    </div>
  );
};




interface Review {
  id: string;
  ratings: {
    overall: number;
    difficulty: number;
    workload: number;
    relevance: number;
  };
  timeSpent: string;
  helpful: number;
  comment: string;
  date: string;
  semester: string;
}

const INITIAL_DISPLAY_COUNT = 2;

interface WeekTopic {
  week: number;
  title: string;
  topics: string[];
  currentWeek?: boolean;
}

const weeklyTopics: WeekTopic[] = [
  {
    week: 1,
    title: "Introduction to Machine Learning",
    topics: [
      "Overview of Machine Learning",
      "Types of ML: Supervised, Unsupervised, Reinforcement",
      "Applications and Use Cases",
      "Python Libraries for ML"
    ],
    currentWeek: false
  },
  {
    week: 2,
    title: "Data Preprocessing",
    topics: [
      "Data Cleaning and Validation",
      "Feature Scaling and Normalization",
      "Handling Missing Data",
      "Feature Selection and Engineering"
    ],
    currentWeek: true
  },
  {
    week: 3,
    title: "Supervised Learning",
    topics: [
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Model Evaluation Metrics"
    ]
  },
  // Add more weeks as needed
];

export const WeeklyTopics = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const currentWeek = weeklyTopics.find(week => week.currentWeek)?.week || null;

  return (
    <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-xl">Weekly Topics</h3>
        {currentWeek && (
          <div className="flex items-center gap-2 text-purple-400 text-sm">
            <BsCalendarWeek />
            <span>Current: Week {currentWeek}</span>
          </div>
        )}
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
        {weeklyTopics.map((week) => (
          <div 
            key={week.week}
            className={`
              rounded-lg border border-transparent
              ${expandedWeek === week.week 
                ? 'bg-purple-500/10 border-purple-500/20' 
                : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)]'
              }
              ${week.currentWeek && 'border-l-4 border-l-purple-500'}
              transition-all duration-200
            `}
          >
            <button
              onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
              className="w-full flex items-center justify-between p-3 text-white/80"
            >
              <div className="flex items-center gap-3">
                <span className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-sm
                  ${week.currentWeek 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-[rgba(255,255,255,0.1)]'
                  }
                `}>
                  {week.week}
                </span>
                <span className="font-medium text-left">{week.title}</span>
              </div>
              {expandedWeek === week.week ? (
                <IoChevronUpOutline className="w-5 h-5 text-white/60" />
              ) : (
                <IoChevronDownOutline className="w-5 h-5 text-white/60" />
              )}
            </button>

            <div
              className={`
                overflow-hidden transition-all duration-200
                ${expandedWeek === week.week ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="p-3 pt-0 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <BsBook />
                    <span>Topics Covered</span>
                  </div>
                  <ul className="space-y-2 text-sm text-white/60 ml-6">
                    {week.topics.map((topic, index) => (
                      <li 
                        key={index}
                        className="list-disc hover:text-white/90 transition-colors"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AssessmentReviews = ({ reviews }: { reviews: Review[] }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews 
    ? reviews 
    : reviews.slice(0, INITIAL_DISPLAY_COUNT);

  const calculateAverageRating = (ratingType: keyof Review['ratings']) => {
    const sum = reviews.reduce((acc, review) => acc + review.ratings[ratingType], 0);
    return (sum / reviews.length).toFixed(1);
  };

  const RatingBar = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-center gap-3">
      <span className="text-white/60 text-sm w-24">{label}</span>
      <div className="flex-1 h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-purple-500 rounded-full"
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-white/80 text-sm w-8">{value}/10</span>
    </div>
  );

  return (
<div className="mt-4 border-t border-[rgba(255,255,255,0.1)] pt-4 flex flex-col w-full">
  {/* Rating Summary and Reviews Section */}
  <div className="flex flex-row w-full gap-4">
    {/* Left Side: Ratings Summary */}
    <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 w-2/5 min-h-[200px] flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <h5 className="text-white font-medium">Assessment Ratings</h5>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">8/10</div>
          <div className="text-white/60 text-sm">Overall Rating</div>
        </div>
      </div>
      <div className="space-y-3 flex-grow">
        <RatingBar value={Number(calculateAverageRating('difficulty'))} label="Difficulty" />
        <RatingBar value={Number(calculateAverageRating('workload'))} label="Workload" />
        <RatingBar value={Number(calculateAverageRating('relevance'))} label="Relevance" />
      </div>
    </div>

    {/* Right Side: Reviews */}
    <div className="w-3/5 flex flex-col flex-grow min-h-[200px]">
      <h5 className="text-white/80 text-sm mb-3">
        Student Feedback ({reviews.length} reviews)
      </h5>
      <div className="space-y-3 flex-grow overflow-y-auto">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-white/80 font-medium">
                    {review.ratings.overall}/10
                  </span>
                  <span className="text-white/40 text-sm">{review.semester}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>Time spent: {review.timeSpent}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>
              <span className="text-purple-400 text-sm">
                {review.helpful} found helpful
              </span>
            </div>

            {/* Ratings */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-sm text-white/60">
                Difficulty: {review.ratings.difficulty}/10
              </div>
              <div className="text-sm text-white/60">
                Workload: {review.ratings.workload}/10
              </div>
              <div className="text-sm text-white/60">
                Relevance: {review.ratings.relevance}/10
              </div>
            </div>

            <p className="text-white/70 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > INITIAL_DISPLAY_COUNT && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-4 w-full py-2 px-4 rounded-lg bg-[rgba(255,255,255,0.1)] 
                     text-white/60 hover:bg-[rgba(255,255,255,0.15)] transition-colors
                     flex items-center justify-center gap-2"
        >
          {showAllReviews ? (
            <>
              Show Less <IoChevronUpOutline />
            </>
          ) : (
            <>
              Show More Reviews ({reviews.length - INITIAL_DISPLAY_COUNT} more) 
              <IoChevronDownOutline />
            </>
          )}
        </button>
      )}
    </div>
  </div>
</div>

  
  );
};