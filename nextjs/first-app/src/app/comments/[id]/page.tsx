import Footer from "@/components/Footer";

async function fetchComment(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`
  );
  const comment = await res.json();
  return comment;
}

export default async function page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const comment = await fetchComment(id);
  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {comment.name}
            </h1>
            <p className="text-blue-600 font-medium">{comment.email}</p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {comment.body}
            </p>
          </div>
        </div>
      </div>
      <Footer pageName={`Comment detail of ${id}`} />
    </>
  );
}
