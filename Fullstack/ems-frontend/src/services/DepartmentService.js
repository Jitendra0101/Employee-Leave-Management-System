import axios from "axios";

const Rest_Api_base_URL = 'http://localhost:6969/departments';

export const listDepartments = () => axios.get(Rest_Api_base_URL);
