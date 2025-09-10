"use client";

import Image from "next/image";

export default function Menu() {
  const dishes = [
    {
      title: "Garlic Butter Shrimp",
      price: "$24.99",
      desc: "Fresh shrimp sautéed in garlic butter with herbs",
      image:
        "https://png.pngtree.com/png-clipart/20250314/original/pngtree-tasty-shrimp-plate-png-image_19280373.png",
      rating: 5,
    },
    {
      title: "Grilled Salmon",
      price: "$29.99",
      desc: "Salmon fillet served with lemon dill sauce",
      image:
        "https://fishing-friends.com/wp-content/uploads/2023/01/product-12.png",
      rating: 4,
    },
    {
      title: "Crispy Calamari",
      price: "$21.99",
      desc: "Golden fried calamari rings with aioli dip",
      image:
        "https://png.pngtree.com/png-clipart/20250314/original/pngtree-tasty-shrimp-plate-png-image_19280373.png",
      rating: 4,
    },
  ];

  return (
    <section className="relative px-6 lg:px-16 py-16 bg-gradient-to-b from-[#7A0005] to-black min-h-screen overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-[url('https://img.freepik.com/premium-photo/dirty-orange-yellow-watercolor-painting-paper-background_62890-554.jpg')] bg-cover bg-center opacity-20"
        style={{ mixBlendMode: "overlay" }}
      ></div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white tracking-wide drop-shadow-lg">
            Our Top Menu
          </h1>
          <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
            Discover our chef’s top picks, crafted with the freshest seafood and
            bold flavors. Each dish is designed to delight your taste buds and
            make every bite unforgettable.
          </p>
          <button className="mt-6 px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#7A0005] transition">
            View More
          </button>
        </div>

        {/* Dish Cards */}
        <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
          {dishes.map((dish, idx) => (
            <div key={idx} className="text-center">
              {/* Rotating Dish */}
              <div className="w-56 h-56 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white animate-[spin_30s_linear_infinite]">
                <Image
                  src={dish.image}
                  alt={dish.title}
                  width={224} // 56 * 4 (tailwind rem -> px)
                  height={224}
                  className="w-full h-full object-cover"
                  priority={idx === 0} // preload first dish
                />
              </div>

              <h2 className="mt-6 text-xl font-semibold text-white">
                {dish.title}
              </h2>
              <p className="mt-2 text-gray-300 text-sm px-4">{dish.desc}</p>

              {/* Rating Stars */}
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
                {dish.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
