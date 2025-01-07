import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen min-w-screen bg-[#f7f7f7] dark:bg-gray-900 flex flex-col">
      <main className="flex-grow w-full h-full grid place-items-center">
        {children}
      </main>
    </div>
  );
}
