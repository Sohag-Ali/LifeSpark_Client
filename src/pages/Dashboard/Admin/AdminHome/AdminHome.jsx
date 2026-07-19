import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Activity, BookOpen, Flag, Sparkles, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useTitle from "../../../../hooks/useTitle";


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
    useTitle("Admin Dashboard"),

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

            <h1 className="text-4xl md:text-5xl font-black ">
              <span className="text-gradient-brand">Admin Dashboard</span> 👑
            </h1>

            <p className="text-muted-foreground text-lg mt-3">
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
            bg-card
            border
            border-border
            rounded-[30px]
            shadow-2xl
            p-8
            hover:border-primary/30
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-info/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="text-gradient-brand ">
                Total Users
              </p>

              <h2 className="text-5xl font-black text-info mt-5">
                {stats.totalUsers || 0}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-info/10
                border
                border-info/20
                flex
                items-center
                justify-center
              "
            >

              <Users
                size={40}
                className="text-info"
              />

            </div>

          </div>

        </div>

        {/* lessons */}
        <div
          className="
            relative
            overflow-hidden
            bg-card
            border
            border-border
            rounded-[30px]
            shadow-2xl
            p-8
            hover:border-primary/30
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-success/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="text-gradient-brand ">
                Public Lessons
              </p>

              <h2 className="text-5xl font-black text-success mt-5">
                {stats.totalLessons || 0}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-success/10
                border
                border-success/20
                flex
                items-center
                justify-center
              "
            >

              <BookOpen
                size={40}
                className="text-success"
              />

            </div>

          </div>

        </div>

        {/* reports */}
        <div
          className="
            relative
            overflow-hidden
            bg-card
            border
            border-border
            rounded-[30px]
            shadow-2xl
            p-8
            hover:border-primary/30
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-error/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="text-gradient-brand ">
                Reports
              </p>

              <h2 className="text-5xl font-black text-error mt-5">
                {stats.totalReports || 0}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-error/10
                border
                border-error/20
                flex
                items-center
                justify-center
              "
            >

              <Flag
                size={40}
                className="text-error"
              />

            </div>

          </div>

        </div>

        {/* today */}
        <div
          className="
            relative
            overflow-hidden
            bg-card
            border
            border-border
            rounded-[30px]
            shadow-2xl
            p-8
            hover:border-primary/30
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="absolute top-0 right-0 w-40 h-40 bg-warning/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="text-gradient-brand ">
                Today's Lessons
              </p>

              <h2 className="text-5xl font-black text-warning mt-5">
                {stats.todaysLessons || 0}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-warning/10
                border
                border-warning/20
                flex
                items-center
                justify-center
              "
            >

              <Activity
                size={40}
                className="text-warning"
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
            bg-card
            border
            border-border
            rounded-[32px]
            shadow-2xl
            p-8
          "
        >

          <div className="flex items-center gap-3 mb-10">

            <TrendingUp className="text-primary" />

            <h2 className="text-3xl font-black text-gradient-brand ">
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
                  stroke="var(--color-muted-foreground)"
                />

                <YAxis stroke="var(--color-muted-foreground)" />

                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.75rem",
                    color: "var(--color-card-foreground)",
                  }}
                />

                <Bar
                  dataKey="lessons"
                  radius={[12, 12, 0, 0]}
                  fill="var(--color-primary)"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* user growth */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-[32px]
            shadow-2xl
            p-8
          "
        >

          <div className="flex items-center gap-3 mb-10">

            <Users className="text-primary" />

            <h2 className="text-3xl font-black text-gradient-brand ">
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
                  stroke="var(--color-muted-foreground)"
                />

                <YAxis stroke="var(--color-muted-foreground)" />

                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.75rem",
                    color: "var(--color-card-foreground)",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-secondary)"
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
          bg-card
          border
          border-border
          rounded-[32px]
          shadow-2xl
          p-8
          mt-14
        "
      >

        <h2 className="text-3xl font-black text-gradient-brand  mb-10">
          Most Active Contributors 🔥
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

          {
            stats.topContributors?.map((user) => (

              <div
                key={user._id}
                className="
                  bg-muted
                  border
                  border-border
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

                <h2 className="text-xl font-bold text-gradient-brand mt-5">
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