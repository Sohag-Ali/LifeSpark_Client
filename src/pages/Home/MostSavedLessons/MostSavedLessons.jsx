import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiArrowRight, FiBookmark } from "react-icons/fi";


const MostSavedLessons = () => {
   const axiosSecure = useAxiosSecure();

   const { data: lessons = [] } = useQuery({

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

          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Most Saved Lessons
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            Explore the lessons that inspired and impacted the most people in our growing community.
          </p>

        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {lessons.map((lesson) => (

            <div
              key={lesson._id}
              className="
                group
                relative
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-[32px]
                overflow-hidden
                hover:-translate-y-2
                hover:border-primary/40
                hover:shadow-purple-500/20
                hover:shadow-2xl
                transition-all
                duration-300
                flex
                flex-col
                h-full
              "
            >

              {/* image */}
              <div className="relative overflow-hidden h-64">

                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-110
                    transition
                    duration-700
                  "
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* badge */}
                <div className="absolute top-5 left-5">

                  <span className="badge badge-primary badge-lg px-4 py-3 text-white font-medium">
                    {lesson.category}
                  </span>

                </div>

                {/* saved count */}
                <div className="absolute top-5 right-5">

                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">

                    <FiBookmark className="text-primary" />

                    <span className="text-white font-semibold">
                      {lesson.favoritesCount || 0}
                    </span>

                  </div>

                </div>

              </div>

              {/* content */}
              <div className="p-7 flex flex-col flex-grow">

                {/* title */}
                <h2 className="text-2xl font-bold text-white line-clamp-2 min-h-[64px]">
                  {lesson.title}
                </h2>

                {/* description */}
                <p className="text-gray-400 mt-5 leading-8 line-clamp-3 min-h-[96px]">
                  {lesson.description}
                </p>

                {/* bottom */}
                <div className="mt-auto pt-8">

                  <Link
                    to={`/lesson-details/${lesson._id}`}
                    className="
                      group/btn
                      btn
                      border-0
                      bg-gradient-to-r
                      from-indigo-500
                      to-purple-600
                      hover:from-purple-600
                      hover:to-indigo-500
                      text-white
                      w-full
                      rounded-full
                      text-base
                    "
                  >

                    View Details

                    <FiArrowRight className="group-hover/btn:translate-x-1 transition duration-300" />

                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};



export default MostSavedLessons;