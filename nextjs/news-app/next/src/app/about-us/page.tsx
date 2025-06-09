import Image from "next/image";

function page() {
  return (
    <div className="flex flex-col items-center justify-around p-5 gap-6">
      <p>this is a news app</p>
      <Image
        src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980"
        alt="test"
        width={500}
        height={300}
      />
    </div>
  );
}

export default page;
