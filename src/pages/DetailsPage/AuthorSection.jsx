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

    <section className="">

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#111827]
          to-[#0F172A]
        "
      >

        {/* glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            lg:grid-cols-3
          "
        >

          {/* LEFT SIDE */}
          <div
            className="
              p-8
              md:p-10
              border-b
              lg:border-b-0
              lg:border-r
              border-white/10
              flex
              flex-col
              justify-center
              items-center
              text-center
            "
          >

            {/* image */}
            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-30"></div>

              <img
                src={lesson.creatorPhoto}
                alt=""
                className="
                  relative
                  w-32
                  h-32
                  md:w-40
                  md:h-40
                  rounded-full
                  object-cover
                  border-4
                  border-primary/30
                  shadow-2xl
                "
              />

            </div>

            {/* creator name */}
            <h2
              className="
                text-3xl
                md:text-4xl
                font-black
                bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent
                mt-8
              "
            >

              {lesson.creatorName}

            </h2>

            {/* role */}
            <p className="text-gray-400 mt-3 text-lg">

              Life Lesson Creator

            </p>

            {/* premium/free badge */}
            <div className="mt-6">

              <span
                className={`
                  px-5
                  py-3
                  rounded-2xl
                  text-sm
                  font-semibold
                  border

                  ${
                    lesson.accessLevel === "Premium"

                    ?

                    "bg-amber-500/10 text-amber-200 border-amber-500/20"

                    :

                    "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                  }
                `}
              >

                {
                  lesson.accessLevel === "Premium"
                  ?
                  "⭐ Premium Creator"
                  :
                  "Free Creator"
                }

              </span>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              lg:col-span-2
              p-8
              md:p-12
              flex
              flex-col
              justify-center
            "
          >

            {/* heading */}
            <div>

              <h3
                className="
                  text-3xl
                  md:text-5xl
                  font-black
                 bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent 
                "
              >

                About The Author

              </h3>

              <p
                className="
                  text-gray-400
                  mt-6
                  leading-9
                  text-lg
                  max-w-3xl
                "
              >

                This creator has shared valuable life experiences,
                wisdom, and motivational lessons with the community
                to inspire growth and positive change.

              </p>

            </div>

            {/* stats */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-5
                mt-10
              "
            >

              {/* total lessons */}
              <div
                className="
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-[28px]
                  p-6
                  text-center
                  backdrop-blur-xl
                "
              >

                <h2
                  className="
                    text-4xl
                    md:text-5xl
                    font-black
                    text-primary
                  "
                >

                  {countData.count || 0}

                </h2>

                <p className="text-gray-400 mt-3">

                  Total Lessons Shared

                </p>

              </div>

              {/* creator status */}
              <div
                className="
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-[28px]
                  p-6
                  text-center
                  backdrop-blur-xl
                "
              >

                <h2
                  className={`
                    text-4xl
                    md:text-5xl
                    font-black

                    ${
                      lesson.accessLevel === "Premium"
                      ?
                      "text-amber-300"
                      :
                      "text-emerald-300"
                    }
                  `}
                >

                  {
                    lesson.accessLevel === "Premium"
                    ?
                    "PRO"
                    :
                    "FREE"
                  }

                </h2>

                <p className="text-gray-400 mt-3">

                  Creator Status

                </p>

              </div>

            </div>

            {/* button */}
            <div className="mt-10">

              <Link
                to="/dashboard/profile"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-500
                  to-indigo-600
                  text-white
                  font-semibold
                  shadow-lg
                  shadow-indigo-500/20
                  hover:from-violet-600
                  hover:to-indigo-700
                  hover:shadow-2xl
                  hover:shadow-violet-500/30
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
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