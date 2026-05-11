import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

const useAxiox = () => {
    return axiosInstance;
};

export default useAxiox;