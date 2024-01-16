"use client";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UploadFile from "@/components/upload/UploadFile"

export default function Home() {
  return <UploadFile/>;
}
