import axios from "axios";
import swal from 'sweetalert';

const baseURL = "http://localhost:8000";

export async function login(data) {
    const response = await axios.post(`${baseURL}/auth/admin`, data)
    .catch(async (err) => {
        if (err.response) {
            await swal("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export async function getUsernameFromToken(data) {
    const response = await axios.post(`${baseURL}/auth/validate`, data);

    return response;
}