import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { Link } from "react-router";
import { Bookmark, BookOpen, Crown, Sparkles } from "lucide-react";


const Profile = () => {
    const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

   const [userData] = useUser();

   // all lessons count
   const { data: lessons = [] } = useQuery({

      queryKey: ['my-lessons', user?.email],

      enabled: !!user?.email,

      queryFn: async() => {

         const res = await axiosSecure.get(
            `/lessons?email=${user.email}`
         );

         return res.data;
      }
   });

   // public lessons
   const { data: publicLessons = [] } = useQuery({

      queryKey: ['public-lessons', user?.email],

      enabled: !!user?.email,

      queryFn: async() => {

         const res = await axiosSecure.get(
            `/public-lessons/${user.email}`
         );

         return res.data;
      }
   });

     // fetch stats
   const { data: stats = {} } = useQuery({

      queryKey: [
         'dashboard-stats',
         user?.email
      ],

      enabled: !!user?.email,

      queryFn: async() => {

         const res =
         await axiosSecure.get(

            `/dashboard-stats/${user.email}`
         );

         return res.data;
      }
   });

   return (
    <div className="px-4 md:px-8 py-10">

      {/* profile card */}
      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#111827]
          to-[#0F172A]
          border
          border-white/10
          rounded-[32px]
          shadow-2xl
          p-8 md:p-10
        "
      >

        {/* glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:items-center">

          {/* image */}
          <div className="relative w-fit mx-auto lg:mx-0">

            <div className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-30"></div>

            <img
              src={user?.photoURL}
              alt=""
              className="
                relative
                w-40
                h-40
                rounded-full
                object-cover
                border-4
                border-primary/40
                shadow-2xl
              "
            />

          </div>

          {/* info */}
          <div className="flex-1">

            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {user?.displayName}
            </h1>

            <p className="text-gray-400 text-lg mt-4">
              {user?.email}
            </p>

            {/* premium badge */}
            {
              userData?.isPremium && (

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-5
                    px-5
                    py-3
                    rounded-2xl
                    bg-amber-500/10
                    text-amber-200
                    border
                    border-amber-500/20
                    font-semibold
                  "
                >

                  <Crown size={18} />

                  Premium Member

                </div>
              )
            }

            {/* stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">

              {/* total lessons */}
              <div
                className="
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  hover:border-primary/30
                  transition-all
                  duration-300
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-4xl font-black text-blue-300">
                      {lessons.length}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Total Lessons
                    </p>

                  </div>

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-indigo-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <BookOpen className="text-indigo-300" />

                  </div>

                </div>

              </div>

              {/* saved lessons */}
              <div
                className="
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  hover:border-primary/30
                  transition-all
                  duration-300
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-4xl font-black text-amber-300">
                      {stats.totalFavorites || 0}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Saved Lessons
                    </p>

                  </div>

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-pink-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Bookmark className="text-amber-300" />

                  </div>

                </div>

              </div>

              {/* public lessons */}
              <div
                className="
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  hover:border-primary/30
                  transition-all
                  duration-300
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-4xl font-black text-white">
                      {publicLessons.length}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Public Lessons
                    </p>

                  </div>

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-emerald-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Sparkles className="text-emerald-300" />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* public lessons */}
      <div className="mt-16">

        {/* heading */}
        <div className="mb-10">

          <h2 className="text-4xl  text-white">
             <span className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent font-bold">My Public Lessons</span> 📚
          </h2>

          <p className="text-gray-400 mt-3 text-lg">
            Lessons you shared with the community
          </p>

        </div>

        {/* no lessons */}
        {
          publicLessons.length === 0
          ?
          (
            <div
              className="
                bg-gradient-to-br
                from-[#111827]
                to-[#0F172A]
                border
                border-white/10
                rounded-[32px]
                shadow-2xl
                p-16
                text-center
              "
            >

              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-primary/10
                  border
                  border-primary/20
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-8
                "
              >

                <BookOpen
                  size={40}
                  className="text-primary"
                />

              </div>

              <h2 className="text-4xl font-black text-white">
                No Public Lessons Yet
              </h2>

              <p className="text-gray-400 mt-4 text-lg">
                Start sharing your life experiences with others.
              </p>

            </div>
          )
          :
          (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {
                publicLessons.map((lesson) => (

                  <div
                    key={lesson._id}
                    className="
                      group
                      relative
                      overflow-hidden
                      bg-gradient-to-br
                      from-[#111827]
                      to-[#0F172A]
                      border
                      border-white/10
                      rounded-[30px]
                      shadow-2xl
                      hover:-translate-y-2
                      hover:border-primary/30
                      transition-all
                      duration-300
                    "
                  >

                    {/* image */}
                    <div className="relative overflow-hidden">

                      <img
                        src={lesson.image}
                        alt=""
                        className="
                          h-56
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      {/* overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>

                      {/* category */}
                      <div className="absolute top-5 left-5">

                        <span
                          className="
                            px-4
                            py-2
                            rounded-full
                            bg-primary/20
                            text-primary
                            border
                            border-primary/20
                            text-xs
                            font-semibold
                            backdrop-blur-xl
                          "
                        >
                          {lesson.category}
                        </span>

                      </div>
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

                    {/* content */}
                    <div className="p-7">

                      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent  line-clamp-2">
                        {lesson.title}
                      </h2>

                      <p className="text-gray-400 mt-4 leading-7 line-clamp-3">
                        {lesson.description}
                      </p>

                      {/* bottom */}
                      <div className="mt-8 flex items-center justify-between">

                        {/* emotional tone */}
                        <span
                          className="
                            px-4
                            py-2
                            rounded-full
                            bg-pink-500/10
                            text-pink-200
                            border
                            border-pink-500/20
                            text-xs
                            font-semibold
                          "
                        >
                          {lesson.emotionalTone}
                        </span>

                        {/* details */}
                        <Link
                          to={`/lesson-details/${lesson._id}`}
                          className="
                            px-5
                            py-3
                            rounded-2xl
                            bg-gradient-to-r
                            from-[#6366F1]
                            to-[#A855F7]
                            text-white
                            text-sm
                            font-semibold
                            hover:shadow-xl
                            hover:shadow-purple-500/20
                            transition-all
                            duration-300
                          "
                        >
                          Details
                        </Link>

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  );
};

export default Profile;