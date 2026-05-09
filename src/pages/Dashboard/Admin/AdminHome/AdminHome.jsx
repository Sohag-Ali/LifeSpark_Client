import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Activity, BookOpen, Flag, Sparkles, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const AdminHome = () => {
   const axiosSecure = useAxiosSecure();

   // fetch admin stats
   const { data: stats = {} } = useQuery({

      queryKey: ['admin-stats'],

      queryFn: async() => {

         const res =
         await axiosSecure.get(
            '/admin-stats'
         );

         return res.data;
      }
   });

   // chart data
   const growthData = [

      {
         month: "Jan",
         users: 20,
         lessons: 10
      },

      {
         month: "Feb",
         users: 40,
         lessons: 25
      },

      {
         month: "Mar",
         users: 65,
         lessons: 45
      },

      {
         month: "Apr",
         users: 90,
         lessons: 70
      },

      {
         month: "May",
         users: 120,
         lessons: 95
      }
   ];

  return (

    <div className="px-4 md:px-8 py-10">

      {/* heading */}
      <div className="mb-14">

        <div className="flex items-center gap-5">

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

            <Sparkles
              size={30}
              className="text-primary"
            />

          </div>

          <div>

            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Dashboard 👑
            </h1>

            <p className="text-gray-400 text-lg mt-3">
              Monitor platform activities and analytics
            </p>

          </div>

        </div>

      </div>

      {/* stats cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

        {/* users */}
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
            hover:border-primary/30
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
                Total Users
              </p>

              <h2 className="text-5xl font-black text-[#218bc0] mt-5">
                {stats.totalUsers || 0}
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

              <Users
                size={40}
                className="text-indigo-300"
              />

            </div>

          </div>

        </div>

        {/* lessons */}
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
            hover:border-primary/30
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
                Public Lessons
              </p>

              <h2 className="text-5xl font-black text-[#20be8a] mt-5">
                {stats.totalLessons || 0}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-emerald-500/10
                border
                border-emerald-500/20
                flex
                items-center
                justify-center
              "
            >

              <BookOpen
                size={40}
                className="text-emerald-300"
              />

            </div>

          </div>

        </div>

        {/* reports */}
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
            hover:border-primary/30
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
                Reports
              </p>

              <h2 className="text-5xl font-black text-[#a42e51d5] mt-5">
                {stats.totalReports || 0}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-rose-500/10
                border
                border-rose-500/20
                flex
                items-center
                justify-center
              "
            >

              <Flag
                size={40}
                className="text-rose-300"
              />

            </div>

          </div>

        </div>

        {/* today */}
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
            hover:border-primary/30
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
                Today's Lessons
              </p>

              <h2 className="text-5xl font-black text-[#a4962e] mt-5">
                {stats.todaysLessons || 0}
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

              <Activity
                size={40}
                className="text-amber-300"
              />

            </div>

          </div>

        </div>

      </div>

      {/* charts */}
      <div className="grid xl:grid-cols-2 gap-10 mt-14">

        {/* lesson growth */}
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
          "
        >

          <div className="flex items-center gap-3 mb-10">

            <TrendingUp className="text-primary" />

            <h2 className="text-3xl font-black bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
              Lesson Growth
            </h2>

          </div>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={growthData}>

                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Bar
                  dataKey="lessons"
                  radius={[12, 12, 0, 0]}
                  fill="#8B5CF6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* user growth */}
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
          "
        >

          <div className="flex items-center gap-3 mb-10">

            <Users className="text-primary" />

            <h2 className="text-3xl font-black bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
              User Growth
            </h2>

          </div>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={growthData}>

                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#A855F7"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* contributors */}
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
          mt-14
        "
      >

        <h2 className="text-3xl font-black bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent  mb-10">
          Most Active Contributors 🔥
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

          {
            stats.topContributors?.map((user) => (

              <div
                key={user._id}
                className="
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-[28px]
                  p-6
                  text-center
                  hover:border-primary/30
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >

                <div className="relative w-fit mx-auto">

                  <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-30"></div>

                  <img
                    src={
                      user.creatorPhoto
                      ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    className="
                      relative
                      w-24
                      h-24
                      rounded-full
                      mx-auto
                      object-cover
                      border-4
                      border-primary/30
                    "
                  />

                </div>

                <h2 className="text-xl font-bold bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-5">
                  {user.creatorName}
                </h2>

                <p className="text-primary mt-3 font-medium">
                  {user.totalLessons} Lessons
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
};


export default AdminHome;