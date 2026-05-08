

const LessonMetadata = ({ lesson }) => {
       // reading time calculate
   const words = lesson.description?.split(" ").length || 0;

   const readingTime =
   Math.ceil(words / 200);

  return (

  <section className="">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      {/* created date */}
      <div
        className="
          p-5
          md:p-6
        "
      >

        <h3 className="text-gray-400 font-medium text-sm md:text-base">

          Created Date

        </h3>

        <p
          className="
            text-xl
            md:text-2xl
            font-bold
            text-white
            mt-3
            break-words
          "
        >

          {
            new Date(
              lesson.createdAt
            ).toLocaleDateString()
          }

        </p>

      </div>

      {/* updated date */}
      <div
        className="
          
          
          p-5
          md:p-6
        "
      >

        <h3 className="text-gray-400 font-medium text-sm md:text-base">

          Last Updated

        </h3>

        <p
          className="
            text-xl
            md:text-2xl
            font-bold
            text-white
            mt-3
            break-words
          "
        >

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
      <div
        className="
           p-5
          md:p-6
          
        "
      >

        <h3 className="text-gray-400 font-medium text-sm md:text-base">

          Visibility

        </h3>

        <p
          className="
            text-xl
            md:text-2xl
            font-bold
            text-white
            mt-3
          "
        >

          {lesson.privacy}

        </p>

      </div>

      {/* reading time */}
      <div
        className="
          
        
          p-5
          md:p-6
        "
      >

        <h3 className="text-gray-400 font-medium text-sm md:text-base">

          Reading Time

        </h3>

        <p
          className="
            text-xl
            md:text-2xl
            font-bold
            text-white
            mt-3
          "
        >

          {readingTime} min

        </p>

      </div>

    </div>

  </section>
);
};


export default LessonMetadata;