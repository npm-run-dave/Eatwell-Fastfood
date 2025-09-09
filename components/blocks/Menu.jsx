"use client";

export default function Menu() {
  const dishes = [
    {
      title: "Garlic Butter Shrimp",
      price: "$24.99",
      desc: "Fresh shrimp sautéed in garlic butter with herbs",
      image:
        "https://getfish.com.au/cdn/shop/articles/Step_3_-_Octopus_cd435b57-81c6-41fe-a8ed-1c78d12a7ada.png?v=1739324920",
    },
    {
      title: "Grilled Salmon",
      price: "$29.99",
      desc: "Salmon fillet served with lemon dill sauce",
      image:
        "https://www.recipetineats.com/tachyon/2023/02/Crispy-baby-octopus_3-square.jpg",
    },
    {
      title: "Crispy Calamari",
      price: "$21.99",
      desc: "Golden fried calamari rings with aioli dip",
      image:
        "https://www.unicornsinthekitchen.com/wp-content/uploads/2021/12/Mediterranean-style-shrimp-recipe.jpg",
    },
    {
      title: "Lobster Thermidor",
      price: "$39.99",
      desc: "Classic French lobster with creamy mustard sauce",
      image:
        "https://beyondsweetandsavory.com/wp-content/uploads/2022/02/Gambas-al-ajillo-VyTran-3-500x500.jpg",
    },
    {
      title: "Seared Tuna Steak",
      price: "$27.99",
      desc: "Fresh tuna steak seared rare with sesame crust",
      image:
        "https://dinkoseafoods.com.au/wp-content/uploads/2023/05/Dinko-Seafoods-Asian-Seared-Tuna.jpg",
    },
  ];

  return (
    <section className="px-6 lg:px-16 py-16 bg-gradient-to-b from-[#7A0005] to-black min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white tracking-wide drop-shadow-lg">
          Taste Our Seafood Specials
        </h1>
        <p className="mt-2 text-[#D3651D] font-medium">Fresh & Delicious</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#D3651D] hover:scale-105 hover:shadow-2xl transition transform"
          >
            <img
              src={dish.image}
              alt={dish.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-[#7A0005]">
                  {dish.title}
                </h2>
                <span className="text-sm font-bold text-[#D3651D]">
                  {dish.price}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{dish.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
