import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { UserIcon, ChatIcon, HorizontaLDots, PaperPlaneIcon } from "../../icons";

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
}

const sampleConversations: Conversation[] = [
  {
    id: 1,
    therapistName: "Dr. Sarah Johnson",
    therapistImage: "https://randomuser.me/api/portraits/women/1.jpg",
    lastMessage: "I understand how you're feeling. Let's discuss this in our next session.",
    timestamp: "10:30 AM",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: "therapist",
        content: "Hello! How are you feeling today?",
        timestamp: "10:00 AM",
        status: "read"
      },
      {
        id: 2,
        sender: "me",
        content: "I'm feeling a bit anxious about my upcoming presentation.",
        timestamp: "10:15 AM",
        status: "delivered"
      },
      {
        id: 3,
        sender: "therapist",
        content: "I understand how you're feeling. Let's discuss this in our next session.",
        timestamp: "10:30 AM",
        status: "read"
      }
    ]
  },
  {
    id: 2,
    therapistName: "Dr. Michael Chen",
    therapistImage: "https://randomuser.me/api/portraits/men/1.jpg",
    lastMessage: "Great progress! Keep up the mindfulness exercises.",
    timestamp: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "therapist",
        content: "How did the mindfulness exercises go?",
        timestamp: "Yesterday",
        status: "read"
      },
      {
        id: 2,
        sender: "me",
        content: "They were helpful! I felt more relaxed after doing them.",
        timestamp: "Yesterday",
        status: "read"
      },
      {
        id: 3,
        sender: "therapist",
        content: "Great progress! Keep up the mindfulness exercises.",
        timestamp: "Yesterday",
        status: "read"
      }
    ]
  }
];

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const newMessageObj: Message = {
        id: selectedConversation.messages.length + 1,
        sender: "me",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "sent"
      };

      const updatedConversation: Conversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessageObj]
      };

      setSelectedConversation(updatedConversation);
      setNewMessage("");
    }
  };

  return (
    <>
      <PageMeta
        title="Chat | Dashboard"
        description="Chat with your therapists"
      />
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
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          <div className="h-[calc(100%-4rem)] overflow-y-auto">
            {sampleConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`flex cursor-pointer items-center gap-4 border-b border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 ${
                  selectedConversation?.id === conversation.id
                    ? "bg-primary-50 dark:bg-primary-900/20"
                    : ""
                }`}
              >
                <img
                  src={conversation.therapistImage}
                  alt={conversation.therapistName}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {conversation.therapistName}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {conversation.timestamp}
                    </span>
                  </div>
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
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex w-2/3 flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation.therapistImage}
                    alt={selectedConversation.therapistName}
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {selectedConversation.therapistName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Online
                    </p>
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
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="mt-1 flex items-center justify-end gap-1">
                          <span className="text-xs opacity-70">
                            {message.timestamp}
                          </span>
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
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Select a conversation
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Choose a therapist to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 