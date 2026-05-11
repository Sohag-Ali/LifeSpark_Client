import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Bookmark, Heart, Lock } from "lucide-react";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("");
  const [emotionalTone, setEmotionalTone] = useState("");
  const [search, setSearch] = useState("");
  const [userData] = useUser();

  const { data: lessons = [] } = useQuery({
    queryKey: ["public-lessons", category, emotionalTone, search],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/public-lessons?category=${category}&emotionalTone=${emotionalTone}&search=${search}`,
      );

      return res.data;
    },
  });

  return (
    useTitle("Public Lessons"),
    <div className="min-h-screen bg-[#0F172A] py-16 relative overflow-hidden">
      {/* background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className=" ">
        {/* heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary uppercase tracking-widest font-semibold">
            Explore Lessons
          </span>

          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-4">
            Public Life Lessons 
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Explore powerful real-life experiences shared by people from around
            the world.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center my-14">
            {/* search */}
            <input
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" input input-bordered bg-[#111827] border-white/10 text-white w-full md:w-72"
            />

            {/* category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" select select-bordered bg-[#111827] border-white/10 text-gray-300 w-full md:w-60"
            >
              <option value="">All Categories</option>

              <option value="Career">Career</option>
              <option value="Personal Growth">Personal Growth</option>

              <option value="Education">Education</option>

              <option value="Relationship">Relationship</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>

              <option value="Health">Health</option>
            </select>

            {/* emotional tone */}
            <select
              value={emotionalTone}
              onChange={(e) => setEmotionalTone(e.target.value)}
              className=" select select-bordered bg-[#111827] border-white/10 text-gray-300 w-full md:w-60"
            >
              <option value="">All Emotions</option>

              <option value="Inspirational">Inspirational</option>

              <option value="Motivational">Motivational</option>

              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
              <option value="Happy">Happy</option>
            </select>
          </div>

          
        </div>

        <h2 className=" text-1xl md:text-3xl font-semibold  bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent mb-10">Public Lessons<span className=" text-primary ml-3">

    ({lessons.length})

  </span>

</h2>

         {/* cards */}
        {
          lessons.length === 0
          ?
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
                😔
              </div>

              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent">
                No Lessons Found
              </h2>

              <p className="text-gray-400 mt-4 max-w-md leading-8">
                We couldn’t find any lessons matching your search or filters.
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
                    <div className="relative h-60 overflow-hidden">

                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className=" w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />

                      {/* overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      {/* lesson length */}
                    <div className=" absolute top-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-semibold shadow-lg">

                {
                     Math.ceil(
                         lesson.description?.split(" ").length / 200
                                 )
                      }
                                  {" "}min read

                          </div>
                    </div>

                    {/* body */}
                    <div className="p-7 flex flex-col flex-grow">

                      {/* title */}
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent line-clamp-2 min-h-[64px]">
                        {lesson.title}
                      </h2>

                      {/* description */}
                      <p className="text-gray-400 leading-8 mt-5 line-clamp-3 min-h-[96px]">
                        {lesson.description}
                      </p>

                      {/* badges */}
                      <div className="flex gap-3 flex-wrap mt-6">

                        <div className="badge badge-primary badge-lg px-4 py-3 text-white">
                          {lesson.category}
                        </div>

                        <div className="badge badge-secondary badge-lg px-4 py-3 text-white">
                          {lesson.emotionalTone}
                        </div>

                      </div>

                      {/* creator */}
                      <div className="flex items-center gap-4 mt-8">

                        <img
                          src={lesson.creatorPhoto}
                          alt={lesson.creatorName}
                          className=" w-12 h-12 rounded-full object-cover border border-primary/40"
                        />

                        <div>

                          <h3 className="font-semibold bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            {lesson.creatorName}
                          </h3>

                          <p className="text-sm text-gray-400">
                            {new Date(
                              lesson.createdAt
                            ).toLocaleDateString()}
                          </p>

                        </div>

                      </div>

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

                      {/* button */}
                      <div className="mt-auto pt-8">

                        <Link
                          to={`/lesson-details/${lesson._id}`}
                          className=" group/btn btn border-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white w-full rounded-full"
                        >

                          See Details

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
      
    </div>
  );
};

export default PublicLessons;
