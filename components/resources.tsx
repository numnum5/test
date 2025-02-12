'use client';

import { BsBook, BsFileEarmarkText, BsLink45Deg, BsPlayCircle } from 'react-icons/bs';

interface Resource {
  title: string;
  type: 'textbook' | 'document' | 'video' | 'link';
  url: string;
  description?: string;
}

const resources: Resource[] = [
  {
    title: "Machine Learning Textbook",
    type: "textbook",
    url: "#",
    description: "Primary textbook for the course"
  },
  {
    title: "Course Notes",
    type: "document",
    url: "#",
    description: "Comprehensive lecture notes"
  },
  {
    title: "Tutorial Videos",
    type: "video",
    url: "#",
    description: "Video explanations of key concepts"
  }
];

export const ResourcesSection = () => {
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'textbook': return <BsBook className="w-5 h-5" />;
      case 'document': return <BsFileEarmarkText className="w-5 h-5" />;
      case 'video': return <BsPlayCircle className="w-5 h-5" />;
      case 'link': return <BsLink45Deg className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 border-t border-[rgba(255,255,255,0.125)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold text-xl">Resources</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 hover:bg-[rgba(255,255,255,0.08)]
                     transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                {getIcon(resource.type)}
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">{resource.title}</h3>
                {resource.description && (
                  <p className="text-white/60 text-sm">{resource.description}</p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};