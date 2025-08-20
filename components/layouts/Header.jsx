import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#041420] text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-2 px-6 md:px-0">
        <Image
          src="/images/Logo.png"
          alt="MyApp Logo"
          width={150}
          height={50}
          className=" w-[120px] "
        />
         
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>

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
