export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
} 