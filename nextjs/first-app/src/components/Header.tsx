import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <nav className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-lg font-semibold hover:text-blue-200 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/comments"
              className="text-lg font-semibold hover:text-blue-200 transition-colors"
            >
              Comments
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
