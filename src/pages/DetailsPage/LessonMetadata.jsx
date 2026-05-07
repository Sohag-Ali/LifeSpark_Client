

const LessonMetadata = ({ lesson }) => {
       // reading time calculate
   const words = lesson.description?.split(" ").length || 0;

   const readingTime =
   Math.ceil(words / 200);

   return (

      <section className="mt-10">

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* created date */}
            <div className="bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">

               <h3 className="text-gray-500 font-semibold">

                  Created Date

               </h3>

               <p className="text-2xl font-bold mt-3">

                  {
                     new Date(
                        lesson.createdAt
                     ).toLocaleDateString()
                  }

               </p>

            </div>

            {/* updated date */}
            <div className="bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">

               <h3 className="text-gray-500 font-semibold">

                  Last Updated

               </h3>

               <p className="text-2xl font-bold mt-3">

                  {
                     lesson.updatedAt
                     ?
                     new Date(
                        lesson.updatedAt
                     ).toLocaleDateString()
                     :
                     "Not Updated"
                  }

               </p>

            </div>

            {/* visibility */}
            <div className="bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">

               <h3 className="text-gray-500 font-semibold">

                  Visibility

               </h3>

               <p className="text-2xl font-bold mt-3">

                  {lesson.privacy}

               </p>

            </div>

            {/* reading time */}
            <div className="bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">

               <h3 className="text-gray-500 font-semibold">

                  Reading Time

               </h3>

               <p className="text-2xl font-bold mt-3">

                  {readingTime} min

               </p>

            </div>

         </div>

      </section>
   );
};


export default LessonMetadata;