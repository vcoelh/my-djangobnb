'use client';

import Modal from "./Modal";

import { useState } from "react";

import CustomButton from "../forms/CustomButton";

import useLoginModal from "../hooks/useLoginModal";


const LoginModal = () => {
    const loginModal = useLoginModal()

    const content = (
        <>
            <form action="." className="space-y-4">
                <input placeholder="Your email address" type="email"
                    className="px-4 w-full h-[54px] border border-gray-300 rounded-xl" />
                <input placeholder="Your password" type="password"
                    className="px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                <div className="p-4 bg-airbnb text-white rounded-xl opacity-80">
                    the error message
                </div>

                <CustomButton
                    label="Submit"
                />
            </form>
        </>
    )


    return (
        <Modal
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    )
}

export default LoginModal;