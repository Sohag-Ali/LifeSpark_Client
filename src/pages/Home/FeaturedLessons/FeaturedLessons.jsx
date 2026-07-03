import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import useUser from "../../../hooks/useUser";
import LessonCard from "../../../coponents/LessonCard/LessonCard";
import LessonCardSkeleton from "../../../coponents/Skeleton/LessonCardSkeleton";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [userData] = useUser();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featured-lessons"],

    queryFn: async () => {
      const res = await axiosSecure.get("/featured-lessons");

      return res.data;
    },
  });

  return (
    <section className="py-12  md:py-16 lg:py-20">
      <div className=" px-2">
        {/* title */}
        <div className="text-center mb-12">
          <h2 className="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl font-bold ">
            Featured Life Lessons
          </h2>

          <p className="text-gray-500 mt-4">
            Learn from real experiences shared by our community
          </p>
        </div>

        {/* loading / cards / empty */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <LessonCardSkeleton />
            <LessonCardSkeleton />
            <LessonCardSkeleton />
          </div>
        ) : lessons.length === 0 ? (
          <div className=" text-center py-24 rounded-[32px] bg-gradient-to-br from-[#111827] to-[#0F172A] border border-white/10 shadow-2xl">
            {/* icon */}
            <div className=" w-28 h-28 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Star size={60} className="text-purple-400" />
            </div>

            {/* title */}
            <h2
              className="
      mt-10
      text-4xl
      md:text-5xl
      font-black
      bg-gradient-to-r
      from-[#D8B4FE]
      via-[#A78BFA]
      to-[#818CF8]
      bg-clip-text
      text-transparent
    "
            >
              No Featured Lessons Yet
            </h2>

            {/* description */}
            <p
              className="
      mt-5
      text-gray-400
      max-w-2xl
      mx-auto
      leading-8
      text-lg
    "
            >
              Featured lessons will appear here once they are selected by the
              admin 🚀
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} imageClass="h-60" />
            ))}
          </div>
        )}

        {/* all lessons */}
        <div className="text-center mt-14">
          <Link
            to="/public-lessons"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300"
          >
            View All Lessons
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
