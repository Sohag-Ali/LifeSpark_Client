import { useEffect } from "react";
import { Link, useParams } from "react-router";
import LessonBanner from "./LessonBanner";

import SimilarLesson from "./SimilarLesson";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../hooks/useUser";
import useTitle from "../../hooks/useTitle";
import LessonDetailsSkeleton from "../../coponents/Skeleton/LessonDetailsSkeleton";


const LessonDetails = () => {
    const { id } = useParams();
    const [userData] = useUser();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    const axiosSecure = useAxiosSecure();

    const { data: lesson = {}, refetch, isLoading } = useQuery({
        queryKey: ['lesson', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/lessons/${id}`);
            return res.data;
        }
    });

    // ✅ Called every render, no matter what — before any conditional return
    useTitle(lesson?.title || "Lesson Details");

    if (isLoading) {
        return (
            <div className="relative">
                <LessonDetailsSkeleton />
            </div>
        );
    }

    const isLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

    return (
        <div className="relative">
            {isLocked && (
                <div className="absolute inset-0 z-50 backdrop-blur-md bg-black/40 flex flex-col items-center justify-center text-white">
                    <h2 className="text-4xl font-bold">Premium Lesson</h2>
                    <p className="mt-3">Upgrade to view full content</p>
                    <Link to="/pricing" className="btn btn-warning mt-5">
                        Upgrade ⭐
                    </Link>
                </div>
            )}

            <LessonBanner lesson={lesson} refetch={refetch} />
            <SimilarLesson lesson={lesson} />
        </div>
    );
};

export default LessonDetails;