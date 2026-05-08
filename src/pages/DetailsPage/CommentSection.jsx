import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "daisyui/components/toast";
import { MessageCircle } from "lucide-react";
import { useParams } from "react-router";


const CommentSection = () => {
     const { user } = useAuth();

   const axiosSecure = useAxiosSecure();
   const { id } = useParams();

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

         return toast.error(
            "Please login first"
         );
      }

      const comment =
      e.target.comment.value;

      if(!comment){

         return toast.error(
            "Write something"
         );
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

            toast.success(
               "Comment added"
            );

            e.target.reset();

            // realtime update
            refetch();
         }

      } catch(error){

         console.log(error);
      }
   };

   return (

      <section className="mt-14">

         <div className="bg-base-100 rounded-[30px] shadow-2xl p-8">

            {/* heading */}
            <div className="flex items-center gap-4 mb-8">

               <div className="bg-primary/10 p-4 rounded-full">

                  <MessageCircle
                     className="text-primary"
                     size={32}
                  />

               </div>

               <div>

                  <h2 className="text-4xl font-black">

                     Comments

                  </h2>

                  <p className="text-gray-500 mt-1">

                     Share your thoughts
                  </p>

               </div>

            </div>

            {/* comment form */}
            <form
               onSubmit={handleComment}
               className="mb-10"
            >

               <textarea
                  name="comment"
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Write your comment..."
               >
               </textarea>

               <button
                  className="btn btn-primary mt-4"
               >
                  Post Comment
               </button>

            </form>

            {/* comments list */}
            <div className="space-y-6">

               {
                  comments.map(comment => (

                     <div
                        key={comment._id}
                        className="bg-base-200 rounded-2xl p-6"
                     >

                        <div className="flex items-start gap-4">

                           {/* user photo */}
                           <img
                              src={
                                 comment.userPhoto
                                 ||
                                 "https://i.ibb.co/4pDNDk1/avatar.png"
                              }
                              alt=""
                              className="w-14 h-14 rounded-full object-cover"
                           />

                           {/* content */}
                           <div className="flex-1">

                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                                 <h3 className="font-bold text-lg">

                                    {comment.userName}

                                 </h3>

                                 <p className="text-sm text-gray-500">

                                    {
                                       new Date(
                                          comment.createdAt
                                       ).toLocaleString()
                                    }

                                 </p>

                              </div>

                              <p className="mt-3 text-gray-700 leading-8">

                                 {comment.comment}

                              </p>

                           </div>

                        </div>

                     </div>
                  ))
               }

            </div>

         </div>

      </section>
   );
};


export default CommentSection;