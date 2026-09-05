import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Globe2,
  Heart,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Footer } from "../../footer/Footer";
import { SectionHeading } from "../../navbar/SectionHeading";
import { Stat } from "../freelancer/Stat";
import { HeroStat } from "../freelancer/HeroStat";

const categories = [];

const freelancers = [];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState([]);

  const filteredFreelancers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return freelancers;

    return freelancers.filter((person) =>
      [person.name, person.role, ...person.skills]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  const toggleLike = (name) => {
    setLiked((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fc] text-[#101936]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e9f3ff] via-[#f2ecff] to-[#fff1f4]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="mx-auto grid min-h-[650px] w-[calc(100%-40px)] max-w-[1280px] items-center gap-8 pb-28 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:pb-36">
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

        <div className="relative z-20 mx-auto mb-[50px]  w-[calc(100%-40px)] max-w-[1280px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              document
                .querySelector("#freelancers")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_14px_40px_rgba(31,41,55,.08)] md:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services, skills, or freelancers..."
                className="h-12 w-full bg-transparent text-sm outline-none"
              />
            </div>

            <select className="rounded-xl bg-slate-50 px-4 text-sm font-semibold text-slate-600 outline-none">
              <option>All Categories</option>
              {categories.slice(0, 7).map(([name]) => (
                <option key={name}>{name}</option>
              ))}
            </select>

            <button className="h-12 rounded-xl bg-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-200">
              Search
            </button>
          </form>
        </div>
      </section>

      <section
        id="categories"
        className="mx-auto w-[calc(100%-40px)] max-w-[1280px] py-12 sm:py-16"
      >
        <SectionHeading
          title="Popular Categories"
          action="View all categories"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
        >
          {categories.map(([name, Icon, tone]) => (
            <motion.a
              variants={fadeUp}
              href="#freelancers"
              key={name}
              className="group flex min-h-[104px] flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-2 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-bold leading-4 text-slate-600">
                {name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <section
        id="freelancers"
        className="mx-auto w-[calc(100%-40px)] max-w-[1280px] scroll-mt-20 py-7 sm:py-12"
      >
        <SectionHeading
          title="Top Rated Freelancers"
          subtitle="Discover professionals with proven track records"
          action="View all freelancers"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {filteredFreelancers.map((person) => (
            <motion.article
              variants={fadeUp}
              whileHover={{ y: -5 }}
              key={person.name}
              className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-28 w-full rounded-xl object-cover"
                />

                <button
                  onClick={() => toggleLike(person.name)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm"
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${
                      liked.includes(person.name)
                        ? "fill-rose-500 text-rose-500"
                        : "text-slate-300"
                    }`}
                  />
                </button>

                <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              <h3 className="mt-3 text-xs font-extrabold">{person.name}</h3>
              <p className="mt-0.5 text-[9px] text-slate-400">{person.role}</p>

              <div className="mt-2 flex items-center gap-1 text-[9px] font-bold">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {person.rating}
                <span className="font-medium text-slate-300">
                  ({person.reviews})
                </span>
              </div>

              <div className="my-3 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">
                    Starting at
                  </span>
                  <span className="text-[11px] font-black">
                    {person.price}
                    <span className="text-[8px] font-semibold text-slate-400">
                      /hr
                    </span>
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-50 px-2 py-1 text-[7px] font-semibold text-slate-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

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

              <div className="mt-6 flex gap-7">
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

      <section
        id="how-it-works"
        className="mx-auto w-[calc(100%-40px)] max-w-[1280px] scroll-mt-20 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            How Lynk Works
          </h2>
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

      <section className="mx-auto w-[calc(100%-40px)] max-w-[1280px] py-12 sm:py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Trusted by Innovative Teams
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            See what our clients and freelancers have to say
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {[
            [
              "Sarah Jenkins",
              "CTO at TechFlow",
              "Lynk completely transformed how we scale our engineering team. We found a senior full-stack dev within 48 hours who integrated seamlessly.",
            ],
            [
              "Marcus Vance",
              "UI/UX Designer",
              "As a freelance designer, Lynk provides a steady stream of high-quality clients without the hassle of chasing invoices or contracts.",
            ],
          ].map(([name, role, quote]) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm"
            >
              <div className="text-xs font-bold">5.0</div>
              <div className="text-[10px] text-slate-400">Rating</div>

              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-4 text-sm italic leading-6 text-slate-600">
                “{quote}”
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-200" />
                <div>
                  <div className="text-xs font-extrabold">{name}</div>
                  <div className="text-[10px] text-slate-400">{role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}
