import Footer from "@/components/Footer";
import Link from "next/link";

async function fetchComments() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await res.json();
  return comments;
}

export default async function page() {
  const comments = await fetchComments();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Comments</h1>
      <div className="space-y-4">
        {comments.slice(0, 20).map((comment: any) => (
          <div
            key={comment.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <Link href={`/comments/${comment.id}`} className="block">
              <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                {comment.name}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                <span className="font-medium">Email:</span> {comment.email}
              </p>
              <p className="text-gray-700 mt-3 line-clamp-2 text-sm">
                {comment.body}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <Footer pageName="Comments" />
    </div>
  );
}
