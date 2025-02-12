
interface Recommendation {
  code: string;
  name: string;
  type: 'prerequisite' | 'related' | 'next';
  description: string;
  rating: number;
}

const recommendations: Recommendation[] = [
  {
    code: "CS2001",
    name: "Data Structures",
    type: "prerequisite",
    description: "Fundamental data structures and algorithms",
    rating: 4.2
  },
  {
    code: "CS4002",
    name: "Deep Learning",
    type: "related",
    description: "Advanced neural networks and deep learning",
    rating: 4.5
  }
];

export const RecommendationsSection = () => {
  return (
    <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold text-xl">Recommendations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 hover:bg-[rgba(255,255,255,0.08)]
                     transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 text-sm font-medium">
                {rec.code}
              </span>
              <span className="text-white/60 text-sm">
                {rec.rating.toFixed(1)} ★
              </span>
            </div>
            <h3 className="text-white font-medium mb-1">{rec.name}</h3>
            <p className="text-white/60 text-sm mb-2">{rec.description}</p>
            <span className={`
              text-xs px-2 py-1 rounded-full
              ${rec.type === 'prerequisite' ? 'bg-blue-500/20 text-blue-400' :
                rec.type === 'related' ? 'bg-purple-500/20 text-purple-400' :
                'bg-green-500/20 text-green-400'}
            `}>
              {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};