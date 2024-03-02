import { PostModel } from "../models/PostModel";
import { apiClient } from "./api-client";
import { Response } from "../models/Response";

export const getAllTutorials = async(page:number):Promise<Response>=>{
    let response = await apiClient.get<Response>(`/get-posts/?categories=Tutorials&lang=en?page=${page}`);
    return response.data;
}