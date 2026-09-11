import React from "react";

const AboutMe = ({ about, stats }) => {

  const textContent = about && about.trim() !== "" ? about : null;

  const rawEarned =
    stats?.totalEarned ?? stats?.earned ?? stats?.earnings ?? 0;
  const rawJobs =
    stats?.totalJobs ?? stats?.jobsCompleted ?? stats?.completedJobs ?? 0;
  const rawHours =
    stats?.hoursWorked ?? stats?.totalHours ?? stats?.hours ?? 0;

  const formatEarned = (val) => {
    if (typeof val === "string" && (val.includes("$") || val.includes("+"))) {
      return val;
    }
    const num = Number(val) || 0;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}k+`;
    return `$${num.toLocaleString()}`;
  };

  const formatNumber = (val) => {
    if (typeof val === "string" && (val.includes("+") || val.includes(","))) {
      return val;
    }
    const num = Number(val) || 0;
    return num > 0 ? `${num.toLocaleString()}+` : "0";
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Title */}
      <h2 className="font-lora text-xl font-bold text-gray-900 sm:text-2xl">
        About Me
      </h2>

      {/* Description */}
      {textContent ? (
        <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base sm:leading-8 whitespace-pre-line">
          {textContent}
        </p>
      ) : (
        <p className="mt-4 text-xs italic text-gray-400">
          No bio summary provided yet.
        </p>
      )}

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Total Earned
          </p>
          <p className="mt-1 text-lg font-extrabold text-gray-900 sm:text-2xl">
            {formatEarned(rawEarned)}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Total Jobs
          </p>
          <p className="mt-1 text-lg font-extrabold text-gray-900 sm:text-2xl">
            {formatNumber(rawJobs)}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Hours Worked
          </p>
          <p className="mt-1 text-lg font-extrabold text-gray-900 sm:text-2xl">
            {formatNumber(rawHours)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;