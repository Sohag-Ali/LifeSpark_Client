import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TopContributors = () => {
    const axiosSecure = useAxiosSecure();

   const { data: contributors = [] } = useQuery({

      queryKey: ['top-contributors'],

      queryFn: async() => {

         const res =
         await axiosSecure.get(
            '/top-contributors'
         );

         return res.data;
      }
   });

   return (

      <section className="py-16">

         <div className="max-w-7xl mx-auto px-4">

            {/* title */}
            <div className="text-center mb-12">

               <h2 className="text-4xl font-black">

                  Top Contributors of the Week

               </h2>

               <p className="text-gray-500 mt-3">

                  Meet the creators inspiring the community

               </p>

            </div>

            {/* cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

               {
                  contributors.map(user => (

                     <div
                        key={user._id}
                        className="bg-base-100 rounded-[30px] shadow-xl p-8 text-center"
                     >

                        <img
                           src={
                              user.creatorPhoto
                              ||
                              "https://i.ibb.co/4pDNDk1/avatar.png"
                           }
                           className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-primary"
                        />

                        <h2 className="text-2xl font-black mt-6">

                           {user.creatorName}

                        </h2>

                        <p className="text-gray-500 mt-2">

                           Top Lesson Creator
                        </p>

                        <div className="mt-6">

                           <h3 className="text-5xl font-black text-primary">

                              {user.totalLessons}

                           </h3>

                           <p className="text-gray-500 mt-2">

                              Lessons Shared
                           </p>

                        </div>

                     </div>
                  ))
               }

            </div>

         </div>

      </section>
   );
};

export default TopContributors;