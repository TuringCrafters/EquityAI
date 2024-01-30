"use client";
import GitHubIcon from "@/public/icon/gitHubIcon";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full default-gradient">
      <div className="flex flex-row justify-between py-12 px-20 items-center">
        <div>
          <div>&copy; EquityAi, 2024</div>
          <button>About developers</button>
        </div>
        <div className="">
          <h5>Turing Crafters</h5>
          <div className="flex items-center justify-center space-x-4">
            <GitHubIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
