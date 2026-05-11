import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
     const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

   const { data: userData = {}, isLoading } = useQuery({

      queryKey: ['user', user?.email],

      enabled: !!user?.email,

      queryFn: async() => {

         const res = await axiosSecure.get(
            `/users/email/${user.email}`
         );

         return res.data;
      }
   });

   return [userData, isLoading];
};

export default useUser;