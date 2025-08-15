"use client";
import React, { useState } from "react";
import "../../../home-custom.css";
import "../../../../../globals.css";
import "../purchase-items.css";

const books = [
  {
    id: 1,
    title: "Bhagavad Gita As It Is",
    desc: "The timeless wisdom of Krishna, translated and explained by Srila Prabhupada.",
    price: 250,
    img: "https://i0.wp.com/iskconshop.com/wp-content/uploads/2023/11/394A9405-e1704628329873.jpg?resize=1000%2C1000&ssl=1" // Bhagavad Gita cover
  },
  {
    id: 2,
    title: "Science of Self Realization",
    desc: "A collection of essays and interviews on the science of the soul.",
    price: 180,
    img: "https://i0.wp.com/iskconshop.com/wp-content/uploads/2021/05/91jfYQBQXLL._SY466_.jpg?w=288&ssl=1" // Science of Self Realization book
  },
  {
    id: 3,
    title: "Krishna Book",
    desc: "Stories of Krishna's pastimes in Vrindavan.",
    price: 300,
    img: "https://i0.wp.com/iskconshop.com/wp-content/uploads/2021/05/125-1-1-1.png?resize=1000%2C1000&ssl=1" // Krishna Book cover
  }
];

const articles = [
  {
    id: 101,
    title: "Tulsi Mala",
    desc: "Sacred tulsi beads for chanting and meditation.",
    price: 60,
    img: "https://i0.wp.com/iskconshop.com/wp-content/uploads/2023/11/394A9355-1.jpg?resize=1000%2C1000&ssl=1" // Tulsi Mala
  },
  {
    id: 102,
    title: "Incense Pack",
    desc: "Fragrant incense sticks for your altar.",
    price: 40,
    img: "https://i0.wp.com/iskconshop.com/wp-content/uploads/2021/05/25-3-2-1-1-1-1-1.png?resize=1000%2C1000&ssl=1" // Incense sticks
  },
  {
    id: 103,
    title: "Car Hanging – Jagannath, Yasoda Damodara, Radha Madhav",
    desc: "Traditional car hanging for your vechicle",
    price: 120,
    img: "https://i0.wp.com/iskconshop.com/wp-content/uploads/2021/08/18-e1685904463996.png?resize=1024%2C1024&ssl=1" // Aarti plate
  }
];

export default function DivinePurchasePage() {
  const [tab, setTab] = useState<'books' | 'articles'>("books");
  const [cart, setCart] = useState<{ id: number; title: string; price: number; qty: number }[]>([]);
  const items = tab === "books" ? books : articles;

  function addToCart(item: typeof books[0]) {
    setCart((prev) => {
      const found = prev.find((c) => c.id === item.id);
      if (found) {
        return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { id: item.id, title: item.title, price: item.price, qty: 1 }];
    });
  }

  function updateQty(id: number, qty: number) {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, qty) } : c));
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="comeCustomBox1 min-h-screen flex flex-col items-center justify-center">
      <div className="purchase-main-box-dark max-w-4xl w-full rounded-3xl shadow-2xl p-10 mt-10 mb-10 border border-yellow-200/60">
        <h2 className="fancyTitle text-white mb-8 text-center text-3xl tracking-wide">Divine Purchase</h2>
        <div className="flex justify-center gap-6 mb-8">
          <button className={`fancy-btn px-8 py-3 rounded-full font-bold shadow transition-all text-lg ${tab === 'books' ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-700'}`} onClick={() => setTab('books')}>Books</button>
          <button className={`fancy-btn px-8 py-3 rounded-full font-bold shadow transition-all text-lg ${tab === 'articles' ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-700'}`} onClick={() => setTab('articles')}>Articles</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {items.map(item => (
            <div key={item.id} className="purchase-card-dark flex flex-col md:flex-row items-center md:items-stretch relative overflow-hidden">
              <div className="purchase-img-wrap-dark md:mr-6 flex-shrink-0 flex items-center justify-center">
                <img src={item.img} alt={item.title} className="purchase-img" />
              </div>
              <div className="flex flex-col justify-center items-center md:items-start flex-1 w-full">
                <div className="font-bold text-white mb-1 text-center md:text-left text-lg">{item.title}</div>
                <div className="text-xs text-gray-200 mb-3 text-center md:text-left min-h-[40px]">{item.desc}</div>
                <div className="font-bold text-yellow-300 mb-3 text-lg">₹{item.price}</div>
                <button className="fancy-btn bg-yellow-400 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-yellow-500 transition-all text-base mt-2" onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="font-bold text-2xl text-yellow-200 mb-4">Your Cart</h3>
          {cart.length === 0 ? (
            <div className="text-gray-300 text-lg">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-yellow-900/40 rounded-xl p-3 shadow">
                  <span className="font-bold text-white flex-1 text-lg">{item.title}</span>
                  <div className="flex items-center gap-2">
                    <button className="fancy-btn bg-yellow-400 text-black w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold p-0" onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty <= 1} aria-label="Decrease quantity">-</button>
                    <input type="number" min={1} value={item.qty} onChange={e => updateQty(item.id, parseInt(e.target.value))} className="w-14 px-2 py-2 rounded border border-yellow-700 text-center text-lg bg-black text-white" />
                    <button className="fancy-btn bg-yellow-400 text-black w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold p-0" onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <span className="text-yellow-200 font-bold text-lg">₹{item.price * item.qty}</span>
                  <button className="ml-2 text-sm text-red-300 underline" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
              <div className="flex justify-end font-bold text-yellow-200 text-2xl mt-4">Total: ₹{total}</div>
              <button className="fancy-btn bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow hover:bg-green-600 transition-all text-lg mt-6">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
