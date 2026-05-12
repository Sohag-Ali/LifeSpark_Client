import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://life-spark-server.vercel.app',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

const useAxiox = () => {
    return axiosInstance;
};

export default useAxiox;