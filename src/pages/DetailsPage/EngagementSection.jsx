import { Bookmark, Eye, Heart } from "lucide-react";


const EngagementSection = ({ lesson }) => {
     // random views
   const views =
   Math.floor(Math.random() * 10000);

   return (

   <section className="">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
    {/* LIKES */}
    <div
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#111827]
        to-[#0F172A]
        rounded-[24px]
        md:rounded-[32px]
        p-5
        md:p-7
        hover:-translate-y-1
        hover:border-rose-500/30
        transition-all
        duration-300
      "
    >
      {/* glow */}
      <div className="absolute top-0 right-0 w-28 md:w-40 h-28 md:h-40 bg-rose-500/10 blur-3xl rounded-full"></div>

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* content */}
        <div>
          <p
            className="
              text-gray-400
              font-medium
              text-sm
              md:text-base
            "
          >
            Total Likes
          </p>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-black
              text-rose-300
              mt-3
              md:mt-4
            "
          >
            {lesson.likesCount || 0}
          </h2>

          <p
            className="
              text-gray-500
              mt-2
              md:mt-3
              text-xs
              md:text-sm
            "
          >
            ❤️ People liked this lesson
          </p>
        </div>

        {/* icon */}
        <div
          className="
            w-14
            h-14
            md:w-20
            md:h-20
            rounded-2xl
            md:rounded-3xl
            bg-rose-500/10
            border
            border-rose-500/20
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Heart
            className="text-rose-500 fill-rose-500"
            size={28}
          />
        </div>
      </div>
    </div>

    {/* FAVORITES */}
    <div
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#111827]
        to-[#0F172A]
        rounded-[24px]
        md:rounded-[32px]
        p-5
        md:p-7
        hover:-translate-y-1
        hover:border-amber-500/30
        transition-all
        duration-300
      "
    >
      {/* glow */}
      <div className="absolute top-0 right-0 w-28 md:w-40 h-28 md:h-40 bg-amber-500/10 blur-3xl rounded-full"></div>

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* content */}
        <div>
          <p
            className="
              text-gray-400
              font-medium
              text-sm
              md:text-base
            "
          >
            Favorites
          </p>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-black
              text-amber-300
              mt-3
              md:mt-4
            "
          >
            {lesson.favoritesCount || 0}
          </h2>

          <p
            className="
              text-gray-500
              mt-2
              md:mt-3
              text-xs
              md:text-sm
            "
          >
            🔖 Saved by users
          </p>
        </div>

        {/* icon */}
        <div
          className="
            w-14
            h-14
            md:w-20
            md:h-20
            rounded-2xl
            md:rounded-3xl
            bg-amber-500/10
            border
            border-amber-500/20
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Bookmark
            className="text-amber-300"
            size={28}
          />
        </div>
      </div>
    </div>

    {/* VIEWS */}
    <div
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#111827]
        to-[#0F172A]
        rounded-[24px]
        md:rounded-[32px]
        p-5
        md:p-7
        hover:-translate-y-1
        hover:border-cyan-500/30
        transition-all
        duration-300
      "
    >
      {/* glow */}
      <div className="absolute top-0 right-0 w-28 md:w-40 h-28 md:h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* content */}
        <div>
          <p
            className="
              text-gray-400
              font-medium
              text-sm
              md:text-base
            "
          >
            Views
          </p>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-black
              text-cyan-300
              mt-3
              md:mt-4
            "
          >
            {views}
          </h2>

          <p
            className="
              text-gray-500
              mt-2
              md:mt-3
              text-xs
              md:text-sm
            "
          >
            👀 Total lesson views
          </p>
        </div>

        {/* icon */}
        <div
          className="
            w-14
            h-14
            md:w-20
            md:h-20
            rounded-2xl
            md:rounded-3xl
            bg-cyan-500/10
            border
            border-cyan-500/20
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Eye
            className="text-cyan-300"
            size={28}
          />
        </div>
      </div>
    </div>
  </div>
</section>
  );
};


export default EngagementSection;