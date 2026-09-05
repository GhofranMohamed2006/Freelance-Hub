import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";

import { SectionHeading } from "../../../navbar/SectionHeading";
import EmptyState from "../../freelancer/EmptyState";
import LoadingState from "../../freelancer/LoadingState";

export default function CategoriesSection({
  categories,
  categoryIcons,
  loading,
  error,
  setSelectedCategory,
  stagger,
  fadeUp,
}) {
  return (
    <section
      id="categories"
      className="mx-auto w-[calc(100%-40px)] max-w-[1280px] scroll-mt-20 py-16 sm:py-20"
    >
      <SectionHeading title="Popular Categories" action="View all categories" />

      {loading ? (
        <div className="mt-5">
          <LoadingState label="Loading categories..." />
        </div>
      ) : error ? (
        <div className="mt-5">
          <EmptyState>Categories are temporarily unavailable.</EmptyState>
        </div>
      ) : categories.length === 0 ? (
        <div className="mt-5">
          <EmptyState>No categories available right now.</EmptyState>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
        >
          {categories.map((category) => {
            const Icon = categoryIcons[category?.slug] || BriefcaseBusiness;

            return (
              <motion.button
                type="button"
                variants={fadeUp}
                key={category?.id || category?.slug || category?.name}
                onClick={() => {
                  setSelectedCategory(category?.slug || "");
                  document
                    .querySelector("#freelancers")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex min-h-[110px] flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-2 text-center shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              >
                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                  <Icon className="h-5 w-5" />
                </span>

                <span className="text-[10px] font-bold leading-4 text-slate-600">
                  {category?.name || "Category"}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
