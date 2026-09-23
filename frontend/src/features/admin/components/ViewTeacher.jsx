export default function ViewTeacher({ onClose, teacher }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-400 hover:text-red-500"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Teacher Details</h2>
          <p className="mt-1 text-sm text-gray-500">
            Informations about this Teacher
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-medium text-gray-500">Username</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {teacher.user.username}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">Email</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {teacher.user.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">classe</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {teacher.classe[0].name}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">Subject</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {teacher.subjects[0].name}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end border-t border-gray-200 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
