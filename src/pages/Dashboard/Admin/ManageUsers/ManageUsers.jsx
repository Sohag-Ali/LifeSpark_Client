import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Shield, Trash2 } from "lucide-react";


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

      <div className="p-6 md:p-10">

         {/* heading */}
         <div className="mb-10">

            <h1 className="text-5xl font-black">

               Manage Users 👥

            </h1>

            <p className="text-gray-500 mt-3">

               Manage all registered users

            </p>

         </div>

         {/* table */}
         <div className="overflow-x-auto bg-base-100 rounded-[30px] shadow-xl">

            <table className="table">

               <thead>

                  <tr>

                     <th>#</th>

                     <th>User</th>

                     <th>Role</th>

                     <th>Total Lessons</th>

                     <th>Actions</th>

                  </tr>

               </thead>

               <tbody>

                  {
                     users.map((user, index) => (

                        <tr key={user._id}>

                           {/* serial */}
                           <td>

                              {index + 1}

                           </td>

                           {/* user */}
                           <td>

                              <div className="flex items-center gap-4">

                                 <img
                                    src={
                                       user.photoURL
                                       ||
                                       "https://i.ibb.co/4pDNDk1/avatar.png"
                                    }
                                    className="w-14 h-14 rounded-full object-cover"
                                 />

                                 <div>

                                    <h2 className="font-bold">

                                       {user.name}

                                    </h2>

                                    <p className="text-sm text-gray-500">

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
                                    <div className="badge badge-error p-4">

                                       Admin

                                    </div>
                                 )
                                 :
                                 (
                                    <div className="badge badge-primary p-4">

                                       User

                                    </div>
                                 )
                              }

                           </td>

                           {/* lessons */}
                           <td>

                              <h2 className="font-bold">

                                 {user.totalLessons}

                              </h2>

                           </td>

                           {/* actions */}
                           <td>

                              <div className="flex gap-3">

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
                                          className="btn btn-primary btn-sm rounded-full"
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
                                    className="btn btn-error btn-sm rounded-full"
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