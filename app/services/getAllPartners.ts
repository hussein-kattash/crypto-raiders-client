// import { PostMod } from "../models/PostModel";
import { PartnerModel } from "../models/PartnerModel";
import { apiClient } from "./api-client";

export const getAllPartners = async():Promise<PartnerModel[]>=>{
    let response = await apiClient.get<PartnerModel[]>('/partners');
    return response.data;
}