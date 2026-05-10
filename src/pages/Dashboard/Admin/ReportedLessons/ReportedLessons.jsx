import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AlertTriangle, Eye, ShieldAlert, Trash2, XCircle } from "lucide-react";


const ReportedLessons = () => {
    const axiosSecure = useAxiosSecure();

   const [selectedReports, setSelectedReports] = useState([]);

   // fetch reported lessons
   const {
      data: lessons = [],
      refetch
   } = useQuery({

      queryKey: ['reported-lessons'],

      queryFn: async() => {

         const res =
         await axiosSecure.get(
            '/reported-lessons'
         );

         return res.data;
      }
   });

   // show reports modal
   const handleViewReports = async(id) => {

      const res =
      await axiosSecure.get(

         `/lesson-reports/${id}`
      );

      setSelectedReports(res.data);

      document
      .getElementById('report_modal')
      .showModal();
   };

   // ignore reports
   const handleIgnore = async(id) => {

      const res =
      await axiosSecure.patch(

         `/ignore-reports/${id}`
      );

      if(res.data.success){

         toast.success(
            "Reports ignored"
         );

         refetch();
      }
   };

   // delete lesson
   const handleDelete = async(id) => {

      const result =
      await Swal.fire({

         title: "Delete lesson?",

         icon: "warning",

         showCancelButton: true,

         confirmButtonText: "Delete"
      });

      if(result.isConfirmed){

         const res =
         await axiosSecure.delete(

            `/lessons/${id}`
         );

         if(res.data.deletedCount){

            toast.success(
               "Lesson deleted"
            );

            refetch();
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
                     bg-rose-500/10
                     border
                     border-rose-500/20
                     flex
                     items-center
                     justify-center
                  "
               >

                  <ShieldAlert
                     size={30}
                     className="text-rose-300"
                  />

               </div>

               <div>

                  <h1 className="text-4xl md:text-5xl font-black text-white">

                     <span
                        className="
                           bg-gradient-to-r
                           from-rose-400
                           via-pink-500
                           to-red-500
                           bg-clip-text
                           text-transparent
                        "
                     >

                        Reported Lessons

                     </span>

                     🚩

                  </h1>

                  <p className="text-gray-400 text-lg mt-3">

                     Review and moderate community reported lessons

                  </p>

               </div>

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

            <table className="table text-white ">

               <thead>

                  <tr
                     className="
                        border-b
                        border-white/10
                        text-gray-300
                        text-center
                     "
                  >

                     <th className="py-6">

                        Lesson

                     </th>

                     <th>

                        Reports

                     </th>

                     <th>

                        Actions

                     </th>

                  </tr>

               </thead>

              <tbody>

   {
      lessons.length === 0

      ?

      <tr>

         <td
            colSpan="3"
            className="
               text-center
               py-20
            "
         >

            <div className="flex flex-col items-center">

               {/* icon */}
               <AlertTriangle
                  size={70}
                  className="text-rose-400"
               />

               {/* title */}
               <h2
                  className="
                     mt-8
                     text-4xl
                     font-black
                     text-white
                  "
               >

                  No Reports Found

               </h2>

               {/* description */}
               <p
                  className="
                     text-gray-400
                     mt-4
                     max-w-md
                     leading-8
                  "
               >

                  There are currently no
                  reported lessons available 🚀

               </p>

            </div>

         </td>

      </tr>

      :

      lessons.map(lesson => (

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
            <td className="py-5">

               <div className="flex items-center gap-5">

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

                  <div>

                     <h2 className="font-bold text-lg text-white">

                        {lesson.title}

                     </h2>

                     <p className="text-sm bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent mt-2">

                        {lesson.creatorName}

                     </p>

                  </div>

               </div>

            </td>

            {/* reports */}
            <td className="text-center">

               <div
                  className="
                     inline-flex
                     items-center
                     gap-2
                     px-5
                     py-3
                     rounded-full
                     bg-rose-500/10
                     text-rose-200
                     border
                     border-rose-500/20
                     font-semibold
                  "
               >

                  <AlertTriangle size={16} />

                  {lesson.reportCount}

                  <span>Reports</span>

               </div>

            </td>

            {/* actions */}
            <td>

               <div className="flex flex-wrap gap-3 items-center justify-center">

                  {/* view */}
                  <button
                     onClick={() =>
                        handleViewReports(
                           lesson._id
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

                     <Eye size={18} />

                     Reasons

                  </button>

                  {/* ignore */}
                  <button
                     onClick={() =>
                        handleIgnore(
                           lesson._id
                        )
                     }

                     className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-amber-500/10
                        text-amber-200
                        border
                        border-amber-500/20
                        flex
                        items-center
                        gap-2
                        font-semibold
                        hover:bg-amber-500
                        hover:text-white
                        transition-all
                        duration-300
                     "
                  >

                     <XCircle size={18} />

                     Ignore

                  </button>

                  {/* delete */}
                  <button
                     onClick={() =>
                        handleDelete(
                           lesson._id
                        )
                     }

                     className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-rose-500/10
                        text-rose-200
                        border
                        border-rose-500/20
                        flex
                        items-center
                        gap-2
                        font-semibold
                        hover:bg-rose-500
                        hover:text-white
                        transition-all
                        duration-300
                     "
                  >

                     <Trash2 size={18} />

                     Delete

                  </button>

               </div>

            </td>

         </tr>
      ))
   }

</tbody>

            </table>

         </div>

         {/* modal */}
         <dialog
            id="report_modal"
            className="modal"
         >

            <div
               className="
                  modal-box
                  max-w-3xl
                  bg-gradient-to-br
                  from-[#111827]
                  to-[#0F172A]
                  border
                  border-white/10
                  rounded-[32px]
                  text-white
               "
            >

               <h2 className="text-4xl font-black mb-8">

                  <span className="bg-gradient-to-r
                           from-rose-400
                           via-pink-500
                           to-red-500
                           bg-clip-text
                           text-transparent">Report Reasons</span> 🚩

               </h2>

               <div className="space-y-5">

                  {
                     selectedReports.map((report, index) => (

                        <div
                           key={index}

                           className="
                              bg-white/[0.03]
                              border
                              border-white/10
                              rounded-2xl
                              p-6
                           "
                        >

                           <h3 className="font-bold text-lg bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">

                              {report.reason}

                           </h3>

                           <p className="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent   mt-3">

                              <span className="text-gray-400">Reporter :</span>
                              {" "}
                              {report.reportedUserEmail}

                           </p>

                        </div>
                     ))
                  }

               </div>

               <div className="modal-action">

                  <form method="dialog">

                     <button
                        className="
                           px-6
                           py-3
                           rounded-2xl
                           bg-white/10
                           border
                           border-white/10
                           text-white
                           hover:bg-white/20
                           transition-all
                           duration-300
                        "
                     >

                        Close

                     </button>

                  </form>

               </div>

            </div>

         </dialog>

      </div>
   );
};

export default ReportedLessons;