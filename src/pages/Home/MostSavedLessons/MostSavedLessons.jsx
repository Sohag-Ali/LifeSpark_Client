import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import {  FiBookmark } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { Bookmark, Heart,Lock } from "lucide-react";
import useUser from "../../../hooks/useUser";


const MostSavedLessons = () => {
   const axiosSecure = useAxiosSecure();
   const [userData] = useUser();

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

          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-4">
            Most Saved Lessons
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            Explore the lessons that inspired and impacted the most people in our growing community.
          </p>

        </div>


        {/* cards */}
        { lessons.length === 0 ?
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

          {lessons.map((lesson) => {
            const isPremiumLocked =
                  lesson.accessLevel === "Premium" &&
                  !userData?.isPremium;
            return (
            <div
              key={lesson._id}
              className=" relative group overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] shadow-xl hover:-translate-y-2 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >

               {/* premium overlay */}
                    {isPremiumLocked && (

                      <div className="absolute inset-0 backdrop-blur-md bg-black/50 z-20 flex flex-col items-center justify-center text-white">
                        
                        <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center border border-warning/30">

                          <Lock size={32} className="text-warning" />

                        </div>

                        <h2 className="font-bold text-2xl mt-5">
                          Premium Lesson
                        </h2>

                        <p className="text-sm mt-2 text-gray-300">
                          Upgrade your plan to unlock this lesson
                        </p>

                        <Link
                          to="/pricing"
                          className=" mt-5 px-6 py-3 rounded-full bg-gradient-to-r from-warning to-orange-500 text-black font-semibold hover:scale-105 transition"
                        >
                          Upgrade Now ⭐
                        </Link>

                      </div>
                    )}

              {/* image */}
              <div className="relative overflow-hidden h-64">

                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className=" w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* badge */}
                <div className="absolute top-4 left-5">

                  <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-sm font-semibold shadow-lg shadow-black/20">
                    {lesson.category}
                  </span>

                </div>
                {/* lesson length */}
                <div className=" absolute top-3 right-5 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-semibold shadow-lg ">

  {
    Math.ceil(
      lesson.description?.split(" ").length / 200
    )
  }
  {" "}min read

                </div>

                {/* saved count */}
                {/* <div className="absolute top-5 right-5">

                  <div className="flex items-center gap-2  bg-amber-800/10 backdrop-blur-md border  border-amber-500/20 px-4 py-2 rounded-full  shadow-lg shadow-amber-500/10">

                    <FiBookmark className="text-amber-300 "  />

                    <span className="text-amber-200 font-bold">
                      {lesson.favoritesCount || 0}
                    </span>

                  </div>

                </div> */}

              </div>

              {/* content */}
              <div className="p-7 flex flex-col flex-grow">

                {/* title */}
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent line-clamp-2 min-h-[64px]">
                  {lesson.title}
                </h2>

                {/* description */}
                <p className="text-gray-400 mt-5 leading-8 line-clamp-3 min-h-[96px]">
                  {lesson.description}
                </p>

                 {/* creator */}
                  <div className="flex items-center gap-4 mt-6">
                    <img
                      src={
                        lesson.creatorPhoto ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1">

  <h3
    className="
      font-bold
      bg-gradient-to-r
      from-fuchsia-500
      via-purple-600
      to-indigo-600
      bg-clip-text
      text-transparent
      text-lg
    "
  >
    {lesson.creatorName}
  </h3>

  <div className="flex items-center justify-between mt-1 w-full">

    <p className="text-sm text-gray-500">
      Life Lesson Creator
    </p>

    <p className="text-sm text-gray-400">
      {new Date(
        lesson.createdAt
      ).toLocaleDateString()}
    </p>

  </div>

</div>
                  </div>

                  {/* actions */}
                    <div
                  className="
    flex
    items-center
    justify-between
    mt-8
    pt-6
    border-t
    border-white/10
  "
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-5">
                    {/* likes */}
                    <div
                      className=" flex items-center gap-2 text-rose-400  text-sm font-medium"
                    >
                      <Heart size={16} className="fill-rose-400" />

                      {lesson.likesCount || 0}
                    </div>

                    {/* saves */}
                    <div
                      className="flex items-center gap-2 text-amber-300 fill-amber-300 text-sm font-medium "
                    >
                      <Bookmark size={16} className="fill-amber-400" />

                      {lesson.favoritesCount || 0}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <span
                    className={`
      px-4
      py-2
      rounded-full
      text-xs
      font-semibold
      border

      ${
        lesson.accessLevel === "Premium"
          ? "bg-amber-500/10 text-amber-200 border-amber-500/20"
          : "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
      }
    `}
                  >
                    {lesson.accessLevel === "Premium" ? "Premium ⭐" : "Free"}
                  </span>
                </div>


                {/* bottom */}
                <div className="mt-auto pt-8">

                  <Link
                    to={`/lesson-details/${lesson._id}`}
                    className=" group/btn btn border-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white w-full rounded-full text-base "
                  >

                    View Details
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition duration-300" />

                  </Link>

                </div>

              </div>

            </div>
          );
})}

        </div>

  )
}

      </div>
    </section>
  );
};



export default MostSavedLessons;