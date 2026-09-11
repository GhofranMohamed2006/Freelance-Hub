import { useEffect, useMemo, useState } from "react";
import { Wallet, ArrowDownToLine } from "lucide-react";
import { getFreelancerPayments } from "../../api/freelancer.api.js";

const FreelancerEarnings = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { getFreelancerPayments().then((data) => setPayments(Array.isArray(data) ? data : data.data || [])).catch((err) => setError(err?.response?.data?.message || err?.message || "Failed to load earnings")).finally(() => setLoading(false)); }, []);
  const paid = useMemo(() => payments.filter((p) => p.status === "paid"), [payments]);
  const escrow = useMemo(() => payments.filter((p) => p.status === "escrow"), [payments]);
  const total = paid.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  return <div className="mx-auto max-w-7xl space-y-6"><div><h1 className="font-serif text-3xl font-bold text-slate-900">Earnings</h1><p className="mt-1 text-sm text-slate-500">Track your payments and earnings.</p></div>{error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}<div className="grid gap-5 md:grid-cols-3"><div className="rounded-2xl bg-indigo-600 p-6 text-white"><Wallet className="h-6 w-6" /><p className="mt-5 text-sm text-indigo-100">Total earned</p><p className="mt-1 text-3xl font-bold">${total.toFixed(2)}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-sm text-slate-500">Paid payments</p><p className="mt-2 text-3xl font-bold text-slate-900">{paid.length}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-sm text-slate-500">In escrow</p><p className="mt-2 text-3xl font-bold text-slate-900">{escrow.length}</p></div></div><div className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 p-6"><h2 className="font-serif text-xl font-semibold text-slate-900">Payment History</h2></div>{loading ? <p className="p-8 text-sm text-slate-500">Loading payments...</p> : payments.length === 0 ? <div className="p-12 text-center"><ArrowDownToLine className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm text-slate-500">No payments yet.</p></div> : <div className="divide-y divide-slate-100">{payments.map((payment) => <div key={payment.id} className="flex items-center justify-between gap-4 p-6"><div><p className="font-medium text-slate-800">{payment.description || "Project payment"}</p><p className="mt-1 text-xs text-slate-400">{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : ""}</p></div><div className="text-right"><p className="font-semibold text-slate-900">${Number(payment.amount || 0).toFixed(2)}</p><span className="text-xs capitalize text-slate-500">{payment.status}</span></div></div>)}</div>}</div></div>;
};
export default FreelancerEarnings;
