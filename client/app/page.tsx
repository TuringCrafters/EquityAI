"use client";
import UploadFile from "@/components/upload/UploadFile"
import { DataContext } from "@/utils/provider";
import { useContext } from "react";

export default function Home() {

  const data = useContext(DataContext);
  console.log(data);
  return <UploadFile/>;
}
