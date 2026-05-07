import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
// import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


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

      <div className="p-6">

         {/* profile card */}
         <div className="bg-base-100 shadow-xl rounded-2xl p-8">

            <div className="flex flex-col md:flex-row gap-8 items-center">

               {/* image */}
               <div className="relative">

                  <img
                     src={
                        user?.photoURL
                        ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                     }
                     alt=""
                     className="w-40 h-40 rounded-full object-cover border-4 border-error"
                  />

                  {/* admin badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">

                     <div className="badge badge-error p-4 text-white font-semibold">

                        Admin 👑

                     </div>

                  </div>

               </div>

               {/* info */}
               <div className="space-y-4 text-center md:text-left">

                  <h1 className="text-4xl font-bold">

                     {user?.displayName}

                  </h1>

                  <p className="text-gray-500 text-lg">

                     {user?.email}

                  </p>

                  <p className="text-gray-500 leading-7 max-w-2xl">

                     Platform administrator responsible for
                     monitoring lessons, managing users,
                     reviewing reports, and maintaining
                     overall community quality.

                  </p>

                  {/* update buttons */}
                  <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">

                   <button
   onClick={handleUpdateName}
   className="btn btn-primary rounded-full"
>

   Update Name

</button>

                     <button
   onClick={handleUpdatePhoto}
   className="btn btn-outline rounded-full"
>

   Update Photo

</button>

                  </div>

               </div>

            </div>

         </div>

         {/* activity summary */}
         <div className="mt-12">

            <h2 className="text-3xl font-bold mb-6">

               Activity Summary 📊

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

               {/* users */}
               <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

                  <h2 className="text-5xl font-black text-primary">

                     {stats.totalUsers || 0}

                  </h2>

                  <p className="mt-3 text-gray-500">

                     Total Users

                  </p>

               </div>

               {/* lessons */}
               <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

                  <h2 className="text-5xl font-black text-success">

                     {stats.totalLessons || 0}

                  </h2>

                  <p className="mt-3 text-gray-500">

                     Public Lessons

                  </p>

               </div>

               {/* reports */}
               <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

                  <h2 className="text-5xl font-black text-error">

                     {stats.totalReports || 0}

                  </h2>

                  <p className="mt-3 text-gray-500">

                     Reports Reviewed

                  </p>

               </div>

               {/* today lessons */}
               <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

                  <h2 className="text-5xl font-black text-warning">

                     {stats.todaysLessons || 0}

                  </h2>

                  <p className="mt-3 text-gray-500">

                     Today's Lessons

                  </p>

               </div>

            </div>

         </div>

        

         {/* activity summary */}
<div className="mt-14">

   <h2 className="text-3xl font-black mb-8">

       Quick Admin Actions ⚡

   </h2>

   <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

      {/* total */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

         <h2 className="text-5xl font-black text-primary">

            {activity.totalActions || 0}

         </h2>

         <p className="mt-3 text-gray-500">

            Total Actions

         </p>

      </div>

      {/* deleted */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

         <h2 className="text-5xl font-black text-error">

            {activity.deletedLessons || 0}

         </h2>

         <p className="mt-3 text-gray-500">

            Deleted Lessons

         </p>

      </div>

      {/* featured */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

         <h2 className="text-5xl font-black text-warning">

            {activity.featuredLessons || 0}

         </h2>

         <p className="mt-3 text-gray-500">

            Featured Lessons

         </p>

      </div>

      {/* reviewed */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

         <h2 className="text-5xl font-black text-success">

            {activity.reviewedLessons || 0}

         </h2>

         <p className="mt-3 text-gray-500">

            Reviewed Lessons

         </p>

      </div>

      {/* ignored */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 text-center">

         <h2 className="text-5xl font-black text-secondary">

            {activity.ignoredReports || 0}

         </h2>

         <p className="mt-3 text-gray-500">

            Ignored Reports

         </p>

      </div>

   </div>

</div>

      </div>
   );
};
export default AdminProfile;