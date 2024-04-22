import axios from "axios";

export const base_url = process.env.NEXT_PUBLIC_BASE_URL;
export const apiClient = axios.create({
    baseURL: base_url,
})
