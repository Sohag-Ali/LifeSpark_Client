import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Bookmark, Heart, Lock } from "lucide-react";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";
import LessonCard from "../../coponents/LessonCard/LessonCard";
import LessonCardSkeleton from "../../coponents/Skeleton/LessonCardSkeleton";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("");
  const [emotionalTone, setEmotionalTone] = useState("");
  const [search, setSearch] = useState("");
  const [userData] = useUser();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons", category, emotionalTone, search],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/public-lessons?category=${category}&emotionalTone=${emotionalTone}&search=${search}`,
      );

      return res.data;
    },
  });

  return (
    useTitle("Public Lessons"),
    <div className="min-h-screen bg-[#0F172A] py-16 relative overflow-hidden">
      {/* background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className=" ">
        {/* heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary uppercase tracking-widest font-semibold">
            Explore Lessons
          </span>

          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-4">
            Public Life Lessons 
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Explore powerful real-life experiences shared by people from around
            the world.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center my-14">
            {/* search */}
            <input
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" input input-bordered bg-[#111827] border-white/10 text-white w-full md:w-72"
            />

            {/* category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" select select-bordered bg-[#111827] border-white/10 text-gray-300 w-full md:w-60"
            >
              <option value="">All Categories</option>

              <option value="Career">Career</option>
              <option value="Personal Growth">Personal Growth</option>

              <option value="Education">Education</option>

              <option value="Relationship">Relationship</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>

              <option value="Health">Health</option>
            </select>

            {/* emotional tone */}
            <select
              value={emotionalTone}
              onChange={(e) => setEmotionalTone(e.target.value)}
              className=" select select-bordered bg-[#111827] border-white/10 text-gray-300 w-full md:w-60"
            >
              <option value="">All Emotions</option>

              <option value="Inspirational">Inspirational</option>

              <option value="Motivational">Motivational</option>

              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
              <option value="Happy">Happy</option>
            </select>
          </div>

          
        </div>

        <h2 className=" text-1xl md:text-3xl font-semibold  bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent mb-10">Public Lessons<span className=" text-primary ml-3">

    ({lessons.length})

  </span>

</h2>

         {/* cards */}
        {
          isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
            </div>
          ) : lessons.length === 0
          ?
          (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-24
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                text-center
              "
            >

              <div className="text-7xl mb-6">
                😔
              </div>

              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent">
                No Lessons Found
              </h2>

              <p className="text-gray-400 mt-4 max-w-md leading-8">
                We couldn’t find any lessons matching your search or filters.
              </p>

            </div>
          )
          :
          (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {lessons.map((lesson) => (
                <LessonCard key={lesson._id} lesson={lesson} imageClass="h-60" />
              ))}

            </div>
          )
        }

      </div>
      
    </div>
  );
};

export default PublicLessons;
