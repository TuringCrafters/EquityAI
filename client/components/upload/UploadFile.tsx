"use client";
import axios from "axios";
import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UploadFile = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState(0);
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    const formData = new FormData();

    if (file) {
      formData.append("file", file[0]);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/analyze`,
       formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
          );
          console.log(percentCompleted);
          setProgress(percentCompleted);
        },
        },
    )    
    return response.data;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 space-y-4">
      <form onSubmit={handleSubmit} className="w-full max-w-m px-1 py-6" encType="multipart/form-data">
      <h1 className="text-3xl font-bold text-center">Upload File</h1>
        <div>
          <Label className="cursor-pointer" htmlFor="file">
            <UploadIcon/>
            <span className="sr-only">Upload File</span>
          </Label>
          <Input
            type="file"
            ref={fileInputRef}
            
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
                       file:bg-primary-content file:btn btn-accent file:rounded-full file:border-0 file:text-sm file:font-normal file:text-secondary-content "
            id="file"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold">File Preview</h2>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <FileIcon/>
              <span>{file && file[0].name}</span>
            </div>
            <div className="mt-2">
              <Progress className="h-1 w-full bg-gray-200 rounded-full" max={100} value={progress} />
            </div>
          </div>
        </div>
        <Button className="w-full" type="submit">
          Upload
        </Button>
      </form>
      </div>
    </div>
  );
};

function FileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

export default UploadFile;
