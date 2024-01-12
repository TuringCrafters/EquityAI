"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface ClothingFormProps {
  id?: string;
}

const UploadFile = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-file`,
       formData 
    )

    setIsSuccessVisible(true);
    setTimeout(() => {
      setIsSuccessVisible(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="w-full max-w-m px-1 py-6">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
                       file:bg-primary-content file:btn btn-accent file:rounded-full file:border-0 file:text-sm file:font-normal file:text-secondary-content "
          />
        </div>
        {isSuccessVisible && (
          <div className="text-green-600 text-center">Successful!</div>
        )}
        <button onSubmit={() => handleSubmit}>Upload</button>
      </form>
    </div>
  );
};

export default UploadFile;
