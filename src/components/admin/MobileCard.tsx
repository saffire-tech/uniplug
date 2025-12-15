import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export const MobileCard = ({ children, className, actions }: MobileCardProps) => {
  return (
    <Card className={cn("mb-3", className)}>
      <CardContent className="p-4">
        <div className="space-y-2">
          {children}
        </div>
        {actions && (
          <div className="mt-3 pt-3 border-t border-border flex justify-end">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface MobileCardRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export const MobileCardRow = ({ label, value, className }: MobileCardRowProps) => {
  return (
    <div className={cn("flex justify-between items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
};
