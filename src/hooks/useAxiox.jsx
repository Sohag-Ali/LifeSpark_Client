import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://lifespark-server.onrender.com/',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

const useAxiox = () => {
    return axiosInstance;
};

export default useAxiox;