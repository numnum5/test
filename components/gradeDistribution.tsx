

interface GradeData {
  grade: string;
  percentage: number;
  count: number;
}

const gradeData: GradeData[] = [
  { grade: 'HD', percentage: 15, count: 45 },
  { grade: 'D', percentage: 25, count: 75 },
  { grade: 'C', percentage: 35, count: 105 },
  { grade: 'P', percentage: 20, count: 60 },
  { grade: 'F', percentage: 5, count: 15 }
];

export const GradeDistributionSection = () => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'HD': return 'bg-purple-500';
      case 'D': return 'bg-blue-500';
      case 'C': return 'bg-green-500';
      case 'P': return 'bg-yellow-500';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold text-xl">Grade Distribution</h2>
        <div className="text-white/60 text-sm">
          Total Students: {gradeData.reduce((acc, curr) => acc + curr.count, 0)}
        </div>
      </div>

      <div className="space-y-4">
        {gradeData.map((data, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium w-8">{data.grade}</span>
                <span className="text-white/60">{data.count} students</span>
              </div>
              <span className="text-white/60">{data.percentage}%</span>
            </div>
            <div className="h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
              <div
                className={`h-full ${getGradeColor(data.grade)} rounded-full transition-all duration-500`}
                style={{ width: `${data.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">85%</div>
          <div className="text-white/60 text-sm">Pass Rate</div>
        </div>
        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">40%</div>
          <div className="text-white/60 text-sm">HD/D Rate</div>
        </div>
      </div>
    </div>
  );
};