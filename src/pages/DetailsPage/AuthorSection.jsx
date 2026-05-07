import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AuthorSection = ({ lesson }) => {
     const axiosSecure = useAxiosSecure();

   // fetch total lessons
   const { data: countData = {} } = useQuery({

      queryKey: [
         'creator-lessons-count',
         lesson.creatorEmail
      ],

      enabled: !!lesson.creatorEmail,

      queryFn: async() => {

         const res = await axiosSecure.get(

            `/creator-lessons-count/${lesson.creatorEmail}`

         );

         return res.data;
      }
   });

   return (

      <section className="mt-12">

         <div className="bg-base-100 rounded-[30px] shadow-2xl overflow-hidden">

            <div className="grid md:grid-cols-3">

               {/* LEFT */}
               <div className="bg-gradient-to-br from-primary to-secondary p-10 flex flex-col justify-center items-center text-white">

                  <img
                     src={lesson.creatorPhoto}
                     alt=""
                     className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-2xl"
                  />

                  <h2 className="text-3xl font-bold mt-6 text-center">

                     {lesson.creatorName}

                  </h2>

                  <p className="mt-2 text-center opacity-90">

                     Life Lesson Creator
                  </p>

               </div>

               {/* RIGHT */}
               <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">

                  <h3 className="text-4xl font-black">

                     About The Author
                  </h3>

                  <p className="text-gray-500 mt-4 leading-8">

                     This creator has shared valuable life experiences,
                     wisdom, and motivational lessons with the community
                     to inspire growth and positive change.

                  </p>

                  {/* stats */}
                  <div className="grid grid-cols-2 gap-5 mt-8">

                     <div className="bg-base-200 rounded-2xl p-6 text-center">

                        <h2 className="text-4xl font-black text-primary">

                           {countData.count || 0}

                        </h2>

                        <p className="text-gray-500 mt-2">

                           Total Lessons
                        </p>

                     </div>

                     <div className="bg-base-200 rounded-2xl p-6 text-center">

                        <h2 className="text-4xl font-black text-secondary">

                           {
                              lesson.accessLevel === "Premium"
                              ?
                              "⭐"
                              :
                              "Free"
                           }

                        </h2>

                        <p className="text-gray-500 mt-2">

                           Creator Status
                        </p>

                     </div>

                  </div>

                  {/* button */}
                  <div className="mt-8">

                     <Link
                        to="/dashboard/profile"
                        className="btn btn-primary btn-lg rounded-full"
                     >
                        View All Lessons
                     </Link>

                  </div>

               </div>

            </div>

         </div>

      </section>
   );
};

export default AuthorSection;