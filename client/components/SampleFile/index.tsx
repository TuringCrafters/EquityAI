import Link from "next/link";

const samples = ["Dataset.csv"];

const SampleFileForUpload = () => {
  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/samples/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center text-black ">
      <ul className="flex flex-col gap-1 list-none">
        {samples.map((fileName) => {
          return (
            <li key={fileName} className="list-none flex items-center">
              <button
                className="mt-2 flex items-center bg-purple-600 hover:bg-purple-700 text-white rounded-full px-3 py-2"
                onClick={() => handleDownload(fileName)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <Link href={`/samples/${fileName}`} target="_blank" download>
                  {fileName}
                </Link>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SampleFileForUpload;
