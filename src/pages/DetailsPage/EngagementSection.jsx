import { Bookmark, Eye, Heart } from "lucide-react";


const EngagementSection = ({ lesson }) => {
     // random views
   const views =
   Math.floor(Math.random() * 10000);

   return (

    <section className="">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LIKES */}
        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#111827]
            to-[#0F172A]
            
            p-7
            
            hover:-translate-y-1
            hover:border-rose-500/30
            transition-all
            duration-300
          "
        >

          {/* glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex items-center justify-between">

            {/* content */}
            <div>

              <p className="text-gray-400 font-medium">

                Total Likes

              </p>

              <h2
                className="
                  text-5xl
                  font-black
                  text-rose-300
                  mt-4
                "
              >

                {lesson.likesCount || 0}

              </h2>

              <p className="text-gray-500 mt-3">

                ❤️ People liked this lesson

              </p>

            </div>

            {/* icon */}
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-rose-500/10
                border
                border-rose-500/20
                flex
                items-center
                justify-center
              "
            >

              <Heart
                className="text-rose-500 fill-rose-500"
                size={38}
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
            
            p-7
            
            hover:-translate-y-1
            hover:border-amber-500/30
            transition-all
            duration-300
          "
        >

          {/* glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex items-center justify-between">

            {/* content */}
            <div>

              <p className="text-gray-400 font-medium">

                Favorites

              </p>

              <h2
                className="
                  text-5xl
                  font-black
                  text-amber-300
                  mt-4
                "
              >

                {lesson.favoritesCount || 0}

              </h2>

              <p className="text-gray-500 mt-3">

                🔖 Saved by users

              </p>

            </div>

            {/* icon */}
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-amber-500/10
                border
                border-amber-500/20
                flex
                items-center
                justify-center
              "
            >

              <Bookmark
                className="text-amber-300"
                size={38}
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
           
            p-7
            
            hover:-translate-y-1
            hover:border-cyan-500/30
            transition-all
            duration-300
          "
        >

          {/* glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex items-center justify-between">

            {/* content */}
            <div>

              <p className="text-gray-400 font-medium">

                Views

              </p>

              <h2
                className="
                  text-5xl
                  font-black
                  text-cyan-300
                  mt-4
                "
              >

                {views}

              </h2>

              <p className="text-gray-500 mt-3">

                👀 Total lesson views

              </p>

            </div>

            {/* icon */}
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-cyan-500/10
                border
                border-cyan-500/20
                flex
                items-center
                justify-center
              "
            >

              <Eye
                className="text-cyan-300"
                size={38}
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};


export default EngagementSection;