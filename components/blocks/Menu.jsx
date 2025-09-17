"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const dishes = [
    {
      title: "Garlic Butter Shrimp",
      price: 24.99,
      desc: "Fresh shrimp sautéed in garlic butter with herbs",
      image:
        "https://png.pngtree.com/png-clipart/20250314/original/pngtree-tasty-shrimp-plate-png-image_19280373.png",
      rating: 5,
    },
    {
      title: "Grilled Salmon",
      price: 29.99,
      desc: "Salmon fillet served with lemon dill sauce",
      image:
        "https://fishing-friends.com/wp-content/uploads/2023/01/product-12.png",
      rating: 4,
    },
    {
      title: "Crispy Calamari",
      price: 21.99,
      desc: "Golden fried calamari rings with aioli dip",
      image:
        "https://png.pngtree.com/png-clipart/20250314/original/pngtree-tasty-shrimp-plate-png-image_19280373.png",
      rating: 4,
    },
  ];

  return (
    <section className="relative px-6 lg:px-16 py-16 bg-gradient-to-b from-[#7A0005] to-black min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('https://img.freepik.com/premium-photo/dirty-orange-yellow-watercolor-painting-paper-background_62890-554.jpg')] bg-cover bg-center opacity-20"
        style={{ mixBlendMode: "overlay" }}
      ></div>

      <div className="relative z-10 flex gap-12">
        <div className="flex-1">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white tracking-wide drop-shadow-lg">
              Our Top Dishes
            </h1>
            <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
              Discover our chef’s top picks, crafted with the freshest seafood
              and bold flavors. Each dish is designed to delight your taste buds
              and make every bite unforgettable.
            </p>
            <Link href="/Menu">
              <button className="mt-6 px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#7A0005] transition">
                View More
              </button>
            </Link>
          </div>

          <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
            {dishes.map((dish, idx) => (
              <div key={idx} className="text-center">
                <div className="w-56 h-56 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white animate-[spin_30s_linear_infinite]">
                  <Image
                    src={dish.image}
                    alt={dish.title}
                    width={224}
                    height={224}
                    className="w-full h-full object-cover"
                    priority={idx === 0}
                  />
                </div>

                <h2 className="mt-6 text-xl font-semibold text-white">
                  {dish.title}
                </h2>
                <p className="mt-2 text-gray-300 text-sm px-4">{dish.desc}</p>

                <div className="flex justify-center mt-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i < dish.rating ? "#FFD700" : "none"}
                      viewBox="0 0 24 24"
                      stroke="#FFD700"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.402c.494.036.695.66.318.993l-4.208 3.602a.563.563 0 00-.182.557l1.286 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L7.47 20.504a.562.562 0 01-.84-.61l1.287-5.385a.563.563 0 00-.183-.557L3.526 10.35c-.377-.333-.176-.957.318-.993l5.518-.402a.563.563 0 00.475-.345l2.125-5.111z"
                      />
                    </svg>
                  ))}
                </div>

                <p className="mt-3 text-[#D3651D] font-bold text-lg">
                  ${dish.price.toFixed(2)}
                </p>

                <button
                  onClick={() => {
                    setSelectedDish(dish);
                    setQuantity(1);
                  }}
                  className="mt-4 px-5 py-2 bg-[#D3651D] text-white rounded-lg hover:bg-[#a54b14] transition shadow-md"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`fixed bottom-[100px] right-0 h-[750px] w-80 bg-[#FFF7F0] shadow-2xl transform transition-all duration-500 ease-in-out 
  ${selectedDish ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          {selectedDish && (
            <div className="flex flex-col h-full">
              <div className="bg-[#FF7A00] text-white rounded-b-2xl p-6 shadow-md">
                <h2 className="text-sm">Your Balance</h2>
                <p className="text-3xl font-bold mt-1">$12,000</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-white text-[#FF7A00] rounded-lg py-1 text-sm font-semibold">
                    Top up
                  </button>
                  <button className="flex-1 bg-white text-[#FF7A00] rounded-lg py-1 text-sm font-semibold">
                    Transfer
                  </button>
                </div>
              </div>

              {/* Address Section */}
              <div className="p-4 border-b">
                <p className="text-gray-600 text-sm">Your Address</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-gray-800 text-sm">Elm Street, 23</p>
                  <button className="text-xs bg-gray-200 rounded px-2 py-1">
                    Change
                  </button>
                </div>
              </div>

              {/* Selected Dish */}
              <div className="p-4 flex items-center gap-3 border-b">
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.title}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium">
                    {selectedDish.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ${selectedDish.price.toFixed(2)}
                  </p>
                </div>
                {/* Quantity Selector */}
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    className="px-2 py-1 bg-gray-200 rounded-l"
                  >
                    –
                  </button>
                  <span className="px-3 bg-white border-t border-b">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-auto p-4">
                <button className="w-full bg-[#FF7A00] text-white py-2 rounded-lg font-semibold hover:bg-[#e56c00] transition">
                  Confirm Order (${(selectedDish.price * quantity).toFixed(2)})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
