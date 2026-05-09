import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import bannerImg1 from '../../../assets/ban1.jpeg';
import bannerImg2 from '../../../assets/ban2.jpeg';
import bannerImg3 from '../../../assets/ban3.jpeg';
import { NavLink } from "react-router";
const HeroBanner = () => {
const slides = [
    {
      img: bannerImg1,
      title: "Learn From Real Life Experiences",
      desc: "Explore powerful life lessons shared by real people and grow from their journeys.  ",
    },
    {
      img: bannerImg2,
      title: "Share Your Own Story",
      desc: "Your experience can inspire others. Start sharing your lessons today.",
    },
    {
      img: bannerImg3,
      title: "Grow Together as a Community",
      desc: "Connect, learn, and evolve with a supportive learning community.",
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Image */}
            <img
              src={slide.img}
              alt="banner"
              className="h-[60vh] md:h-[75vh] lg:h-[85vh] w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
              <h1 className="bg-gradient-to-r
    from-fuchsia-500
    via-purple-600
    to-indigo-600
    bg-clip-text
    text-transparent text-2xl md:text-4xl lg:text-5xl font-bold ">
                {slide.title}
              </h1>
              <p className="bg-gradient-to-r
  from-[#D8B4FE]
  via-[#A78BFA]
  to-[#818CF8]
  bg-clip-text
  text-transparent mt-4 max-w-xl text-sm md:text-lg">
                {slide.desc}
              </p>

              {/* CTA Button */}
              <NavLink to="/public-lessons" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:from-violet-600 hover:to-indigo-700 hover:shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-1 transition-all duration-300">
                Explore Lessons
              </NavLink>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;