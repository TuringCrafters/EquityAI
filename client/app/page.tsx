"use client";
import HomePage from "@/components/HomePage";
import NavBar from "@/components/Navbar";

export default function Home() {
  return <div>
  <NavBar link="developers" buttonContent="About developers"/>
  <HomePage />
</div>
}