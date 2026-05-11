import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { BookOpenCheck } from "lucide-react";
// import useTitle from "../../../hooks/useTitle";

const MyLessons = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [userData] = useUser();

  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-lessons", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);

      return res.data;
    },
  });

  // delete lesson
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Lesson?",

      text: "This lesson will be permanently removed.",

      icon: "warning",

      background: "#111827",

      color: "#fff",

      showCancelButton: true,

      confirmButtonColor: "#EF4444",

      cancelButtonColor: "#374151",

      confirmButtonText: "Yes, Delete",

      cancelButtonText: "Cancel",

      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/lessons/${id}`);

          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "🗑️ Lesson Deleted",

              text: "Your lesson has been removed successfully.",

              icon: "success",

              background: "#111827",

              color: "#fff",

              confirmButtonColor: "#8B5CF6",

              timer: 2000,

              showConfirmButton: false,
            });

            refetch();
          }
        } catch (error) {
          console.log(error);

          Swal.fire({
            title: "Error",
            text: "Failed to delete lesson",
            icon: "error",
            background: "#111827",
            color: "#fff",
            confirmButtonColor: "#8B5CF6",
          });
        }
      }
    });
  };

  // toggle privacy
  const handlePrivacyChange = async (id, currentPrivacy) => {
    const newPrivacy = currentPrivacy === "Public" ? "Private" : "Public";

    try {
      const res = await axiosSecure.patch(`/lessons/privacy/${id}`, {
        privacy: newPrivacy,
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`Lesson changed to ${newPrivacy}`);

        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // toggle access level
  const handleAccessLevelChange = async (id, currentAccess) => {
    if (!userData?.isPremium) {
      return toast.error("Upgrade to Premium first!");
    }

    const newAccess = currentAccess === "Free" ? "Premium" : "Free";

    try {
      const res = await axiosSecure.patch(`/lessons/access/${id}`, {
        accessLevel: newAccess,
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`Access changed to ${newAccess}`);

        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update access level");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    // useTitle("My Lessons"),
    
    <div className="p-6">
      {/* heading */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white">
          <span className="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            My Lessons
          </span>{" "}
          📚
        </h1>

        <p className="text-gray-400 text-lg mt-3">
          Manage all your created lessons.
        </p>
      </div>

      {/* table */}
      <div className="overflow-x-auto bg-[#111827] border border-white/10 shadow-2xl rounded-[28px] backdrop-blur-xl">
        <table className="table text-[#CBD5E1] text-center">
          <thead className="bg-white/5  ">
            <tr className="border-b border-white/10">
              <th>#</th>

              <th>Title</th>

              <th>Category</th>

              <th>Privacy</th>

              <th>Access</th>

              <th>Created</th>

              <th>Reactions</th>

              <th>Favorites</th>

              <th>Actions</th>
            </tr>
          </thead>

<tbody>
  {lessons.length === 0 ? (
    <tr>
      <td
        colSpan="9"
        className="
          text-center
          py-16
          md:py-24
          px-4
        "
      >
        <div className="flex flex-col items-center">
          {/* icon */}
          <div
            className="
              w-20
              h-20
              md:w-28
              md:h-28
              rounded-full
              bg-indigo-500/10
              flex
              items-center
              justify-center
            "
          >
            <BookOpenCheck
              size={40}
              className="md:w-[60px] md:h-[60px] text-indigo-400"
            />
          </div>

          {/* title */}
          <h2
            className="
              mt-6
              md:mt-8
              text-2xl
              md:text-4xl
              font-black
              text-white
            "
          >
            No Lessons Found
          </h2>

          {/* description */}
          <p
            className="
              text-gray-400
              mt-4
              max-w-md
              leading-7
              md:leading-8
              text-sm
              md:text-base
            "
          >
            You have not created any
            lessons yet 🚀
          </p>
        </div>
      </td>
    </tr>
  ) : (
    lessons.map((lesson, index) => (
      <tr
        key={lesson._id}
        className="
          border-b
          border-white/5
          hover:bg-[#1A2335]
          transition-all
          duration-300
        "
      >
        {/* serial */}
        <td
          className="
            bg-gradient-to-r
            from-[#D8B4FE]
            via-[#A78BFA]
            to-[#818CF8]
            bg-clip-text
            text-transparent
            font-semibold
            text-xs
            md:text-sm
          "
        >
          {index + 1}
        </td>

        {/* title */}
        <td
          className="
            text-xs
            md:text-sm
            font-medium
            text-white
            min-w-[180px]
          "
        >
          <div className="line-clamp-2">
            {lesson.title}
          </div>
        </td>

        {/* category */}
        <td>
          <span
            className="
              px-3
              md:px-4
              py-2
              rounded-xl
              bg-indigo-500/10
              text-indigo-300
              border
              border-indigo-500/20
              text-[10px]
              md:text-xs
              font-semibold
              whitespace-nowrap
            "
          >
            {lesson.category}
          </span>
        </td>

        {/* privacy */}
        <td>
          <button
            onClick={() =>
              handlePrivacyChange(
                lesson._id,
                lesson.privacy
              )
            }
            className={`
              px-3
              md:px-4
              py-2
              rounded-xl
              text-[10px]
              md:text-xs
              font-semibold
              border
              whitespace-nowrap
              transition-all
              duration-300

              ${
                lesson.privacy === "Public"
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500 hover:text-white"
                  : "bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500 hover:text-white"
              }
            `}
          >
            {lesson.privacy}
          </button>
        </td>

        {/* access level */}
        <td>
          <button
            onClick={() =>
              handleAccessLevelChange(
                lesson._id,
                lesson.accessLevel
              )
            }
            className={`
              px-3
              md:px-4
              py-2
              rounded-xl
              text-[10px]
              md:text-xs
              font-semibold
              border
              whitespace-nowrap
              transition-all
              duration-300

              ${
                lesson.accessLevel === "Premium"
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500 hover:text-black"
                  : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500 hover:text-white"
              }
            `}
          >
            {lesson.accessLevel}
          </button>
        </td>

        {/* date */}
        <td
          className="
            text-indigo-200
            text-[10px]
            md:text-sm
            whitespace-nowrap
          "
        >
          {new Date(
            lesson.createdAt
          ).toLocaleDateString()}
        </td>

        {/* reactions */}
        <td
          className="
            text-center
            text-xs
            md:text-sm
          "
        >
          {lesson.reactionsCount || 0}
        </td>

        {/* favorites */}
        <td
          className="
            text-center
            text-xs
            md:text-sm
          "
        >
          {lesson.favoritesCount || 0}
        </td>

        {/* actions */}
        <td>
          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-2
            "
          >
            {/* details */}
            <Link
              to={`/lesson-details/${lesson._id}`}
              className="
                px-3
                md:px-4
                py-2
                rounded-xl
                bg-cyan-500/20
                text-cyan-300
                text-[10px]
                md:text-xs
                font-semibold
                text-center
                hover:bg-cyan-500
                hover:text-white
                transition-all
                duration-300
                whitespace-nowrap
              "
            >
              Details
            </Link>

            {/* update */}
            <Link
              to={`/dashboard/update-lesson/${lesson._id}`}
              className="
                px-3
                md:px-4
                py-2
                rounded-xl
                bg-warning/20
                text-warning
                text-[10px]
                md:text-xs
                font-semibold
                text-center
                hover:bg-warning
                hover:text-black
                transition-all
                duration-300
                whitespace-nowrap
              "
            >
              Update
            </Link>

            {/* delete */}
            <button
              onClick={() =>
                handleDelete(
                  lesson._id
                )
              }
              className="
                px-3
                md:px-4
                py-2
                rounded-xl
                bg-red-500/20
                text-red-400
                text-[10px]
                md:text-xs
                font-semibold
                hover:bg-red-500
                hover:text-white
                transition-all
                duration-300
                whitespace-nowrap
              "
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>
          
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
