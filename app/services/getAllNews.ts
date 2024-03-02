import { PostModel } from "../models/PostModel";
import { apiClient } from "./api-client";
import { Response } from "../models/Response";
export const getAllNews = async(page:number):Promise<Response>=>{
    let response = await apiClient.get<Response>(`/get-posts/?categories=News&lang=en&page=${page}`);
    return response.data;
}