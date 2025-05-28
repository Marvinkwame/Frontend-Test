"use client"
import { useAuth } from '@/context/AuthContext';

export default function ProfileCard() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          User Profile
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-semibold">Full Name:</span> {user.fullName}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Department:</span> {user.departmentName}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Rank:</span> {user.rankName}
          </p>
        </div>
        <button
          onClick={logout}
          className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}