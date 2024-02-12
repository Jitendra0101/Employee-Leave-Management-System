import axios from "axios";

const Rest_Api_base_URL = 'http://localhost:6900/1/leaves';

export const listLeavesByWorkerId = () => axios.get(Rest_Api_base_URL);
