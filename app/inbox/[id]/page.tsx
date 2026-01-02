import { getAccessToken, getUserId } from "@/app/lib/actions";
import apiService from "@/app/components/services/apiService";

import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
}

const ConversationPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const userId = await getUserId();
    const accessToken = await getAccessToken();


    if (!userId || !accessToken) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }
    const url = `/api/chat/${id}/`
    console.log('url ', url);
    const conversation = await apiService.get(url, accessToken);


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail
                token={accessToken}
                userId={userId}
                conversation={conversation.conversation}
                messages={conversation.messages}
            />
        </main>
    )
}

export default ConversationPage;