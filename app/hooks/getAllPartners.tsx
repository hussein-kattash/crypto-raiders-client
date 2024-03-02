import { useContext, useState } from "react";
import { apiClient } from "../services/api-client";
import { PartnersContext } from "../context/partnersContext";
import { PartnerModel } from "../models/PartnerModel";

export const useGetAllPartners = ()=>{
    const { setPartners } = useContext(PartnersContext);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    async function getAllPartners() {
        setLoading(true);
        apiClient
          .get<PartnerModel[]>("/partners")
          .then((res) => {
            setPartners?.(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.response.data.message);
            setLoading(false);
          });
      }

    return { error, isLoading, getAllPartners };
}