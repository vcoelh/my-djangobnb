'use client';
import { useRouter } from "next/navigation";
import apiService from "@/app/components/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import { getAccessToken } from "@/app/lib/actions";

interface ContactButtonProps {
    userId: string | null;
    landlordId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    landlordId,
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const startConversation = async () => {
        const accessToken = await getAccessToken();
        console.log('accessToken', accessToken)
        if (userId) {
            const conversation = await apiService.get(`/api/chat/start/${landlordId}/`, accessToken)

            console.log('conversation_id', conversation.conversation_id)
            if (conversation.conversation_id) {
                router.push(`/inbox/${conversation.conversation_id}/`)
            }
        } else {
            loginModal.open()

        }
    }

    return (
        <div
            onClick={startConversation}
            className="mt-6 cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition">
            Contact
        </div>
    )
};

export default ContactButton;