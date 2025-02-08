import { Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
        <p className="text-secondary text-lg">Loading DLC...</p>
      </div>
    </div>
  );
}