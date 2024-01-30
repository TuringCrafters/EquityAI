"use client";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="fixed flex justify-between z-20 top-0 left-0 right-0 h-12 bg-neutral-100 shadow md:shadow-lg">
      <h1 className="text-2xl font-semibold ml-20  mt-2 tracking-tighter text-slate-950">
        equityAi
      </h1>
      <button className="mr-8 hover:text-violet-800" 
      onClick={() => router.push("/developers")}>About developers</button>
    </nav>
  );
}
