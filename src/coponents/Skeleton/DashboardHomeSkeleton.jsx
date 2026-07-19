import React from "react";
import Skeleton from "./Skeleton";

/**
 * DashboardHomeSkeleton Component
 * Replicates the stats cards, quick action panel, recent items list, and chart widget.
 */
export const DashboardHomeSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Stats row skeleton */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
        {/* Card 1 */}
        <div className="bg-card border border-border rounded-[30px] p-8 flex items-center justify-between h-40">
          <div className="flex-grow">
            <Skeleton className="w-24 h-4 mb-4" />
            <Skeleton className="w-16 h-10" />
          </div>
          <Skeleton className="w-20 h-20 rounded-3xl shrink-0" variant="circle" />
        </div>

        {/* Card 2 */}
        <div className="bg-card border border-border rounded-[30px] p-8 flex items-center justify-between h-40">
          <div className="flex-grow">
            <Skeleton className="w-28 h-4 mb-4" />
            <Skeleton className="w-12 h-10" />
          </div>
          <Skeleton className="w-20 h-20 rounded-3xl shrink-0" variant="circle" />
        </div>

        {/* Card 3 (Quick actions) */}
        <div className="bg-card border border-border rounded-[30px] p-8 h-40 flex flex-col justify-between">
          <Skeleton className="w-32 h-6" />
          <div className="flex gap-4">
            <Skeleton className="w-1/2 h-12 rounded-2xl" />
            <Skeleton className="w-1/2 h-12 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Recent items list skeleton */}
      <div className="bg-card border border-border rounded-[32px] p-8 mb-12">
        <Skeleton className="w-64 h-8 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-muted border border-border rounded-2xl p-4 md:p-5">
              <div className="flex items-center gap-4 flex-grow">
                <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shrink-0" />
                <div className="flex-grow flex flex-col gap-2">
                  <Skeleton className="w-1/2 h-5" />
                  <Skeleton className="w-20 h-4 rounded-xl" />
                </div>
              </div>
              <Skeleton className="w-24 h-12 rounded-2xl shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Chart widget skeleton */}
      <div className="bg-card border border-border rounded-[32px] p-8 h-[450px] flex flex-col justify-between">
        <div>
          <Skeleton className="w-48 h-8 mb-2" />
          <Skeleton className="w-36 h-4" />
        </div>
        <div className="flex items-end justify-between h-[300px] pt-10 px-4">
          {[40, 70, 50, 90, 60, 30, 80, 50].map((height, i) => (
            <Skeleton
              key={i}
              className="w-[8%] rounded-t-xl"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeSkeleton;
