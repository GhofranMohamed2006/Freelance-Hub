import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
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
  );
}
