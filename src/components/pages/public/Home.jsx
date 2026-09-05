import { useEffect, useMemo, useState } from "react";
import { Code2, Globe2, Sparkles } from "lucide-react";
import { Footer } from "../../footer/Footer";
import { getFreelancers } from "../../../api/freelancer.api";
import { getCategories } from "../../services/categoryService";
import ErrorState from "../freelancer/ErrorState";
import Freelancers from "./freelancer/Freelances";
import HeroSection from "./sections/HeroSection";
import SearchSection from "./sections/SearchSection";
import CategoriesSection from "./sections/CategoriesSection";
import MissionSection from "./sections/MissionSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import TestimonialsSection from "./sections/TestimonialsSection";

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

const categoryIcons = {
  "web-development": Code2,
  "ui-ux-design": Sparkles,
  "logo-design": Sparkles,
  "mobile-apps": Code2,
  copywriting: Code2,
  "video-editing": Sparkles,
  "ai-integration": Sparkles,
  "digital-marketing": Globe2,
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [liked, setLiked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [freelancers, setFreelancers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [categoriesResponse, freelancersResponse] = await Promise.all([
          getCategories(),
          getFreelancers(),
        ]);

        const nextCategories = Array.isArray(categoriesResponse)
          ? categoriesResponse
          : Array.isArray(categoriesResponse?.data)
            ? categoriesResponse.data
            : [];

        const nextFreelancers = Array.isArray(freelancersResponse)
          ? freelancersResponse
          : Array.isArray(freelancersResponse?.data)
            ? freelancersResponse.data
            : [];

        setCategories(nextCategories);
        setFreelancers(nextFreelancers);
      } catch (err) {
        setError(`Failed to load marketplace data: ${err.message}`);
        setCategories([]);
        setFreelancers([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [retryCount]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
  };

  const filteredFreelancers = useMemo(() => {
    const query = search.trim().toLowerCase();
    const category = selectedCategory.trim().toLowerCase();

    if (!query && !category) {
      return Array.isArray(freelancers) ? freelancers : [];
    }

    return (Array.isArray(freelancers) ? freelancers : []).filter((person) => {
      const text = [
        person?.name,
        person?.role,
        person?.email,
        ...(Array.isArray(person?.skills) ? person.skills : []),
        person?.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || text.includes(query);
      const matchesCategory =
        !category || (person?.category || "").toLowerCase().includes(category);

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, freelancers]);

  const toggleLike = (id) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f9fc] text-[#101936]">
      <HeroSection fadeUp={fadeUp} stagger={stagger} />

      <SearchSection
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        loading={loading}
        error={error}
      />

      {error && (
        <section className="mx-auto w-[calc(100%-40px)] max-w-7xl pt-16">
          <ErrorState
            message={error}
            onRetry={() => setRetryCount((prev) => prev + 1)}
          />
        </section>
      )}

      <CategoriesSection
        categories={categories}
        categoryIcons={categoryIcons}
        loading={loading}
        error={error}
        setSelectedCategory={setSelectedCategory}
        stagger={stagger}
        fadeUp={fadeUp}
      />

      <Freelancers
        loading={loading}
        error={error}
        filteredFreelancers={filteredFreelancers}
        liked={liked}
        toggleLike={toggleLike}
        search={search}
        selectedCategory={selectedCategory}
        clearFilters={clearFilters}
      />

      <MissionSection />
      <HowItWorksSection />
      <TestimonialsSection />

      <Footer />
    </main>
  );
}
