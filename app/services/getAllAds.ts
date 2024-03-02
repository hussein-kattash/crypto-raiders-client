import { AdsModel } from "../models/AdsModel";
import { apiClient } from "./api-client";

export const getAllAds = async():Promise<AdsModel[]>=>{
    let response = await apiClient.get<AdsModel[]>('/get-ads');
    return response.data
}