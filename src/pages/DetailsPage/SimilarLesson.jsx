import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";



const SimilarLesson = ({ lesson }) => {
    const axiosSecure = useAxiosSecure();

   const { data: lessons = [] } = useQuery({

      queryKey: [
         'similar-lessons',
         lesson._id
      ],

      enabled: !!lesson._id,

      queryFn: async() => {

         const res =
         await axiosSecure.get(

            `/similar-lessons/${lesson._id}`
         );

         return res.data;
      }
   });

   return (

      <section className="mt-20">

         {/* section heading */}
         <div className="text-center mb-12">

            <h2 className="text-4xl md:text-5xl font-black">

               Similar & Recommended Lessons

            </h2>

            <p className="text-gray-500 mt-4 text-lg">

               Explore more life lessons related to this topic

            </p>

         </div>

         {/* no lessons */}
         {
            lessons.length === 0
            ?
            (
               <div className="bg-base-100 rounded-[30px] shadow-2xl p-14 text-center max-w-3xl mx-auto">

                  <div className="text-7xl mb-6">

                     📚

                  </div>

                  <h2 className="text-3xl font-black">

                     No Similar Lessons Found

                  </h2>

                  <p className="text-gray-500 mt-5 text-lg leading-8">

                     There are currently no related lessons
                     based on this category or emotional tone.

                  </p>

               </div>
            )
            :
            (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                  {
                     lessons.map(item => (

                        <div
                           key={item._id}
                           className="group bg-base-100 rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl duration-300 border border-base-300"
                        >

                           {/* image */}
                           <div className="overflow-hidden relative">

                              <img
                                 src={item.image}
                                 alt=""
                                 className="w-full h-64 object-cover group-hover:scale-110 duration-500"
                              />

                              {/* overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                              {/* badges */}
                              <div className="absolute top-5 left-5 flex flex-wrap gap-2">

                                 <div className="badge badge-primary badge-lg text-white">

                                    {item.category}

                                 </div>

                                 <div className="badge badge-secondary badge-lg text-white">

                                    {item.emotionalTone}

                                 </div>

                              </div>

                           </div>

                           {/* content */}
                           <div className="p-7">

                              {/* title */}
                              <h2 className="text-2xl font-black line-clamp-2 leading-snug">

                                 {item.title}

                              </h2>

                              {/* description */}
                              <p className="mt-4 text-gray-500 leading-8 line-clamp-3">

                                 {item.description}

                              </p>

                              {/* author */}
                              <div className="flex items-center gap-4 mt-8">

                                 <img
                                    src={
                                       item.creatorPhoto
                                       ||
                                       "https://i.ibb.co/4pDNDk1/avatar.png"
                                    }
                                    alt=""
                                    className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                                 />

                                 <div>

                                    <h3 className="font-bold text-lg">

                                       {item.creatorName}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                       Life Lesson Creator

                                    </p>

                                 </div>

                              </div>

                              {/* stats */}
                              <div className="flex items-center justify-between mt-8">

                                 <div className="flex items-center gap-4 text-sm text-gray-500">

                                    <span>
                                       ❤️ {item.likesCount || 0}
                                    </span>

                                    <span>
                                       🔖 {item.favoritesCount || 0}
                                    </span>

                                 </div>

                                 <div>

                                    <span
                                       className={`badge badge-lg ${
                                          item.accessLevel === "Premium"
                                          ?
                                          "badge-warning"
                                          :
                                          "badge-success"
                                       }`}
                                    >

                                       {
                                          item.accessLevel === "Premium"
                                          ?
                                          "Premium ⭐"
                                          :
                                          "Free"
                                       }

                                    </span>

                                 </div>

                              </div>

                              {/* button */}
                              <div className="mt-8">

                                 <Link
                                    to={`/lesson-details/${item._id}`}
                                    className="btn btn-primary w-full rounded-full btn-lg"
                                 >
                                    See Details
                                 </Link>

                              </div>

                           </div>

                        </div>
                     ))
                  }

               </div>
            )
         }

      </section>
   );
};



export default SimilarLesson;