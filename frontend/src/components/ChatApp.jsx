import React, { useEffect, useState } from "react";
import {
    Chat,
    Channel,
    ChannelHeader,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css";
import { chatConfig } from "../config";

const ChatApp = () => {
    const [client, setClient] = useState(null);
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const chatClient = StreamChat.getInstance(chatConfig.apiKey);

        const connectUser = async () => {
            try {
                // Fetch token from backend
                const response = await fetch("http://localhost:5000/getToken", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: "student123" }),
                });

                const { token } = await response.json();

                // Connect the user
                await chatClient.connectUser(
                    {
                        id: "student123",
                        name: "Student",
                    },
                    token
                );

                // Create or get channel
                const chatChannel = chatClient.channel("messaging", "react-chat", {
                    name: "React Chat",
                });

                setClient(chatClient);
                setChannel(chatChannel);
            } catch (error) {
                console.error("Error connecting user:", error);
            }
        };

        connectUser();

        // Cleanup
        return () => chatClient.disconnect();
    }, []);

    if (!client || !channel) return <div>Loading...</div>;

    return (
        <Chat client={client} theme="team light">
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
};

export default ChatApp;
