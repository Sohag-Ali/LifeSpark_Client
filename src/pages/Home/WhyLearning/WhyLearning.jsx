import { FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import { BsGraphUpArrow } from "react-icons/bs";



const WhyLearning = () => {
     const benefits = [
    {
      id: 1,
      title: "Personal Growth",
      desc: "Expand your mindset and gain valuable insights from real-life experiences.",
      icon:  BsGraphUpArrow,
    },
    {
      id: 2,
      title: "Achieve Your Goals",
      desc: "Learn practical strategies to overcome challenges and succeed.",
      icon: FiTarget,
    },
    {
      id: 3,
      title: "Build Strong Connections",
      desc: "Engage with a supportive community and share meaningful experiences.",
      icon: FiUsers,
    },
    {
      id: 4,
      title: "Stay Motivated",
      desc: "Get inspired by real stories and keep pushing forward.",
      icon: FiTrendingUp,
    },
  ];

  return (
    <section className="py-8 md:py-14 bg-base-100 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="text-primary font-semibold tracking-widest uppercase">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-gradient-brand leading-tight">
            Why Learning From Life Matters
          </h2>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Real experiences teach lessons no textbook can. Discover how learning from life can transform your journey and inspire meaningful growth.
          </p>

        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="
                  group
                  relative
                  bg-card/60
                  backdrop-blur-xl
                  border border-border
                  rounded-3xl
                  p-8
                  hover:-translate-y-2
                  hover:border-primary/40
                  hover:shadow-primary/20
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >

                {/* icon */}
                <div
                  className="
                    w-20
                    h-20
                    rounded-2xl
                    bg-gradient-brand
                    flex
                    items-center
                    justify-center
                    mx-auto
                    shadow-glow
                    group-hover:scale-110
                    transition
                    duration-300
                  "
                >
                  <Icon className="text-primary-content text-3xl" />
                </div>

                {/* content */}
                <div className="text-center mt-8">

                  <h3 className="text-2xl font-bold text-gradient-brand min-h-[64px]">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mt-4 leading-8 min-h-[96px]">
                    {item.desc}
                  </p>

                </div>

                {/* glow border */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-primary/20 pointer-events-none"></div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};
export default WhyLearning;
