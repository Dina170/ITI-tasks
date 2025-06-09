import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-4">this is the Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        quia debitis sint, quidem error, fugit a perspiciatis facilis
        accusantium placeat explicabo, nihil cupiditate alias ipsum nobis
        voluptatibus odio deleniti commodi!
      </p>
      <Footer pageName="Home" />
    </div>
  );
}
