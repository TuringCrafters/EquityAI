"use client";
import GitHubIcon from "@/public/icon/gitHubIcon";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bottom-0 w-full default-gradient noprint">
      <div className="flex flex-row justify-between pt-24 pb-14 px-24 items-center">
        <div>
          <div>&copy;EquityAi, 2024</div>
          <button onClick={() => router.push("/developers")} className="hover:text-blue-800">About developers</button>
        </div>
        <div className="">
          <h5>Turing Crafters</h5>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://github.com/TuringCrafters/EquityAI"
              target="_blank"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
