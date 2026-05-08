import { Link, useParams } from "react-router";
import AuthorSection from "./AuthorSection";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import LessonBanner from "./LessonBanner";
import LessonMetadata from "./LessonMetadata";
import SimilarLesson from "./SimilarLesson";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../hooks/useUser";
import InteractionButton from "./InteractionButton";


const LessonDetails = () => {

    const { id } = useParams();
    const [userData] = useUser();

   const axiosSecure = useAxiosSecure();

   const { data: lesson = {}, refetch } = useQuery({

      queryKey: ['lesson', id],

      queryFn: async() => {

         const res = await axiosSecure.get(
            `/lessons/${id}`
         );

         return res.data;
      }
   });

    const isLocked =

    lesson.accessLevel === "Premium"
    &&
    !userData?.isPremium;

    return (
        <div className="relative">

            {/* PREMIUM OVERLAY */}

            {
                isLocked && (

                    <div className="absolute inset-0 z-50 backdrop-blur-md bg-black/40 flex flex-col items-center justify-center text-white">

                        <h2 className="text-4xl font-bold">

                            Premium Lesson

                        </h2>

                        <p className="mt-3">

                            Upgrade to view full content

                        </p>

                        <Link
                         to="/pricing"
                         className="btn btn-warning mt-5"
                        >
                            Upgrade ⭐
                        </Link>

                    </div>
                )
            }

            {/* LESSON CONTENT */}

            <LessonBanner lesson={lesson} refetch={refetch} />

            {/* <LessonMetadata lesson={lesson} /> */}

            {/* <AuthorSection lesson={lesson} /> */}

            {/* <EngagementSection lesson={lesson} /> */}
            {/* <InteractionButton lesson={lesson} refetch={refetch} /> */}

            <CommentSection lesson={lesson} />

            <SimilarLesson lesson={lesson} />

        </div>
    );
};

export default LessonDetails;