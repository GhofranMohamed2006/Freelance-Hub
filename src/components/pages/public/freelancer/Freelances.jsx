import { Heart, Search, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "../../../navbar/SectionHeading";
import EmptyState from "../../freelancer/EmptyState";
import LoadingState from "../../freelancer/LoadingState";
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
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function Freelancers({
  loading,
  error,
  filteredFreelancers,
  liked,
  toggleLike,
  search,
  selectedCategory,
  clearFilters,
}) {
  return (
    <section
      id="freelancers"
      className="mx-auto w-[calc(100%-40px)] max-w-[1280px] scroll-mt-20 py-8 sm:py-12"
    >
      <SectionHeading
        title="Top Rated Freelancers"
        subtitle="Discover professionals with proven track records"
        action="View all freelancers"
      />

      {loading ? (
        <div className="mt-5">
          <LoadingState label="Loading freelancers..." />
        </div>
      ) : error ? (
        <div className="mt-5">
          <EmptyState>Freelancers are temporarily unavailable.</EmptyState>
        </div>
      ) : filteredFreelancers.length === 0 ? (
        <div className="mt-5">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <Search className="mx-auto h-7 w-7 text-slate-300" />
            <h3 className="mt-3 text-sm font-extrabold text-slate-700">
              No freelancers found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Try another search or category.
            </p>
            {(search || selectedCategory) && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={stagger}
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        >
          {filteredFreelancers.map((person) => {
            const isLiked = liked.includes(person.id);
            const safeSkills = Array.isArray(person?.skills)
              ? person.skills
              : [];

            return (
              <motion.article
                variants={fadeUp}
                whileHover={{ y: -5 }}
                key={person.id}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    className="h-32 w-full rounded-xl object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80";
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => toggleLike(person.id)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105"
                    aria-label={
                      isLiked ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isLiked
                          ? "fill-rose-500 text-rose-500"
                          : "text-slate-300"
                      }`}
                    />
                  </button>

                  <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                </div>

                <h3 className="mt-3 truncate text-sm font-extrabold">
                  {person.name}
                </h3>

                <p className="mt-0.5 truncate text-[10px] text-slate-400">
                  {person.role}
                </p>

                <div className="mt-2 flex items-center gap-1 text-[10px] font-bold">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {Number.isFinite(person.rating)
                    ? person.rating.toFixed(1)
                    : "4.8"}
                  <span className="font-medium text-slate-300">
                    ({person.reviews})
                  </span>
                </div>

                <div className="my-3 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">
                      Starting at
                    </span>
                    <span className="text-[11px] font-black">
                      ${person.hourlyRate}
                      <span className="text-[8px] font-semibold text-slate-400">
                        /hr
                      </span>
                    </span>
                  </div>

                  <div className="mt-2 flex min-h-6 flex-wrap gap-1">
                    {safeSkills.length ? (
                      safeSkills.slice(0, 5).map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-md bg-slate-50 px-2 py-1 text-[7px] font-semibold text-slate-500"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-[8px] text-slate-400">
                        Professional services
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
