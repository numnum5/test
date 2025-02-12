'use client'
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import AssessmentDetails from '@/components/assessmentDetails';
import { Button } from '@/components/ui/button';
import { GradeDistributionSection } from '@/components/gradeDistribution';
import { RecommendationsSection } from '@/components/recommendation';
import { ResourcesSection } from '@/components/resources';
import { SubjectDetails } from '@/components/unitDetails';


const test2 = [
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
  }
];

const SubjectRating = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [selectedSection, setSelectedSection] = useState("review");


  const ChangeSelectedSection = () => {


    if(selectedSection === "review"){
      setSelectedSection("qanda")
    }else if(selectedSection === "qanda"){
      setSelectedSection("review")
    }
  }


  const [subjects, setSubjects] = useState(test2);

  const handleReviewSubmit = () => {
    return {};
  };

  const handleReviewClick = (subject) => {
  };

  const CourseDetailsSection = ({ subject }) => {
    const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  
    const weeklyTopics = [
      {
        week: 1,
        title: "Introduction to Machine Learning",
        topics: [
          "Overview of ML concepts",
          "Types of Machine Learning",
          "Applications and Use Cases"
        ]
      },
      // Add more weeks as needed
    ];
  
    return (
      <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
        <div className="mb-8">
          <h3 className="text-white font-semibold text-xl mb-4">Course Overview</h3>
          <p className="text-white/80 leading-relaxed">{subject.description}</p>
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

          {/* Second Card - Delivery Mode */}
          <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4 min-[400px]:">
            <h4 className="text-white font-medium mb-3">Content</h4>
            <div className="space-y-2">
                
            </div>
          </div>
        
        </div>

        
      </div>
    );
  };

    const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  
    const weeklyTopics = [
      {
        week: 1,
        title: "Introduction to Machine Learning",
        topics: [
          "Overview of ML concepts",
          "Types of Machine Learning",
          "Applications and Use Cases"
        ]
      },
      // Add more weeks as needed
    ];
  
 
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
          {subjects.map((subject) => (
            <div 
              key={subject.id}
              className="bg-[rgba(17,25,40,0.75)] backdrop-blur-lg rounded-xl border border-[rgba(255,255,255,0.125)] mb-8"
            >
              {/* Header Section */}
              <div className="p-6 border-b border-[rgba(255,255,255,0.125)]">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {subject.name} <span className="text-white/60 text-xl">({subject.code})</span>
                    </h2>
                    <div className="flex items-center gap-4 text-white/70">
                      <span>{subject.professor}</span>
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {subject.area}
                      </span>
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        Faculty of Engineering
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">{subject.ratings.overall}/10</div>
                    <div className="text-white/60 text-sm">Overall Rating</div>
                  </div>
                </div>
              </div>

              {/* Course Details Section */}
              <CourseDetailsSection subject={subject} />

              {/* Ratings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-t border-[rgba(255,255,255,0.125)]">
                {Object.entries(subject.ratings).map(([key, value]) => (
                  key !== 'overall' && (
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

              {/* Reviews Section */}
              <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
                
                <div className='flex felx-row items-start gap-2'>
                  <Button>
                    Q and A
                  </Button>
                  <Button>
                    Review
                  </Button>
                 </div> 
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-semibold">Student Reviews</h3>
                  <button 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={() => handleReviewClick(subject)}
                  >
                    Write a Review
                  </button>
                </div>
                {/* <ReviewSection/> */}
                {subject.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {/* Review items */}
                  </div>
                ) : (
                  <p className="text-white/50 text-center py-8">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>



          ))}


        </div>
      </div>
    </div>
  );
};

const QASection = ({ subject }) => {
  const [questions, setQuestions] = useState([
    {
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
    }
  ]);
  const [showAskForm, setShowAskForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  return (
    <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold text-xl">Q&A Forum</h3>
        <button
          onClick={() => setShowAskForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Ask a Question
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[rgba(255,255,255,0.1)] text-white rounded-lg px-4 py-2 pl-10"
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
                  : 'bg-[rgba(255,255,255,0.1)] text-white/60 hover:bg-[rgba(255,255,255,0.2)]'
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="bg-[rgba(255,255,255,0.1)] rounded-lg p-6">
            <div className="flex gap-4">
              {/* Voting */}
              <div className="flex flex-col items-center gap-2">
                <button className="text-white/60 hover:text-white">▲</button>
                <span className="text-white font-medium">{question.votes}</span>
                <button className="text-white/60 hover:text-white">▼</button>
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
                    <span>{question.author}</span>
                    <span>•</span>
                    <span>{new Date(question.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{question.answers.length} answers</span>
                    <button className="text-purple-400 hover:text-purple-300">
                      Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default SubjectRating;