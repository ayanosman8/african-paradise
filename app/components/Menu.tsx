"use client";

import { useState } from "react";
import { categories, menuItems, MenuItem } from "../data/menu";
import { useCart } from "../context/CartContext";

function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-card border border-border hover:border-primary/30 transition-all">
      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-serif text-lg">{item.name}</h3>
          <span className="text-primary font-medium whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-foreground-muted text-sm leading-relaxed">
          {item.description}
        </p>
        <button
          onClick={() => addItem(item)}
          className="w-full border border-border hover:border-primary hover:bg-primary hover:text-background py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add to Order
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("breakfast");

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="menu" className="py-24 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-medium tracking-widest uppercase text-sm">
            Our Menu
          </p>
          <h2 className="text-4xl md:text-5xl font-light">
            All Day Dining
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Fresh, authentic dishes made with love. Available for dine-in, takeout, and delivery.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-background"
                  : "border border-border text-foreground-muted hover:border-primary hover:text-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <div className="text-center mb-8">
          <p className="text-foreground-muted">
            {categories.find((c) => c.id === activeCategory)?.description}
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
