import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import useUser from "../../../../hooks/useUser";
// import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Bookmark, BookOpen, Crown, Flag, Sparkles, Users } from "lucide-react";
import { Link } from "react-router";
import useTitle from "../../../../hooks/useTitle";

const AdminProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  //User Name Update Button Handle and Api
  const handleUpdateName = async () => {
    const result = await Swal.fire({
      title: "Update Name",

      input: "text",

      inputValue: user?.displayName,

      showCancelButton: true,

      confirmButtonText: "Update",
    });

    if (result.isConfirmed) {
      const newName = result.value;

      try {
        // firebase update
        await updateUserProfile(newName, user?.photoURL);

        // mongodb update
        await axiosSecure.patch(
          `/users/profile/${user.email}`,

          {
            name: newName,
            photoURL: user?.photoURL,
          },
        );

        toast.success("Name updated successfully");
      } catch (error) {
        console.log(error);

        toast.error("Failed to update name");
      }
    }
  };

  //Photo Update Api Clled And Button Handle
  const handleUpdatePhoto = async () => {
    const result = await Swal.fire({
      title: "Update Photo URL",

      input: "text",

      inputValue: user?.photoURL,

      showCancelButton: true,

      confirmButtonText: "Update",
    });

    if (result.isConfirmed) {
      const newPhoto = result.value;

      try {
        // firebase update
        await updateUserProfile(user?.displayName, newPhoto);

        // mongodb update
        await axiosSecure.patch(
          `/users/profile/${user.email}`,

          {
            name: user?.displayName,
            photoURL: newPhoto,
          },
        );

        toast.success("Photo updated successfully");
      } catch (error) {
        console.log(error);

        toast.error("Failed to update photo");
      }
    }
  };

  // Admin Lesson Show Api
  const { data: publicLessons = [] } = useQuery({
    queryKey: ["public-lessons", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/public-lessons/${user.email}`);

      return res.data;
    },
  });

  // Admin actitity Query Api
  const { data: activity = {} } = useQuery({
    queryKey: ["admin-activity", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-activity/${user.email}`, {
        data: {
          adminEmail: user.email,
        },
      });

      return res.data;
    },
  });

  //User Summery Api called Query
  const { data: summary = {} } = useQuery({
    queryKey: ["user-summary", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/user-summary/${user.email}`);

      return res.data;
    },
  });

  return (
    useTitle("Admin Profile"),
    <div className="px-4 md:px-8 py-10">
      {/* profile card for Admin User */}
      <div className=" relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0F172A] border border-white/10 rounded-[32px] shadow-2xl p-8 md:p-10">
        {/* glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col xl:flex-row gap-10 xl:items-center">
          {/* image Admin User*/}
          <div className="relative w-fit mx-auto xl:mx-0">
            <div className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-30"></div>

            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              className="
                relative
                w-44
                h-44
                rounded-full
                object-cover
                border-4
                border-primary/30
                shadow-2xl
              "
            />

            {/* badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <div
                className=" inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500/10 text-amber-200 border border-amber-500/20 font-semibold backdrop-blur-xl
                "
              >
                <Crown size={18} />
                Admin
              </div>
            </div>
          </div>

          {/* info Admin User Show in Profile page  */}
          <div className="flex-1 text-center xl:text-left">
            <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {user?.displayName}
            </h1>

            <p className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent text-lg mt-4">
              {user?.email}
            </p>

            <p className="text-gray-400 leading-8 mt-6 max-w-3xl">
              Platform administrator responsible for monitoring lessons,
              managing users, reviewing reports, and maintaining overall
              community quality.
            </p>

            {/* buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center xl:justify-start">
              {/* update name */}
              <button
                onClick={handleUpdateName}
                className="
                  px-6
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#6366F1]
                  to-[#A855F7]
                  text-white
                  font-semibold
                  hover:shadow-xl
                  hover:shadow-purple-500/20
                  transition-all
                  duration-300
                "
              >
                Update Name
              </button>

              {/* update photo */}
              <button
                onClick={handleUpdatePhoto}
                className="
                  px-6
                  py-4
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/10
                  text-[#EEF2FF]
                  font-semibold
                  hover:border-primary/30
                  hover:bg-primary/5
                  transition-all
                  duration-300
                "
              >
                Update Photo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* personal summary */}
      <div className="mt-16">
        {/* heading */}
        <div className="flex items-center gap-4 mb-10">
          <div className=" w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Sparkles className="text-primary" />
          </div>

          <div>
            <h2 className="text-2xl md:text-4xl font-black text-white">
              <span className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
                Personal Activity
              </span>{" "}
              📈
            </h2>

            <p className="text-gray-400 mt-2">
              Your platform contribution summary
            </p>
          </div>
        </div>

        {/* cards for summary show in Admin Profile page */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* total lessons */}
          <div className=" bg-gradient-to-br from-[#111827] to-[#0F172A] border border-white/10 rounded-[30px] p-8 shadow-2xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Total Lessons</p>

                <h2 className="text-5xl font-black text-indigo-300 mt-5">
                  {summary.totalLessons || 0}
                </h2>
              </div>

              <BookOpen size={45} className="text-indigo-300" />
            </div>
          </div>

          {/* public lessons */}
          <div
            className="
        bg-gradient-to-br
        from-[#111827]
        to-[#0F172A]
        border
        border-white/10
        rounded-[30px]
        p-8
        shadow-2xl
      "
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Public Lessons</p>

                <h2 className="text-5xl font-black text-emerald-300 mt-5">
                  {summary.publicLessons || 0}
                </h2>
              </div>

              <Users size={45} className="text-emerald-300" />
            </div>
          </div>

          {/* saved */}
          <div
            className="
        bg-gradient-to-br
        from-[#111827]
        to-[#0F172A]
        border
        border-white/10
        rounded-[30px]
        p-8
        shadow-2xl
      "
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Saved Lessons</p>

                <h2 className="text-5xl font-black text-amber-300 mt-5">
                  {summary.totalSaved || 0}
                </h2>
              </div>

              <Bookmark size={45} className="text-amber-300" />
            </div>
          </div>

          {/* reports */}
          <div
            className="
        bg-gradient-to-br
        from-[#111827]
        to-[#0F172A]
        border
        border-white/10
        rounded-[30px]
        p-8
        shadow-2xl
      "
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Reports Submitted</p>

                <h2 className="text-5xl font-black text-rose-300 mt-5">
                  {summary.totalReports || 0}
                </h2>
              </div>

              <Flag size={45} className="text-rose-300" />
            </div>
          </div>
        </div>
      </div>

      {/* quick actions */}
      <div className="mt-16">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-10">
          <span className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
            Quick Admin Actions
          </span>{" "}
          ⚡
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 grid-wrap gap-8">
          {/* total */}
          <div
            className="
              bg-gradient-to-br
              from-[#111827]
              to-[#0F172A]
              border
              border-white/10
              rounded-[30px]
              p-8
              text-center
              shadow-2xl
            "
          >
            <h2 className="text-5xl font-black text-primary">
              {activity.totalActions || 0}
            </h2>

            <p className="text-gray-400 mt-4">Total Actions</p>
          </div>

          {/* deleted lessons */}
          <div
            className="
              bg-gradient-to-br
              from-[#111827]
              to-[#0F172A]
              border
              border-white/10
              rounded-[30px]
              p-8
              text-center
              shadow-2xl
            "
          >
            <h2 className="text-5xl font-black text-rose-300">
              {activity.deletedLessons || 0}
            </h2>

            <p className="text-gray-400 mt-4">Deleted Lessons</p>
          </div>

          {/* reviewed */}
          <div
            className=" bg-gradient-to-br from-[#111827] to-[#0F172A] border border-white/10 rounded-[30px] p-8 text-center shadow-2xl
            "
          >
            <h2 className="text-5xl font-black text-purple-300">
              {activity.reviewedLessons || 0}
            </h2>

            <p className="text-gray-400 mt-4">Reviewed Lessons</p>
          </div>

          {/* deleted users */}
          <div
            className="
              bg-gradient-to-br
              from-[#111827]
              to-[#0F172A]
              border
              border-white/10
              rounded-[30px]
              p-8
              text-center
              shadow-2xl
            "
          >
            <h2 className="text-5xl font-black text-red-500">
              {activity.deletedUsers || 0}
            </h2>

            <p className="text-gray-400 mt-4">Deleted Users</p>
          </div>

          {/* banned users */}
          <div
            className="
    bg-gradient-to-br
    from-[#111827]
    to-[#0F172A]
    border
    border-white/10
    rounded-[30px]
    p-8
    text-center
    shadow-2xl
  "
          >
            <h2 className="text-5xl font-black text-pink-600">
              {activity.bannedUsers || 0}
            </h2>

            <p className="text-gray-400 mt-4">Banned Users</p>
          </div>

          {/* Unban User */}
          <div
            className="
    bg-gradient-to-br
    from-[#111827]
    to-[#0F172A]
    border
    border-white/10
    rounded-[30px]
    p-8
    text-center
    shadow-2xl
  "
          >
            <h2 className="text-5xl font-black text-emerald-300">
              {activity.unbannedUsers || 0}
            </h2>

            <p className="text-gray-400 mt-4">Unbanned Users</p>
          </div>

          {/* ignored */}
          <div
            className="
              bg-gradient-to-br
              from-[#111827]
              to-[#0F172A]
              border
              border-white/10
              rounded-[30px]
              p-8
              text-center
              shadow-2xl
            "
          >
            <h2 className="text-5xl font-black text-cyan-300">
              {activity.ignoredReports || 0}
            </h2>

            <p className="text-gray-400 mt-4">Ignored Reports</p>
          </div>

          {/* Admin user */}
          <div
            className="
    bg-gradient-to-br
    from-[#111827]
    to-[#0F172A]
    border
    border-white/10
    rounded-[30px]
    p-8
    text-center
    shadow-2xl
  "
          >
            <h2 className="text-5xl font-black text-amber-300">
              {activity.madeAdmins || 0}
            </h2>

            <p className="text-gray-400 mt-4">Made Admins</p>
          </div>
        </div>
      </div>

      {/* public lessons */}
      <div className="mt-16">
        {/* heading */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl  text-white">
            <span className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent font-bold">
              My Public Lessons
            </span>{" "}
            📚
          </h2>

          <p className="text-gray-400 mt-3 text-lg">
            Lessons you shared with the community
          </p>
        </div>

        {/* no lessons */}
        {!publicLessons || publicLessons === 0 ? (
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
                  bg-primary/10
                  border
                  border-primary/20
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-8
                "
            >
              <BookOpen size={40} className="text-primary" />
            </div>

            <h2 className="text-4xl font-black text-white">
              No Public Lessons Yet
            </h2>

            <p className="text-gray-400 mt-4 text-lg">
              Start sharing your life experiences with others.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {publicLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="
                      group
                      relative
                      overflow-hidden
                      bg-gradient-to-br
                      from-[#111827]
                      to-[#0F172A]
                      border
                      border-white/10
                      rounded-[30px]
                      shadow-2xl
                      hover:-translate-y-2
                      hover:border-primary/30
                      transition-all
                      duration-300
                    "
              >
                {/* image */}
                <div className="relative overflow-hidden">
                  <img
                    src={lesson.image}
                    alt=""
                    className="
                          h-56
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>

                  {/* category */}
                  <div className="absolute top-5 left-5">
                    <span
                      className="
                            px-4
                            py-2
                            rounded-full
                            bg-primary/20
                            text-primary
                            border
                            border-primary/20
                            text-xs
                            font-semibold
                            backdrop-blur-xl
                          "
                    >
                      {lesson.category}
                    </span>
                  </div>
                  {/* lesson length */}
                  <div className=" absolute top-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-semibold shadow-lg">
                    {Math.ceil(lesson.description?.split(" ").length / 200)} min
                    read
                  </div>
                </div>

                {/* content */}
                <div className="p-7">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent  line-clamp-2">
                    {lesson.title}
                  </h2>

                  <p className="text-gray-400 mt-4 leading-7 line-clamp-3">
                    {lesson.description}
                  </p>

                  {/* bottom */}
                  <div className="mt-8 flex items-center justify-between">
                    {/* emotional tone */}
                    <span
                      className="
                            px-4
                            py-2
                            rounded-full
                            bg-pink-500/10
                            text-pink-200
                            border
                            border-pink-500/20
                            text-xs
                            font-semibold
                          "
                    >
                      {lesson.emotionalTone}
                    </span>

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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
