import axios from "axios";


// import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  // headers: {
  //     'Content-Type': 'application/json',
  // },
});

const useAxiosSecure = () => {
     axiosSecure.interceptors.request.use(

      config => {

         const token =
         localStorage.getItem(

            'access-token'
         );

         config.headers.authorization =

         `Bearer ${token}`;

         return config;
      }
   );

   return axiosSecure;
};
export default useAxiosSecure;
