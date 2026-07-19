import React from "react";
import Skeleton from "./Skeleton";

/**
 * LessonDetailsSkeleton Component
 * Replicates the detailed view page layout with header image, badges, detailed text content, metadata, and side actions.
 */
export const LessonDetailsSkeleton = () => {
  return (
    <div className="bg-card border border-border shadow-2xl rounded-[32px] overflow-hidden">
      {/* Hero Image area */}
      <div className="relative h-[300px] md:h-[500px]">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content spacing */}
      <div className="p-6 md:p-10">
        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-24 h-8 rounded-full" />
          <Skeleton className="w-16 h-8 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="w-3/4 h-12 mb-8" />

        {/* Story section */}
        <div className="mt-10">
          <Skeleton className="w-48 h-8 mb-5" />
          <div className="space-y-4">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-11/12 h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-4/5 h-5" />
          </div>
        </div>

        {/* Metadata info */}
        <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-6">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-32 h-6" />
        </div>

        {/* Author Section Card */}
        <div className="mt-10 p-6 bg-muted border border-border rounded-2xl flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full shrink-0" variant="circle" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="w-1/3 h-5" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailsSkeleton;
