
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
  className
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-b border-gray-200", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-denim-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-denim-700" />
        ) : (
          <ChevronDown className="h-5 w-5 text-denim-700" />
        )}
      </button>
      <div 
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
