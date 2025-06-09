import { News } from "@/lib/interfaces";

async function getNews(catSlug: string) {
  const res = await fetch(`http://localhost:4000/categories/${catSlug}`, {
    cache: "no-store",
  });
  if (res.status == 404) return null;
  return res.json();
}

async function page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const news: News[] = await getNews(slug);

  return (
    <div className="flex gap-6 justify-center p-6">
      {news?.length > 0 &&
        news.map((n) => (
          <div className="bg-gray-100 rounded-xl p-6" key={n.id}>
            <h3 className="text-2xl font-bold pb-3">{n.title}</h3>
            <p>{n.description}</p>
          </div>
        ))}
      {!news && <p>no news</p>}
    </div>
  );
}

export default page;
