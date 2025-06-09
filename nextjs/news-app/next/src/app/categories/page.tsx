import { Category } from "@/lib/interfaces";
import Link from "next/link";

async function getCategories() {
  const res = await fetch(`http://localhost:4000/categories`, {
    next: { revalidate: false },
  });
  return res.json();
}

async function page() {
  const categories: Category[] = await getCategories();
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold my-6">News Categories</h1>
      <div className="grid gap-6 grid-cols-3">
        {categories.map((cat) => (
          <Link
            href={`/categories/${cat.slug}`}
            className="bg-gray-200 p-3 rounded-xl text-center hover:bg-gray-500 hover:text-white duration-200"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
