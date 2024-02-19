import axios from "axios";

export const GetWorkerById = (id) => {
    const Rest_Api_base_URL = `http://64.23.186.50/api/workers/${id}`;
    return axios.get(Rest_Api_base_URL);
};
