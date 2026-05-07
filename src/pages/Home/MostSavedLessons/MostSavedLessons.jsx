import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MostSavedLessons = () => {
   const axiosSecure = useAxiosSecure();

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

      <section className="py-16 bg-base-200">

         <div className="max-w-7xl mx-auto px-4">

            {/* heading */}
            <div className="text-center mb-12">

               <h2 className="text-4xl font-black">

                  Most Saved Lessons

               </h2>

               <p className="text-gray-500 mt-3">

                  Discover the lessons loved by our community

               </p>

            </div>

            {/* cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

               {
                  lessons.map(lesson => (

                     <div
                        key={lesson._id}
                        className="bg-base-100 rounded-[30px] overflow-hidden shadow-xl"
                     >

                        <img
                           src={lesson.image}
                           className="w-full h-60 object-cover"
                        />

                        <div className="p-6">

                           <div className="badge badge-primary">

                              {lesson.category}

                           </div>

                           <h2 className="text-2xl font-black mt-4 line-clamp-2">

                              {lesson.title}

                           </h2>

                           <p className="text-gray-500 mt-4 line-clamp-3">

                              {lesson.description}

                           </p>

                           <div className="flex justify-between items-center mt-8">

                              <div>

                                 <p className="font-bold text-warning">

                                    🔖 {lesson.favoritesCount || 0}
                                 </p>

                              </div>

                              <Link
                                 to={`/lesson-details/${lesson._id}`}
                                 className="btn btn-primary rounded-full"
                              >
                                 Details
                              </Link>

                           </div>

                        </div>

                     </div>
                  ))
               }

            </div>

         </div>

      </section>
   );
};


export default MostSavedLessons;