import axios from "axios";

const Rest_Api_base_URL = 'http://64.23.186.50/api/workers';

export const listWorkers = () => axios.get(Rest_Api_base_URL);
