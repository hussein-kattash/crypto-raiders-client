import { PostModel } from "../models/PostModel";
import { apiClient } from "./api-client";

interface Response {
    posts:PostModel[];
}

export const getImportantPost = async():Promise<Response>=>{
    let response = await apiClient.get<Response>('/get-posts/?categories=Important&lang=en');
    return response.data;
}