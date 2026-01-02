'use client';

import useAddPropertyModal from "../../hooks/useAddPropertyModal";
import AddPropertyModal from "../modals/AddPropertyModal";
import React from "react";
import useLoginModal from "../../hooks/useLoginModal";

interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) => {
    const loginModal = useLoginModal();

    const addPropertyModal = useAddPropertyModal()
    const airbnbYourHome = () => {
        if (userId) {
            addPropertyModal.open()
        } else {
            loginModal.open();
        }
    }
    return (
        <button
            onClick={airbnbYourHome}
            className="
                w-full sm:w-auto 
                px-4 py-3 sm:px-6 sm:py-2.5 
                
                bg-white border-[1px] border-emerald-900 
                text-emerald-900 font-bold text-base sm:text-sm
                
                rounded-xl sm:rounded-lg 
                shadow-sm
                
                transition-all duration-200 ease-in-out
                
                hover:bg-emerald-50 hover:shadow-md
                active:scale-[0.98] sm:active:scale-95
                
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
    "
        >
            Adicionar exame
        </button>
    )
}

export default AddPropertyButton;