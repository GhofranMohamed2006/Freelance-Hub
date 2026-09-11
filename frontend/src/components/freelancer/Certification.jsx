import React from "react";
import { FiAward } from "react-icons/fi";

const Certification = ({ certifications }) => {

  const defaultCertifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services (AWS)",
      year: "2023",
    },
    {
      title: "Meta Certified React Native Specialist",
      issuer: "Meta",
      year: "2022",
    },
  ];

  const certList = certifications || defaultCertifications;

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Certifications</h2>

      <div className="space-y-4">
        {certList.map((item, index) => (
          <div key={index} className="flex items-start gap-3.5">
            {/* Icon Box */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FiAward className="text-lg" />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-gray-500">
                {item.issuer} {item.year && `· ${item.year}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certification;