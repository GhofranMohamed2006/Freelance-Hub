import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import api from "../../api/axios.js";

const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const response = await api.get("/notifications");
      const data = response.data;
      setItems(Array.isArray(data) ? data : data.data || data.notifications || []);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const readAll = async () => {
    try {
      await api.post("/notifications/read-all");
      setItems((prev) => prev.map((item) => ({ ...item, read: true, isRead: true })));
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to mark notifications as read");
    }
  };

  return <div className="mx-auto max-w-4xl space-y-6"><div className="flex items-end justify-between gap-4"><div><h1 className="font-serif text-3xl font-bold text-slate-900">Notifications</h1><p className="mt-1 text-sm text-slate-500">Stay up to date with your Lynk activity.</p></div><button onClick={readAll} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"><CheckCheck className="h-4 w-4" /> Mark all read</button></div>{error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{loading ? <div className="p-12 text-center text-sm text-slate-500">Loading notifications...</div> : items.length === 0 ? <div className="p-14 text-center"><Bell className="mx-auto h-10 w-10 text-slate-300" /><h2 className="mt-4 font-semibold text-slate-800">You're all caught up</h2><p className="mt-1 text-sm text-slate-500">New activity will appear here.</p></div> : <div className="divide-y divide-slate-100">{items.map((item) => <div key={item.id} className={`p-5 ${item.read || item.isRead ? "" : "bg-blue-50/50"}`}><div className="flex gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"><Bell className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="font-medium text-slate-800">{item.title || item.message || "Notification"}</p><p className="mt-1 text-sm leading-6 text-slate-500">{item.description || item.body || item.message || ""}</p><p className="mt-2 text-xs text-slate-400">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}</p></div></div></div>)}</div>}</div></div>;
};
export default Notifications;
