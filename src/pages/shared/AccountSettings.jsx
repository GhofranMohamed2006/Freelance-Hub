import { useEffect, useState } from "react";
import {
  UserRound,
  Lock,
  CreditCard,
  Bell,
  KeyRound,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  getMe,
  updateUser,
  changePassword as changePasswordApi,
  saveNotifications as saveNotificationsApi,
} from "../../api/auth.api.js";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    hourlyRate: "",
    location: "",
    avatar: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    messages: true,
    proposals: true,
    projects: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMe();
      const currentUser = data.user || data;

      setUser(currentUser);

      setForm({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        hourlyRate: currentUser.hourlyRate || "",
        location: currentUser.location || "",
        avatar: currentUser.avatar || "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to load account information",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const data = await updateUser(user.id, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        bio: form.bio,
        hourlyRate: Number(form.hourlyRate) || 0,
        location: form.location,
        avatar: form.avatar,
      });

      setUser(data.user || data);

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to update profile",
      );
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (!password.newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      await changePasswordApi(password.currentPassword, password.newPassword);

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage("Password changed successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to change password",
      );
    } finally {
      setSaving(false);
    }
  };

  const saveNotifications = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      await saveNotificationsApi(notifications);

      setMessage("Notification preferences saved.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to save notification preferences",
      );
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile Information",
      icon: UserRound,
    },
    {
      id: "security",
      label: "Security & Password",
      icon: Lock,
    },
    {
      id: "billing",
      label: "Billing Methods",
      icon: CreditCard,
    },
    {
      id: "notifications",
      label: "Notifications Preferences",
      icon: Bell,
    },
    {
      id: "api",
      label: "API Keys",
      icon: KeyRound,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-sm text-slate-500">Loading account...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] md:pl-20 md:pr-22">
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-indigo-100 to-indigo-200 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt={user?.name || "Profile"}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-white shadow-sm">
                <UserRound className="h-10 w-10" />
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-3xl font-bold text-slate-900">
                  {user?.name ||
                    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
                    "User"}
                </h1>

                {user?.role && (
                  <span className="rounded-full bg-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {user.role}
                  </span>
                )}
              </div>

              <p className="mt-1 text-lg text-slate-600">
                {user?.role === "client"
                  ? "Client Account"
                  : "Freelancer Account"}
              </p>

              <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          {activeTab === "profile" && (
            <button
              type="button"
              onClick={saveProfile}
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm font-semibold text-red-700">Error</p>
          <p className="mt-1 break-words text-sm text-red-600">{error}</p>
        </div>
      )}

      {message && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
          <p className="text-sm font-semibold text-green-700">{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMessage("");
                    setError("");
                  }}
                  className={`flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-sm font-semibold transition ${activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {activeTab === "profile" && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  Profile Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your personal details and public profile information.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    First Name
                  </label>

                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Last Name
                  </label>

                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Email Address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Profile Image URL
                  </label>

                  <input
                    name="avatar"
                    value={form.avatar}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    rows={5}
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Hourly Rate ($ USD)
                  </label>

                  <input
                    name="hourlyRate"
                    type="number"
                    value={form.hourlyRate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Location
                  </label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  Security & Password
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Keep your account secure by updating your password.
                </p>
              </div>

              <div className="max-w-xl space-y-6">
                <PasswordInput
                  label="Current Password"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handlePasswordChange}
                  show={showPassword}
                  setShow={setShowPassword}
                />

                <PasswordInput
                  label="New Password"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                  show={showPassword}
                  setShow={setShowPassword}
                />

                <PasswordInput
                  label="Confirm New Password"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handlePasswordChange}
                  show={showPassword}
                  setShow={setShowPassword}
                />

                <button
                  type="button"
                  onClick={changePassword}
                  disabled={saving}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {saving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="p-8">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Billing Methods
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your payment methods and billing information.
              </p>

              <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-10 text-center">
                <CreditCard className="mx-auto h-10 w-10 text-slate-400" />

                <h3 className="mt-4 font-semibold text-slate-800">
                  No billing methods
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Payment method management can be connected to your payment
                  provider here.
                </p>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  Notification Preferences
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose which notifications you want to receive.
                </p>
              </div>

              <div className="max-w-2xl divide-y divide-slate-100">
                <NotificationToggle
                  title="Email Notifications"
                  description="Receive important account notifications by email."
                  checked={notifications.email}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      email: value,
                    })
                  }
                />

                <NotificationToggle
                  title="Messages"
                  description="Get notified when someone sends you a message."
                  checked={notifications.messages}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      messages: value,
                    })
                  }
                />

                <NotificationToggle
                  title="Proposals"
                  description="Receive updates about proposals and applications."
                  checked={notifications.proposals}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      proposals: value,
                    })
                  }
                />

                <NotificationToggle
                  title="Projects"
                  description="Receive updates about your projects."
                  checked={notifications.projects}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      projects: value,
                    })
                  }
                />
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={saveNotifications}
                  disabled={saving}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="p-8">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                API Keys
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage API keys for your Lynk integrations.
              </p>

              <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-10 text-center">
                <KeyRound className="mx-auto h-10 w-10 text-slate-400" />

                <h3 className="mt-4 font-semibold text-slate-800">
                  No API keys
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  API key management can be added when the API-key backend
                  endpoint is available.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const PasswordInput = ({ label, name, value, onChange, show, setShow }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </label>

      <div className="relative">
        <input
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="button"
          onClick={() => setShow((show) => !show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

const NotificationToggle = ({ title, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange((prev) => !prev)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-indigo-600" : "bg-slate-300"
          }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-6" : "left-1"
            }`}
        />
      </button>
    </div>
  );
};

export default AccountSettings;
