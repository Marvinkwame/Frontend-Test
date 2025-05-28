import ProtectedRoute from '@/components/ProtectedRoute';
import ProfileCard from '@/components/ProfileCard';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center pt-8">Welcome to Your Dashboard</h1>
        <ProfileCard />
      </div>
    </ProtectedRoute>
  );
}