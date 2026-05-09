import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { Heart, Trash2 } from "lucide-react";
import Swal from "sweetalert2";


const Favorites = () => {
   const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

   // filters
   const [category, setCategory] =
   useState("");

   const [tone, setTone] =
   useState("");

   // fetch favorites
   const {
      data: favorites = [],
      refetch
   } = useQuery({

      queryKey: [
         'favorites',
         user?.email,
         category,
         tone
      ],

      enabled: !!user?.email,

      queryFn: async() => {

         const res =
         await axiosSecure.get(

            `/favorites/${user.email}?category=${category}&emotionalTone=${tone}`

         );

         return res.data;
      }
   });

   // remove favorite
   const handleRemove = async(id) => {

      Swal.fire({

    title: "Remove Favorite?",

    text: "This lesson will be removed from your favorites.",

    icon: "warning",

    background: "#111827",

    color: "#fff",

    showCancelButton: true,

    confirmButtonColor: "#F59E0B",

    cancelButtonColor: "#374151",

    confirmButtonText: "Yes, Remove",

    cancelButtonText: "Cancel",

    reverseButtons: true,
  }).then(async(result) => {

      if(result.isConfirmed){

      try {

         await axiosSecure.delete(

            `/favorites/${id}/${user.email}`
         );

         Swal.fire({

          title: "⭐ Removed!",

          text: "Lesson removed from favorites successfully.",

          icon: "success",

          background: "#111827",

          color: "#fff",

          confirmButtonColor: "#8B5CF6",

          timer: 2000,

          showConfirmButton: false,
        });

         refetch();

      } catch(error){

         console.log(error);
         toast.error("Failed to remove from favorites");
      }
      }
  });
   };

   return (
    <div className="px-4 md:px-8 py-10">

      {/* heading */}
      <div className="mb-12">

        <div className="flex items-center gap-4">

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-pink-500/10
              border
              border-pink-500/20
              flex
              items-center
              justify-center
            "
          >

            <Heart className="text-pink-300" size={30} />

          </div>

          <div>

            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              My Favorite Lessons
            </h1>

            <p className="text-gray-400 text-lg mt-2">
              Your saved life lessons
            </p>

          </div>

        </div>

      </div>

      {/* filters */}
      <div className="flex flex-wrap gap-5 mb-10">

        {/* category */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="
            select
            bg-[#111827]
            border
            border-[#2A3142]
            text-[#EEF2FF]
            rounded-xl
            transition-all
            duration-300
            focus:outline-none
            focus:border-[#7B61FF]
            hover:border-[#4B5563]
            w-full
            md:w-72
          "
        >

          <option value="">
            All Categories
          </option>

          <option>
            Personal Growth
          </option>
          <option>
            Education
          </option>
          <option>
            Health
          </option>
          <option>
            Mistakes Learned
          </option>

          <option>
            Career
          </option>

          <option>
            Relationships
          </option>

          <option>
            Mindset
          </option>

        </select>

        {/* tone */}
        <select
          value={tone}
          onChange={(e) =>
            setTone(e.target.value)
          }
          className="
            select
            bg-[#111827]
            border
            border-[#2A3142]
            text-[#EEF2FF]
            rounded-xl
            transition-all
            duration-300
            focus:outline-none
            focus:border-[#7B61FF]
            hover:border-[#4B5563]
            w-full
            md:w-72
          "
        >

          <option value="">
            All Emotional Tones
          </option>

          <option>
            Motivational
          </option>

          <option>
            Sad
          </option>
          <option>
            Happy
          </option>
          <option>
            Inspirational
          </option>

          <option>
            Gratitude
          </option>

          <option>
            Realization
          </option>

        </select>

      </div>

      {/* no favorites */}
      {
        favorites.length === 0
        ?
        (
          <div
            className="
              bg-gradient-to-br
              from-[#111827]
              to-[#0F172A]
              border
              border-white/10
              rounded-[32px]
              shadow-2xl
              p-16
              text-center
            "
          >

            <div
              className="
                w-24
                h-24
                rounded-full
                bg-pink-500/10
                border
                border-pink-500/20
                flex
                items-center
                justify-center
                mx-auto
                mb-8
              "
            >

              <Heart
                size={40}
                className="text-pink-300"
              />

            </div>

            <h2 className="text-4xl font-black text-white">
              No Favorite Lessons Found
            </h2>

            <p className="text-gray-400 mt-4 text-lg">
              Save lessons to quickly access them later.
            </p>

          </div>
        )
        :
        (
          <div
            className="
              overflow-x-auto
              bg-gradient-to-br
              from-[#111827]
              to-[#0F172A]
              border
              border-white/10
              shadow-2xl
              rounded-[32px]
              backdrop-blur-xl
            "
          >

            <table className="table text-[#CBD5E1]">

              {/* head */}
              <thead className="bg-white/[0.03] text-[#E2E8F0]">

                <tr className="border-b border-white/10">

                  <th className="py-5">
                    Lesson
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Tone
                  </th>

                  <th>
                    Access
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              {/* body */}
              <tbody>

                {
                  favorites.map((lesson) => (

                    <tr
                      key={lesson._id}
                      className="
                        border-b
                        border-white/5
                        hover:bg-white/[0.03]
                        transition-all
                        duration-300
                      "
                    >

                      {/* lesson */}
                      <td className="py-6">

                        <div className="flex items-center gap-5">

                          {/* image */}
                          <img
                            src={lesson.image}
                            className="
                              w-20
                              h-20
                              rounded-2xl
                              object-cover
                              border
                              border-white/10
                            "
                          />

                          {/* content */}
                          <div className="max-w-xs">

                            <h2 className="font-bold text-[#F1F5F9] text-lg line-clamp-1">
                              {lesson.title}
                            </h2>

                            <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-6">
                              {
                                lesson.description
                                  .slice(0, 80)
                              }
                              ...
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* category */}
                      <td>

                        <span
                            className={`
    px-4
    py-2
    rounded-full
    text-xs
    font-semibold
    border

    ${
      lesson.category === "Mindset"
        ? "bg-violet-500/10 text-violet-200 border-violet-500/20"

      : lesson.category === "Career"
        ? "bg-sky-500/10 text-sky-200 border-sky-500/20"

      : lesson.category === "Relationships"
        ? "bg-pink-500/10 text-pink-200 border-pink-500/20"

      : lesson.category === "Education"
        ? "bg-blue-500/10 text-blue-200 border-blue-500/20"

      : lesson.category === "Health"
        ? "bg-red-500/10 text-red-200 border-red-500/20"

      : lesson.category === "Mistakes Learned"
        ? "bg-orange-500/10 text-orange-200 border-orange-500/20"

      : lesson.category === "Personal Growth"
        ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"

      : "bg-gray-500/10 text-gray-200 border-gray-500/20"
    }
  `}
                        >
                          {lesson.category}
                        </span>

                      </td>

                      {/* tone */}
                      <td>

                        <span
                           className={`
    px-4
    py-2
    rounded-full
    text-xs
    font-semibold
    border

    ${
      lesson.emotionalTone === "Motivational"
        ? "bg-yellow-500/10 text-yellow-200 border-yellow-500/20"

      : lesson.emotionalTone === "Sad"
        ? "bg-blue-500/10 text-blue-200 border-blue-500/20"

      : lesson.emotionalTone === "Happy"
        ? "bg-green-500/10 text-green-200 border-green-500/20"

      : lesson.emotionalTone === "Inspirational"
        ? "bg-purple-500/10 text-purple-200 border-purple-500/20"

      : lesson.emotionalTone === "Gratitude"
        ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"

      : lesson.emotionalTone === "Realization"
        ? "bg-pink-500/10 text-pink-200 border-pink-500/20"

      : "bg-gray-500/10 text-gray-200 border-gray-500/20"
    }
  `}
                        >
                          {lesson.emotionalTone}
                        </span>

                      </td>

                      {/* access */}
                      <td>

                        <span
                          className={`
                            px-4
                            py-2
                            rounded-full
                            text-xs
                            font-semibold
                            border

                            ${
                              lesson.accessLevel === "Premium"
                              ?
                              "bg-yellow-500/10 text-yellow-200 border-yellow-500/20"
                              :
                              "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                            }
                          `}
                        >
                          {lesson.accessLevel}
                        </span>

                      </td>

                      {/* actions */}
                      <td>

                        <div className="flex items-center gap-3">

                          {/* details */}
                          <Link
                            to={`/lesson-details/${lesson._id}`}
                            className="
                              px-5
                              py-3
                              rounded-2xl
                              bg-gradient-to-r
                              from-[#6366F1]
                              to-[#A855F7]
                              text-white
                              text-sm
                              font-semibold
                              hover:shadow-xl
                              hover:shadow-purple-500/20
                              transition-all
                              duration-300
                            "
                          >
                            Details
                          </Link>

                          {/* remove */}
                          <button
                            onClick={() =>
                              handleRemove(
                                lesson._id
                              )
                            }
                            className="
                              w-12
                              h-12
                              rounded-2xl
                              bg-red-500/10
                              border
                              border-red-500/20
                              flex
                              items-center
                              justify-center
                              text-red-300
                              hover:bg-red-500
                              hover:text-white
                              transition-all
                              duration-300
                            "
                          >

                            <Trash2 size={20} />

                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>
        )
      }

    </div>
  );
};
export default Favorites;