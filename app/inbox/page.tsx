import { getAccessToken, getUserId } from "../lib/actions";
import apiService from "../components/services/apiService";
import Conversation from "../components/inbox/Conversation";

export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
}

export type ConversationType = {
    id: string;
    users: UserType[];
}


const InboxPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>Entre na sua conta...</p>
            </main>
        )
    }

    const token = await getAccessToken();
    const conversations = await apiService.get('/api/chat/', token)

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl">Conversas:</h1>

            {conversations.map((conversation: ConversationType) => {
                return (
                    <Conversation
                        key={conversation.id}
                        conversation={conversation}
                        userId={userId}
                    />

                )

            })}

        </main>
    )
};

export default InboxPage;