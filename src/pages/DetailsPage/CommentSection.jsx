import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";
import { MessageCircle } from "lucide-react";
import { useParams } from "react-router";
import Swal from "sweetalert2";


const CommentSection = () => {
     const { user } = useAuth();
const [userData] = useUser();
   const axiosSecure = useAxiosSecure();
   const { id } = useParams();
   window.scrollTo({

    top: 0,

    behavior: "smooth",
  });

   const { data: lesson = {} } = useQuery({

  queryKey: ["lesson", id],

  queryFn: async () => {

    const res =
    await axiosSecure.get(
      `/lessons/${id}`
    );

    return res.data;
  },
});

   // fetch comments
   const {
      data: comments = [],
      refetch
   } = useQuery({

      queryKey: [
         'comments',
         lesson._id
      ],

      enabled: !!lesson._id,
      // staleTime: 0,

      queryFn: async() => {

         const res =
         await axiosSecure.get(

            `/comments/${lesson._id}`
         );

         return res.data;
      }
   });

   // add comment
   const handleComment = async(e) => {

      e.preventDefault();

      if(!user){

         return Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "Please login to add a comment"
         });
      }

      const comment =
      e.target.comment.value;

      if(!comment){

         return Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Please write something"
         });
      }

      try {

         const commentData = {

            lessonId: lesson._id,

            userName:
            user.displayName,

            userEmail:
            user.email,

            userPhoto:
            user.photoURL,

            comment,

            createdAt: new Date()
         };

         const res =
         await axiosSecure.post(

            '/comments',
            commentData
         );

         if(res.data.insertedId){

            // Swal.fire({
            //    icon: "success",
            //    title: "Comment added",
            //    text: "Your comment has been added successfully"
            // });

            e.target.reset();

            // realtime update
            refetch();
         }

      } catch(error){

         console.log(error);
      }
   };

   const handleDeleteComment = async (id) => {

  const result =
  await Swal.fire({

    title: "Delete Comment?",

    text: "This comment will be permanently removed.",

    icon: "warning",

    background: "var(--color-card)",

    color: "var(--color-card-foreground)",

    showCancelButton: true,

    confirmButtonColor: "var(--color-error)",

    cancelButtonColor: "var(--color-base-300)",

    confirmButtonText: "Yes, Delete",
  });

  if (!result.isConfirmed) return;

  try {

    await axiosSecure.delete(

      `/comments/${id}`
    );

    Swal.fire({

      title: "Deleted!",

      text: "Comment removed successfully.",

      icon: "success",

      background: "var(--color-card)",

      color: "var(--color-card-foreground)",

      timer: 2000,

      showConfirmButton: false,
    });

    refetch();

  } catch (error) {

    console.log(error);
  }
};

   return (

  <section className="mt-14">

    <div
      className="
        bg-card
        border
        border-border
        rounded-[32px]
        shadow-2xl
        shadow-black/30
        p-6
        md:p-10
      "
    >

      {/* heading */}
      <div
        className="
          flex
          items-center
          gap-5
          mb-10
        "
      >

        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-gradient-brand
            opacity-90
            border
            border-primary/20
            flex
            items-center
            justify-center
          "
        >

          <MessageCircle
            className="text-primary-content"
            size={30}
          />

        </div>

        <div>

          <h2
            className="
              text-3xl
              md:text-4xl
              font-black
              text-gradient-brand
            "
          >

            Comments

          </h2>

          <p
            className="
              text-muted-foreground
              mt-1
            "
          >

            Share your thoughts with the community

          </p>

        </div>

      </div>

      {/* COMMENT FORM */}
      <form
        onSubmit={handleComment}
        className="mb-12"
      >

        <textarea
          name="comment"

          placeholder="Write your comment..."

          className="
            w-full
            h-36
            bg-input
            border
            border-border
            rounded-3xl
            px-5
            py-4
            text-base-content
            placeholder:text-muted-foreground
            focus:outline-none
            focus:border-primary/40
            transition-all
            duration-300
          "
        >
        </textarea>

        <button
          className="
            mt-5
            px-8
            py-3
            rounded-2xl
            bg-gradient-brand
            text-primary-content
            font-bold
            shadow-glow
            hover:scale-105
            transition-all
            duration-300
          "
        >

          Post Comment

        </button>

      </form>

      {/* COMMENTS */}
     {/* COMMENTS */}
<div className="space-y-6">

  {
    comments.map(comment => {

      // WHO CAN DELETE
      const canDelete =

        user?.email === comment.userEmail

        ||

        user?.email === lesson.creatorEmail

        ||

        userData?.role === "admin";

      return (

        <div
          key={comment._id}

          className="
            bg-base-100
            border
            border-border
            rounded-[28px]
            p-5
            hover:border-primary/20
            transition-all
            duration-300
          "
        >

          <div
            className="
              flex
              gap-4
            "
          >

            {/* PHOTO */}
            <img
              src={
                comment.userPhoto
                ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }

              alt=""

              className="
                w-14
                h-14
                rounded-full
                object-cover
                border-2
                border-primary/20
              "
            />

            {/* CONTENT */}
            <div className="flex-1">

              {/* TOP */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-3
                "
              >

                <div>

                  <h3
                    className="
                      text-lg
                      font-bold
                      text-gradient-brand
                    "
                  >

                    {comment.userName}

                  </h3>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                      mt-1
                    "
                  >

                    {
                      new Date(
                        comment.createdAt
                      ).toLocaleString()
                    }

                  </p>

                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">

                  {/* COMMENT BADGE */}
                  <div
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-secondary/10
                      border
                      border-secondary/20
                      text-secondary
                      text-xs
                      font-semibold
                      w-fit
                    "
                  >

                    Community Comment

                  </div>

                  {/* DELETE BUTTON */}
                  {
                    canDelete && (

                      <button

                        onClick={() =>
                          handleDeleteComment(
                            comment._id
                          )
                        }

                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-error/10
                          border
                          border-error/20
                          text-error
                          text-xs
                          font-semibold
                          hover:bg-error/20
                          transition-all
                          duration-300
                        "
                      >

                        Delete

                      </button>
                    )
                  }

                </div>

              </div>

              {/* COMMENT TEXT */}
              <p
                className="
                  mt-4
                  text-base-content/90
                  leading-8
                "
              >

                {comment.comment}

              </p>

            </div>

          </div>

        </div>
      );
    })
  }

</div>

    </div>

  </section>
);
};


export default CommentSection;