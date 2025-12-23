export default function Footer() {
  return (
    <footer className="bg-blue-600 border-t border-blue-500 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-white">
        © {new Date().getFullYear()} Hostel Management System. All rights reserved.
      </div>
    </footer>
  );
}
