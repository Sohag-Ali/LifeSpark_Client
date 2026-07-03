import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Sparkles } from "lucide-react";
import useUser from "../../hooks/useUser";
import LessonCard from "../../coponents/LessonCard/LessonCard";
import LessonCardSkeleton from "../../coponents/Skeleton/LessonCardSkeleton";

const SimilarLesson = ({ lesson }) => {
  const axiosSecure = useAxiosSecure();
  const [userData] = useUser();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["similar-lessons", lesson?._id],

    enabled: !!lesson?._id,

    queryFn: async () => {
      const res = await axiosSecure.get(`/similar-lessons/${lesson._id}`);

      return res.data;
    },
  });

  return (
    <section className="mt-20">
      {/* HEADING */}
      <div className="text-center mb-14">
        <div
          className="
            inline-flex
            items-center
            gap-3
            px-5
            py-3
            rounded-full
            bg-primary/10
            border
            border-primary/20
            text-primary
            font-semibold
            mb-6
          "
        >
          <Sparkles size={18} />
          Similar & Recommended For You
        </div>
        <p
          className="
            text-gray-400
            mt-5
            text-lg
            max-w-2xl
            mx-auto
            leading-8
          "
        >
          Explore more inspiring lessons based on similar categories and
          emotional experiences.
        </p>
      </div>

      {/* LOADING / NO LESSON / CARDS */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <LessonCardSkeleton />
          <LessonCardSkeleton />
          <LessonCardSkeleton />
        </div>
      ) : lessons.length === 0 ? (
        <div
          className="
              max-w-3xl
              mx-auto
              text-center
              bg-gradient-to-br
              from-[#111827]
              to-[#0F172A]
              border
              border-white/10
              rounded-[32px]
              shadow-2xl
              p-14
            "
        >
          <div className="text-7xl mb-8">📚</div>

          <h2
            className="
                text-3xl
                md:text-4xl
                font-black
                text-white
              "
          >
            No Similar Lessons Found
          </h2>

          <p
            className="
                text-gray-400
                mt-6
                text-lg
                leading-9
                max-w-xl
                mx-auto
              "
          >
            There are currently no related lessons available based on this
            category or emotional tone.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {lessons.map((item) => (
            <LessonCard key={item._id} lesson={item} imageClass="h-72" />
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarLesson;
