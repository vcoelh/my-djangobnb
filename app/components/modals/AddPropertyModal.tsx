'use client'

import Image from "next/image";

import Modal from "./Modal";
import LoginModal from "./LoginModal";
import useAddPropertyModal from "../hooks/useAddPropertyModal";

const AddPropertyModal = () => {
    const addPropertymodal = useAddPropertyModal();

    return (
        <>
            <Modal
                isOpen={addPropertymodal.isOpen}
                close={addPropertymodal.close}
                label="Add property"
                content={(
                    <p>Yo</p>
                )}
            />
        </>
    )
}

export default AddPropertyModal;