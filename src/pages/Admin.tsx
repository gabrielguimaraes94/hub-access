
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { user } = useAuth();

  // Redirect if user is not an admin
  if (!user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  );
};

export default Admin;
