import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicProfile } from "../../api/freelancer.api"; 

import ProfileHeader from "./ProfileHeader";
import AboutMe from "./AboutMe";
import SkillsExpertise from "./SkillsExprtise";
import FeaturedPortfolio from "./FeaturedPortfolio";
import ClientReviews from "./ClientReviews";
import Certification from "./Certification";
import Education from "./Education";

const FreelancerProfile = () => {
  const { id } = useParams();
  const [freelancerData, setFreelancerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFreelancerProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getPublicProfile(id);
        
        if (isMounted) {
          setFreelancerData(data);
        }
      } catch (err) {
        console.error("Failed to fetch freelancer profile:", err.message);
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
            "Failed to load freelancer profile. Please try again later."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchFreelancerProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !freelancerData) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        <p className="font-semibold">{error || "Freelancer not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 text-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProfileHeader 
          data={freelancerData} 
          onUpdateProfile={(updated) => {
            setFreelancerData((prevData) => ({
              ...prevData,
              ...updated,
            }));
          }}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <AboutMe 
              about={freelancerData.about || freelancerData.bio} 
              stats={freelancerData.stats} 
            />
            <SkillsExpertise skills={freelancerData.skills} />
            <FeaturedPortfolio portfolioList={freelancerData.portfolio} />
            <ClientReviews 
              rating={freelancerData.rating} 
              reviewsCount={freelancerData.reviewsCount}
              reviewsList={freelancerData.reviews}
            />
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">HOURLY RATE</span>
                  <div className="text-2xl font-bold text-gray-900">
                    ${freelancerData.hourlyRate || "0"} <span className="text-sm font-normal text-gray-500">/ hr</span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  {freelancerData.availability || "Available"}
                </span>
              </div>

              <div className="space-y-3 border-b border-gray-100 py-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-500">Response Time</span>
                  <span className="font-medium text-gray-800">{freelancerData.responseTime || "< 2 Hours"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Recent Work</span>
                  <span className="font-medium text-gray-800">{freelancerData.hoursPerWeek || "30 hrs / wk"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Languages</span>
                  <span className="font-medium text-gray-800">
                    {Array.isArray(freelancerData.languages) 
                      ? freelancerData.languages.join(", ") 
                      : freelancerData.languages || "English"}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white cursor-pointer shadow-sm transition hover:bg-indigo-700">
                  Hire {freelancerData.name?.split(" ")[0]} Now
                </button>
                <button className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 cursor-pointer transition hover:bg-gray-50">
                  Send Message
                </button>
              </div>
            </div>

            <Certification certifications={freelancerData.certifications} />
            <Education education={freelancerData.education} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;