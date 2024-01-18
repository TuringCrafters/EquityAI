"use client";
import axios from "axios";
import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import UploadIcon from "@/components/icon/uploadIcon";
import FileIcon from "@/components//icon/fileIcon";
import { DataContext } from "@/utils/provider";
import { useRouter } from "next/navigation";

const UploadFile = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const {data, setData} = useContext(DataContext);

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
        { onUploadProgress: (progressEvent) => {
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
        description: "Your file has been sent.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message ?? "Something went wrong",
      });
    }
  };
  console.log(data)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 space-y-4">
      <form onSubmit={handleSubmit} className="w-full max-w-m px-1 py-6" encType="multipart/form-data">
      <h1 className="text-4xl font-bold text-center">Upload File</h1>
        <div className="flex justify-center m-4">
          <Label className="cursor-pointer" htmlFor="file">
          <UploadIcon/>
            <span className="sr-only">Upload File</span>
          </Label>
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
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
        <Button className="w-full h-14 mt-4 text-lg" type="submit">
          Upload
        </Button>
      </form>
      <button onClick = {() => (router.push('/analysis'))}></button>
      </div>
    </div>
  );
};

export default UploadFile;
