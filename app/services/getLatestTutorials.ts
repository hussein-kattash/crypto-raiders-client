import { PostModel } from "../models/PostModel";
import { apiClient } from "./api-client";

interface Response {
    posts:PostModel[];
}

export const getLatestTutorials = async():Promise<Response>=>{
    let response = await apiClient.get<Response>('/latest/posts/?categories=Tutorials&lang=en');
    return response.data;
}