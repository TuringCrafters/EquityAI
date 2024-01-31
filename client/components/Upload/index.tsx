"use client";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { DataContext } from "@/services/provider";
import { UploadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { quantum } from 'ldrs'
import CancelIcon from "@/public/icon/cancelIcon";
import { analyzeFile } from "@/services/api";
import FileUploadForm from "./fileUploadForm";

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

      const response = await analyzeFile(file, setProgress);
      console.log(response.data);

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
    <div className="flex flex-col m-4 items-center justify-center md:h-screen">
      {progress > 0 ?
        (<div className="w-5/6 h-4/6 mx-auto rounded-lg  flex flex-col items-center justify-center">
          <div className="">
            <l-quantum
              size="500"
              speed="4"
              color="white"
            ></l-quantum>
          </div>
          <h3 className="text-xl my-7 font-semibold text-white text-center">Analysing your data, stay put</h3>
        </div>
        ) : (
          <FileUploadForm
            fileInputRef={fileInputRef}
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            handleFileClear={handleFileClear}
            file={file}
          />
        )}
    </div>
  );
};

export default UploadFile;
