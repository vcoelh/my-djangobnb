'use client';

import CustomButton from "../forms/CustomButton"
import { useState, useRef, useEffect } from "react";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";
import { Suspense } from "react";

interface ConversationDetailProps {
    conversation: ConversationType,
    messages: MessageType[],
    userId: string;
    token: string | null;
}


const ConversationDetail: React.FC<ConversationDetailProps> = ({
    conversation,
    userId,
    token,
    messages,
}) => {

    const messagesDiv = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

    const otherUser = conversation.users?.find((user) => user.id != userId)
    const myUser = conversation.users?.find((user) => user.id == userId)

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
    })

    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop == messagesDiv.current.scrollHeight
        }
    }

    const sendMessage = async () => {
        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                send_to_id: otherUser?.id,
                conversation_id: conversation.id,
            }
        });

        setNewMessage('');

        setTimeout(() => {
            scrollToBottom()
        }, 50);

    }



    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: '',
                name: lastJsonMessage.name as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                body: lastJsonMessage.body as string,
                conversationId: conversation.id,

            };

            setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }

        scrollToBottom();
    }, [lastJsonMessage]);

    console.log('messages', messages)
    return (
        <>

            {messages.map((message, index) => (
                <div
                    key={index}
                    className={
                        `w=[80%] my-5 py-4 px-6 rounded-xl ${message.created_by.name == myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`
                    }
                >
                    <p className="font-bold text-gray-500">{message.created_by.name}</p>
                    <p>{message.body}</p>

                </div>
            ))}
            {realtimeMessages.map((message, index) => (
                <div
                    key={index}
                    className={
                        `w=[80%] my-5 py-4 px-6 rounded-xl ${message.created_by.name == myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`
                    }
                >
                    <p className="font-bold text-gray-500">{message.name}</p>
                    <p>{message.body}</p>

                </div>
            ))}
            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <CustomButton
                    label='Send'
                    onClick={sendMessage}
                    className="w-[100px]"
                />
            </div>
        </>
    )
}

export default ConversationDetail;