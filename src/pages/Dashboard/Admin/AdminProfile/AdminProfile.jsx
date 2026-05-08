import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import useUser from "../../../../hooks/useUser";
// import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { BookOpen, Crown, Flag, Sparkles, Users } from "lucide-react";
import { Activity } from "react";


const AdminProfile = () => {
   const { user,updateUserProfile } = useAuth();

   const axiosSecure = useAxiosSecure();



const handleUpdateName = async() => {

   const result = await Swal.fire({

      title: "Update Name",

      input: "text",

      inputValue: user?.displayName,

      showCancelButton: true,

      confirmButtonText: "Update"
   });

   if(result.isConfirmed){

      const newName = result.value;

      try {

         // firebase update
         await updateUserProfile(
            newName,
            user?.photoURL
         );

         // mongodb update
         await axiosSecure.patch(

            `/users/profile/${user.email}`,

            {
               name: newName,
               photoURL: user?.photoURL
            }
         );

         toast.success(
            "Name updated successfully"
         );

      } catch(error){

         console.log(error);

         toast.error(
            "Failed to update name"
         );
      }
   }
};

const handleUpdatePhoto = async() => {

   const result = await Swal.fire({

      title: "Update Photo URL",

      input: "text",

      inputValue: user?.photoURL,

      showCancelButton: true,

      confirmButtonText: "Update"
   });

   if(result.isConfirmed){

      const newPhoto = result.value;

      try {

         // firebase update
         await updateUserProfile(
            user?.displayName,
            newPhoto
         );

         // mongodb update
         await axiosSecure.patch(

            `/users/profile/${user.email}`,

            {
               name: user?.displayName,
               photoURL: newPhoto
            }
         );

         toast.success(
            "Photo updated successfully"
         );

      } catch(error){

         console.log(error);

         toast.error(
            "Failed to update photo"
         );
      }
   }
};

   // admin stats
   const { data: stats = {} } = useQuery({

      queryKey: ['admin-stats-summary'],

      queryFn: async() => {

         const res =
         await axiosSecure.get(
            '/admin-stats'
         );

         return res.data;
      }
   });

   const { data: activity = {} } = useQuery({

   queryKey: [
      'admin-activity',
      user?.email
   ],

   enabled: !!user?.email,

   queryFn: async() => {

      const res =
      await axiosSecure.get(

         `/admin-activity/${user.email}`,
         {
      data: {
         adminEmail: user.email
      }
   }
      );

      return res.data;
   }
});

    return (

    <div className="px-4 md:px-8 py-10">

      {/* profile card */}
      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#111827]
          to-[#0F172A]
          border
          border-white/10
          rounded-[32px]
          shadow-2xl
          p-8 md:p-10
        "
      >

        {/* glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col xl:flex-row gap-10 xl:items-center">

          {/* image */}
          <div className="relative w-fit mx-auto xl:mx-0">

            <div className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-30"></div>

            <img
              src={
                user?.photoURL
                ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
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
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  bg-amber-500/10
                  text-amber-200
                  border
                  border-amber-500/20
                  font-semibold
                  backdrop-blur-xl
                "
              >

                <Crown size={18} />

                Admin

              </div>

            </div>

          </div>

          {/* info */}
          <div className="flex-1 text-center xl:text-left">

            <h1 className="text-4xl md:text-5xl font-black text-white">
              {user?.displayName}
            </h1>

            <p className="text-gray-400 text-lg mt-4">
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

      {/* activity summary */}
      <div className="mt-16">

        <div className="flex items-center gap-4 mb-10">

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-primary/10
              border
              border-primary/20
              flex
              items-center
              justify-center
            "
          >

            <Sparkles className="text-primary" />

          </div>

          <div>

            <h2 className="text-3xl md:text-4xl font-black text-white">
              Activity Summary 📊
            </h2>

            <p className="text-gray-400 mt-2">
              Platform analytics overview
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {/* users */}
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

                <p className="text-gray-400">
                  Total Users
                </p>

                <h2 className="text-5xl font-black text-indigo-300 mt-5">
                  {stats.totalUsers || 0}
                </h2>

              </div>

              <Users
                size={45}
                className="text-indigo-300"
              />

            </div>

          </div>

          {/* lessons */}
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

                <p className="text-gray-400">
                  Public Lessons
                </p>

                <h2 className="text-5xl font-black text-emerald-300 mt-5">
                  {stats.totalLessons || 0}
                </h2>

              </div>

              <BookOpen
                size={45}
                className="text-emerald-300"
              />

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

                <p className="text-gray-400">
                  Reports Reviewed
                </p>

                <h2 className="text-5xl font-black text-rose-300 mt-5">
                  {stats.totalReports || 0}
                </h2>

              </div>

              <Flag
                size={45}
                className="text-rose-300"
              />

            </div>

          </div>

          {/* today */}
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

                <p className="text-gray-400">
                  Today's Lessons
                </p>

                <h2 className="text-5xl font-black text-amber-300 mt-5">
                  {stats.todaysLessons || 0}
                </h2>

              </div>

              <Activity
                size={45}
                className="text-amber-300"
              />

            </div>

          </div>

        </div>

      </div>

      {/* quick actions */}
      <div className="mt-16">

        <h2 className="text-3xl md:text-4xl font-black text-white mb-10">
          Quick Admin Actions ⚡
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8">

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

            <p className="text-gray-400 mt-4">
              Total Actions
            </p>

          </div>

          {/* deleted */}
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

            <p className="text-gray-400 mt-4">
              Deleted Lessons
            </p>

          </div>

          {/* featured */}
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

            <h2 className="text-5xl font-black text-purple-300">
              {activity.featuredLessons || 0}
            </h2>

            <p className="text-gray-400 mt-4">
              Featured Lessons
            </p>

          </div>

          {/* reviewed */}
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
              {activity.reviewedLessons || 0}
            </h2>

            <p className="text-gray-400 mt-4">
              Reviewed Lessons
            </p>

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

            <p className="text-gray-400 mt-4">
              Ignored Reports
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;