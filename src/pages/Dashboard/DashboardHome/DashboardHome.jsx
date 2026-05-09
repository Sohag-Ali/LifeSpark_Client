import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {  ArrowUpRight, Bookmark, BookOpen, PlusCircle, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const DashboardHome = () => {
   const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

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

   // fake chart data
   const chartData = [

      {
         month: "Jan",
         lessons: 2
      },

      {
         month: "Feb",
         lessons: 5
      },

      {
         month: "Mar",
         lessons: 3
      },

      {
         month: "Apr",
         lessons: 7
      },

      {
         month: "May",
         lessons: 4
      }
   ];

   return (

    <div className="px-4 md:px-8 py-10">

      {/* heading */}
      <div className="mb-12">

        <div className="flex items-center gap-4">

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-primary/10
              border
              border-primary/20
              flex
              items-center
              justify-center
            "
          >

            <Sparkles className="text-primary" size={30} />

          </div>

          <div>

            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>

            <p className="text-gray-400 text-lg mt-3">
              Welcome back, <span className="font-semibold bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent "> {user?.displayName}</span>
            </p>

          </div>

        </div>

      </div>

      {/* stats cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {/* total lessons */}
        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#111827]
            to-[#0F172A]
            border
            border-white/10
            rounded-[30px]
            shadow-2xl
            p-8
            hover:-translate-y-1
            hover:border-primary/30
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="text-gray-400">
                Total Lessons
              </p>

              <h2 className="text-5xl font-black text-green-400 mt-5">
                {stats.totalLessons || 0}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-indigo-500/10
                border
                border-indigo-500/20
                flex
                items-center
                justify-center
              "
            >

              <BookOpen
                className="text-indigo-300"
                size={40}
              />

            </div>

          </div>

        </div>

        {/* favorites */}
        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#111827]
            to-[#0F172A]
            border
            border-white/10
            rounded-[30px]
            shadow-2xl
            p-8
            hover:-translate-y-1
            hover:border-primary/30
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="text-gray-400">
                Saved Lessons
              </p>

              <h2 className="text-5xl font-black text-amber-400 mt-5">
                {stats.totalFavorites || 0}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-amber-500/10
                border
                border-amber-500/20
                flex
                items-center
                justify-center
              "
            >

              <Bookmark
                className="text-amber-300"
                size={40}
              />

            </div>

          </div>

        </div>

        {/* quick actions */}
        <div
          className="
            bg-gradient-to-br
            from-[#111827]
            to-[#0F172A]
            border
            border-white/10
            rounded-[30px]
            shadow-2xl
            p-8
          "
        >

          <h2 className="text-2xl font-black bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent  mb-8">
            Quick Actions
          </h2>

          <div className="space-y-5">

            {/* add lesson */}
            <Link
              to="/dashboard/add-lesson"
              className="
                flex
                items-center
                justify-between
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-[#6366F1]
                to-[#A855F7]
                px-5
                py-4
                text-gray-200
                font-semibold
                hover:shadow-xl
                hover:shadow-purple-500/20
                transition-all
                duration-300
              "
            >

              <div className="flex items-center gap-3">

                <PlusCircle size={22} />

                Add Lesson

              </div>

              <ArrowUpRight size={20} />

            </Link>

            {/* my lessons */}
            <Link
              to="/dashboard/my-lessons"
              className="
                flex
                items-center
                justify-between
                w-full
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/10
                px-5
                py-4
                text-[#9aaadd]
                font-semibold
                hover:border-primary/30
                hover:bg-primary/5
                transition-all
                duration-300
              "
            >

              <div className="flex items-center gap-3">

                <BookOpen size={22} />

                My Lessons

              </div>

              <ArrowUpRight size={20} />

            </Link>

          </div>

        </div>

      </div>

      {/* recent lessons */}
      <div
        className="
          bg-gradient-to-br
          from-[#111827]
          to-[#0F172A]
          border
          border-white/10
          rounded-[32px]
          shadow-2xl
          p-8
          mt-12
        "
      >

        <h2 className="text-3xl font-black bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent  mb-10">
          Recently Added Lessons
        </h2>

        <div className="space-y-5">

          {
            stats.recentLessons?.map((lesson) => (

              <div
                key={lesson._id}
                className="
                  flex
                  items-center
                  justify-between
                  bg-white/[0.03]
                  border
                  border-white/5
                  rounded-2xl
                  p-5
                  hover:border-primary/20
                  transition-all
                  duration-300
                "
              >

                <div className="flex items-center gap-5">
                  <div>
                    <img
                            src={lesson.image}
                            className="
                              w-20
                              h-20
                              rounded-2xl
                              object-cover
                              border
                              border-white/10
                            "
                          />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-200">
                    {lesson.title}
                  </h3>

                  <p className="text-cyan-400 mt-2">
                    {lesson.category}
                  </p>
                  </div>
                 

                </div>

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
                  View
                </Link>

              </div>
            ))
          }

        </div>

      </div>

      {/* analytics */}
      <div
        className="
          bg-gradient-to-br
          from-[#111827]
          to-[#0F172A]
          border
          border-white/10
          rounded-[32px]
          shadow-2xl
          p-8
          mt-12
        "
      >

        <div className="mb-10">

          <h2 className="text-3xl font-black bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
            Monthly Contributions
          </h2>

          <p className="text-gray-400 mt-3">
            Your lesson activity overview
          </p>

        </div>

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={chartData}>

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Bar
                dataKey="lessons"
                radius={[12, 12, 0, 0]}
                fill="#7C3AED"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};


export default DashboardHome;