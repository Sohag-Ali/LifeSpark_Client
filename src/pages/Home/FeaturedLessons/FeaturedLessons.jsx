// import { FiBookmark, FiShare2 } from "react-icons/fi";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import { Bookmark, Heart, Star, Lock } from "lucide-react";
import useUser from "../../../hooks/useUser";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [userData] = useUser();

  const { data: lessons = [] } = useQuery({
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

        {/* no lessons */}
        {lessons.length === 0 ? (
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
            {lessons.map((lesson) => {
              const isPremiumLocked =
                lesson.accessLevel === "Premium" && !userData?.isPremium;
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
                  <div className="h-60 overflow-hidden relative">
                    <img
                      src={lesson.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    {/* badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-sm font-semibold shadow-lg shadow-black/20">
                        {lesson.category}
                      </span>
                    </div>
                    {/* lesson length */}
                    <div className=" absolute top-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-semibold shadow-lg">
                      {Math.ceil(lesson.description?.split(" ").length / 200)}{" "}
                      min read
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-6">
                    {/* title */}
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent line-clamp-2 min-h-[64px]">
                      {lesson.title}
                    </h3>

                    {/* description */}
                    <p className="text-gray-400 leading-7 mt-4 line-clamp-3 min-h-[84px]">
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
                            {new Date(lesson.createdAt).toLocaleDateString()}
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
                        <div className=" flex items-center gap-2 text-rose-400  text-sm font-medium">
                          <Heart size={16} className="fill-rose-400" />

                          {lesson.likesCount || 0}
                        </div>

                        {/* saves */}
                        <div className="flex items-center gap-2 text-amber-300 fill-amber-300 text-sm font-medium ">
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
                        {lesson.accessLevel === "Premium"
                          ? "Premium ⭐"
                          : "Free"}
                      </span>
                    </div>

                    {/* button */}
                    <div className="mt-8">
                      <Link
                        to={`/lesson-details/${lesson._id}`}
                        className="btn
    border-0
    bg-gradient-to-r
    from-indigo-500
    to-purple-600
    hover:from-purple-600
    hover:to-indigo-500
    text-white
    w-full
    rounded-full
    mt-6"
                      >
                        See Details{" "}
                        <FaArrowRight className="group-hover/btn:translate-x-1 transition duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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
