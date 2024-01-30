"use client";
import { useRouter } from "next/navigation";

export default function NavBarAnalysis() {
  const router = useRouter();
  return (
    <nav className="fixed z-20 top-0 left-0 right-0 h-12 ">
      <button className="text-2xl font-semibold ml-20  mt-2 tracking-tighter text-slate-950"
      onClick={() => router.push('/')}>
        equityAi
      </button>
    </nav>
  );
}
