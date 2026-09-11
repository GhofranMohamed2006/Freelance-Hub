import { useEffect, useState } from "react";
import {
  Search,
  Edit3,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Send,
  Video,
  Phone,
  Info,
  MoreVertical,
} from "lucide-react";

import {
  getFreelancerConversations,
  getFreelancerMessages,
  sendFreelancerMessage,
  markFreelancerMessageRead,
} from "../../api/freelancer.api.js";

const FreelancerMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFreelancerConversations();

      const list = Array.isArray(data)
        ? data
        : data.conversations || data.data || [];

      setConversations(list);

      if (list.length > 0) {
        selectConversation(list[0]);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load conversations",
      );
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    setLoadingMessages(true);
    setError("");

    try {
      const conversationId = conversation.id || conversation.conversationId;

      const data = await getFreelancerMessages(conversationId);

      const list = Array.isArray(data)
        ? data
        : data.messages || data.data || [];

      setMessages(list);

      const unreadMessages = list.filter(
        (item) =>
          item?.id &&
          item?.read !== true &&
          item?.isRead !== true &&
          !isMyMessage(item),
      );

      await Promise.all(
        unreadMessages.map((item) =>
          markFreelancerMessageRead(item.id).catch(() => null),
        ),
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load messages",
      );
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async () => {
    const text = message.trim();

    if (!text || !selectedConversation || sending) return;

    try {
      setSending(true);
      setError("");

      const conversationId =
        selectedConversation.id || selectedConversation.conversationId;

      const recipientId =
        selectedConversation.otherUserId ||
        selectedConversation.recipientId ||
        selectedConversation.userId;

      const data = await sendFreelancerMessage(
        conversationId,
        recipientId,
        text,
      );

      const newMessage = data?.message || data?.data || data;

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
      await loadConversations();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to send message",
      );
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getConversationName = (conversation) =>
    conversation?.otherUser?.name ||
    conversation?.user?.name ||
    conversation?.name ||
    "User";

  const getAvatar = (conversation) =>
    conversation?.otherUser?.avatar ||
    conversation?.user?.avatar ||
    conversation?.avatar ||
    "";

  const getLastMessage = (conversation) =>
    conversation?.lastMessage?.content ||
    conversation?.lastMessage?.message ||
    conversation?.preview ||
    "No messages yet";

  const getMessageText = (item) => item?.content || item?.message || "";

  const isMyMessage = (item) => {
    const currentUserId =
      item?.senderId === item?.userId ? item?.senderId : item?.sender?.id;

    return (
      item?.isMine === true ||
      item?.mine === true ||
      currentUserId === localStorage.getItem("lynk_user_id")
    );
  };

  const selectedName = selectedConversation
    ? getConversationName(selectedConversation)
    : "Select a conversation";

  const selectedAvatar = selectedConversation
    ? getAvatar(selectedConversation)
    : "";

  return (
    <div className="flex h-[calc(100vh-64px)] min-h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <aside className="flex w-[360px] shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-semibold text-slate-900">
              Messages
            </h1>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </div>

          <div className="relative mt-5">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search conversations..."
              className="h-11 w-full rounded-xl bg-indigo-50 pl-11 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">
              All ({conversations.length})
            </button>

            <button className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
              Unread
            </button>

            <button className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
              Archived
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="p-6 text-center text-sm text-slate-400">
              Loading conversations...
            </div>
          )}

          {!loading && conversations.length === 0 && (
            <div className="p-8 text-center">
              <p className="font-medium text-slate-700">No conversations</p>
              <p className="mt-1 text-sm text-slate-400">
                Your messages will appear here.
              </p>
            </div>
          )}

          {!loading &&
            conversations.map((conversation) => {
              const active =
                selectedConversation?.id === conversation.id ||
                selectedConversation?.conversationId ===
                  conversation.conversationId;

              const name = getConversationName(conversation);
              const avatar = getAvatar(conversation);

              return (
                <button
                  key={conversation.id || conversation.conversationId}
                  type="button"
                  onClick={() => selectConversation(conversation)}
                  className={`flex w-full gap-4 border-b border-slate-100 px-6 py-5 text-left transition ${
                    active ? "bg-indigo-50" : "hover:bg-slate-50"
                  }`}
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {name}
                      </p>

                      <span className="shrink-0 text-xs text-slate-400">
                        {conversation?.updatedAt
                          ? new Date(
                              conversation.updatedAt,
                            ).toLocaleDateString()
                          : ""}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {getLastMessage(conversation)}
                    </p>
                  </div>
                </button>
              );
            })}
        </div>

        <div className="border-t border-slate-100 bg-indigo-50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white">
              <span className="text-sm font-semibold">You</span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Freelancer
              </p>

              <p className="truncate text-xs text-slate-500">
                Your Lynk account
              </p>
            </div>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[86px] shrink-0 items-center justify-between border-b border-slate-200 px-7">
          {selectedConversation ? (
            <div className="flex items-center gap-4">
              {selectedAvatar ? (
                <img
                  src={selectedAvatar}
                  alt={selectedName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                  {selectedName.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-xl font-semibold text-slate-900">
                    {selectedName}
                  </h2>

                  <span className="rounded-md bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600">
                    Client
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-600">Active Now</span>
                </div>
              </div>
            </div>
          ) : (
            <h2 className="font-serif text-xl font-semibold text-slate-900">
              Messages
            </h2>
          )}

          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
              <Phone className="h-5 w-5" />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
              <Video className="h-5 w-5" />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
              <Info className="h-5 w-5" />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </header>

        {error && (
          <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs font-semibold text-red-700">Chat Error</p>
            <p className="mt-1 break-words text-xs text-red-600">{error}</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto bg-[#F8F9FC] px-7 py-7">
          {!selectedConversation && (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <Search className="h-7 w-7 text-indigo-600" />
                </div>

                <h3 className="mt-4 font-serif text-xl font-semibold text-slate-800">
                  Select a conversation
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Choose a conversation to start messaging.
                </p>
              </div>
            </div>
          )}

          {selectedConversation && loadingMessages && (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Loading messages...
            </div>
          )}

          {selectedConversation &&
            !loadingMessages &&
            messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-slate-800">
                    No messages yet
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Send the first message below.
                  </p>
                </div>
              </div>
            )}

          {selectedConversation && !loadingMessages && messages.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <span className="rounded-full bg-indigo-100 px-4 py-2 text-xs text-slate-500">
                  Today
                </span>
              </div>

              {messages.map((item, index) => {
                const mine = isMyMessage(item);

                return (
                  <div
                    key={item.id || index}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-5 py-4 ${
                        mine
                          ? "rounded-br-md bg-indigo-600 text-white"
                          : "rounded-bl-md bg-indigo-100 text-slate-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-6">
                        {getMessageText(item)}
                      </p>

                      <div
                        className={`mt-2 text-[11px] ${
                          mine ? "text-indigo-100" : "text-slate-400"
                        }`}
                      >
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-white p-5">
          <div className="flex items-end gap-3">
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            >
              <ImageIcon className="h-5 w-5" />
            </button>

            <div className="relative flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Type your message..."
                className="max-h-32 min-h-[46px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Smile className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={sendMessage}
              disabled={!message.trim() || !selectedConversation || sending}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-2 flex justify-between px-1">
            <span className="text-[11px] text-slate-400">
              Press Enter to send, Shift + Enter for new line
            </span>

            <span className="text-[11px] text-slate-400">
              Encryption secured
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreelancerMessages;
