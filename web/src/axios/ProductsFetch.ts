import axios from "axios";

const productsFetch = axios.create({
    baseURL: "http://localhost:8080/marketplace",
    headers: {
        "Content-Type": "application/json",
    },
});

export default productsFetch;