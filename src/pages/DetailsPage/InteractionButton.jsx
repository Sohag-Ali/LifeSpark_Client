import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Bookmark, Flag, Heart,  MessageCircle,  Share2 } from "lucide-react";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

;

const InteractionButton = ({ lesson, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  // LIKE
  const handleLike = async () => {
    // not logged in
    if (!user) {
      return toast.error("Please log in to like");
    }

    try {
      await axiosSecure.patch(
        `/lessons/like/${lesson._id}`,

        {
          email: user.email,
        },
      );

      // realtime update
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // FAVORITE
  const handleFavorite = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    try {
      const res = await axiosSecure.patch(
        `/favorites/${lesson._id}`,

        {
          userEmail: user.email,
        },
      );

      // add/remove toast
      if (res.data.favorited) {
        toast.success("Added to favorites");
      } else {
        toast.success("Removed from favorites");
      }

      // realtime update
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // REPORT
  const handleReport = async (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire({

        icon: "error",
        title: "Not Logged In",
        text: "Please log in to report this lesson",
        confirmButtonColor: "var(--color-error)",
      });
      
    }

    const reason = e.target.reason.value;

     const result =
  await Swal.fire({

    title: "Report Lesson?",

    text: "Are you sure you want to report this lesson?",

    icon: "warning",

    background: "var(--color-card)",

    color: "var(--color-card-foreground)",

    showCancelButton: true,

    confirmButtonColor: "var(--color-error)",

    cancelButtonColor: "var(--color-base-300)",

    confirmButtonText: "Yes, Report",

    cancelButtonText: "Cancel",

    reverseButtons: true,
  });


   

    if (!result.isConfirmed) return;

    const reportData = {
      lessonId: lesson._id,

      lessonTitle: lesson.title,

      reportedUserEmail: user.email,

      reason,

      timestamp: new Date(),
    };

    const res = await axiosSecure.post("/reports", reportData);

    if (res.data.insertedId) {
      Swal.fire({

        title: "🚨 Lesson Reported",

        text: "Thank you for helping keep the community safe.",

        icon: "success",

        background: "var(--color-card)",

        color: "var(--color-card-foreground)",

        confirmButtonColor: "var(--color-primary)",

        timer: 2200,

        showConfirmButton: false,
      });

      e.target.reset();
    }
  };

  // share url
  const shareUrl = window.location.href;

  return (
   <section className="">
  <div
    className="
      relative
      overflow-hidden
      bg-card
      rounded-[24px]
      md:rounded-[32px]
      p-4
      sm:p-5
      md:p-8
    "
  >
    {/* glow */}
    <div className="absolute top-0 right-0 w-52 md:w-72 h-52 md:h-72 bg-primary/10 blur-3xl rounded-full"></div>

    {/* CONTENT */}
    <div className="relative z-10">
      {/* TOP ACTION BUTTONS */}
      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-6
        "
      >
        {/* LEFT BUTTONS */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:flex-wrap
            gap-3
            md:gap-4
          "
        >
          {/* LIKE */}
          <button
            onClick={handleLike}
            className="
              group
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              gap-3
              px-4
              md:px-5
              py-3
              rounded-2xl
              bg-rose-500/10
              border
              border-rose-500/20
              text-rose-500
              hover:bg-rose-500/20
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            <Heart
              size={18}
              className={`
                transition-all
                duration-300

                ${
                  lesson?.likes?.includes(user?.email)
                    ? "fill-rose-500 text-rose-500"
                    : "text-rose-500 group-hover:fill-rose-500"
                }
              `}
            />

            <span className="font-semibold text-sm md:text-base">
              {lesson?.likes?.includes(user?.email)
                ? "Liked"
                : "Like"}
            </span>
          </button>

          {/* FAVORITE */}
          <button
            onClick={handleFavorite}
            className="
              group
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              gap-3
              px-4
              md:px-5
              py-3
              rounded-2xl
              bg-amber-500/10
              border
              border-amber-500/20
              text-amber-500
              hover:bg-amber-500/20
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            <Bookmark
              size={18}
              className={`
                transition-all
                duration-300

                ${
                  lesson?.favorites?.includes(user?.email)
                    ? "fill-amber-500 text-amber-500"
                    : "text-amber-500 group-hover:fill-amber-500"
                }
              `}
            />

            <span className="font-semibold text-sm md:text-base">
              {lesson?.favorites?.includes(user?.email)
                ? "Saved"
                : "Save"}
            </span>
          </button>

          {/* COMMENT BUTTON */}
          <Link
            to={`/comment-section/${lesson._id}`}
            state={{ lesson }}
            className="
              group
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              gap-3
              px-4
              md:px-5
              py-3
              rounded-2xl
              bg-secondary/10
              border
              border-secondary/20
              text-secondary
              hover:bg-secondary/20
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            <MessageCircle
              size={18}
              className="group-hover:scale-110 transition"
            />

            <span className="font-semibold text-sm md:text-base">
              Comments
            </span>
          </Link>
        </div>

        {/* SHARE */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-muted-foreground
              mr-1
            "
          >
            <Share2 size={16} />

            <span className="font-medium text-sm md:text-base">
              Share
            </span>
          </div>

          <FacebookShareButton url={shareUrl}>
            <div className="hover:scale-110 transition duration-300">
              <FacebookIcon size={38} round />
            </div>
          </FacebookShareButton>

          <WhatsappShareButton url={shareUrl}>
            <div className="hover:scale-110 transition duration-300">
              <WhatsappIcon size={38} round />
            </div>
          </WhatsappShareButton>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-border my-6 md:my-8"></div>

      {/* REPORT SECTION */}
      <div>
        <h3
          className="
            text-lg
            md:text-xl
            font-bold
            text-base-content
            mb-4
            md:mb-5
          "
        >
          Report This Lesson
        </h3>

        <form
          onSubmit={handleReport}
          className="
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >
          {/* select */}
          <select
            name="reason"
            required
            className="
              w-full
              md:flex-1
              h-12
              md:h-14
              px-4
              md:px-5
              bg-input
              border
              border-border
              rounded-2xl
              text-sm
              md:text-base
              text-base-content
              focus:outline-none
              focus:border-rose-500/40
              hover:border-primary/30
              transition-all
              duration-300
            "
          >
            <option value="">Select Report Reason</option>

            <option>Inappropriate Content</option>

            <option>Hate Speech or Harassment</option>

            <option>Misleading Information</option>

            <option>Spam or Promotional Content</option>

            <option>Sensitive Content</option>

            <option>Other</option>
          </select>

          {/* report btn */}
          <button
            type="submit"
            className="
              h-12
              md:h-14
              w-full
              md:w-auto
              px-6
              rounded-2xl
              border
              border-rose-500/30
              bg-rose-500/10
              text-rose-500
              text-sm
              md:text-base
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-rose-500/20
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            <Flag size={18} />
            Report
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
  );
};

export default InteractionButton;
