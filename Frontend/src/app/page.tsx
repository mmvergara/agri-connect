"use client";
import ToggleColorMode from "@/components/Layout/Navbar/ToggleColorMode";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex">
      <ToggleColorMode />
      <Link href="/auth/sign-in"> SignIn </Link>
    </main>
  );
}
