import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Crown, Shield, Sparkles, Trash2, Users } from "lucide-react";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

   // fetch users
   const {
      data: users = [],
      refetch
   } = useQuery({

      queryKey: ['users'],

      queryFn: async() => {

         const res =
         await axiosSecure.get('/users');

         return res.data;
      }
   });

   // make admin
   const handleMakeAdmin = async(id) => {

      try {

         const res =
         await axiosSecure.patch(

            `/users/admin/${id}`
         );

         if(res.data.modifiedCount){

            toast.success(
               "User promoted to admin"
            );

            refetch();
         }

      } catch(error){

         console.log(error);
      }
   };

   // delete user
   const handleDelete = async(id) => {

      const result =
      await Swal.fire({

         title: "Are you sure?",

         text: "User will be deleted permanently",

         icon: "warning",

         showCancelButton: true,

         confirmButtonText: "Yes, Delete"
      });

      if(result.isConfirmed){

         try {

            const res =
            await axiosSecure.delete(

               `/users/${id}`
            );

            if(res.data.deletedCount){

               toast.success(
                  "User deleted"
               );

               refetch();
            }

         } catch(error){

            console.log(error);
         }
      }
   };

   return (

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

            <Sparkles
              size={30}
              className="text-primary"
            />

          </div>

          <div>

            <h1 className="text-4xl md:text-5xl font-black text-white">
              Manage Users 👥
            </h1>

            <p className="text-gray-400 text-lg mt-3">
              Manage all registered users
            </p>

          </div>

        </div>

      </div>

      {/* stats */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        {/* total users */}
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

          <h2 className="text-5xl font-black text-indigo-300">
            {users.length}
          </h2>

          <p className="text-gray-400 mt-4">
            Total Users
          </p>

        </div>

        {/* admins */}
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

          <h2 className="text-5xl font-black text-amber-300">
            {
              users.filter(
                user => user.role === "admin"
              ).length
            }
          </h2>

          <p className="text-gray-400 mt-4">
            Total Admins
          </p>

        </div>

        {/* creators */}
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

          <h2 className="text-5xl font-black text-emerald-300">
            {
              users.filter(
                user => user.totalLessons > 0
              ).length
            }
          </h2>

          <p className="text-gray-400 mt-4">
            Active Creators
          </p>

        </div>

      </div>

      {/* table */}
      <div
        className="
          overflow-x-auto
          bg-gradient-to-br
          from-[#111827]
          to-[#0F172A]
          border
          border-white/10
          rounded-[32px]
          shadow-2xl
        "
      >

        <table className="table text-white">

          <thead>

            <tr className="border-b border-white/10 text-gray-300">

              <th className="py-6">
                #
              </th>

              <th>
                User
              </th>

              <th>
                Role
              </th>

              <th>
                Lessons
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              users.map((user, index) => (

                <tr
                  key={user._id}
                  className="
                    border-b
                    border-white/5
                    hover:bg-white/[0.03]
                    transition-all
                    duration-300
                  "
                >

                  {/* serial */}
                  <td className="font-semibold text-gray-400">

                    {index + 1}

                  </td>

                  {/* user */}
                  <td className="py-5">

                    <div className="flex items-center gap-5">

                      {/* image */}
                      <div className="relative">

                        <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-20"></div>

                        <img
                          src={
                            user.photoURL
                            ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          className="
                            relative
                            w-16
                            h-16
                            rounded-full
                            object-cover
                            border
                            border-white/10
                          "
                        />

                      </div>

                      {/* content */}
                      <div>

                        <h2 className="font-bold text-lg text-white">
                          {user.name}
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* role */}
                  <td>

                    {
                      user.role === "admin"
                      ?
                      (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-full
                            bg-amber-500/10
                            text-amber-200
                            border
                            border-amber-500/20
                            text-xs
                            font-semibold
                          "
                        >

                          <Crown size={14} />

                          Admin

                        </span>
                      )
                      :
                      (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-full
                            bg-indigo-500/10
                            text-indigo-200
                            border
                            border-indigo-500/20
                            text-xs
                            font-semibold
                          "
                        >

                          <Users size={14} />

                          User

                        </span>
                      )
                    }

                  </td>

                  {/* lessons */}
                  <td>

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        bg-emerald-500/10
                        text-emerald-200
                        border
                        border-emerald-500/20
                        text-sm
                        font-semibold
                      "
                    >

                      {user.totalLessons}

                    </div>

                  </td>

                  {/* actions */}
                  <td>

                    <div className="flex items-center gap-3">

                      {/* make admin */}
                      {
                        user.role !== "admin" &&
                        (
                          <button
                            onClick={() =>
                              handleMakeAdmin(
                                user._id
                              )
                            }
                            className="
                              px-5
                              py-3
                              rounded-2xl
                              bg-indigo-500/10
                              text-indigo-200
                              border
                              border-indigo-500/20
                              flex
                              items-center
                              gap-2
                              font-semibold
                              hover:bg-indigo-500
                              hover:text-white
                              transition-all
                              duration-300
                            "
                          >

                            <Shield size={18} />

                            Make Admin

                          </button>
                        )
                      }

                      {/* delete */}
                      <button
                        onClick={() =>
                          handleDelete(
                            user._id
                          )
                        }
                        className="
                          w-12
                          h-12
                          rounded-2xl
                          bg-rose-500/10
                          text-rose-300
                          border
                          border-rose-500/20
                          flex
                          items-center
                          justify-center
                          hover:bg-rose-500
                          hover:text-white
                          transition-all
                          duration-300
                        "
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
};



export default ManageUsers;