import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import toast from "react-hot-toast";

import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";

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

          html: ` <p style="color:var(--color-muted-foreground)">Your inspiring lesson is now liveand ready for the community.</p>`,

          icon: "success",

          background: "var(--color-card)",

          color: "var(--color-card-foreground)",

          confirmButtonText: "okay",

          confirmButtonColor: "var(--color-primary)",

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
    useTitle("Add New Lesson"),
    <div className=" max-w-5xl mx-auto px-4 py-10">
      <div className="bg-card border border-border backdrop-blur-xl shadow-2xl rounded-[32px] p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-black text-gradient-brand mb-3">
          Add New Lesson
        </h1>

        <p className="text-muted-foreground text-lg mb-10">
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
              className="input w-full bg-input border border-border text-base-content rounded-xl transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40 placeholder:text-muted-foreground"
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
              className="textarea w-full h-44 bg-input border border-border text-base-content rounded-xl transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40 placeholder:text-muted-foreground"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* category */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>

            <select
              className="select w-full bg-input border border-border text-base-content rounded-xl transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
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
              className="select w-full bg-input border border-border text-base-content rounded-xl transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
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
              className="input w-full bg-input border border-border text-base-content rounded-xl transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40 placeholder:text-muted-foreground"
              {...register("image")}
            />
          </div>

          {/* privacy */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Privacy</span>
            </label>

            <select
              className="select w-full bg-input border border-border text-base-content rounded-xl transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
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
              className="select w-full bg-input border border-border text-base-content rounded-xl transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
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
              <p className="text-sm text-error mt-2">
                Upgrade to Premium to create paid lessons.
              </p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="btn w-full border-0 rounded-xl text-primary-content text-lg font-bold bg-gradient-brand hover:scale-[1.01] hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
