import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { Bookmark, Heart, Sparkles,Lock  } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import useUser from "../../hooks/useUser";

const SimilarLesson = ({ lesson }) => {
  const axiosSecure = useAxiosSecure();
  const [userData] = useUser();
  

  const { data: lessons = [] } = useQuery({
    queryKey: ["similar-lessons", lesson._id],

    enabled: !!lesson._id,

    queryFn: async () => {
      const res = await axiosSecure.get(`/similar-lessons/${lesson._id}`);

      return res.data;
    },
  });

  return (
    <section className="mt-20">
      {/* HEADING */}
      <div className="text-center mb-14">
        <div
          className="
            inline-flex
            items-center
            gap-3
            px-5
            py-3
            rounded-full
            bg-primary/10
            border
            border-primary/20
            text-primary
            font-semibold
            mb-6
          "
        >
          <Sparkles size={18} />
          Similar & Recommended For You
        </div>
        <p
          className="
            text-gray-400
            mt-5
            text-lg
            max-w-2xl
            mx-auto
            leading-8
          "
        >
          Explore more inspiring lessons based on similar categories and
          emotional experiences.
        </p>
      </div>

      {/* NO LESSON */}
      {lessons.length === 0 ? (
        <div
          className="
              max-w-3xl
              mx-auto
              text-center
              bg-gradient-to-br
              from-[#111827]
              to-[#0F172A]
              border
              border-white/10
              rounded-[32px]
              shadow-2xl
              p-14
            "
        >
          <div className="text-7xl mb-8">📚</div>

          <h2
            className="
                text-3xl
                md:text-4xl
                font-black
                text-white
              "
          >
            No Similar Lessons Found
          </h2>

          <p
            className="
                text-gray-400
                mt-6
                text-lg
                leading-9
                max-w-xl
                mx-auto
              "
          >
            There are currently no related lessons available based on this
            category or emotional tone.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {lessons.map((item) => {

             

                  const isPremiumLocked =
    item.accessLevel === "Premium" &&
    !userData?.isPremium;

  return (

            <div
              key={item._id}
              className=" relative group overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] shadow-xl hover:-translate-y-2 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >

               {/* premium overlay */}
                    {isPremiumLocked && (

                      <div className="absolute inset-0 backdrop-blur-md bg-black/50 z-20 flex flex-col items-center justify-center text-white">
                        
                        <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center border border-warning/30">

                          <Lock size={32} className="text-warning" />

                        </div>

                        <h2 className="font-bold text-2xl mt-5">
                          Premium Lesson
                        </h2>

                        <p className="text-sm mt-2 text-gray-300">
                          Upgrade your plan to unlock this lesson
                        </p>

                        <Link
                          to="/pricing"
                          className=" mt-5 px-6 py-3 rounded-full bg-gradient-to-r from-warning to-orange-500 text-black font-semibold hover:scale-105 transition"
                        >
                          Upgrade Now ⭐
                        </Link>

                      </div>
                    )}
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="
                        w-full
                        h-72
                        object-cover
                        group-hover:scale-110
                        transition-all
                        duration-700
                      "
                />

                {/* overlay */}
                <div
                  className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#0F172A]
                        via-black/30
                        to-transparent
                      "
                ></div>

                {/* badges */}
                <div
                  className="
                        absolute
                        top-5
                        left-5
                        flex
                        flex-wrap
                        gap-2
                      "
                >
                  {/* category */}
                  <span
                    className="
                          px-4
                          py-2
                          rounded-full
                          bg-violet-500/10
                          backdrop-blur-xl
                          border
                          border-violet-500/20
                          bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent 
                          text-xs
                          font-semibold
                        "
                  >
                    {item.category}
                  </span>

                  {/* tone */}
                  <span
                    className="
                          px-4
                          py-2
                          rounded-full
                          bg-pink-500/10
                          backdrop-blur-xl
                          border
                          border-pink-500/20
                          bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent
                          text-xs
                          font-semibold
                        "
                  >
                    {item.emotionalTone}
                  </span>
                </div>

                {/* lesson length */}
                <div className=" absolute bottom-2 right-3 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-semibold shadow-lg ">

  {
    Math.ceil(
      lesson.description?.split(" ").length / 200
    )
  }
  {" "}min read

                </div>

                {/* access */}
              </div>

              {/* CONTENT */}
              <div className="p-7">
                {/* title */}
                <h2
                  className="
                        text-2xl
    font-black
    text-white
    line-clamp-2
    leading-snug
    min-h-[72px]
                      "
                >
                  {item.title}
                </h2>

                {/* description */}
                <p
                  className="
                        mt-5
    text-gray-400
    leading-8
    line-clamp-3
    min-h-[96px]
                      "
                >
                  {item.description}
                </p>

                {/* AUTHOR */}
                <div
                  className="
                        flex
                        items-center
                        gap-4
                        mt-8
                      "
                >
                  <img
                    src={
                      item.creatorPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt=""
                    className="
                          w-14
                          h-14
                          rounded-full
                          object-cover
                          border-2
                          border-primary/30
                        "
                  />

                 <div className="flex-1">

  <h3
    className="
      font-bold
      bg-gradient-to-r
      from-fuchsia-500
      via-purple-600
      to-indigo-600
      bg-clip-text
      text-transparent
      text-lg
    "
  >
    {item.creatorName}
  </h3>

  <div className="flex items-center justify-between mt-1 w-full">

    <p className="text-sm text-gray-500">
      Life Lesson Creator
    </p>

    <p className="text-sm text-gray-400">
      {new Date(
        lesson.createdAt
      ).toLocaleDateString()}
    </p>

  </div>

</div>
                </div>

                {/* STATS */}
                <div
                  className="
    flex
    items-center
    justify-between
    mt-8
    pt-6
    border-t
    border-white/10
  "
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-5">
                    {/* likes */}
                    <div
                      className=" flex items-center gap-2 text-rose-400  text-sm font-medium"
                    >
                      <Heart size={16} className="fill-rose-400" />

                      {item.likesCount || 0}
                    </div>

                    {/* saves */}
                    <div
                      className="flex items-center gap-2 text-amber-300 fill-amber-300 text-sm font-medium "
                    >
                      <Bookmark size={16} className="fill-amber-400" />

                      {item.favoritesCount || 0}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <span
                    className={`
      px-4
      py-2
      rounded-full
      text-xs
      font-semibold
      border

      ${
        item.accessLevel === "Premium"
          ? "bg-amber-500/10 text-amber-200 border-amber-500/20"
          : "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
      }
    `}
                  >
                    {item.accessLevel === "Premium" ? "Premium ⭐" : "Free"}
                  </span>
                </div>

                {/* BUTTON */}
                <div className="mt-8">
                  <Link
                    to={`/lesson-details/${item._id}`}
                    className="
                         group/btn btn border-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white w-full rounded-full text-base
                        "
                  >
                    See Details <FaArrowRight className="group-hover/btn:translate-x-1 transition duration-300" />
                  </Link>
                </div>
              </div>
            </div>
);
})}
        </div>
      )}
    </section>
  );
};

export default SimilarLesson;
