import { MemberModel } from "../models/MemberModel";
import { apiClient } from "./api-client";

export const getAllMembers = async():Promise<MemberModel[]>=>{
    let response = await apiClient.get<MemberModel[]>(`/get-members`);
    return response.data;
}