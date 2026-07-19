import { useQuery } from "@tanstack/react-query";
import { BookOpen, ShieldCheck, Sparkles, Star, Trash2 } from "lucide-react";
import { MdReportGmailerrorred } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineFileProtect } from "react-icons/ai";
import Swal from "sweetalert2";
import { MdOutlineShield } from "react-icons/md";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTitle from "../../../../hooks/useTitle";
import TableSkeleton from "../../../../coponents/Skeleton/TableSkeleton";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  // filters
  const [category, setCategory] = useState("");

  const [privacy, setPrivacy] = useState("");

  const [flagged, setFlagged] = useState("");

  // stats
  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ["lesson-stats"],

    queryFn: async () => {
      const res = await axiosSecure.get("/lesson-stats");

      return res.data;
    },
  });

  // lessons cartegory,  flagged
  const { data: lessons = [], refetch, isLoading: isLessonsLoading } = useQuery({
    queryKey: ["admin-lessons", category, privacy, flagged],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin-lessons?category=${category}&privacy=${privacy}&flagged=${flagged}`,
      );

      return res.data;
    },
  });

  // delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Lesson?",

      text: "This lesson will be removed permanently",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/admin-lessons/${id}`);

      if (res.data.deletedCount) {
        toast.success("Lesson deleted");

        refetch();
      }
    }
  };

  // feature
  const handleFeature = async (id, featured) => {
    const res = await axiosSecure.patch(
      `/featured-lessons/${id}`,

      {
        featured: !featured,
      },
    );

    if (res.data.modifiedCount) {
      Swal.fire({
        title: featured ? "Lesson Unfeatured" : "Lesson Featured",
        icon: "success",
      });

      refetch();
    }
  };

  // review
  const handleReview = async (id) => {
    const res = await axiosSecure.patch(`/reviewed-lessons/${id}`);

    if (res.data.modifiedCount) {
      Swal.fire({
        title: "Lesson Marked as Reviewed",
        icon: "success",
      });

      refetch();
    }
  };

  return (
    useTitle("Manage Lessons"),
    <div className="px-4 md:px-8 py-10">
      {/* heading */}
      <div className="mb-14">
        <div className="flex items-center gap-5">
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-primary/10
              border
              border-primary/20
              flex
              items-center
              justify-center
            "
          >
            <Sparkles size={30} className="text-primary" />
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-black text-base-content">
              <span className="text-gradient-brand">
                Manage Lessons
              </span>{" "}
              📚
            </h1>

            <p className="text-muted-foreground text-lg mt-3">
              Monitor and moderate all lessons
            </p>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* public */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-5xl font-black text-success">
              {isStatsLoading ? (
                <div className="h-12 w-16 bg-muted rounded animate-pulse" />
              ) : (
                stats.publicLessons || 0
              )}
            </h2>

            <p className="text-muted-foreground mt-4">Public Lessons</p>
          </div>

          <div
            className="
                w-20
                h-20
                rounded-3xl
                bg-success/10
                border
                border-success/20
                flex
                items-center
                justify-center
              "
          >
            <BookOpen size={40} className="text-success" />
          </div>
        </div>

        {/* private */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-5xl font-black text-warning">
              {isStatsLoading ? (
                <div className="h-12 w-16 bg-muted rounded animate-pulse" />
              ) : (
                stats.privateLessons || 0
              )}
            </h2>

            <p className="text-muted-foreground mt-4">Private Lessons</p>
          </div>

          <div
            className="
                w-20
                h-20
                rounded-3xl
                bg-warning/10
                border
                border-warning/20
                flex
                items-center
                justify-center
              "
          >
            <AiOutlineFileProtect size={40} className="text-warning" />
          </div>
        </div>

        {/* flagged */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-5xl font-black text-error">
              {isStatsLoading ? (
                <div className="h-12 w-16 bg-muted rounded animate-pulse" />
              ) : (
                stats.flaggedLessons || 0
              )}
            </h2>

            <p className="text-muted-foreground mt-4">Flagged Lessons</p>
          </div>

          <div
            className="
                w-20
                h-20
                rounded-3xl
                bg-error/10
                border
                border-error/20
                flex
                items-center
                justify-center
              "
          >
            <MdReportGmailerrorred size={40} className="text-error" />
          </div>
        </div>
      </div>

      {/* filters */}
      <div className="flex flex-wrap gap-5 mb-10">
        {/* category */}
        <select
          className="
            select
            bg-input
            border
            border-border
            text-base-content
            rounded-2xl
            focus:outline-none
            focus:border-primary
            hover:border-primary/40
            transition-all
            duration-300
          "
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          <option>Personal Growth</option>
          <option>Mistakes Learned</option>
          <option>Health</option>
          <option>Education</option>
          <option>Relationships</option>

          <option>Career</option>

          <option>Mindset</option>
        </select>

        {/* privacy */}
        <select
          className="
            select
            bg-input
            border
            border-border
            text-base-content
            rounded-2xl
            focus:outline-none
            focus:border-primary
            hover:border-primary/40
            transition-all
            duration-300
          "
          onChange={(e) => setPrivacy(e.target.value)}
        >
          <option value="">All Visibility</option>

          <option>Public</option>

          <option>Private</option>
        </select>

        {/* flagged */}
        <select
          className="
            select
            bg-input
            border
            border-border
            text-base-content
            rounded-2xl
            focus:outline-none
            focus:border-primary
            hover:border-primary/40
            transition-all
            duration-300
          "
          onChange={(e) => setFlagged(e.target.value)}
        >
          <option value="">All Lessons</option>

          <option value="true">Flagged Only</option>
        </select>
      </div>

      {/* table */}
      {isLessonsLoading ? (
        <TableSkeleton rowsCount={5} colsCount={5} />
      ) : (
        <div
          className="
            w-full
            overflow-x-auto
            bg-card
            border
            border-border
            rounded-[24px]
            md:rounded-[32px]
            shadow-2xl
          "
        >
          <table className="table min-w-[850px] text-base-content">
    <thead>
      <tr
        className="
          border-b
          text-center
          border-border
          text-muted-foreground
          text-xs
          md:text-sm
        "
      >
        <th className="py-6">Lesson</th>

        <th>Category</th>

        <th>Visibility</th>

        <th>Status</th>

        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {lessons.length === 0 ? (
        <tr>
          <td
            colSpan="5"
            className="
              text-center
              py-20
            "
          >
            <div className="flex flex-col items-center">
              {/* icon */}
              <BookOpen size={60} className="text-primary" />

              {/* title */}
              <h2
                className="
                  mt-8
                  text-3xl
                  md:text-4xl
                  font-black
                  text-base-content
                "
              >
                Lessons Not Found
              </h2>

              {/* description */}
              <p
                className="
                  text-muted-foreground
                  mt-4
                  max-w-md
                  leading-8
                  text-sm
                  md:text-base
                "
              >
                No lessons available right now
              </p>
            </div>
          </td>
        </tr>
      ) : (
        lessons.map((lesson) => (
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
            <td className="py-5">
              <div className="flex items-center gap-3 md:gap-5">
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

                <div>
                  <h2
                    className="
                      font-bold
                      text-sm
                      md:text-lg
                      text-gradient-brand
                      line-clamp-1
                    "
                  >
                    {lesson.title}
                  </h2>

                  <p
                    className="
                      text-xs
                      md:text-sm
                      text-gradient-brand
                      mt-2
                    "
                  >
                    {lesson.creatorName}
                  </p>
                </div>
              </div>
            </td>

            {/* category */}
            <td>
              <span
                className="
                  px-3
                  md:px-4
                  py-2
                  rounded-full
                  bg-primary/10
                  text-primary
                  border
                  border-primary/20
                  text-[10px]
                  md:text-xs
                  font-semibold
                  whitespace-nowrap
                "
              >
                {lesson.category}
              </span>
            </td>

            {/* visibility */}
            <td>
              <span
                className={`
                  px-3
                  md:px-4
                  py-2
                  rounded-full
                  text-[10px]
                  md:text-xs
                  font-semibold
                  border
                  whitespace-nowrap

                  ${
                    lesson.privacy === "Public"
                      ? "bg-success/10 text-success border-success/20"
                      : "bg-warning/10 text-warning border-warning/20"
                  }
                `}
              >
                {lesson.privacy}
              </span>
            </td>

            {/* status */}
            <td>
              <div className="flex flex-col md:flex-row gap-2">
                {lesson.isFeatured && (
                  <span
                    className="
                      px-3
                      md:px-4
                      py-2
                      rounded-full
                      bg-secondary/10
                      text-secondary
                      border
                      border-secondary/20
                      text-[10px]
                      md:text-xs
                      font-semibold
                      whitespace-nowrap
                    "
                  >
                    Featured
                  </span>
                )}

                {lesson.isReviewed && (
                  <span
                    className="
                      px-3
                      md:px-4
                      py-2
                      rounded-full
                      bg-info/10
                      text-info
                      border
                      border-info/20
                      text-[10px]
                      md:text-xs
                      font-semibold
                      whitespace-nowrap
                    "
                  >
                    Reviewed
                  </span>
                )}

                {lesson.reportCount > 0 && (
                  <span
                    className="
                      px-3
                      md:px-4
                      py-2
                      rounded-full
                      bg-error/10
                      text-error
                      border
                      border-error/20
                      text-[10px]
                      md:text-xs
                      font-semibold
                      whitespace-nowrap
                    "
                  >
                    Flagged
                  </span>
                )}
              </div>
            </td>

            {/* actions */}
            <td>
              <div className="flex gap-2 md:gap-3">
                {/* feature */}
                <button
                  onClick={() =>
                    handleFeature(lesson._id, lesson.isFeatured)
                  }
                  className="
                    w-9
                    h-9
                    md:w-11
                    md:h-11
                    rounded-2xl
                    bg-secondary/10
                    text-secondary
                    border
                    border-secondary/20
                    flex
                    items-center
                    justify-center
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  <Star
                    size={16}
                    className={lesson.isFeatured ? "fill-secondary" : ""}
                  />
                </button>

                {/* review */}
                <button
                  onClick={() => handleReview(lesson._id)}
                  className="
                    w-9
                    h-9
                    md:w-11
                    md:h-11
                    rounded-2xl
                    bg-info/10
                    text-info
                    border
                    border-info/20
                    flex
                    items-center
                    justify-center
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  {lesson.isReviewed ? (
                    <ShieldCheck size={16} />
                  ) : (
                    <MdOutlineShield size={16} />
                  )}
                </button>

                {/* delete */}
                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="
                    w-9
                    h-9
                    md:w-11
                    md:h-11
                    rounded-2xl
                    bg-error/10
                    text-error
                    border
                    border-error/20
                    flex
                    items-center
                    justify-center
                    hover:bg-error
                    hover:text-error-content
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
)}
    </div>
  );
};

export default ManageLessons;
