'use client';

import { BsArrowRight, BsBook, BsCheckCircle, BsLightbulb } from 'react-icons/bs';

interface UnitCode {
  code: string;
  name: string;
  description?: string;
}

interface LearningOutcome {
  id: string;
  description: string;
}

const prerequisites: UnitCode[] = [
  {
    code: "COMP2001",
    name: "Data Structures",
    description: "Fundamental data structures and algorithms"
  },
  {
    code: "MATH2004",
    name: "Linear Algebra",
    description: "Vector spaces and linear transformations"
  }
];

const recommendedBackground = [
  "Strong programming skills in Python",
  "Basic understanding of statistics",
  "Familiarity with calculus concepts",
  "Problem-solving abilities"
];

const learningOutcomes: LearningOutcome[] = [
  {
    id: "LO1",
    description: "Implement and evaluate machine learning algorithms"
  },
  {
    id: "LO2",
    description: "Apply appropriate ML techniques to real-world problems"
  },
  {
    id: "LO3",
    description: "Analyze and interpret model performance metrics"
  }
];

const followUpUnits: UnitCode[] = [
  {
    code: "COMP4001",
    name: "Deep Learning",
    description: "Advanced neural networks and deep learning"
  },
  {
    code: "COMP4002",
    name: "Computer Vision",
    description: "Image processing and visual recognition"
  }
];

export const SubjectDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-2 border-t border-[rgba(255,255,255,0.125)]">
      {/* Prerequisites */}
      <div className="p-2">
        <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
          <BsCheckCircle className="text-purple-400" />
          Required Prerequisites
        </h3>
        <div className="space-y-3">
          {prerequisites.map((unit) => (
            <div
              key={unit.code}
              className="bg-[rgba(255,255,255,0.05)] rounded-lg p-3 hover:bg-[rgba(255,255,255,0.08)]
                       transition-all duration-200 cursor-pointer"
            >
              <div className="text-purple-400 font-medium text-sm mb-1">
                {unit.code}
              </div>
              <div className="text-white font-medium mb-1">
                {unit.name}
              </div>
              {unit.description && (
                <div className="text-white/60 text-sm">
                  {unit.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Background */}
      <div className="p-2">
        <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
          <BsBook className="text-purple-400" />
          Recommended Background
        </h3>
        <div className="space-y-2">
          {recommendedBackground.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="p-2">
        <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
          <BsLightbulb className="text-purple-400" />
          Learning Outcomes
        </h3>
        <div className="space-y-3">
          {learningOutcomes.map((outcome) => (
            <div
              key={outcome.id}
              className="bg-[rgba(255,255,255,0.05)] rounded-lg p-3"
            >
              <div className="text-purple-400 text-sm mb-1">
                {outcome.id}
              </div>
              <div className="text-white/70">
                {outcome.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Follow-up Units */}
      <div className="p-2">
        <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
          <BsArrowRight className="text-purple-400" />
          Follow-up Units
        </h3>
        <div className="space-y-3">
          {followUpUnits.map((unit) => (
            <div
              key={unit.code}
              className="bg-[rgba(255,255,255,0.05)] rounded-lg p-3 hover:bg-[rgba(255,255,255,0.08)]
                       transition-all duration-200 cursor-pointer"
            >
              <div className="text-purple-400 font-medium text-sm mb-1">
                {unit.code}
              </div>
              <div className="text-white font-medium mb-1">
                {unit.name}
              </div>
              {unit.description && (
                <div className="text-white/60 text-sm">
                  {unit.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};