import { apiClient } from "./api-client";
import { Response } from "../models/Response";

export const getLatestTwentyPosts = async(page:any):Promise<Response>=>{
    let response = await apiClient.get<Response>(`latest/twenty/posts`);
    return response.data;
}