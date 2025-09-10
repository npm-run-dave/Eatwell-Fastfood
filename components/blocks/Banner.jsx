"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Login from "../blocks/Login";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner() {
  const { data: session } = useSession();
  const [localUser, setLocalUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const defaultAvatar = "/images/default-avatar.png";

  // Load manual user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  // Listen for localStorage changes (so avatar updates automatically)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setLocalUser(JSON.parse(storedUser));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Close modal automatically after login
  useEffect(() => {
    if (session || localUser) {
      setAnimateModal(false);
      setTimeout(() => setShowLoginModal(false), 300);
    }
  }, [session, localUser]);

  // Trigger fade-in animation
  useEffect(() => {
    if (showLoginModal) setAnimateModal(true);
  }, [showLoginModal]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    fade: true,
    speed: 1500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  const slides = [
    {
      id: 1,
      image:
        "https://www.foxyfolksy.com/wp-content/uploads/2021/04/cajun-seafood-boil-recipe.jpg",
      title: "Taste the Flames",
      desc: "Delicious grilled dishes inspired by fire and flavor.",
    },
    {
      id: 2,
      image: "/seafoodsimages/kingcrab1.png",
      title: "Fresh & Hot",
      desc: "Handcrafted meals made with fresh local ingredients.",
    },
    {
      id: 3,
      image: "/seafoodsimages/Octopus.webp",
      title: "Eat Well, Live Well",
      desc: "A unique dining experience for food lovers.",
    },
  ];

  const handleOrderClick = () => {
    if (!session && !localUser) {
      setShowLoginModal(true);
    } else {
      console.log("Show menu here or redirect to /Menus");
    }
  };

  // Decide avatar + name
  const avatar = session?.user?.image || localUser?.image || defaultAvatar;
  const displayName = session?.user?.name || localUser?.name || "User";

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-screen">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover brightness-75"
            />

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-red-900/70 via-orange-800/50 to-transparent pointer-events-none" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-8">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-2xl max-w-lg md:max-w-3xl drop-shadow-md">
                {slide.desc}
              </p>

              <button
                onClick={handleOrderClick}
                className="mt-5 sm:mt-6 px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-800 via-red-700 to-yellow-900 hover:from-red-900 hover:via-red-800 hover:to-yellow-800 rounded-lg text-white text-sm sm:text-base md:text-lg font-semibold shadow-lg transition"
              >
                Order Now
              </button>

              {/* Show avatar + name if logged in */}
            </div>
          </div>
        ))}
      </Slider>

      {/* Login Modal */}
      {showLoginModal && !session && !localUser && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
            animateModal ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-md relative h-[450px] translate-y-[-150px] transform transition-all duration-300 ${
              animateModal ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
            >
              ×
            </button>
            <Login onLoginSuccess={(user) => setLocalUser(user)} />
          </div>
        </div>
      )}
    </section>
  );
}
