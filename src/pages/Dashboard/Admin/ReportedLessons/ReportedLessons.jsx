import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AlertTriangle, Eye, ShieldAlert, Trash2, XCircle } from "lucide-react";
import useTitle from "../../../../hooks/useTitle";


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
      useTitle("Reported Lessons"),

      <div className="px-4 md:px-8 py-10">

         {/* heading */}
         <div className="mb-14">

            <div className="flex items-center gap-5">

               <div
                  className="
                     w-16
                     h-16
                     rounded-2xl
                     bg-error/10
                     border
                     border-error/20
                     flex
                     items-center
                     justify-center
                  "
               >

                  <ShieldAlert
                     size={30}
                     className="text-error"
                  />

               </div>

               <div>

                  <h1 className="text-4xl md:text-5xl font-black text-base-content">

                     <span
                        className="
                           text-error
                        "
                     >

                        Reported Lessons

                     </span>

                     🚩

                  </h1>

                  <p className="text-muted-foreground text-lg mt-3">

                     Review and moderate community reported lessons

                  </p>

               </div>

            </div>

         </div>

         {/* table */}
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
          border-border
          text-muted-foreground
          text-center
          text-xs
          md:text-sm
        "
      >
        <th className="py-6">Lesson</th>

        <th>Reports</th>

        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {lessons.length === 0 ? (
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
                size={60}
                className="text-error"
              />

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
                No Reports Found
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
                There are currently no
                reported lessons available 🚀
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
                      text-base-content
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

            {/* reports */}
            <td className="text-center">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  md:px-5
                  py-2
                  md:py-3
                  rounded-full
                  bg-error/10
                  text-error
                  border
                  border-error/20
                  font-semibold
                  text-xs
                  md:text-sm
                  whitespace-nowrap
                "
              >
                <AlertTriangle size={14} />

                {lesson.reportCount}

                <span>Reports</span>
              </div>
            </td>

            {/* actions */}
            <td>
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-2
                  md:gap-3
                  items-center
                  justify-center
                "
              >
                {/* view */}
                <button
                  onClick={() =>
                    handleViewReports(
                      lesson._id
                    )
                  }
                  className="
                    px-3
                    md:px-5
                    py-2
                    md:py-3
                    rounded-2xl
                    bg-info/10
                    text-info
                    border
                    border-info/20
                    flex
                    items-center
                    gap-2
                    text-xs
                    md:text-sm
                    font-semibold
                    hover:bg-info
                    hover:text-info-content
                    transition-all
                    duration-300
                    whitespace-nowrap
                  "
                >
                  <Eye size={16} />

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
                    px-3
                    md:px-5
                    py-2
                    md:py-3
                    rounded-2xl
                    bg-warning/10
                    text-warning
                    border
                    border-warning/20
                    flex
                    items-center
                    gap-2
                    text-xs
                    md:text-sm
                    font-semibold
                    hover:bg-warning
                    hover:text-warning-content
                    transition-all
                    duration-300
                    whitespace-nowrap
                  "
                >
                  <XCircle size={16} />

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
                    px-3
                    md:px-5
                    py-2
                    md:py-3
                    rounded-2xl
                    bg-error/10
                    text-error
                    border
                    border-error/20
                    flex
                    items-center
                    gap-2
                    text-xs
                    md:text-sm
                    font-semibold
                    hover:bg-error
                    hover:text-error-content
                    transition-all
                    duration-300
                    whitespace-nowrap
                  "
                >
                  <Trash2 size={16} />

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

         {/* modal */}
         <dialog
            id="report_modal"
            className="modal"
         >

            <div
               className="
                  modal-box
                  max-w-3xl
                  bg-card
                  border
                  border-border
                  rounded-[32px]
                  text-base-content
               "
            >

               <h2 className="text-4xl font-black mb-8">

                  <span className="text-error">Report Reasons</span> 🚩

               </h2>

               <div className="space-y-5">

                  {
                     selectedReports.map((report, index) => (

                        <div
                           key={index}

                           className="
                              bg-muted
                              border
                              border-border
                              rounded-2xl
                              p-6
                           "
                        >

                           <h3 className="font-bold text-lg text-gradient-brand ">

                              {report.reason}

                           </h3>

                           <p className="text-gradient-brand   mt-3">

                              <span className="text-muted-foreground">Reporter :</span>
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
                           bg-muted
                           border
                           border-border
                           text-base-content
                           hover:bg-hover
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