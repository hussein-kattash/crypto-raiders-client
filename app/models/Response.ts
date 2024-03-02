import { PostModel } from "./PostModel";

export interface Response{
    posts : PostModel[];
    totalPages:number
}