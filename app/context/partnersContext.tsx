import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { PartnerModel } from '../models/PartnerModel';

export interface PartnersContextProps {
    partners: PartnerModel[]; // Corrected type: an array of PartnerModel
    setPartners: Dispatch<SetStateAction<PartnerModel[]>>;
    currentPage:number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const PartnersContext = createContext<PartnersContextProps>({
    currentPage:1,
    partners: [],
    setPartners: () => {},
    setCurrentPage: () => {},
});

interface Props {
    children: ReactNode;
}

export const PartnersProvider: React.FC<Props> = ({ children }) => {
    const [partners, setPartners] = useState<PartnerModel[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    return (
        <PartnersContext.Provider value={{currentPage,setCurrentPage, partners, setPartners }}>
            {children}
        </PartnersContext.Provider>
    );
};
