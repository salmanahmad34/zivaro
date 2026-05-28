import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center glass-card rounded-2xl w-full max-w-md mx-auto">
      <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-6">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-xs">{description}</p>
      
      {actionLabel && onAction && (
        <button onClick={onAction} className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
