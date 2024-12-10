import { Button } from '@/components/primitives/button';
import { Plus, Settings } from 'lucide-react';

interface IntegrationsEmptyStateProps {
  onAddProviderClick: () => void;
}

export function IntegrationsEmptyState({ onAddProviderClick }: IntegrationsEmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-10">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        <Settings className="text-muted-foreground h-6 w-6" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold">No integrations found</h2>
        <p className="text-muted-foreground text-sm">Add your first integration to get started</p>
      </div>
      <Button onClick={onAddProviderClick} data-test-id="add-first-integration">
        <Plus className="mr-2 h-4 w-4" />
        Add Integration
      </Button>
    </div>
  );
}