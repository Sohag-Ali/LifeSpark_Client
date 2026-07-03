import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import LessonCard from "../../../coponents/LessonCard/LessonCard";
import LessonCardSkeleton from "../../../coponents/Skeleton/LessonCardSkeleton";


const MostSavedLessons = () => {
   const axiosSecure = useAxiosSecure();
   const [userData] = useUser();

   const { data: lessons = [], isLoading } = useQuery({

      queryKey: ['most-saved-lessons'],

      queryFn: async() => {

         const res =
         await axiosSecure.get(
            '/most-saved-lessons'
         );

         return res.data;
      }
   });

    return (
    <section className="py-16 md:py-24 bg-[#0F172A] relative overflow-hidden">
      
      {/* background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="text-primary uppercase tracking-widest font-semibold">
            Community Favorites
          </span>

          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-4">
            Most Saved Lessons
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            Explore the lessons that inspired and impacted the most people in our growing community.
          </p>

        </div>


        {/* cards */}
        { isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <LessonCardSkeleton />
            <LessonCardSkeleton />
            <LessonCardSkeleton />
          </div>
        ) : lessons.length === 0 ?
  (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-24
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        text-center
      "
    >

      <div className="text-7xl mb-6">
        📚
      </div>

      <h2
        className="
          text-3xl
          md:text-4xl
          font-black
          bg-gradient-to-r
          from-[#D8B4FE]
          via-[#A78BFA]
          to-[#818CF8]
          bg-clip-text
          text-transparent
        "
      >

        No Lessons Found

      </h2>

      <p className="text-gray-400 mt-4 max-w-md leading-8">

        No saved lessons are available right now.
        Please check back later.

      </p>

    </div>
  )
  :
  (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} imageClass="h-64" />
          ))}

        </div>

  )
}

      </div>
    </section>
  );
};



export default MostSavedLessons;