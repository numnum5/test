import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons

const CollapsibleText = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full max-w-md">
      {/* Header with Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Collapsible Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default CollapsibleText;