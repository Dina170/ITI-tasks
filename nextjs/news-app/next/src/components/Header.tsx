import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about-us", label: "About Us" },
];

function Header() {
  return (
    <header className="bg-gray-300 p-5">
      <nav className="mx-auto flex gap-10 text-lg">
        {navLinks.map((l) => (
          <Link href={l.href} key={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
