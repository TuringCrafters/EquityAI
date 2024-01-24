"use client";
import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { DataContext } from "@/services/provider";
import { UploadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { quantum } from 'ldrs'

const UploadFile = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { setData } = useContext(DataContext);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      quantum.register();
    }
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append("file", file[0]);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/analyze`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
            );
            setProgress(percentCompleted);
          },
        }
      );

      setData(response.data);
      toast({
        className: "text-white font-bold tracking-wide",
        variant: "success",
        description: "Analysis Completed: Presenting insights from your file",
      });

      router.push("/analysis");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message ?? "Something went wrong",
      });
    }
  };

  const handleFileClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[20vh] dark:bg-gray-900">
      { progress > 0 ?
        (<div className="p-4 max-w-md mx-auto bg-neutral-50/100 rounded-lg shadow-md flex flex-col items-center justify-center">
          <div className="px-40 py-12">
            <l-quantum
              size="200"
              speed="3.5"
              color="#7710BC"
            ></l-quantum>
          </div>
          <h3 className="text-xl m-7 font-semibold">Analysing your data, stay put</h3>
        </div>
        ) : (
        <div className="w-full max-w-md p-6 space-y-4 bg-neutral-50/100 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-m px-1 py-6"
            encType="multipart/form-data"
          >
            <h1 className="text-4xl font-bold text-center">Upload File</h1>
            <div className="relative">
              <UploadIcon
                className="absolute left-2 top-2 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              />
              <Input
                className="pl-8 mt-12 cursor-pointer"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                id="file"
              />
              {file && (
                <button
                  className="absolute right-3 top-2 font-bold font-inter cursor-pointer"
                  onClick={handleFileClear}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="red"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <Button
              className="w-full h-8 mt-8 text-lg bg-blue-600 rounded-full"
              disabled={!file}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
