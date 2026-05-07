import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Bookmark, Flag, Heart } from "lucide-react";
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const InteractionButton = ({ lesson, refetch }) => {
       const axiosSecure = useAxiosSecure();

   const { user } = useAuth();

   // LIKE
   const handleLike = async() => {

      // not logged in
      if(!user){

         return toast.error(
            "Please log in to like"
         );
      }

      try {

         await axiosSecure.patch(

            `/lessons/like/${lesson._id}`,

            {
               email: user.email
            }
         );

         // realtime update
         refetch();

      } catch(error){

         console.log(error);
      }
   };

   // FAVORITE
 const handleFavorite = async() => {

   if(!user){

      return toast.error(
         "Please login first"
      );
   }

   try {

      const res =
      await axiosSecure.patch(

         `/favorites/${lesson._id}`,

         {
            userEmail: user.email
         }
      );

      // add/remove toast
      if(res.data.favorited){

         toast.success(
            "Added to favorites"
         );

      } else {

         toast.success(
            "Removed from favorites"
         );
      }

      // realtime update
      refetch();

   } catch(error){

      console.log(error);
   }
};

   // REPORT
   const handleReport = async(e) => {

      e.preventDefault();

      if(!user){

         return toast.error(
            "Please login first"
         );
      }

      const reason =
      e.target.reason.value;

      const confirmReport =
      window.confirm(
         "Are you sure?"
      );

      if(!confirmReport) return;

      const reportData = {

         lessonId: lesson._id,

         lessonTitle: lesson.title,

         reportedUserEmail:
         user.email,

         reason,

         timestamp: new Date()
      };

      const res =
      await axiosSecure.post(
         '/reports',
         reportData
      );

      if(res.data.insertedId){

         toast.success(
            "Lesson reported"
         );

         e.target.reset();
      }
   };

   // share url
   const shareUrl =
   window.location.href;

   return (

      <section className="mt-12">

         <div className="bg-base-100 rounded-[30px] shadow-2xl p-8">

            <div className="flex flex-wrap gap-5">

               {/* LIKE */}
               <button
                  onClick={handleLike}
                  className="btn btn-error"
               >

                  <Heart size={20} />

                  {lesson.likesCount || 0}
                  Likes

               </button>

               {/* FAVORITE */}
               <button
                  onClick={handleFavorite}
                  className="btn btn-warning"
               >

                  <Bookmark size={20} />

                  Save

               </button>

            </div>

            {/* REPORT */}
            <form
               onSubmit={handleReport}
               className="mt-8 flex flex-wrap gap-4"
            >

               <select
                  name="reason"
                  className="select select-bordered"
                  required
               >

                  <option value="">
                     Select Reason
                  </option>

                  <option>
                     Inappropriate Content
                  </option>

                  <option>
                     Hate Speech or Harassment
                  </option>

                  <option>
                     Misleading Information
                  </option>

                  <option>
                     Spam
                  </option>

                  <option>
                     Sensitive Content
                  </option>

                  <option>
                     Other
                  </option>

               </select>

               <button
                  className="btn btn-outline btn-error"
               >

                  <Flag size={18} />

                  Report

               </button>

            </form>

            {/* SHARE */}
            <div className="mt-10">

               <h3 className="font-bold mb-4">

                  Share This Lesson

               </h3>

               <div className="flex gap-3">

                  <FacebookShareButton
                     url={shareUrl}
                  >

                     <FacebookIcon
                        size={45}
                        round
                     />

                  </FacebookShareButton>

                  <WhatsappShareButton
                     url={shareUrl}
                  >

                     <WhatsappIcon
                        size={45}
                        round
                     />

                  </WhatsappShareButton>

               </div>

            </div>

         </div>

      </section>
   );
};
export default InteractionButton;