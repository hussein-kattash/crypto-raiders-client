import { PostModel } from "../models/PostModel";
import { apiClient } from "./api-client";

export const getPostById = async(postId:string):Promise<PostModel>=>{
    let response = await apiClient.get<PostModel>(`/get-post/${postId}`);
    return response.data;
}