import Image from "next/image";
import Navbar from '@/components/Navbar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <div>
      <main>
        <HomePage/>
      </main>
    </div>
  );
}
