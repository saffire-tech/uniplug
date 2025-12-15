import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Loader2 } from 'lucide-react';

interface AdminRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'moderator';
}

export const AdminRoute = ({ children, requiredRole = 'admin' }: AdminRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, isModerator, isLoading: roleLoading } = useAdmin();

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const hasAccess = requiredRole === 'admin' ? isAdmin : isModerator;

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
