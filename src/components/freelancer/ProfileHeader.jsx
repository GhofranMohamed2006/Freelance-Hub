import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiMapPin, FiEdit3, FiStar, FiCalendar, FiCheckCircle } from "react-icons/fi";
import EditProfileModal from "./EditProfileModal";

import { updatePublicProfile } from "../../api/freelancer.api";

const ProfileHeader = ({ data, onUpdateProfile, isOwner: customIsOwner }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth(); 

  const profileId = String(data?._id || data?.id || "").trim();
  const currentUserId = String(user?._id || user?.id || "").trim();

  const canEdit = customIsOwner ?? (
    user?.role === "freelancer" && 
    Boolean(currentUserId) && 
    Boolean(profileId) && 
    currentUserId === profileId
  );

  const profile = {
    name: data?.name || "Freelancer",
    title: data?.title || data?.role || "Professional Freelancer",
    badge: data?.badge || null, 
    location: data?.location || "Remote",
    rating: Number.isFinite(data?.rating) ? data.rating.toFixed(1) : "5.0",
    reviewsCount: data?.reviewsCount || data?.reviews || 0,
    jobSuccess: data?.jobSuccess || null,
    avatar:
      data?.image ||
      data?.avatar ||
      "https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg",
  };

  const handleSaveProfile = async (formData) => {
  try {
    const targetId = data?._id || data?.id;

    const response = await updatePublicProfile(targetId, formData);

    const updatedBackendData =
      response?.user ||
      response?.data ||
      response;

    const mergedData = {
      ...data,
      ...updatedBackendData,
      _id: targetId,
      id: targetId,
    };

    onUpdateProfile?.(mergedData);

  } catch (error) {
    console.error(
      "Failed to save profile changes:",
      error?.response?.data || error
    );

    throw error;
  }
};

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Cover Banner */}
        <div className="relative h-44 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sm:h-52">
          <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        </div>

        {/* Profile Details Bar */}
        <div className="px-6 pb-6 pt-2 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            
            {/* Avatar & Main Info */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
              
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-20">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-28 w-28 rounded-2xl border-4 border-white object-cover shadow-md sm:h-36 sm:w-36"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg";
                  }}
                />
                <span
                  className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-500"
                  title="Online / Available"
                />
              </div>

              {/* Info Content */}
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {profile.name}
                  </h1>

                  {profile.badge && (
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                      {profile.badge}
                    </span>
                  )}
                </div>

                <p className="mt-1.5 text-sm font-medium text-gray-600 sm:text-base">
                  {profile.title}
                </p>

                {/* Meta Info */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <FiMapPin className="text-gray-400" />
                    {profile.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FiStar className="fill-amber-400 text-amber-400" />
                    <strong className="text-gray-900">{profile.rating}</strong> ({profile.reviewsCount} reviews)
                  </span>

                  {profile.jobSuccess && (
                    <span className="flex items-center gap-1.5 text-indigo-600">
                      <FiCheckCircle className="text-indigo-600" />
                      <strong>{profile.jobSuccess}</strong> Job Success
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2 lg:pt-0">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm cursor-pointer transition hover:bg-gray-50 hover:text-gray-900">
                    <FiCalendar className="text-gray-500" />
                    Schedule Interview
                  </button>

                  <button className="flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm cursor-pointer transition hover:bg-indigo-700">
                    Hire Me
                  </button>

              {canEdit && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer"
                >
                  <FiEdit3 />
                  Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {canEdit && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={data}
          onSave={handleSaveProfile}
        />
      )}
    </>
  );
};

export default ProfileHeader;