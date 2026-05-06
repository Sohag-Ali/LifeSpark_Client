import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddLesson = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: lessonData =[] } =  useQuery({
        queryKey: ['add-lesson', user?.email],
         queryFn: async () => {
            const res = await axiosSecure.get(`/add-lesson?email=${user?.email}`);
            return res.data;
         }
    })
    return (
        <div>
            <h2>Add Lesson</h2>
            <h2>{lessonData.length}</h2>
        </div>
    );
};

export default AddLesson;