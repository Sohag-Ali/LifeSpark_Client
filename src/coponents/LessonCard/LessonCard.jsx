import React from "react";
import { Link } from "react-router";
import { Bookmark, Heart, Lock } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import useUser from "../../hooks/useUser";

/**
 * Reusable LessonCard Component
 * Implements a premium design, responsive dimensions, card hover micro-animations,
 * and handles access restrictions (premium lock blur overlay).
 */
export const LessonCard = ({ lesson, imageClass = "h-60" }) => {
  const [userData] = useUser();
  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;
  const readTime = Math.ceil((lesson.description || "").split(" ").length / 200);

  return (
    <div className="relative group overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] shadow-xl hover:-translate-y-2 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      {/* Premium locked overlay */}
      {isPremiumLocked && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/50 z-20 flex flex-col items-center justify-center text-white p-4">
          <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center border border-warning/30">
            <Lock size={32} className="text-warning" />
          </div>

          <h2 className="font-bold text-2xl mt-5 text-center">Premium Lesson</h2>
          <p className="text-sm mt-2 text-gray-300 text-center">
            Upgrade your plan to unlock this lesson
          </p>

          <Link
            to="/pricing"
            className="mt-5 px-6 py-3 rounded-full bg-gradient-to-r from-warning to-orange-500 text-black font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-warning/20"
          >
            Upgrade Now ⭐
          </Link>
        </div>
      )}

      {/* Card Image section */}
      <div className={`relative overflow-hidden ${imageClass} shrink-0`}>
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          loading="lazy"
        />

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Category badge (top-left) */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-sm font-semibold shadow-lg shadow-black/20">
            {lesson.category}
          </span>
        </div>

        {/* Read Time badge (top-right) */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-semibold shadow-lg">
          {readTime} min read
        </div>
      </div>

      {/* Card body content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent line-clamp-2 min-h-[64px] leading-snug">
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-7 mt-4 line-clamp-3 min-h-[84px]">
          {lesson.description}
        </p>

        {/* Badges / tag layout (if any additional tags like emotionalTone exist) */}
        {lesson.emotionalTone && (
          <div className="flex gap-2 flex-wrap mt-4">
            <span className="badge badge-secondary badge-md px-3 py-2 text-white border border-pink-500/20 bg-pink-500/10">
              {lesson.emotionalTone}
            </span>
          </div>
        )}

        {/* Creator Profile */}
        <div className="flex items-center gap-4 mt-6">
          <img
            src={lesson.creatorPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={lesson.creatorName}
            className="w-12 h-12 rounded-full object-cover border border-white/10"
            referrerPolicy="no-referrer"
          />

          <div className="flex-1 min-w-0">
            <h4 className="font-bold bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-lg truncate">
              {lesson.creatorName}
            </h4>

            <div className="flex items-center justify-between mt-1 w-full gap-2">
              <p className="text-xs text-gray-500 truncate">Creator</p>
              <p className="text-xs text-gray-400 shrink-0">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row & Access level */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center gap-5">
            {/* Likes */}
            <div className="flex items-center gap-2 text-rose-400 text-sm font-medium">
              <Heart size={16} className="fill-rose-400" />
              <span>{lesson.likesCount || 0}</span>
            </div>

            {/* Bookmarks */}
            <div className="flex items-center gap-2 text-amber-300 text-sm font-medium">
              <Bookmark size={16} className="fill-amber-400" />
              <span>{lesson.favoritesCount || 0}</span>
            </div>
          </div>

          {/* Access level Badge */}
          <span
            className={`px-4 py-2 rounded-full text-xs font-semibold border ${
              lesson.accessLevel === "Premium"
                ? "bg-amber-500/10 text-amber-200 border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
            }`}
          >
            {lesson.accessLevel === "Premium" ? "Premium ⭐" : "Free"}
          </span>
        </div>

        {/* Details button */}
        <div className="mt-8">
          <Link
            to={`/lesson-details/${lesson._id}`}
            className="btn border-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white w-full rounded-full flex items-center justify-center gap-2"
          >
            See Details
            <FaArrowRight className="group-hover:translate-x-1 transition duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
