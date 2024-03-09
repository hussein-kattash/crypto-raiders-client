import { apiClient } from "./api-client";
import { Response } from "../models/Response";

export const getAllPosts = async(page:any):Promise<Response>=>{
    let response = await apiClient.get<Response>(`/get-posts/?page=${page}`);
    return response.data;
}

