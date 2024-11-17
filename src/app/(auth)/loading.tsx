import { Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-muted-foreground animate-pulse">
          Preparing authentication...
        </p>
      </div>
    </div>
  );
}
