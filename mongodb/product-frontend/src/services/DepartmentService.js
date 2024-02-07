import axios from "axios";

const Rest_Api_base_URL = 'http://localhost:8080/api/products/all';

export const listDepartments = () => axios.get(Rest_Api_base_URL);
