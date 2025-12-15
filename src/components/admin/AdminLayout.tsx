import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border flex items-center justify-between px-3 md:px-4 bg-card sticky top-0 z-10">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <SidebarTrigger />
              <div className="min-w-0">
                <h1 className="font-semibold text-foreground text-sm md:text-base truncate">{title}</h1>
                {description && (
                  <p className="text-xs text-muted-foreground hidden sm:block">{description}</p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="shrink-0">
              <Link to="/" className="flex items-center gap-1 md:gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Site</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
          </header>
          <main className="flex-1 p-3 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
