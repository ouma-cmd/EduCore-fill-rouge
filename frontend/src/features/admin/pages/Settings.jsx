import { useEffect, useState } from "react";
import getProfile from "../../../services/getProfile";
import changePassword from "../../../services/changePassword";

export default function Settings() {
  const [profile, setProfile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleChangePassword() {
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const payload = {
        oldPassword,
        newPassword,
      };

      const result = await changePassword(payload);

      setMessage(result.message);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfile();

      console.log("PROFILE:", data);

      setProfile(data);
    }

    fetchProfile();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your admin profile and password.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Profile */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Admin Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View and manage your administrator account information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-2">
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                value={profile?.username || ""}
                readOnly
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={profile?.email}
                readOnly
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </label>

              <input
                type="text"
                value={profile?.role}
                readOnly
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500 outline-none"
              />
            </div>

            {/* Account */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Account
              </label>

              <input
                type="text"
                value="Active"
                readOnly
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-100 px-4 text-sm text-green-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Change Password
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your password to keep your account secure.
            </p>
          </div>

          <div className="space-y-5 px-6 py-6">
            {/* Current Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Current Password
              </label>

              <input
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-100 px-6 py-4">
            {error && <p className="px-6 text-sm text-red-600">{error}</p>}

            {message && (
              <p className="px-6 text-sm text-green-600">{message}</p>
            )}
            <button
              type="button"
              onClick={handleChangePassword}
              className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
