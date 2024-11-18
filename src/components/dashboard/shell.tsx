interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-8 overflow-hidden">
      <div className="flex-1 space-y-8 overflow-hidden bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container relative">
          <div className="mx-auto max-w-5xl space-y-8 py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
