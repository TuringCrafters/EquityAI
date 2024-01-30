"use client";
import GitHubIcon from "@/public/icon/gitHubIcon";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full">
      {/* <div className=" flex flex-row align-middle items-center">
          <h1 className="text-2xl font-semibold ml-20 my-10 tracking-tighter">
            company.
          </h1>
      </div> */}
      <div className="flex flex-row justify-between py-12 px-20 border-t-2 border-neutral-200 items-center">
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
