import { motion } from "framer-motion";

export default function OverviewRow({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-indigo-200">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-indigo-500">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(Number(value || 0) * 10, 100)}%`,
          }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-white"
        />
      </div>
    </div>
  );
}
