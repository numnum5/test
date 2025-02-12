'use client'
import React, { useState, useEffect } from 'react';
import AssessmentDetails from '@/components/assessmentDetails';
import { GradeDistributionSection } from '@/components/gradeDistribution';
import { RecommendationsSection } from '@/components/recommendation';
import { ResourcesSection } from '@/components/resources';
import { SubjectDetails } from '@/components/unitDetails';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { RevisedReviewSection } from '@/components/ReviewSection';
import { IoSearchOutline } from 'react-icons/io5';
import { BiLike, BiDislike } from 'react-icons/bi';

interface UnitData {
  _id: string;
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
  reviews: any[];
}


interface RatingMetric {
  name: string;
  value: number;
  isNegative : boolean;
}
const SubjectRating = () => {
  const [selectedSection, setSelectedSection] = useState("review");
  const [subject2, setSubject] = useState<UnitData | null>(null);
  const [rating, setRating] = useState([]);
  const params = useParams();
  const unitId = params.unitId;
    
  const fetchData = async () => {
    try{
      
      const {data} = await axios.get(`http://localhost:5280/api/units/${unitId}`);
      console.log(data);
      setSubject(data);
    
    }
    catch(e){
      console.log(e);
    }
  }
  
  const fetchRatings = async () => {
    try{
      
      const {data} = await axios.get(`http://localhost:5280/api/review/rating/${unitId}`);
      console.log(data);
      setRating(data);
    
    }
    catch(e){
      console.log(e);
    }

  }
  
  useEffect(()=>{
      fetchData();    
      fetchRatings();
    }, [])

  const ChangeSelectedSection = (section: "qanda" | "review") => {
      setSelectedSection(section);
    };

    

   if(subject2 === null){
    return <>
    </>
   } 
  return (
    <div className="relative min-h-screen">
      {/* Grid Background */}
      <div 
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgb(255 255 255) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      {/* Radial Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#000319]/80 via-[#111928]/80 to-purple-900/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Main Content */}
      <div className="relative min-h-screen w-full">
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
         
            <div 
              key={subject2?.unitCode}
              className="bg-[rgba(17,25,40,0.75)] backdrop-blur-lg rounded-xl border border-[rgba(255,255,255,0.125)] mb-8"
            >
              {/* Header Section */}
              <div className="p-6 border-b border-[rgba(255,255,255,0.125)]">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {subject2?.unitName} <span className="text-white/60 text-xl">{unitId}</span>
                    </h2>
                    <div className="flex items-center gap-4 text-white/70">
                      <span>{subject.professor}</span>
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {subject2?.area}
                      </span>
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {`Faculty of ${subject2?.faculty}`}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">{rating.overallRating}/10</div>
                    <div className="text-white/60 text-sm">Overall Rating</div>
                  </div>
                </div>
              </div>

              {/* Course Details Section */}
              <CourseDetailsSection subject={subject} test={subject2} />

              {/* Ratings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-t border-[rgba(255,255,255,0.125)]">
                {Object.entries(rating).map(([key, value]) => (
                  key !== 'overallRating' && (
                    <div key={key} className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4">
                      <div className="text-white/60 capitalize mb-2">{key}</div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-grow bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${(value/10)*100}%` }}
                          />
                        </div>
                        <span className="text-white font-medium">{value}/10</span>
                      </div>
                    </div>
                  )
                ))}
              </div>

            <SubjectDetails/>
            <AssessmentDetails/>
            <ResourcesSection/>
            <RecommendationsSection/>
            <GradeDistributionSection />

            <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
                
                <div className="flex flex-row items-start gap-4 mb-6">
                  <button
                    onClick={() => ChangeSelectedSection("qanda")}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 relative ${
                      selectedSection === "qanda"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">Q&A Forum</span>
                    {selectedSection === "qanda" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                  
                  <button
                    onClick={() => ChangeSelectedSection("review")}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 relative ${
                      selectedSection === "review"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">Reviews</span>
                    {selectedSection === "review" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </div>
              
                 <div>
        {selectedSection === "qanda" ? (
          <QASection2 subject={subject}/>
        ) : (
              <div>  
              <RevisedReviewSection unit={subject2} />
              </div>
            )}
          </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};


const CourseDetailsSection = ({ subject, test }) => {
  
  console.log(test);
 
  if(test == null){
    return <></>
  }

  return (
    <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
      <div className="mb-8">
        <h3 className="text-white font-semibold text-xl mb-4">Course Overview</h3>
        <p className="text-white/80 leading-relaxed">{test.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Card - Offering Schedule */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Offering Schedule</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-white/70">
              <span>Available Semesters:</span>
              <span>{subject.offering.semesters.join(', ')}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Next Offering:</span>
              <span className="text-green-400">{subject.offering.nextOffering}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Duration:</span>
              <span>{subject.offering.duration}</span>
            </div>
          </div>
        </div>

        {/* Second Card - Delivery Mode */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Delivery Mode</h4>
          <div className="space-y-2">
            <div className="text-white/70 mb-2">{subject.offering.deliveryMode}</div>
            <div className="space-y-1">
              {Object.entries(subject.offering.classSchedule).map(([type, hours]) => (
                <div key={type} className="flex justify-between text-white/70">
                  <span className="capitalize">{type}:</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thir card content */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4">
  <h4 className="text-white font-medium mb-3">Course Content</h4>
  <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
    <div className="border-b border-white/10 last:border-0 pb-2">
        <div className="pl-4 space-y-1.5">
          {test.content.map((topic, topicIndex) => (
            <div key={topicIndex} className="flex items-start gap-2 text-white/60">
              <span className="mt-1">•</span>
              <span className="hover:text-white/80 transition-colors">{topic}</span>
            </div>
          ))}
        </div>
  </div>

  {/* Custom Scrollbar Styles */}
  <style jsx>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `}</style>
      </div>
      </div>
    </div>
    </div>
  );
};



const QASection2 = ({ subject }) => {
    const [showAskForm, setShowAskForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('all');
    const [newQuestion, setNewQuestion] = useState({ title: '', content: '', tags: [] });
  
    // Sample questions data with comments
    const [questions, setQuestions] = useState([
      {
        id: 1,
        title: "How to approach the final exam?",
        content: "I'm struggling with the exam preparation. Any tips on how to effectively study for this subject? What are the key topics to focus on?",
        author: "Sarah Chen",
        timestamp: "2024-02-09T12:00:00Z",
        votes: 15,
        tags: ["exam", "study-tips"],
        comments: [
          {
            id: 1,
            author: "Prof. Smith",
            content: "Focus on the weekly tutorial problems and practice exams. Pay special attention to Chapters 4-6 as they cover the core concepts.",
            timestamp: "2024-02-09T13:00:00Z",
            likes: 12,
            dislikes: 0,
            replies: [
              {
                id: 2,
                author: "Michael Park",
                content: "Thank you professor! Could you also clarify if we need to memorize all the formulas?",
                timestamp: "2024-02-09T13:30:00Z",
                likes: 5,
                dislikes: 0
              }
            ]
          },
          {
            id: 3,
            author: "Emma Wilson",
            content: "I found creating summary sheets for each topic really helpful. Happy to share mine if anyone's interested!",
            timestamp: "2024-02-09T14:00:00Z",
            likes: 8,
            dislikes: 0,
            replies: []
          }
        ]
      }
    ]);
  
    const handleVote = (questionId, direction) => {
      setQuestions(prev => prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            votes: direction === 'up' ? q.votes + 1 : q.votes - 1
          };
        }
        return q;
      }));
    };
  
    const handleAddQuestion = () => {
      if (!newQuestion.title.trim() || !newQuestion.content.trim()) return;
  
      const question = {
        id: Date.now(),
        ...newQuestion,
        author: "Current User",
        timestamp: new Date().toISOString(),
        votes: 0,
        comments: []
      };
  
      setQuestions(prev => [question, ...prev]);
      setNewQuestion({ title: '', content: '', tags: [] });
      setShowAskForm(false);
    };
  
    const QuestionForm = () => (
      <div className="bg-white/5 rounded-lg p-6 mb-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Question title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
            className="w-full bg-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
          <textarea
            placeholder="Describe your question..."
            value={newQuestion.content}
            onChange={(e) => setNewQuestion(prev => ({ ...prev, content: e.target.value }))}
            className="w-full bg-white/10 rounded-lg p-4 text-white resize-none h-32 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
          <div className="flex gap-2">
            {['exam', 'assignments', 'concepts', 'general'].map(tag => (
              <button
                key={tag}
                onClick={() => setNewQuestion(prev => ({
                  ...prev,
                  tags: prev.tags.includes(tag)
                    ? prev.tags.filter(t => t !== tag)
                    : [...prev.tags, tag]
                }))}
                className={`px-3 py-1 rounded-lg text-sm ${
                  newQuestion.tags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowAskForm(false)}
              className="px-4 py-2 text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleAddQuestion}
              disabled={!newQuestion.title.trim() || !newQuestion.content.trim()}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 text-white"
            >
              Post Question
            </button>
          </div>
        </div>
      </div>
    );
    

  
  const QuestionCard = ({ question, onVote }) => {
    const [isExpanded, setIsExpanded] = useState(true); // Changed to default true
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
  
    const handleAddComment = (questionId) => {
      if (!newComment.trim()) return;
  
      const comment = {
        id: Date.now(),
        author: "Current User",
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        replies: []
      };
  
      setQuestions(prev => prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            comments: [...q.comments, comment]
          };
        }
        return q;
      }));
  
      setNewComment('');
    };
  
    const handleAddReply = (questionId, commentId) => {
      if (!replyContent.trim()) return;
  
      const reply = {
        id: Date.now(),
        author: "Current User",
        content: replyContent,
        timestamp: new Date().toISOString(),
        likes: 0,
        dislikes: 0
      };
  
      setQuestions(prev => prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            comments: q.comments.map(c => {
              if (c.id === commentId) {
                return {
                  ...c,
                  replies: [...(c.replies || []), reply]
                };
              }
              return c;
            })
          };
        }
        return q;
      }));
  
      setReplyContent('');
      setReplyingTo(null);
    };
  
    return (
      <div className="bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
        {/* Question Header */}
        <div className="p-6">
    <div className="flex gap-4">
      {/* Voting */}
      <div className="flex flex-col items-center gap-2">
        <button 
          onClick={() => onVote(question.id, 'up')}
          className="text-white/60 hover:text-white transition-colors"
        >
          ▲
        </button>
        <span className="text-white font-medium">{question.votes}</span>
        <button 
          onClick={() => onVote(question.id, 'down')}
          className="text-white/60 hover:text-white transition-colors"
        >
          ▼
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-white font-medium text-lg mb-2">{question.title}</h4>
        <p className="text-white/80 mb-4">{question.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {question.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex justify-between items-center text-sm text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white text-xs">{question.author[0]}</span>
            </div>
            <span>{question.author}</span>
            <span>•</span>
            <span>{new Date(question.timestamp).toLocaleDateString()}</span>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
          >
            {question.comments.length} comments
            <span className="text-xs">{isExpanded ? '▼' : '▶'}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  
        {/* Comments Section */}
        {isExpanded && (
          <div className="border-t border-white/10 p-6">
            {/* Comment Input */}
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white text-sm">U</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add to the discussion..."
                  className="w-full bg-white/10 rounded-lg p-3 text-white text-sm resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                  rows="2"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setNewComment('')}
                    className="px-3 py-1.5 text-white/60 hover:text-white text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddComment(question.id)}
                    disabled={!newComment.trim()}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg disabled:opacity-50"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
  
            {/* Comments List */}
            <div className="space-y-4">
              {question.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white text-sm">{comment.author[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{comment.author}</span>
                      <span className="text-sm text-white/60">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm mb-2">{comment.content}</p>
                    
                    {/* Comment Actions */}
                    <div className="flex items-center gap-4">
                      <button className="text-white/60 hover:text-white text-sm flex items-center gap-1">
                        <BiLike size={16} />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-white/60 hover:text-white text-sm flex items-center gap-1">
                        <BiDislike size={16} />
                        <span>{comment.dislikes}</span>
                      </button>
                      <button 
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-white/60 hover:text-white text-sm"
                      >
                        Reply
                      </button>
                    </div>
  
                    {/* Reply Input */}
                    {replyingTo === comment.id && (
                      <div className="mt-3 pl-6">
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                            <span className="text-white text-xs">U</span>
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              className="w-full bg-white/10 rounded-lg p-3 text-white text-sm resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                              rows="2"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyContent('');
                                }}
                                className="px-3 py-1.5 text-white/60 hover:text-white text-sm"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleAddReply(question.id, comment.id)}
                                disabled={!replyContent.trim()}
                                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg disabled:opacity-50"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
  
                    {/* Nested Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-3 pl-6 space-y-3 border-l border-white/10">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3 group">
                            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                              <span className="text-white text-xs">{reply.author[0]}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-white">{reply.author}</span>
                                <span className="text-sm text-white/60">
                                  {new Date(reply.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-white/80 text-sm mb-2">{reply.content}</p>
                              
                              {/* Reply Actions */}
                              <div className="flex items-center gap-4">
                                <button className="text-white/60 hover:text-white text-sm flex items-center gap-1">
                                  <BiLike size={16} />
                                  <span>{reply.likes}</span>
                                </button>
                                <button className="text-white/60 hover:text-white text-sm flex items-center gap-1">
                                  <BiDislike size={16} />
                                  <span>{reply.dislikes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}
  
    return (
      <div className="h-[800px] flex flex-col bg-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center p-6 sticky top-0 bg-gray-900 border-b border-white/10">
          <h3 className="text-white font-semibold text-xl">Q&A Forum</h3>
          <button
            onClick={() => setShowAskForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Ask a Question
          </button>
        </div>
  
        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {showAskForm && <QuestionForm />}
  
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-2 pl-10"
                />
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'exam', 'assignments', 'concepts'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    selectedTag === tag
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
  
          {/* Questions List */}
          <div className="space-y-4">
            {questions
              .filter(q => 
                selectedTag === 'all' || q.tags.includes(selectedTag)
              )
              .filter(q =>
                searchQuery
                  ? q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.content.toLowerCase().includes(searchQuery.toLowerCase())
                  : true
              )
              .map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onVote={handleVote}
                />
              ))}
          </div>
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
  };


const questions = [    {
    id: 1,
    title: "How to prepare for the final exam?",
    content: "I'm struggling with the theoretical concepts. Any tips?",
    author: "Student123",
    timestamp: "2024-02-20T10:00:00Z",
    votes: 15,
    answers: [
      {
        id: 1,
        content: "Focus on the weekly practice problems and past exam papers...",
        author: "TopStudent",
        timestamp: "2024-02-20T11:30:00Z",
        isAccepted: true,
        votes: 8
      }
    ],
    tags: ["Exam", "Study Tips"]
  }]


export default SubjectRating;


const subject = 
  {
    id: 1,
    name: 'Machine Learning',
    code: 'CAB420',
    professor: 'Dr. Smith',
    area: 'Artificial Intelligence',
    description: `Machine learning is the science of getting computers to act without being explicitly programmed. This unit provides you with a broad introduction to machine learning and its statistical foundations. Topics include: definition of machine learning tasks; classification principles and methods; dimensionality reduction/subspace methods; graphical models; and deep learning. Application examples are taken from areas such as computer vision, finance, market prediction and information retrieval.`,
    offering: {
      semesters: ['Semester 1', 'Semester 2'],
      nextOffering: 'Semester 2, 2024',
      duration: '13 weeks',
      deliveryMode: 'Blended Learning',
      classSchedule: {
        lectures: '2 hours/week',
        tutorials: '1 hour/week',
        practicals: '2 hours/week'
      }
    },
    ratings: {
      overall: 8.5,
      difficulty: 7,
      workload: 8,
      teaching: 9,
      content: 8.5
    },
    prerequisites: ['Python Programming', 'Linear Algebra', 'Statistics'],
    learningResources: ['Video Lectures', 'Interactive Labs', 'Online Textbook'],
    assessments: [
      {
        type: 'Assignment 1: ML Fundamentals',
        weight: '20%',
        description: 'Individual assignment focusing on implementing basic ML algorithms from scratch.',
        dueWeek: 'Week 5',
        learningOutcomes: ['Algorithm Implementation', 'Data Preprocessing', 'Model Evaluation'],
        requirements: 'Python implementation with detailed documentation and analysis',
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
        type: 'Assignment 2: Neural Networks',
        weight: '20%',
        description: 'Group project implementing and training neural networks for computer vision.',
        dueWeek: 'Week 9',
        learningOutcomes: ['Deep Learning', 'Collaborative Development', 'Performance Optimization'],
        requirements: 'Group work (2-3 students) with presentation',
        reviews: []
      },
      {
        type: 'Mid-term Exam',
        weight: '25%',
        description: 'Written exam covering theoretical concepts and algorithm analysis.',
        dueWeek: 'Week 7',
        format: 'In-person written exam',
        duration: '2 hours',
        reviews: []
      },
      {
        type: 'Final Project',
        weight: '35%',
        description: 'Comprehensive ML project solving a real-world problem.',
        dueWeek: 'Week 13',
        learningOutcomes: ['End-to-end ML Pipeline', 'Problem Solving', 'Technical Writing'],
        requirements: 'Individual project with report and presentation',
        reviews: []
      }
    ],
    recommendations: [
      { id: 2, name: 'Deep Learning', similarity: '85%' },
      { id: 3, name: 'Data Mining', similarity: '75%' }
    ],
    reviews: [],
    skills: ['Python', 'TensorFlow', 'Data Analysis'],
    qa: {
      questions: [
        {
          id: 1,
          title: "How to prepare for the final exam?",
          content: "I'm struggling with understanding neural networks and deep learning concepts. Any tips on how to prepare for the final exam?",
          author: {
            id: "user1",
            name: "John Doe",
            avatar: "/avatars/john.jpg"
          },
          timestamp: "2024-02-20T10:00:00Z",
          votes: 15,
          views: 234,
          answers: [
            {
              id: 1,
              content: "Here's what helped me prepare:\n1. Review weekly practice problems\n2. Focus on implementing basic neural networks from scratch\n3. Study past exam papers",
              author: {
                id: "user2",
                name: "Jane Smith",
                avatar: "/avatars/jane.jpg",
                reputation: 1250
              },
              timestamp: "2024-02-20T11:30:00Z",
              isAccepted: true,
              votes: 8
            }
          ],
          tags: ["Exam", "Neural Networks", "Study Tips"]
        },
        {
          id: 2,
          title: "Assignment 2 Clarification",
          content: "Could someone explain the requirements for the CNN implementation in Assignment 2?",
          author: {
            id: "user3",
            name: "Mike Johnson",
            avatar: "/avatars/mike.jpg"
          },
          timestamp: "2024-02-19T15:20:00Z",
          votes: 10,
          views: 156,
          answers: [],
          tags: ["Assignment", "CNN", "Implementation"]
        }
      ],
      popularTags: [
        { name: "Exam", count: 45 },
        { name: "Assignments", count: 32 },
        { name: "Neural Networks", count: 28 },
        { name: "Python", count: 25 }
      ]
    },

    career: {
      paths: [
        {
          role: "Machine Learning Engineer",
          relevance: 95,
          skills: ["Python", "TensorFlow", "PyTorch", "Data Analysis"],
          companies: ["Google", "Amazon", "Microsoft", "Meta"],
          salary: {
            entry: "$90,000 - $120,000",
            experienced: "$120,000 - $180,000",
            senior: "$150,000 - $250,000"
          },
          growth: {
            rate: "25%",
            description: "Much faster than average",
            timeframe: "2023-2028"
          },
          description: "Machine Learning Engineers design and implement ML/AI systems, work on improving existing models, and deploy solutions at scale.",
          requirements: [
            "Bachelor's/Master's in Computer Science or related field",
            "Strong programming skills in Python",
            "Experience with ML frameworks",
            "Understanding of ML algorithms and mathematics"
          ]
        },
        {
          role: "Data Scientist",
          relevance: 85,
          skills: ["Python", "R", "SQL", "Statistical Analysis"],
          companies: ["Netflix", "Uber", "LinkedIn", "IBM"],
          salary: {
            entry: "$85,000 - $110,000",
            experienced: "$110,000 - $160,000",
            senior: "$140,000 - $200,000"
          },
          growth: {
            rate: "20%",
            description: "Faster than average",
            timeframe: "2023-2028"
          },
          description: "Data Scientists analyze complex data sets to help organizations make informed decisions."
        }
      ],
      industryProjects: [
        {
          company: "Tech Corp",
          project: "Customer Behavior Analysis",
          skills: ["Data Mining", "Python", "Statistical Analysis"],
          description: "Real-world project analyzing customer patterns and predicting buying behavior.",
          duration: "12 weeks",
          outcome: "Improved customer retention by 25%",
          technologies: ["Python", "TensorFlow", "SQL", "Tableau"]
        },
        {
          company: "HealthTech Inc",
          project: "Medical Image Classification",
          skills: ["Computer Vision", "Deep Learning", "PyTorch"],
          description: "Developing AI models for medical image analysis and disease detection.",
          duration: "16 weeks",
          outcome: "Achieved 94% accuracy in early disease detection",
          technologies: ["Python", "PyTorch", "OpenCV", "Docker"]
        }
      ],
      skillsMapping: {
        technical: [
          {
            name: "Machine Learning",
            relevance: 95,
            subskills: ["Neural Networks", "Deep Learning", "Model Optimization"]
          },
          {
            name: "Programming",
            relevance: 90,
            subskills: ["Python", "TensorFlow", "PyTorch"]
          }
        ],
        soft: [
          {
            name: "Problem Solving",
            relevance: 85,
            description: "Ability to break down complex problems and develop solutions"
          },
          {
            name: "Communication",
            relevance: 80,
            description: "Explaining technical concepts to non-technical stakeholders"
          }
        ]
      }
    }
  };
