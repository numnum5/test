'use client'
import React, { useState } from 'react';
import { IoChatbubbleEllipsesOutline, IoSearchOutline } from 'react-icons/io5';
import { FaDatabase, FaBrain } from 'react-icons/fa';
import { BsFileEarmarkCode } from 'react-icons/bs';

// interface AiTutor{

//   id : string;
//   unitCode : string;
//   name : string;
//   icon :  React.JSX.Element;
//   capabilities : string[];
//   topics : string[];
//   personality : string;
//   color : string;
//   description : string;
// }

const AIHelp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAI, setSelectedAI] = useState(null);

  const aiTutors = [
    {
      id: 1,
      unitCode: 'IFB104',
      name: 'Building IT Systems',
      description: 'Learn programming fundamentals and system development basics',
      icon: <BsFileEarmarkCode className="w-8 h-8" />,
      capabilities: [
        'Python Programming',
        'System Design',
        'Problem Solving',
        'Code Review'
      ],
      topics: [
        'Python Basics',
        'GUI Development',
        'File Handling',
        'Basic Algorithms'
      ],
      personality: 'Beginner-friendly and patient',
      color: 'blue'
    },
    {
      id: 2,
      unitCode: 'CAB432',
      name: 'Cloud Computing',
      description: 'Master cloud services, deployment, and scalable applications',
      icon: <FaDatabase className="w-8 h-8" />,
      capabilities: [
        'AWS Services',
        'Cloud Architecture',
        'Serverless Computing',
        'DevOps'
      ],
      topics: [
        'Cloud Fundamentals',
        'Microservices',
        'Container Orchestration',
        'Cloud Security'
      ],
      personality: 'Technical and solution-oriented',
      color: 'purple'
    },
    {
      id: 3,
      unitCode: 'CAB301',
      name: 'Algorithms',
      description: 'Deep dive into algorithmic thinking and problem solving',
      icon: <FaBrain className="w-8 h-8" />,
      capabilities: [
        'Algorithm Analysis',
        'Data Structures',
        'Complexity Theory',
        'Problem Patterns'
      ],
      topics: [
        'Sorting Algorithms',
        'Graph Theory',
        'Dynamic Programming',
        'Search Algorithms'
      ],
      personality: 'Analytical and detail-oriented',
      color: 'green'
    },
    // Add more units as needed
  ];

  const filteredAIs = aiTutors.filter(ai => 
    ai.unitCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ai.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const colorVariants = {
  //   blue: 'from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30',
  //   purple: 'from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30',
  //   green: 'from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30'
  // };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0EA5E9]">
      {/* Grid Background */}
      <div 
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgb(255 255 255) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">AI Learning Assistants</h1>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Choose your unit&aposs AI tutor for personalized learning assistance
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by unit code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* AI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAIs.map((ai) => (
            <div
              key={ai.id}
              // className={`group relative bg-gradient-to-br ${colorVariants[ai.color]} 
               className={`group relative bg-gradient-to-br 
                backdrop-blur-lg rounded-xl p-6 border border-white/10 
                transition-all duration-300 cursor-pointer
                hover:scale-[1.02] hover:shadow-xl`}
              onClick={() => setSelectedAI(ai)}
            >
              {/* Unit Code Badge */}
              <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded-full">
                <span className="text-white font-medium">{ai.unitCode}</span>
              </div>

              {/* Icon */}
              <div className="text-cyan-400 mb-4">
                {ai.icon}
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold text-xl mb-2">{ai.name}</h3>
              <p className="text-white/60 mb-4">{ai.description}</p>

              {/* Capabilities */}
              <div className="mb-4">
                <h4 className="text-white/80 text-sm font-medium mb-2">Capabilities:</h4>
                <div className="flex flex-wrap gap-2">
                  {ai.capabilities.map((capability : string, index : number) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div>
                <h4 className="text-white/80 text-sm font-medium mb-2">Key Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {ai.topics.map((topic : string, index : number) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                <IoChatbubbleEllipsesOutline />
                Start Learning
              </button>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredAIs.length === 0 && (
          <div className="text-center text-white/60 mt-8">
            No AI tutors found for &quot{searchTerm}&quot
          </div>
        )}
      </div>

      {/* AI Selection Modal (you can implement this separately) */}
      {selectedAI && (
        // Add your modal implementation here
        console.log('Selected AI:', selectedAI)
      )}
    </div>
  );
};

export default AIHelp;