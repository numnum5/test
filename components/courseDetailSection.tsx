import { FC, useState } from 'react';
// import { Subject } from '@/types/subject';
import { IoClose, IoAdd } from 'react-icons/io5';

interface ComparisonSubject {
  id: number;
  code: string;
  name: string;
  ratings: {
    overall: number;
    difficulty: number;
    workload: number;
    teaching: number;
    content: number;
  };
}

export const SubjectComparison: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<ComparisonSubject[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const ComparisonMetric: FC<{ label: string; values: number[] }> = ({ label, values }) => (
    <div className="mb-4">
      <div className="text-white/60 mb-2">{label}</div>
      <div className="flex gap-4">
        {values.map((value, index) => (
          <div key={index} className="flex-1">
            <div className="h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${(value/10)*100}%` }}
              />
            </div>
            <div className="text-white text-sm mt-1">{value}/10</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Comparison Drawer */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-[rgba(17,25,40,0.95)] border-t 
        border-[rgba(255,255,255,0.125)] transition-transform duration-300
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Compare Subjects</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            {selectedSubjects.map((subject) => (
              <div 
                key={subject.id}
                className="bg-[rgba(255,255,255,0.1)] rounded-lg p-4 flex items-center gap-3"
              >
                <div>
                  <div className="text-white font-medium">{subject.name}</div>
                  <div className="text-white/60 text-sm">{subject.code}</div>
                </div>
                <button 
                  onClick={() => setSelectedSubjects(prev => 
                    prev.filter(s => s.id !== subject.id)
                  )}
                  className="text-white/40 hover:text-white/60"
                >
                  <IoClose size={20} />
                </button>
              </div>
            ))}

            {selectedSubjects.length < 3 && (
              <button 
                className="border-2 border-dashed border-white/20 rounded-lg p-4 
                          text-white/60 hover:border-purple-400 hover:text-purple-400
                          flex items-center gap-2"
              >
                <IoAdd size={20} />
                Add Subject
              </button>
            )}
          </div>

          {showComparison && selectedSubjects.length > 1 && (
            <div className="space-y-6">
              {/* Ratings Comparison */}
              <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-6">
                <h4 className="text-white font-medium mb-4">Ratings Comparison</h4>
                <ComparisonMetric 
                  label="Overall Rating"
                  values={selectedSubjects.map(s => s.ratings.overall)}
                />
                <ComparisonMetric 
                  label="Difficulty"
                  values={selectedSubjects.map(s => s.ratings.difficulty)}
                />
                <ComparisonMetric 
                  label="Workload"
                  values={selectedSubjects.map(s => s.ratings.workload)}
                />
              </div>

              {/* Other comparison sections */}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowComparison(true)}
              disabled={selectedSubjects.length < 2}
              className={`
                px-6 py-2 rounded-lg font-medium
                ${selectedSubjects.length < 2 
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                }
              `}
            >
              Compare
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 
                  text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <IoAdd size={20} />
        Compare Subjects
      </button>
    </>
  );
};