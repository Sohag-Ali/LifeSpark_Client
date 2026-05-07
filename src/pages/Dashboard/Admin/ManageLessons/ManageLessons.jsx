import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ManageLessons = () => {
     const axiosSecure = useAxiosSecure();

   // filters
   const [category, setCategory] =
   useState("");

   const [privacy, setPrivacy] =
   useState("");

   const [flagged, setFlagged] =
   useState("");

   // stats
   const { data: stats = {} } = useQuery({

      queryKey: ['lesson-stats'],

      queryFn: async() => {

         const res =
         await axiosSecure.get(
            '/lesson-stats'
         );

         return res.data;
      }
   });

   // lessons
   const {
      data: lessons = [],
      refetch
   } = useQuery({

      queryKey: [
         'admin-lessons',
         category,
         privacy,
         flagged
      ],

      queryFn: async() => {

         const res =
         await axiosSecure.get(

            `/admin-lessons?category=${category}&privacy=${privacy}&flagged=${flagged}`

         );

         return res.data;
      }
   });

   // delete
   const handleDelete = async(id) => {

      const result =
      await Swal.fire({

         title: "Delete Lesson?",

         text: "This lesson will be removed permanently",

         icon: "warning",

         showCancelButton: true,

         confirmButtonText: "Delete"
      });

      if(result.isConfirmed){

         const res =
         await axiosSecure.delete(

            `/admin-lessons/${id}`
         );

         if(res.data.deletedCount){

            toast.success(
               "Lesson deleted"
            );

            refetch();
         }
      }
   };

   // feature
   const handleFeature = async(id, featured) => {

      const res =
      await axiosSecure.patch(

         `/featured-lessons/${id}`,

         {
            featured: !featured
         }
      );

      if(res.data.modifiedCount){

         toast.success(
            featured
            ?
            "Removed from featured"
            :
            "Lesson featured"
         );

         refetch();
      }
   };

   // review
   const handleReview = async(id) => {

      const res =
      await axiosSecure.patch(

         `/reviewed-lessons/${id}`
      );

      if(res.data.modifiedCount){

         toast.success(
            "Lesson reviewed"
         );

         refetch();
      }
   };

   return (

      <div className="p-6 md:p-10">

         {/* heading */}
         <div className="mb-10">

            <h1 className="text-5xl font-black">

               Manage Lessons 📚

            </h1>

            <p className="text-gray-500 mt-3">

               Monitor and moderate all lessons

            </p>

         </div>

         {/* stats */}
         <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-base-100 rounded-[30px] shadow-xl p-8 text-center">

               <h2 className="text-5xl font-black text-primary">

                  {stats.publicLessons || 0}

               </h2>

               <p className="mt-3 text-gray-500">

                  Public Lessons

               </p>

            </div>

            <div className="bg-base-100 rounded-[30px] shadow-xl p-8 text-center">

               <h2 className="text-5xl font-black text-warning">

                  {stats.privateLessons || 0}

               </h2>

               <p className="mt-3 text-gray-500">

                  Private Lessons

               </p>

            </div>

            <div className="bg-base-100 rounded-[30px] shadow-xl p-8 text-center">

               <h2 className="text-5xl font-black text-error">

                  {stats.flaggedLessons || 0}

               </h2>

               <p className="mt-3 text-gray-500">

                  Flagged Lessons

               </p>

            </div>

         </div>

         {/* filters */}
         <div className="flex flex-wrap gap-4 mb-8">

            {/* category */}
            <select
               className="select select-bordered"
               onChange={(e) =>
                  setCategory(e.target.value)
               }
            >

               <option value="">
                  All Categories
               </option>

               <option>
                  Personal Growth
               </option>

               <option>
                  Career
               </option>

               <option>
                  Mindset
               </option>

            </select>

            {/* privacy */}
            <select
               className="select select-bordered"
               onChange={(e) =>
                  setPrivacy(e.target.value)
               }
            >

               <option value="">
                  All Visibility
               </option>

               <option>
                  Public
               </option>

               <option>
                  Private
               </option>

            </select>

            {/* flagged */}
            <select
               className="select select-bordered"
               onChange={(e) =>
                  setFlagged(e.target.value)
               }
            >

               <option value="">
                  All Lessons
               </option>

               <option value="true">
                  Flagged Only
               </option>

            </select>

         </div>

         {/* table */}
         <div className="overflow-x-auto bg-base-100 rounded-[30px] shadow-xl">

            <table className="table">

               <thead>

                  <tr>

                     <th>Lesson</th>

                     <th>Category</th>

                     <th>Visibility</th>

                     <th>Status</th>

                     <th>Actions</th>

                  </tr>

               </thead>

               <tbody>

                  {
                     lessons.map(lesson => (

                        <tr key={lesson._id}>

                           {/* lesson */}
                           <td>

                              <div className="flex items-center gap-4">

                                 <img
                                    src={lesson.image}
                                    className="w-16 h-16 rounded-xl object-cover"
                                 />

                                 <div>

                                    <h2 className="font-bold">

                                       {lesson.title}

                                    </h2>

                                    <p className="text-sm text-gray-500">

                                       {lesson.creatorName}

                                    </p>

                                 </div>

                              </div>

                           </td>

                           {/* category */}
                           <td>

                              <div className="badge badge-primary">

                                 {lesson.category}

                              </div>

                           </td>

                           {/* visibility */}
                           <td>

                              <div
                                 className={`badge ${
                                    lesson.privacy === "Public"
                                    ?
                                    "badge-success"
                                    :
                                    "badge-warning"
                                 }`}
                              >

                                 {lesson.privacy}

                              </div>

                           </td>

                           {/* status */}
                           <td>

                              <div className="space-y-2">

                                 {
                                    lesson.isFeatured &&
                                    (
                                       <div className="badge badge-secondary">

                                          Featured

                                       </div>
                                    )
                                 }

                                 {
                                    lesson.isReviewed &&
                                    (
                                       <div className="badge badge-success">

                                          Reviewed

                                       </div>
                                    )
                                 }

                                 {
                                    lesson.reportCount > 0 &&
                                    (
                                       <div className="badge badge-error">

                                          Flagged

                                       </div>
                                    )
                                 }

                              </div>

                           </td>

                           {/* actions */}
                           <td>

                              <div className="flex flex-wrap gap-2">

                                 {/* feature */}
                                 <button
                                    onClick={() =>
                                       handleFeature(
                                          lesson._id,
                                          lesson.isFeatured
                                       )
                                    }
                                    className="btn btn-secondary btn-sm rounded-full"
                                 >

                                    <Star size={16} />

                                 </button>

                                 {/* review */}
                                 <button
                                    onClick={() =>
                                       handleReview(
                                          lesson._id
                                       )
                                    }
                                    className="btn btn-success btn-sm rounded-full"
                                 >

                                    <ShieldCheck size={16} />

                                 </button>

                                 {/* delete */}
                                 <button
                                    onClick={() =>
                                       handleDelete(
                                          lesson._id
                                       )
                                    }
                                    className="btn btn-error btn-sm rounded-full"
                                 >

                                    <Trash2 size={16} />

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


export default ManageLessons;