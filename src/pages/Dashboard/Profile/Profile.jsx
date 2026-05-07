import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { Link } from "react-router";


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

   return (

      <div className="p-6">

         {/* profile card */}
         <div className="bg-base-100 shadow-xl rounded-2xl p-8">

            <div className="flex flex-col md:flex-row gap-8 items-center">

               {/* image */}
               <img
                  src={user?.photoURL}
                  alt=""
                  className="w-40 h-40 rounded-full object-cover border-4 border-primary"
               />

               {/* info */}
               <div className="space-y-3">

                  <h1 className="text-4xl font-bold">
                     {user?.displayName}
                  </h1>

                  <p className="text-gray-500">
                     {user?.email}
                  </p>

                  {/* premium badge */}
                  {
                     userData?.isPremium && (

                        <div className="badge badge-warning p-4 text-black font-semibold">
                           Premium ⭐
                        </div>
                     )
                  }

                  {/* stats */}
                  <div className="flex gap-4 mt-4">

                     <div className="bg-base-200 p-4 rounded-xl">

                        <h2 className="text-2xl font-bold">
                           {lessons.length}
                        </h2>

                        <p>Total Lessons</p>

                     </div>

                     <div className="bg-base-200 p-4 rounded-xl">

                        <h2 className="text-2xl font-bold">
                           {userData?.savedLessons || 0}
                        </h2>

                        <p>Saved Lessons</p>

                     </div>

                  </div>

               </div>

            </div>

         </div>

         {/* public lessons */}
         <div className="mt-12">

            <h2 className="text-3xl font-bold mb-6">
               My Public Lessons 📚
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

               {
                  publicLessons.map(lesson => (

                     <div
                      key={lesson._id}
                      className="card bg-base-100 shadow-xl"
                     >

                        <figure>

                           <img
                              src={lesson.image}
                              alt=""
                              className="h-52 w-full object-cover"
                           />

                        </figure>

                        <div className="card-body">

                           <h2 className="card-title">
                              {lesson.title}
                           </h2>

                           <p className="text-sm text-gray-500">
                              {lesson.category}
                           </p>

                           <p>
                              {
                                 lesson.description.slice(0, 100)
                              }
                              ...
                           </p>

                           <div className="card-actions justify-end">

                              <Link
                               to={`/lesson-details/${lesson._id}`}
                              className="btn btn-primary btn-sm">
                                 Details
                              </Link>

                           </div>

                        </div>

                     </div>
                  ))
               }

            </div>

         </div>

      </div>
   );
};

export default Profile;