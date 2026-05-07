import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Activity, BookOpen, Flag, Users } from "lucide-react";
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

      <div className="p-6 md:p-10">

         {/* heading */}
         <div className="mb-10">

            <h1 className="text-5xl font-black">

               Admin Dashboard 👑

            </h1>

            <p className="text-gray-500 mt-3">

               Monitor platform activities and analytics

            </p>

         </div>

         {/* stats cards */}
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* users */}
            <div className="bg-base-100 shadow-xl rounded-[30px] p-8">

               <div className="flex justify-between items-center">

                  <div>

                     <p className="text-gray-500">

                        Total Users

                     </p>

                     <h2 className="text-5xl font-black mt-4">

                        {stats.totalUsers || 0}

                     </h2>

                  </div>

                  <Users
                     size={50}
                     className="text-primary"
                  />

               </div>

            </div>

            {/* lessons */}
            <div className="bg-base-100 shadow-xl rounded-[30px] p-8">

               <div className="flex justify-between items-center">

                  <div>

                     <p className="text-gray-500">

                        Public Lessons

                     </p>

                     <h2 className="text-5xl font-black mt-4">

                        {stats.totalLessons || 0}

                     </h2>

                  </div>

                  <BookOpen
                     size={50}
                     className="text-success"
                  />

               </div>

            </div>

            {/* reports */}
            <div className="bg-base-100 shadow-xl rounded-[30px] p-8">

               <div className="flex justify-between items-center">

                  <div>

                     <p className="text-gray-500">

                        Reports

                     </p>

                     <h2 className="text-5xl font-black mt-4">

                        {stats.totalReports || 0}

                     </h2>

                  </div>

                  <Flag
                     size={50}
                     className="text-error"
                  />

               </div>

            </div>

            {/* today */}
            <div className="bg-base-100 shadow-xl rounded-[30px] p-8">

               <div className="flex justify-between items-center">

                  <div>

                     <p className="text-gray-500">

                        Today's Lessons

                     </p>

                     <h2 className="text-5xl font-black mt-4">

                        {stats.todaysLessons || 0}

                     </h2>

                  </div>

                  <Activity
                     size={50}
                     className="text-warning"
                  />

               </div>

            </div>

         </div>

         {/* charts */}
         <div className="grid lg:grid-cols-2 gap-10 mt-14">

            {/* lesson growth */}
            <div className="bg-base-100 shadow-xl rounded-[30px] p-8">

               <h2 className="text-3xl font-black mb-8">

                  Lesson Growth 📈

               </h2>

               <div className="h-[350px]">

                  <ResponsiveContainer
                     width="100%"
                     height="100%"
                  >

                     <BarChart data={growthData}>

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                           dataKey="lessons"
                           radius={[10,10,0,0]}
                        />

                     </BarChart>

                  </ResponsiveContainer>

               </div>

            </div>

            {/* user growth */}
            <div className="bg-base-100 shadow-xl rounded-[30px] p-8">

               <h2 className="text-3xl font-black mb-8">

                  User Growth 📊

               </h2>

               <div className="h-[350px]">

                  <ResponsiveContainer
                     width="100%"
                     height="100%"
                  >

                     <LineChart data={growthData}>

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                           type="monotone"
                           dataKey="users"
                           strokeWidth={4}
                        />

                     </LineChart>

                  </ResponsiveContainer>

               </div>

            </div>

         </div>

         {/* contributors */}
         <div className="bg-base-100 shadow-xl rounded-[30px] p-8 mt-14">

            <h2 className="text-3xl font-black mb-8">

               Most Active Contributors 🔥

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">

               {
                  stats.topContributors?.map(user => (

                     <div
                        key={user._id}
                        className="text-center"
                     >

                        <img
                           src={
                              user.creatorPhoto
                              ||
                              "https://i.ibb.co/4pDNDk1/avatar.png"
                           }
                           className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary"
                        />

                        <h2 className="text-xl font-black mt-5">

                           {user.creatorName}

                        </h2>

                        <p className="text-gray-500 mt-2">

                           {user.totalLessons}
                           {" "}
                           Lessons

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