import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const ReportedLessons = () => {
    const axiosSecure = useAxiosSecure();

   const [selectedReports, setSelectedReports] =
   useState([]);

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

      <div className="p-6 md:p-10">

         {/* heading */}
         <div className="mb-10">

            <h1 className="text-5xl font-black">

               Reported Lessons 🚩

            </h1>

            <p className="text-gray-500 mt-3">

               Review community reported lessons

            </p>

         </div>

         {/* table */}
         <div className="overflow-x-auto bg-base-100 rounded-[30px] shadow-xl">

            <table className="table">

               <thead>

                  <tr>

                     <th>Lesson</th>

                     <th>Reports</th>

                     <th>Actions</th>

                  </tr>

               </thead>

               <tbody>

                  {
                     lessons.map(lesson => (

                        <tr key={lesson._id}>

                           {/* title */}
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

                           {/* report count */}
                           <td>

                              <div className="badge badge-error p-4">

                                 {lesson.reportCount}
                                 {" "}
                                 Reports

                              </div>

                           </td>

                           {/* actions */}
                           <td>

                              <div className="flex flex-wrap gap-2">

                                 {/* view reasons */}
                                 <button
                                    onClick={() =>
                                       handleViewReports(
                                          lesson._id
                                       )
                                    }
                                    className="btn btn-primary btn-sm rounded-full"
                                 >

                                    View Reasons

                                 </button>

                                 {/* ignore */}
                                 <button
                                    onClick={() =>
                                       handleIgnore(
                                          lesson._id
                                       )
                                    }
                                    className="btn btn-warning btn-sm rounded-full"
                                 >

                                    Ignore

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

            <div className="modal-box max-w-3xl">

               <h2 className="text-3xl font-black mb-6">

                  Report Reasons 🚩

               </h2>

               <div className="space-y-5">

                  {
                     selectedReports.map((report, index) => (

                        <div
                           key={index}
                           className="bg-base-200 rounded-2xl p-5"
                        >

                           <h3 className="font-bold text-lg">

                              {report.reason}

                           </h3>

                           <p className="text-gray-500 mt-2">

                              Reporter:
                              {" "}
                              {report.reporterEmail}

                           </p>

                        </div>
                     ))
                  }

               </div>

               <div className="modal-action">

                  <form method="dialog">

                     <button className="btn">

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