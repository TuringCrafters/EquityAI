"use client";

import UploadFile from "@/components/Upload";

export default function Home() {
  return <div className={"bg-cover bg-center bg-no-repeat h-screen w-screen absolute inset-0 -z-10"}
  style={{ backgroundImage: 'url(https://www.sysarb.se/wp-content/uploads/2023/05/Gradient_final_1-scaled.jpg)' }}
><UploadFile/></div>;
}