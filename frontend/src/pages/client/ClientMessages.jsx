import { useEffect, useState } from "react";
import { Search, Send, MessageSquare } from "lucide-react";
import api from "../../api/axios.js";

const ClientMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/messages/conversations");
      const data = response.data;
      const list = Array.isArray(data) ? data : data.conversations || data.data || [];
      setConversations(list);
      if (!selected && list.length) loadMessages(list[0]);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversation) => {
    setSelected(conversation);
    try {
      const id = conversation.id || conversation.conversationId || conversation.userId;
      const response = await api.get("/messages", { params: { conversationId: id, userId: conversation.userId } });
      const data = response.data;
      setMessages(Array.isArray(data) ? data : data.data || data.messages || []);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load messages");
    }
  };

  useEffect(() => { loadConversations(); }, []);

  const send = async () => {
    if (!text.trim() || !selected) return;
    try {
      const receiverId = selected.userId || selected.otherUserId || selected.recipientId;
      const response = await api.post("/messages", { receiverId, text: text.trim() });
      const item = response.data?.message || response.data;
      setMessages((prev) => [...prev, item]);
      setText("");
      await loadConversations();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to send message");
    }
  };

  const name = selected?.otherUser?.name || selected?.user?.name || selected?.name || "User";

  return (
    <div className="flex h-[calc(100vh-120px)] min-h-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <aside className="flex w-[340px] shrink-0 flex-col border-r border-slate-200">
        <div className="border-b border-slate-100 p-5"><h1 className="font-serif text-2xl font-bold text-slate-900">Messages</h1><div className="relative mt-4"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input placeholder="Search conversations..." className="w-full rounded-xl bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none" /></div></div>
        <div className="flex-1 overflow-y-auto">{loading ? <p className="p-6 text-sm text-slate-400">Loading conversations...</p> : conversations.length === 0 ? <div className="p-8 text-center"><MessageSquare className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm text-slate-500">No conversations yet.</p></div> : conversations.map((item, index) => { const itemName = item?.otherUser?.name || item?.user?.name || item?.name || `User ${index + 1}`; return <button key={item.id || item.userId || index} onClick={() => loadMessages(item)} className={`flex w-full gap-3 border-b border-slate-100 p-5 text-left ${selected?.userId === item.userId ? "bg-blue-50" : "hover:bg-slate-50"}`}><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white font-semibold">{itemName.charAt(0).toUpperCase()}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{itemName}</p><p className="mt-1 truncate text-xs text-slate-500">{item.lastMessage?.text || item.lastMessage?.content || "Conversation"}</p></div></button>; })}</div>
      </aside>
      <section className="flex min-w-0 flex-1 flex-col"><header className="flex h-20 items-center border-b border-slate-200 px-6"><div><h2 className="font-serif text-xl font-semibold text-slate-900">{selected ? name : "Select a conversation"}</h2><p className="text-xs text-slate-400">Client messaging</p></div></header>{error && <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">{error}</div>}<div className="flex-1 overflow-y-auto bg-[#F8F9FC] p-6"><div className="space-y-4">{messages.map((item, index) => <div key={item.id || index} className={`flex ${item.senderId === localStorage.getItem("lynk_user_id") || item.isMine ? "justify-end" : "justify-start"}`}><div className="max-w-[70%] rounded-2xl bg-white px-4 py-3 shadow-sm"><p className="text-sm text-slate-700">{item.text || item.content || item.message}</p></div></div>)}</div></div><div className="border-t border-slate-200 p-4"><div className="flex gap-3"><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={!selected} placeholder="Type a message..." className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500" /><button onClick={send} disabled={!selected || !text.trim()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white disabled:opacity-50"><Send className="h-4 w-4" /></button></div></div></section>
    </div>
  );
};
export default ClientMessages;
