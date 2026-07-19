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
          <h2 className="text-gradient-brand text-2xl md:text-4xl lg:text-5xl font-bold ">
            Featured Life Lessons
          </h2>

          <p className="text-muted-foreground mt-4">
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
          <div className=" text-center py-24 rounded-[32px] bg-card border border-border shadow-elevated">
            {/* icon */}
            <div className=" w-28 h-28 mx-auto rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Star size={60} className="text-primary" />
            </div>

            {/* title */}
            <h2
              className="
      mt-10
      text-4xl
      md:text-5xl
      font-black
      text-gradient-brand
    "
            >
              No Featured Lessons Yet
            </h2>

            {/* description */}
            <p
              className="
      mt-5
      text-muted-foreground
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
            className="px-8 py-4 rounded-full bg-gradient-brand text-primary-content font-bold text-lg shadow-glow hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            View All Lessons
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
