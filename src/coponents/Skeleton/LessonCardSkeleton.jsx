import React from "react";
import Skeleton from "./Skeleton";

/**
 * LessonCardSkeleton Component
 * Matches the dimensions, border-radius, background, and spacing of LessonCard
 * to prevent any layout shifts when loading lessons.
 */
export const LessonCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] shadow-xl flex flex-col h-full min-h-[500px]">
      {/* Image skeleton */}
      <div className="relative h-60 w-full overflow-hidden shrink-0">
        <Skeleton className="w-full h-full" />
        
        {/* Badge skeleton overlay */}
        <div className="absolute top-4 left-4">
          <Skeleton className="w-24 h-8 rounded-full" />
        </div>
        <div className="absolute top-4 right-4">
          <Skeleton className="w-20 h-8 rounded-full" />
        </div>
      </div>

      {/* Content area skeleton */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title skeleton */}
        <div className="min-h-[64px] flex flex-col gap-2">
          <Skeleton className="w-11/12 h-6" />
          <Skeleton className="w-2/3 h-6" />
        </div>

        {/* Description skeleton */}
        <div className="min-h-[84px] mt-4 flex flex-col gap-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-4/5 h-4" />
        </div>

        {/* Badges / tag skeletons (used in public page cards) */}
        <div className="flex gap-2 mt-4">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>

        {/* Creator info skeleton */}
        <div className="flex items-center gap-4 mt-6">
          <Skeleton className="w-12 h-12 rounded-full shrink-0" variant="circle" />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton className="w-1/2 h-4" />
            <div className="flex justify-between w-full">
              <Skeleton className="w-1/3 h-3" />
              <Skeleton className="w-1/4 h-3" />
            </div>
          </div>
        </div>

        {/* Divider and Actions skeleton */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center gap-5">
            <Skeleton className="w-12 h-5 rounded" />
            <Skeleton className="w-12 h-5 rounded" />
          </div>
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>

        {/* Button skeleton */}
        <div className="mt-8">
          <Skeleton className="w-full h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LessonCardSkeleton;
