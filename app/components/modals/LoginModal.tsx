'use client';

import Modal from "./Modal";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import useLoginModal from "../../hooks/useLoginModal";
import { handleLogin } from "@/app/lib/actions";
import apiService from "../services/apiService";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const submitLogin = async () => {
        setIsLoading(true);
        setErrors([]);

        const formData = {
            email: email,
            password: password
        }

        const response = await apiService.post('/api/auth/login/', JSON.stringify(formData));

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);
            loginModal.close();
            router.push('/');
        } else {
            const tmpErrors: string[] = [];

            if (response.non_field_errors) {
                tmpErrors.push(...response.non_field_errors);
            }

            if (response.detail) {
                tmpErrors.push(response.detail);
            }

            if (response.email) {
                tmpErrors.push(...response.email);
            }
            if (response.password) {
                tmpErrors.push(...response.password);
            }

            if (tmpErrors.length === 0) {
                tmpErrors.push("Ocorreu um erro ao tentar fazer login.");
            }

            setErrors(tmpErrors);
        }

        setIsLoading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitLogin();
    }

    const content = (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail"
                    type="email"
                    disabled={isLoading}
                    className="px-4 w-full h-[54px] border border-gray-300 rounded-xl disabled:opacity-50"
                />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    type="password"
                    disabled={isLoading}
                    className="px-4 w-full h-[54px] border border-gray-300 rounded-xl disabled:opacity-50"
                />

                {errors?.map((error, index) => {
                    return (
                        <div
                            key={`error_${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                })}

                <CustomButton
                    label={isLoading ? "Carregando..." : "Entrar"}
                    onClick={submitLogin}
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