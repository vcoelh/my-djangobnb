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
        <div
            onClick={airbnbYourHome}
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            DjangoBNB your home
        </div>
    )
}

export default AddPropertyButton;