import { PostModel } from "../models/PostModel";
import { apiClient } from "./api-client";

interface Response {
    posts:PostModel[];
}

export const getLatestPosts = async():Promise<Response>=>{
    let response = await apiClient.get<Response>('/latest/posts');
    return response.data;
}