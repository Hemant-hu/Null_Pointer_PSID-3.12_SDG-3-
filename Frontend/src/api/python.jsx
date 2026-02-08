import axios from "axios";

const python = axios.create({
    baseURL: "https://null-pointer-psid-3-12-sdg-3-1.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

export default python;
