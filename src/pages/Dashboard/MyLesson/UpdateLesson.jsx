import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";


const UpdateLesson = () => {
   const { id } = useParams();

   const axiosSecure = useAxiosSecure();

   const [userData] = useUser();

   const {
      register,
      handleSubmit,
      reset
   } = useForm();

   // fetch single lesson
   const { data: lesson = {} } = useQuery({

      queryKey: ['lesson', id],

      queryFn: async() => {

         const res = await axiosSecure.get(
            `/lessons/${id}`
         );

         reset(res.data);

         return res.data;
      }
   });

   // update lesson
   const onSubmit = async(data) => {

      try {

         const updatedLesson = {

            title: data.title,

            description: data.description,

            category: data.category,

            emotionalTone: data.emotionalTone,

            image: data.image,

            privacy: data.privacy,

            accessLevel: data.accessLevel,
         };

         const res = await axiosSecure.patch(
            `/lessons/${id}`,
            updatedLesson
         );

         if(res.data.modifiedCount > 0){

            // alert(
            //    "Lesson updated successfully!"
            // );
            Swal.fire({

               title: "✅ Lesson Updated",
                text: "Your lesson has been updated successfully.",
                icon: "success",
                background: "#111827",
                color: "#fff",
                confirmButtonColor: "#8B5CF6",
            });
         }

      } catch(error){

         console.log(error);

         Swal.fire({
            title: "Error",
            text: "Failed to update lesson",
            icon: "error",
            background: "#111827",
            color: "#fff",
            confirmButtonColor: "#8B5CF6",
         });
      }
   };

 return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      
      <div
        className=" relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0F172A] border border-white/10 shadow-2xl rounded-[32px] p-8 md:p-12 backdrop-blur-xl
        "
      >

        {/* background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        {/* heading */}
        <div className="relative z-10 mb-10">

          <h1 className="text-4xl md:text-5xl  text-white mb-3">
            <span className="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">Update Lesson</span> ✏️
          </h1>

          <p className="text-gray-400 text-lg">
            Update your lesson information and keep inspiring others.
          </p>

        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 relative z-10"
        >

          {/* title */}
          <div>

            <label className="block text-[#c4c6ca] font-semibold mb-3">
              Lesson Title
            </label>

            <input
              type="text"
              placeholder="Enter lesson title"
              {...register("title")}
              className="
                input
                w-full
                bg-[#0B1120]
                border
                border-[#2A3142]
                text-[#EEF2FF]
                rounded-xl
                transition-all
                duration-300
                focus:outline-none
                focus:border-[#7B61FF]
                focus:ring-2
                focus:ring-[#7B61FF]/20
                hover:border-[#4B5563]
                placeholder:text-gray-500
              "
            />

          </div>

          {/* description */}
          <div>

            <label className="block text-[#c4c6ca] font-semibold mb-3">
              Description / Story
            </label>

            <textarea
              placeholder="Write your lesson story..."
              {...register("description")}
              className="
                textarea
                w-full
                h-44
                bg-[#0B1120]
                border
                border-[#2A3142]
                text-[#EEF2FF]
                rounded-xl
                transition-all
                duration-300
                focus:outline-none
                focus:border-[#7B61FF]
                focus:ring-2
                focus:ring-[#7B61FF]/20
                hover:border-[#4B5563]
                placeholder:text-gray-500
              "
            ></textarea>

          </div>

          {/* category + emotion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* category */}
            <div>

              <label className="block text-[#c4c6ca] font-semibold mb-3">
                Category
              </label>

              <select
                {...register("category")}
                className="
                  select
                  w-full
                  bg-[#0B1120]
                  border
                  border-[#2A3142]
                  text-[#EEF2FF]
                  rounded-xl
                  transition-all
                  duration-300
                  focus:outline-none
                  focus:border-[#7B61FF]
                  focus:ring-2
                  focus:ring-[#7B61FF]/20
                  hover:border-[#4B5563]
                "
              >

                <option value="Personal Growth">
                  Personal Growth
                </option>
                <option value="Education">
                  Education
                </option>
                <option value="Health">
                  Health 
                </option>

                <option value="Career">
                  Career
                </option>

                <option value="Relationships">
                  Relationships
                </option>

                <option value="Mindset">
                  Mindset
                </option>

              </select>

            </div>

            {/* emotional tone */}
            <div>

              <label className="block text-[#c4c6ca] font-semibold mb-3">
                Emotional Tone
              </label>

              <select
                {...register("emotionalTone")}
                className="
                  select
                  w-full
                  bg-[#0B1120]
                  border
                  border-[#2A3142]
                  text-[#EEF2FF]
                  rounded-xl
                  transition-all
                  duration-300
                  focus:outline-none
                  focus:border-[#7B61FF]
                  focus:ring-2
                  focus:ring-[#7B61FF]/20
                  hover:border-[#4B5563]
                "
              >

                <option value="Motivational">
                  Motivational
                </option>
                <option value="Happy">
                  Happy
                </option>
                <option value="Inspirational">
                  Inspirational
                </option>

                <option value="Sad">
                  Sad
                </option>

                <option value="Realization">
                  Realization
                </option>

                <option value="Gratitude">
                  Gratitude
                </option>

              </select>

            </div>

          </div>

          {/* image */}
          <div>

            <label className="block text-[#c4c6ca] font-semibold mb-3">
              Image URL
            </label>

            <input
              type="text"
              placeholder="Paste image URL"
              {...register("image")}
              className="
                input
                w-full
                bg-[#0B1120]
                border
                border-[#2A3142]
                text-[#EEF2FF]
                rounded-xl
                transition-all
                duration-300
                focus:outline-none
                focus:border-[#7B61FF]
                focus:ring-2
                focus:ring-[#7B61FF]/20
                hover:border-[#4B5563]
                placeholder:text-gray-500
              "
            />

          </div>

          {/* privacy + access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* privacy */}
            <div>

              <label className="block text-[#c4c6ca] font-semibold mb-3">
                Privacy
              </label>

              <select
                {...register("privacy")}
                className="
                  select
                  w-full
                  bg-[#0B1120]
                  border
                  border-[#2A3142]
                  text-[#EEF2FF]
                  rounded-xl
                  transition-all
                  duration-300
                  focus:outline-none
                  focus:border-[#7B61FF]
                  focus:ring-2
                  focus:ring-[#7B61FF]/20
                  hover:border-[#4B5563]
                "
              >

                <option value="Public">
                  Public
                </option>

                <option value="Private">
                  Private
                </option>

              </select>

            </div>

            {/* access level */}
            <div>

              <label className="block text-[#c4c6ca] font-semibold mb-3">
                Access Level
              </label>

              <select
                {...register("accessLevel")}
                disabled={!userData?.isPremium}
                className="
                  select
                  w-full
                  bg-[#0B1120]
                  border
                  border-[#2A3142]
                  text-[#EEF2FF]
                  rounded-xl
                  transition-all
                  duration-300
                  focus:outline-none
                  focus:border-[#7B61FF]
                  focus:ring-2
                  focus:ring-[#7B61FF]/20
                  hover:border-[#4B5563]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                <option value="Free">
                  Free
                </option>

                {userData?.isPremium && (
                  <option value="Premium">
                    Premium
                  </option>
                )}

              </select>

            </div>

          </div>

          {/* creator info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              value={lesson.creatorName || ""}
              readOnly
              className="
                input
                w-full
                bg-[#111827]
                border
                border-white/10
                text-[#89c7e6]
                rounded-xl
              "
            />

            <input
              type="email"
              value={lesson.creatorEmail || ""}
              readOnly
              className="
                input
                w-full
                bg-[#111827]
                border
                border-white/10
                text-[#89c7e6]
                rounded-xl
              "
            />

          </div>

          {/* submit */}
          <button
            type="submit"
            className="
              btn
              w-full
              border-0
              rounded-xl
              text-white
              text-lg
              font-bold
              bg-gradient-to-r
              from-[#6366F1]
              to-[#A855F7]
              hover:from-[#7C3AED]
              hover:to-[#9333EA]
              hover:shadow-2xl
              hover:shadow-purple-500/30
              hover:-translate-y-[1px]
              transition-all
              duration-300
            "
          >
            Update Lesson 
          </button>

        </form>

      </div>
    </div>
  );
};

export default UpdateLesson;