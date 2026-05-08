import { FiBookmark, FiShare2 } from "react-icons/fi";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [] } = useQuery({
    queryKey: ["featured-lessons"],

    queryFn: async () => {
      const res = await axiosSecure.get("/featured-lessons");

      return res.data;
    },
  });

  return (
    <section className="py-12  md:py-16 lg:py-20">
      <div className=" px-2">
        {/* title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black">
            Featured Life Lessons
          </h2>

          <p className="text-gray-500 mt-4">
            Learn from real experiences shared by our community
          </p>
        </div>

        {/* no lessons */}
        {lessons.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-[30px] shadow-xl">
            <h2 className="text-3xl font-black">No Featured Lessons Yet</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-[#111827]
    rounded-[30px]
    border border-white/10
    shadow-lg
    hover:shadow-purple-500/20
    hover:-translate-y-2
    transition-all
    duration-300
    overflow-hidden
    group
    flex
    flex-col
    h-full"
              >
                {/* image */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={lesson.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* badge */}
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary badge-lg text-white">
                      {lesson.category}
                    </span>
                  </div>
                </div>

                {/* content */}
                <div className="p-6">
                  {/* title */}
                  <h3 className="text-2xl font-bold text-white line-clamp-2 min-h-[64px]">
                    {lesson.title}
                  </h3>

                  {/* description */}
                  <p className="text-gray-400 leading-7 mt-4 line-clamp-3 min-h-[84px]">
                    {lesson.description}
                  </p>

                  {/* creator */}
                  <div className="flex items-center gap-4 mt-6">
                    <img
                      src={
                        lesson.creatorPhoto ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h4 className="font-semibold text-white">{lesson.creatorName}</h4>

                      <p className="text-sm text-gray-400">Lesson Creator</p>
                    </div>
                  </div>

                  {/* actions */}
                  <div className="flex justify-between items-center  mt-8">
                    <button className="flex items-center gap-2 text-primary font-semibold">
                      <FiBookmark />
                      Save
                    </button>

                    <button className="flex items-center gap-2 text-gray-500">
                      <FiShare2 />
                      Share
                    </button>
                  </div>

                  {/* button */}
                  <div className="mt-8">
                    <Link
                      to={`/lesson-details/${lesson._id}`}
                      className="btn
    border-0
    bg-gradient-to-r
    from-indigo-500
    to-purple-600
    hover:from-purple-600
    hover:to-indigo-500
    text-white
    w-full
    rounded-full
    mt-6"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* all lessons */}
        <div className="text-center mt-14">
          <Link
            to="/public-lessons"
            className="btn btn-primary btn-lg rounded-full"
          >
            View All Lessons
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
