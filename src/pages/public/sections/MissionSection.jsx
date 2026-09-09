import { motion } from "framer-motion";

import { Stat } from "../../freelancer/Stat";

export default function MissionSection() {
  return (
    <section className="mx-auto w-[calc(100%-40px)] max-w-[1280px] py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-[26px] bg-[#39348e] px-7 py-9 text-white shadow-[0_14px_40px_rgba(31,41,55,.08)] sm:px-10 lg:px-12 lg:py-11"
      >
        <div className="grid gap-9 lg:grid-cols-[1fr_.92fr] lg:items-center">
          <div>
            <h2 className="max-w-xl text-2xl font-extrabold sm:text-3xl">
              Our Mission is to Empower Global Work
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-indigo-100/80">
              Lynk connects ambitious companies with vetted independent
              professionals across the globe. We believe in frictionless
              collaboration, transparent pricing, and empowering people to do
              the best work of their careers.
            </p>

            <div className="mt-6 flex flex-wrap gap-7">
              <Stat value="10M+" label="Completed Projects" />
              <Stat value="99.8%" label="Satisfaction Rate" />
              <Stat value="24/7" label="Dedicated Support" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
            <h3 className="text-sm font-extrabold">Why Choose Lynk?</h3>
            <ul className="mt-3 space-y-3 text-sm text-indigo-100/85">
              {[
                "Rigorous vetting process for all freelancers",
                "Secure escrow payments and milestone tracking",
                "Zero hidden fees and transparent hourly rates",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
