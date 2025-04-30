import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { UserIcon, ChatIcon, HorizontaLDots, PaperPlaneIcon } from "../../icons";
import axios from "axios";
import echo from "../../echo"; // Import the echo instance

interface Message {
  id: number;
  sender: "me" | "therapist";
  content: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

interface Conversation {
  id: number;
  therapistName: string;
  therapistImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
  isOnline?: boolean; // <-- NEW

}

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const getApiBaseUrl = () => {
    // Access the variable using import.meta.env
    return import.meta.env.VITE_API_URL || "http://localhost:8000";
  };
  // Fetch conversations when component mounts
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`${getApiBaseUrl()}/api/users`);
        const users = response.data?.data;
// console.log(users, "usersusers")
        // Assuming messages will be loaded later per conversation
        const conversationData = users.map((user: any) => ({
          id: user.id,
          therapistName: user.name,
          therapistImage: user.avatar,
          lastMessage: "", 
          timestamp: user.is_online ? "Online" : "Offline", // <-- show based on user status
          unreadCount: 0,
          messages: [],
          isOnline: user.is_online, // <-- store it separately too if needed
        }));

        setConversations(conversationData);
      } catch (error) {
        console.error("Error fetching conversations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`${getApiBaseUrl()}/api/messages/${selectedConversation.id}`);
          console.log("Fetched messages:", response.data);
          const messages = response.data.map((message: any) => ({
            id: message.id,
            sender: message.sender_id === selectedConversation.id ? "therapist" : "me",
            content: message.text,
            timestamp: new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "read", // Adjust based on your status logic
          }));
  
          // Update the conversation's messages
          setSelectedConversation((prevConversation) => ({
            ...prevConversation!,
            messages,
          }));
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      };
  
      fetchMessages();
  
      // Listen for new messages on the selected conversation's channel
      const channel = echo.channel(`conversation.${selectedConversation.id}`);
      channel.listen("MessageSent", (event:any) => {
        const newMessage = {
          id: event.message.id,
          sender: event.message.sender_id === selectedConversation.id ? "therapist" : "me",
          content: event.message.text,
          timestamp: new Date(event.message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "sent",
        };
  
        // Append new message to the current conversation's messages
        setSelectedConversation((prevConversation:any) => {
          // Only append if the conversation is selected, else it's ignored
          if (prevConversation && prevConversation.id === selectedConversation.id) {
            return {
              ...prevConversation,
              messages: [...prevConversation.messages, newMessage],
            };
          }
          return prevConversation!;
        });
      });
  
      // Clean up the Echo listener on component unmount
      return () => {
        echo.leaveChannel(`conversation.${selectedConversation.id}`);
      };
    }
  }, [selectedConversation?.id]); // Only run when the conversation ID changes
  
 // Handle sending new message
 const handleSendMessage = async () => {
  if (newMessage.trim() && selectedConversation) {
    const messageData = {
      message: newMessage,
    };
    try {
      const response = await axios.post(`${getApiBaseUrl()}/api/messages/${selectedConversation.id}`, messageData);
      const newMessageObj: Message = {
        id: response.data.id,
        sender: "me",
        content: response.data.text,
        timestamp: new Date(response.data.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      };

      // Add the newly sent message to the conversation
      setSelectedConversation((prevConversation) => ({
        ...prevConversation!,
        messages: [...prevConversation!.messages, newMessageObj],
      }));
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  }
};
  console.log("incomin", selectedConversation)

  return (
    <>
      <PageMeta title="Chat | Dashboard" description="Chat with your therapists" />
      <PageBreadcrumb pageTitle="Chat" />

      <div className="flex h-[calc(100vh-200px)] rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-800">
          <div className="flex h-16 items-center border-b border-gray-200 px-4 dark:border-gray-800">
            <div className="relative flex-1">
              <UserIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          <div className="h-[calc(100%-4rem)] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center">Loading...</div>
          ) : (
            conversations
              .filter((conversation) =>
                conversation.therapistName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`flex cursor-pointer items-center gap-4 border-b border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 ${
                    selectedConversation?.id === conversation.id
                      ? "bg-primary-50 dark:bg-primary-900/20"
                      : ""
                  }`}
                >
                  {/* <img
                    // src={conversation.therapistImage}
                    src="/images/user/user-15.jpg"
                    alt={conversation.therapistName}
                    className="size-12 rounded-full object-cover"
                  /> */}
                  <div className="w-12 aspect-square rounded-full overflow-hidden bg-primary-600 flex items-center justify-center text-black text-lg font-semibold border border-black">
                  {conversation.therapistName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">{conversation.therapistName}</h3>
                      <span
                        className={`text-xs font-medium ${
                          conversation.isOnline ? "text-green-500" : "text-gray-400"
                        }`}
                      >
                        {conversation.isOnline ? "Online" : "Offline"}
                      </span></div>
                    <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex w-2/3 flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  {/* <img
                    // src={selectedConversation.therapistImage}
                    src="/images/user/user-15.jpg"
                    alt={selectedConversation.therapistName}
                    className="size-10 rounded-full object-cover"
                  /> */}
                  <div className="w-12 aspect-square rounded-full overflow-hidden bg-primary-600 flex items-center justify-center text-black text-lg font-semibold border border-black">
                    {selectedConversation.therapistName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{selectedConversation.therapistName}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                  </div>
                </div>
                <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                  <HorizontaLDots className="size-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === "me"
                            ? "bg-primary-600 text-black"
                            : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-black"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="mt-1 flex items-center justify-end gap-1">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.sender === "me" && (
                            <span className="text-xs opacity-70">
                              {message.status === "read" ? "✓✓" : "✓"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                    <ChatIcon className="size-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="rounded-lg bg-primary-600 p-2 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                  >
                    <PaperPlaneIcon className="size-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-gray-500 dark:text-gray-400">Select a conversation to start chatting.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
