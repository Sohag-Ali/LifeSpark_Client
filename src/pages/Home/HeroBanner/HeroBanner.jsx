import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import bannerImg1 from '../../../assets/banner1.jpg';
import bannerImg2 from '../../../assets/banner2.jpg';
import bannerImg3 from '../../../assets/banner3.jpg';
import bannerImg4 from '../../../assets/banner4.jpg';
import bannerImg5 from '../../../assets/banner5.jpg';
import bannerImg6 from '../../../assets/banner6.jpg';
import bannerImg7 from '../../../assets/banner0.7.jpg';
import bannerImg8 from '../../../assets/banner8.jpg';


import { NavLink } from "react-router";
const HeroBanner = () => {
// const slides = [
//     {
//       img: bannerImg1,
//       title: "Learn From Real Life Experiences",
//       desc: "Explore powerful life lessons shared by real people and grow from their journeys.  ",
//     },
//     {
//       img: bannerImg2,
//       title: "Share Your Own Story",
//       desc: "Your experience can inspire others. Start sharing your lessons today.",
//     },
//     {
//       img: bannerImg3,
//       title: "Grow Together as a Community",
//       desc: "Connect, learn, and evolve with a supportive learning community.",
//     },
//   ];

  const slides = [
  // {
  //   img: bannerImg1,
  //   title: "Every Story Holds a Lesson",
  //   desc: "Real experiences from real people — discover the wisdom hidden in everyday journeys.",
  // },
  {
    img: bannerImg2,
    title: "Your Story Could Change Someone's Life",
    desc: "Don't keep your lessons to yourself. Share them and inspire someone who needs it today.",
  },
  {
    img: bannerImg3,
    title: "A Community Built on Shared Wisdom",
    desc: "Connect with people who've walked similar paths and grow through their experiences.",
  },
  {
    img: bannerImg4,
    title: "Turn Struggles Into Stepping Stones",
    desc: "Learn how others overcame challenges — and find the courage to face your own.",
  },
  {
    img: bannerImg5,
    title: "Life's Best Lessons Aren't in Textbooks",
    desc: "They're in the stories people live. Explore real experiences that teach more than theory ever could.",
  },
  {
    img: bannerImg6,
    title: "Learn From Those Who've Been There",
    desc: "Skip the guesswork. Get real, honest insights from people who've faced it before.",
  },
  {
    img: bannerImg7,
    title: "One Story Can Spark a Thousand Changes",
    desc: "Be the spark. Share what you've learned and light the way for others.",
  },
  {
    img: bannerImg8,
    title: "Grow, Reflect, and Rise Together",
    desc: "Life Spark isn't just a platform — it's a journey of collective growth.",
  },
];

  return (
    <div className="w-full h-[70vh] overflow-hidden bg-slate-950 relative">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh]">
            {/* Image */}
            <img
              src={slide.img}
              alt="banner"
              className="h-[70vh] w-full object-cover"
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