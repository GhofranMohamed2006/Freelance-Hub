import React from "react";
import { FiBookOpen } from "react-icons/fi";

const Education = ({ education }) => {
  const educationList = Array.isArray(education) ? education : [];

  if (educationList.length === 0) {
    return (
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-xs text-gray-400">No education background provided.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Education</h2>

      <div className="space-y-4">
        {educationList.map((item, index) => {

          const institutionName =
            item.institution || item.school || item.university || "University";

          const displayPeriod =
            item.period ||
            (item.startDate && item.endDate
              ? `${item.startDate} - ${item.endDate}`
              : item.year || "");

          return (
            <div key={item.id || item._id || index} className="flex items-start gap-3.5">
              {/* Icon Box */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FiBookOpen className="text-lg" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                  {item.degree || item.title || "Degree"}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-gray-500">
                  {institutionName}
                </p>
                {displayPeriod && (
                  <p className="mt-1 text-xs text-gray-400">
                    {displayPeriod}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Education;