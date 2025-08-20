export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6 md:px-0">
        <h1 className="text-2xl font-bold">MyApp</h1>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
