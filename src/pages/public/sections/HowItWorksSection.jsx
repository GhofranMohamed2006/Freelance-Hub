import { motion } from "framer-motion";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-[calc(100%-40px)] max-w-[1280px] scroll-mt-20 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl">How Lynk Works</h2>
        <p className="mt-2 text-sm text-slate-500">
          Simple steps to get your project off the ground
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          [
            "1",
            "Post a Project",
            "Describe your project requirements, timeline, and budget to attract top talent.",
          ],
          [
            "2",
            "Choose Talent",
            "Review proposals, examine past portfolios, and chat with candidates before hiring.",
          ],
          [
            "3",
            "Get Work Done",
            "Collaborate seamlessly through our platform and release payments upon approval.",
          ],
        ].map(([number, title, text]) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-200/80 bg-white px-8 py-7 text-center shadow-sm"
          >
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-extrabold text-indigo-600">
              {number}
            </span>
            <h3 className="mt-5 text-sm font-extrabold">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
