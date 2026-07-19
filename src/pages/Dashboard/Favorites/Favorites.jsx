import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Heart, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";
import TableSkeleton from "../../../coponents/Skeleton/TableSkeleton";
import { ACCESS_BADGE_CLASS, CATEGORY_BADGE_CLASS, TONE_BADGE_CLASS, badgeClass } from "../../../utils/badgeStyles";


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
      refetch,
      isLoading
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

    background: "var(--color-card)",

    color: "var(--color-card-foreground)",

    showCancelButton: true,

    confirmButtonColor: "var(--color-warning)",

    cancelButtonColor: "var(--color-base-300)",

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

          background: "var(--color-card)",

          color: "var(--color-card-foreground)",

          confirmButtonColor: "var(--color-primary)",

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
    useTitle("My Favorites"),
    <div className="px-4 md:px-8 py-10">

      {/* heading */}
      <div className="mb-12">

        <div className="flex items-center gap-4">

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-secondary/10
              border
              border-secondary/20
              flex
              items-center
              justify-center
            "
          >

            <Heart className="text-secondary" size={30} />

          </div>

          <div>

            <h1 className="text-4xl md:text-5xl font-black text-gradient-brand">
              My Favorite Lessons
            </h1>

            <p className="text-muted-foreground text-lg mt-2">
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
            bg-input
            border
            border-border
            text-base-content
            rounded-xl
            transition-all
            duration-300
            focus:outline-none
            focus:border-primary
            hover:border-primary/40
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
            bg-input
            border
            border-border
            text-base-content
            rounded-xl
            transition-all
            duration-300
            focus:outline-none
            focus:border-primary
            hover:border-primary/40
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
        isLoading
        ?
        (
          <TableSkeleton rowsCount={5} colsCount={5} />
        )
        :
        favorites.length === 0
        ?
        (
          <div
            className="
              bg-card
              border
              border-border
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
                bg-secondary/10
                border
                border-secondary/20
                flex
                items-center
                justify-center
                mx-auto
                mb-8
              "
            >

              <Heart
                size={40}
                className="text-secondary"
              />

            </div>

            <h2 className="text-4xl font-black text-base-content">
              No Favorite Lessons Found
            </h2>

            <p className="text-muted-foreground mt-4 text-lg">
              Save lessons to quickly access them later.
            </p>

          </div>
        )
        :
        (
          <div
            className="
              overflow-x-auto
              bg-card
              border
              border-border
              shadow-2xl
              rounded-[32px]
              backdrop-blur-xl
            "
          >

          <div className="w-full overflow-x-auto rounded-[24px] md:rounded-[32px]">
  <table className="table min-w-[900px] text-muted-foreground">
    {/* head */}
    <thead className="bg-muted text-base-content">
      <tr
        className="
          border-b
          border-border
          text-xs
          md:text-sm
        "
      >
        <th className="py-5">Lesson</th>

        <th>Category</th>

        <th>Tone</th>

        <th>Access</th>

        <th>Actions</th>
      </tr>
    </thead>

    {/* body */}
    <tbody>
      {favorites.map((lesson) => (
        <tr
          key={lesson._id}
          className="
            border-b
            border-border
            hover:bg-hover
            transition-all
            duration-300
          "
        >
          {/* lesson */}
          <td className="py-5 md:py-6">
            <div className="flex items-center gap-3 md:gap-5">
              {/* image */}
              <img
                src={lesson.image}
                className="
                  w-14
                  h-14
                  md:w-20
                  md:h-20
                  rounded-2xl
                  object-cover
                  border
                  border-border
                "
              />

              {/* content */}
              <div className="max-w-[180px] md:max-w-xs">
                <h2
                  className="
                    font-bold
                    text-sm
                    md:text-lg
                    text-base-content
                    line-clamp-1
                  "
                >
                  {lesson.title}
                </h2>

                <p
                  className="
                    text-xs
                    md:text-sm
                    text-muted-foreground
                    mt-2
                    line-clamp-2
                    leading-5
                    md:leading-6
                  "
                >
                  {lesson.description.slice(0, 80)}...
                </p>
              </div>
            </div>
          </td>

          {/* category */}
          <td>
            <span
              className={`px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold border whitespace-nowrap ${badgeClass(
                CATEGORY_BADGE_CLASS,
                lesson.category
              )}`}
            >
              {lesson.category}
            </span>
          </td>

          {/* tone */}
          <td>
            <span
              className={`px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold border whitespace-nowrap ${badgeClass(
                TONE_BADGE_CLASS,
                lesson.emotionalTone
              )}`}
            >
              {lesson.emotionalTone}
            </span>
          </td>

          {/* access */}
          <td>
            <span
              className={`px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold border whitespace-nowrap ${badgeClass(
                ACCESS_BADGE_CLASS,
                lesson.accessLevel
              )}`}
            >
              {lesson.accessLevel}
            </span>
          </td>

          {/* actions */}
          <td>
            <div
              className="
                flex
                flex-col
                md:flex-row
                items-start
                md:items-center
                gap-2
                md:gap-3
              "
            >
              {/* details */}
              <Link
                to={`/lesson-details/${lesson._id}`}
                className="
                  w-full
                  md:w-auto
                  text-center
                  px-4
                  md:px-5
                  py-2
                  md:py-3
                  rounded-2xl
                  bg-gradient-brand
                  text-primary-content
                  text-xs
                  md:text-sm
                  font-semibold
                  hover:shadow-xl
                  hover:shadow-primary/20
                  transition-all
                  duration-300
                  whitespace-nowrap
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
                  w-10
                  h-10
                  md:w-12
                  md:h-12
                  rounded-2xl
                  bg-error/10
                  border
                  border-error/20
                  flex
                  items-center
                  justify-center
                  text-error
                  hover:bg-error
                  hover:text-error-content
                  transition-all
                  duration-300
                "
              >
                <Trash2 size={18} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>
        )
      }

    </div>
  );
};
export default Favorites;