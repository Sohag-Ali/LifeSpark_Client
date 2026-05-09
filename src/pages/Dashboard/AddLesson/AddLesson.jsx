import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { toast } from "react-toastify";

import Swal from "sweetalert2";

const AddLesson = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [userData] = useUser();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const lessonData = {
        title: data.title,

        description: data.description,

        category: data.category,

        emotionalTone: data.emotionalTone,

        image: data.image,

        privacy: data.privacy,

        accessLevel: data.accessLevel,

        creatorName: user?.displayName,

        creatorEmail: user?.email,

        creatorPhoto: user?.photoURL,
      };

      const res = await axiosSecure.post("/lessons", lessonData);

      console.log(res.data);

      if (res.data.insertedId) {
        Swal.fire({
          title: "🎉 Lesson Added Successfully!",

          html: ` <p style="color:#9CA3AF">Your inspiring lesson is now liveand ready for the community.</p>`,

          icon: "success",

          background: "#0F172A",

          color: "#fff",

          confirmButtonText: "okay",

          confirmButtonColor: "#8B5CF6",

          backdrop: `rgba(15,23,42,0.8)`,

          customClass: {
            popup: "rounded-[30px]",

            title: "text-3xl font-black",

            confirmButton: "px-6 py-3 rounded-full",
          },
        });

        reset();
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to add lesson");
    }
  };

  return (
    <div className=" max-w-5xl mx-auto px-4 py-10">
      <div className="bg-[#111827] border border-white/10 backdrop-blur-xl shadow-2xl rounded-[32px] p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          Add New Lesson
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Share your life experiences and inspire others.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* lesson title */}
          <div>
            <label className="label">
              <span className="label-text  font-semibold text-base">
                Lesson Title
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter lesson title"
              className="input w-full bg-[#0B1120] border border-[#2A3142] text-[#EEF2FF] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/20 hover:border-[#4B5563] placeholder:text-gray-500"
              {...register("title", { required: true })}
            />
          </div>

          {/* description */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Full Description / Story
              </span>
            </label>

            <textarea
              placeholder="Write your lesson story..."
              className="textarea w-full h-44 bg-[#0B1120] border border-[#2A3142] text-[#EEF2FF] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/20 hover:border-[#4B5563] placeholder:text-gray-500"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* category */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>

            <select
              className="select w-full bg-[#0B1120] border border-[#2A3142] text-[#EEF2FF] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/20 hover:border-[#4B5563]"
              {...register("category")}
            >
              <option value="Personal Growth">Personal Growth</option>
              <option value="Personal Growth">Education</option>
              <option value="Personal Growth">Health</option>

              <option value="Career">Career</option>

              <option value="Relationships">Relationships</option>

              <option value="Mindset">Mindset</option>

              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </div>

          {/* emotional tone */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Emotional Tone</span>
            </label>

            <select
              className="select w-full bg-[#0B1120] border border-[#2A3142] text-[#EEF2FF] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/20 hover:border-[#4B5563]"
              {...register("emotionalTone")}
            >
              <option value="Motivational">Motivational</option>
              <option value="Motivational">Happy</option>
              <option value="Motivational">Inspirational</option>

              <option value="Sad">Sad</option>

              <option value="Realization">Realization</option>

              <option value="Gratitude">Gratitude</option>
            </select>
          </div>

          {/* image */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Image URL (Optional)
              </span>
            </label>

            <input
              type="text"
              placeholder="Paste image URL"
              className="input w-full bg-[#0B1120] border border-[#2A3142] text-[#EEF2FF] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/20 hover:border-[#4B5563] placeholder:text-gray-500"
              {...register("image")}
            />
          </div>

          {/* privacy */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Privacy</span>
            </label>

            <select
              className="select w-full bg-[#0B1120] border border-[#2A3142] text-[#EEF2FF] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/20 hover:border-[#4B5563]"
              {...register("privacy")}
            >
              <option value="Public">Public</option>

              <option value="Private">Private</option>
            </select>
          </div>

          {/* access level */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Access Level</span>
            </label>

            <select
              className="select w-full bg-[#0B1120] border border-[#2A3142] text-[#EEF2FF] rounded-xl transition-all duration-300 focus:outline-none focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/20 hover:border-[#4B5563]"
              {...register("accessLevel")}
              disabled={!userData?.isPremium}
              title={
                !userData?.isPremium
                  ? "Upgrade to Premium to create paid lessons"
                  : ""
              }
            >
              <option value="Free">Free</option>

              {userData?.isPremium && <option value="Premium">Premium</option>}
            </select>

            {!userData?.isPremium && (
              <p className="text-sm text-red-500 mt-2">
                Upgrade to Premium to create paid lessons.
              </p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="btn w-full border-0 rounded-xl text-white text-lg font-bold bg-gradient-to-r from-[#5B4DFF] via-[#7B61FF] to-[#A855F7] hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
          >
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
