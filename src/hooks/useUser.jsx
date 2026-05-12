import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
     const { user, loading } = useAuth();

   const axiosSecure = useAxiosSecure();

   const { data: userData=null, isLoading } = useQuery({

      queryKey: ['user', user?.email],

      enabled: !loading && !!user?.email,
      refetchOnMount: true,

  staleTime: 0,

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