import { ReactNode } from "react";
import Header from "./header";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="pb-6 bg-slate-900 min-h-screen w-screen">
      <Header />
      <main className="text-white mt-12 max-w-[80%] w-7xl m-auto">
        {children}
      </main>
    </div>
  );
}
