import { AdsModel } from "../models/AdsModel";
import { apiClient } from "./api-client";

export const getLatestAds = async():Promise<AdsModel[]>=>{
    let response = await apiClient.get<AdsModel[]>('/get-ads');
    const sortedAds = response.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const latestAd = sortedAds.slice(0, 1);
    return latestAd;
}
