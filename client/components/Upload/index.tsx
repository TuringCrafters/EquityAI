"use client";
import axios from "axios";
import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { DataContext } from "@/services/provider";
import { Progress } from "@radix-ui/react-progress";
import { UploadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UploadFile = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { data, setData } = useContext(DataContext);
  const router = useRouter();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files);
    }
  };
  const sendToAnalysis = () => {
    router.push("/analysis");
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center pt-[20vh] dark:bg-gray-900">
      <div className="w-full max-w-md p-6 space-y-4 bg-neutral-50/100 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-m px-1 py-6"
          encType="multipart/form-data"
        >
          <h1 className="text-4xl font-bold text-center">Upload File</h1>
          <div className="relative">
            <UploadIcon
              className="absolute left-2 top-2"
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
              <div
                className="absolute right-3 top-2 font-bold font-mono cursor-pointer text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                X
              </div>
            )}
          </div>
          <Button
            className="w-full h-8 mt-8 text-lg bg-blue-600 rounded-full"
            disabled={!file}
            type="submit"
          >
            Submit
          </Button>
          {progress > 0 && (
            <div className="mt-6 text-center flex flex-col">
              <div className="text-xs italic">Generating insights...</div>
              <Progress
                className={
                  "h-4 w-full bg-gray-200 rounded-full " +
                  (isLoading ? "animate-pulse" : "")
                }
                max={100}
                value={progress}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default UploadFile;
