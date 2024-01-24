"use client";
import Link from "next/link";

const samples = ["Dataset.csv"];

const SampleFileForUpload = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-[20vh] dark:bg-gray-800">
      <div className="w-full max-w-md p-6 space-y-4 bg-neutral-50/100 rounded-lg">
        <h1 className="text-xl font-bold text-center">Try with Sample File:</h1>
        <ul className="flex flex-col gap-1 list-none">
          {samples.map((fileName) => {
            return (
              <li key={fileName} className="list-none">
                <Link
                  href={`/samples/${fileName}`}
                  target="_blank"
                  className="text-sm cursor-pointer"
                >
                  Download {fileName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SampleFileForUpload;
