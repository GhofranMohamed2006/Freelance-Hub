import React from "react";

const SkillsExpertise = ({ skills }) => {
  // 1. if there are not skills
  if (!skills || (Array.isArray(skills) && skills.length === 0)) {
    return (
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Skills & Expertise
        </h2>
        <p className="mt-4 text-xs text-gray-400">No skills listed yet.</p>
      </section>
    );
  }

  // 2. Check if skills contain names only
  const isStringArray = typeof skills[0] === "string";

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Skills & Expertise
        </h2>
      </div>

      {/* Array of Strings */}
      {isStringArray ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-xl bg-indigo-50/80 border border-indigo-100 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100/80"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        /* (Array of Objects) if data contain percentage */
        <div className="space-y-5">
          {skills.map((skill, index) => {
            const skillName = skill.name || skill;
            const skillPercentage = skill.percentage || 100;

            return (
              <div key={skillName || index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {skillName}
                  </span>
                  {skill.percentage && (
                    <span className="text-xs font-bold text-indigo-600">
                      {skillPercentage}%
                    </span>
                  )}
                </div>

                {/* Progress Track */}
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  {/* Progress Fill */}
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${skillPercentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SkillsExpertise;