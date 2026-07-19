import React from "react";
import Skeleton from "./Skeleton";

/**
 * TableSkeleton Component
 * Generates a mock table with customizable column and row counts.
 */
export const TableSkeleton = ({ rowsCount = 5, colsCount = 6 }) => {
  const rows = Array.from({ length: rowsCount });
  const cols = Array.from({ length: colsCount });

  return (
    <div className="w-full overflow-x-auto bg-card border border-border rounded-[32px] shadow-2xl p-6">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="table min-w-full text-base-content">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs md:text-sm">
                {cols.map((_, index) => (
                  <th key={index} className="py-4 px-4">
                    <Skeleton className="w-16 h-4" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-border hover:bg-hover transition-all duration-200"
                >
                  {cols.map((_, colIndex) => {
                    // Make columns look slightly different
                    if (colIndex === 0) {
                      // Serial or small ID
                      return (
                        <td key={colIndex} className="py-4 px-4">
                          <Skeleton className="w-6 h-4" />
                        </td>
                      );
                    } else if (colIndex === 1) {
                      // Name/Title (often contains avatar + text)
                      return (
                        <td key={colIndex} className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-full shrink-0" variant="circle" />
                            <div className="flex flex-col gap-1.5 w-32">
                              <Skeleton className="w-full h-4" />
                              <Skeleton className="w-2/3 h-3" />
                            </div>
                          </div>
                        </td>
                      );
                    } else if (colIndex === colsCount - 1) {
                      // Actions (buttons)
                      return (
                        <td key={colIndex} className="py-4 px-4">
                          <div className="flex gap-2">
                            <Skeleton className="w-16 h-8 rounded-xl" />
                            <Skeleton className="w-12 h-8 rounded-xl" />
                          </div>
                        </td>
                      );
                    } else {
                      // Standard badge/text columns
                      return (
                        <td key={colIndex} className="py-4 px-4">
                          <Skeleton className="w-20 h-5 rounded-full" />
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
