import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiAward } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["top-contributors"],

    queryFn: async () => {
      const res = await axiosSecure.get("/top-contributors");

      return res.data;
    },
  });

 return (
    <section className="py-16 md:py-24 bg-base-100 relative overflow-hidden">

      {/* background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 blur-3xl rounded-full"></div>

      <div className="">

        {/* title */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="text-primary uppercase tracking-widest font-semibold">
            Community Leaders
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gradient-brand mt-4">
            Top Contributors of the Week
          </h2>

          <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
            Meet the inspiring creators who are helping others grow through
            their shared life experiences.
          </p>

        </div>

        {/* loading skeletons / swiper */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="relative bg-card/60 border border-border rounded-[32px] p-8 overflow-hidden h-96 flex flex-col justify-between"
              >
                <div className="w-28 h-28 rounded-full bg-muted animate-pulse mx-auto" />
                <div className="space-y-3 mt-8">
                  <div className="w-32 h-6 bg-muted rounded animate-pulse mx-auto" />
                  <div className="w-24 h-4 bg-muted rounded animate-pulse mx-auto" />
                </div>
                <div className="w-full h-20 bg-muted rounded-2xl animate-pulse mt-6" />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            freeMode={true}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },

              768: {
                slidesPerView: 2,
              },

              1280: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {contributors.map((user, index) => (
              <SwiperSlide key={user._id}>
                <div
                  className="
                    relative
                    group
                    bg-card/60
                    backdrop-blur-xl
                    border
                    border-border
                    rounded-[32px]
                    p-8
                    overflow-hidden
                    hover:-translate-y-2
                    hover:border-primary/40
                    hover:shadow-primary/20
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    h-full
                  "
                >
                  {/* glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                  {/* badge */}
                  <div className="absolute top-6 right-6">
                    <div className="badge gap-2 py-4 px-4 border bg-accent/10 text-accent border-accent/20">
                      <FiAward />
                      #{index + 1}
                    </div>
                  </div>

                  {/* image */}
                  <div className="relative w-fit mx-auto">
                    <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-40"></div>
                    <img
                      src={
                        user.creatorPhoto ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={user.creatorName}
                      className="
                        relative
                        w-28
                        h-28
                        rounded-full
                        object-cover
                        border-4
                        border-primary/40
                        shadow-xl
                      "
                    />
                  </div>

                  {/* content */}
                  <div className="text-center mt-8">
                    <h2 className="text-2xl font-bold text-gradient-brand">
                      {user.creatorName}
                    </h2>
                    <p className="text-base-content/80 mt-2 font-medium">
                      Top Lesson Creator
                    </p>
                  </div>

                  {/* stats */}
                  <div
                    className="
                      mt-8
                      rounded-2xl
                      bg-muted
                      border
                      border-border
                      py-6
                      text-center
                    "
                  >
                    <h3 className="text-5xl font-black text-gradient-brand">
                      {user.totalLessons}
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Lessons Shared
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};


export default TopContributors;
