import { motion } from "framer-motion";

export default function SummaryCard({ icon: Icon, title, value, description }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -4 }}
      className="rounded-[24px] bg-white p-5 shadow-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-5 text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </motion.div>
  );
}
