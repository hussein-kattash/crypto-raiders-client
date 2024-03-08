import { apiClient } from "./api-client";
import { Response } from "../models/Response";
import { PostModel } from "../models/PostModel";

export const getAllPosts = async(page:any):Promise<Response>=>{
    let response = await apiClient.get<Response>(`/get-posts/?page=${page}`);
    return response.data;
}

export const getAllPosts_ = async (): Promise<PostModel[]> => {
    try {
        const response = await apiClient.get('/get-posts');
        const posts: PostModel[] = response.data.posts;
        // Sort posts by createdAt in descending order (latest first)
        posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        return posts;
    } catch (error) {
        // Handle any errors (e.g., network issues, invalid response)
        console.error('Error fetching posts:', error);
        throw error;
    }
};