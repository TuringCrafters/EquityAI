import DownloadIcon from "@/public/icon/downloadIcon";
import { Download } from "lucide-react";
import Link from "next/link";

const SampleFileForUpload = () => {
  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/samples/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center text-black ">
      <button
        className="mt-2 flex items-center bg-purple-600 hover:bg-purple-700 text-white rounded-full px-3 py-2"
        onClick={() => handleDownload("Dataset.xlsx")}
      >
        <DownloadIcon />
        Dataset.xlsx
      </button>
    </div>
  );
};

export default SampleFileForUpload;
