export default function ViewUser({ onClose, user }) {
    console.log(user);
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          ✕
        </button>

        {/* Header */}
        <div className="border-b border-gray-100 bg-gray-50 px-7 py-6">
          <h2 className="text-xl font-bold capitalize text-gray-900">
            User Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Informations about this user
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-4 px-7 py-7 sm:grid-cols-2">

          {/* Username */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Username
            </p>

            <p className="mt-2 text-sm font-semibold text-gray-900">
              {user.username}
            </p>
          </div>

          {/* Email */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Email
            </p>

            <p className="mt-2 break-all text-sm font-semibold text-gray-900">
              {user.email}
            </p>
          </div>

          {/* Role */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Role
            </p>

            <p className="mt-2 text-sm font-semibold capitalize text-violet-600">
              {user.role}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-100 px-7 py-5">
          <button
            onClick={onClose}
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
