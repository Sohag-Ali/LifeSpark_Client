import React from "react";
import Skeleton from "./Skeleton";

/**
 * ProfileSkeleton Component
 * Matches the user profile dashboard page layout.
 */
export const ProfileSkeleton = () => {
  return (
    <div className="px-4 md:px-8 py-10 animate-pulse">
      {/* Profile header card */}
      <div className="relative bg-card border border-border rounded-[32px] overflow-hidden shadow-2xl p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Skeleton className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-border shrink-0" variant="circle" />
          <div className="flex-1 flex flex-col items-center md:items-start gap-3 w-full">
            <Skeleton className="w-48 h-8" />
            <Skeleton className="w-64 h-5" />
            <div className="flex gap-3 mt-2">
              <Skeleton className="w-24 h-7 rounded-full" />
              <Skeleton className="w-24 h-7 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile contributions section */}
      <div className="bg-card border border-border rounded-[32px] p-8 shadow-2xl">
        <Skeleton className="w-48 h-8 mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border bg-muted rounded-2xl p-5 flex flex-col gap-4">
              <Skeleton className="w-full h-40 rounded-xl" />
              <Skeleton className="w-3/4 h-5" />
              <Skeleton className="w-full h-4" />
              <div className="flex justify-between items-center mt-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-16 h-8 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
