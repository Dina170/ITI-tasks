export default function Footer({ pageName }: { pageName: string }) {
  return (
    <footer className="w-full mt-8 border-t pt-4 text-sm text-gray-600">
      {pageName}
    </footer>
  );
}
