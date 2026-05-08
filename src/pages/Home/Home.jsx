import FeaturedLessons from "./FeaturedLessons/FeaturedLessons";
import MostSavedLessons from "./MostSavedLessons/MostSavedLessons";
import TopContributors from "./TopContributors/TopContributors";
import WhyLearning from "./WhyLearning/WhyLearning";


const Home = () => {
    return (
        <main className="bg-base-100 overflow-x-hidden">

      {/* Hero */}
      {/* <section>
        <HeroBanner></HeroBanner>
      </section> */}

      {/* Featured Lessons */}
      <section className=" bg-[#0F172A]   md:px-6 lg:px-8">
        <FeaturedLessons></FeaturedLessons>
      </section>

      {/* Why Learning */}
      <section className="">
        <WhyLearning></WhyLearning>
      </section>

      {/* Top Contributors */}
      <section className="bg-[#0F172A] ">
       <TopContributors></TopContributors>
      </section>

      {/* Most Saved Lessons */}
      <section className="">
        <MostSavedLessons></MostSavedLessons>
      </section>

    </main>
  );
};


export default Home;