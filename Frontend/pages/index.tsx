import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <Link href="/auth/sign-in"> SignIn </Link>
    </main>
  );
}
