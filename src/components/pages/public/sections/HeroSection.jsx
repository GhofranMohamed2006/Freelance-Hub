import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Globe2,
  Sparkles,
  Users,
} from "lucide-react";

import { HeroStat } from "../../freelancer/HeroStat";

export default function HeroSection({ fadeUp, stagger }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e9f3ff] via-[#f2ecff] to-[#fff1f4]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[650px] w-[calc(100%-40px)] max-w-[1280px] items-center gap-8 pb-16 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-3 py-1.5 text-xs font-semibold text-indigo-500 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            The smarter way to work and hire
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-2xl text-balance text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[64px]"
          >
            Find the right{" "}
            <span className="bg-gradient-to-r from-[#6d45e9] to-[#3d61e9] bg-clip-text text-transparent">
              talent.
            </span>
            <br />
            Get work{" "}
            <span className="bg-gradient-to-r from-[#6d45e9] to-[#3d61e9] bg-clip-text text-transparent">
              done.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
          >
            Connect with skilled professionals for any project, or find
            opportunities to grow your career.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
            <a
              href="#freelancers"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Hire Talent
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#how-it-works"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Find Work
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto h-[370px] w-full max-w-[560px] sm:h-[430px]"
        >
          <motion.div
            animate={{ y: [0, -9, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute left-[12%] top-[15%] h-24 w-24 rounded-[28px] bg-gradient-to-br from-pink-300 to-fuchsia-500 shadow-xl"
          />

          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute right-[12%] top-[11%] h-24 w-24 rounded-[28px] bg-gradient-to-br from-indigo-300 to-violet-600 shadow-xl"
          />

          <div className="absolute left-[9%] top-[25%] w-[78%] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_14px_40px_rgba(31,41,55,.08)] backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-3">
              <HeroStat icon={<Users />} value="120K+" label="FREELANCERS" />
              <HeroStat
                icon={<BriefcaseBusiness />}
                value="85K+"
                label="JOBS POSTED"
              />
              <HeroStat icon={<Check />} value="98%" label="SUCCESS RATE" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <HeroStat icon={<Globe2 />} value="180+" label="COUNTRIES" />
              <div className="hidden items-center justify-center gap-3 rounded-xl bg-slate-50 p-3 text-[9px] font-bold text-slate-500 sm:flex">
                <span className="text-blue-600">Google</span>
                <span>Microsoft</span>
                <span className="text-red-500">airbnb</span>
                <span className="text-blue-500">PayPal</span>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-[10%] left-[1%] flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg"
          >
            <Code2 />
          </motion.div>

          <div className="absolute bottom-[20%] right-[8%] w-[55%] rounded-2xl border border-white bg-white/85 p-4 shadow-[0_14px_40px_rgba(31,41,55,.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-200 to-orange-400" />
              <div>
                <div className="text-[10px] font-extrabold">Trusted by</div>
                <div className="text-[9px] text-slate-400">
                  10,000+ businesses worldwide
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
