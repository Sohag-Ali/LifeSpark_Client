import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://life-spark-1b54e.web.app',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

const useAxiox = () => {
    return axiosInstance;
};

export default useAxiox;