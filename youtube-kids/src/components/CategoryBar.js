import React from 'react';
import { categories } from '../data/videos';
import { useApp } from '../context/AppContext';
import './CategoryBar.css';

export default function CategoryBar() {
  const { activeCategory, setActiveCategory } = useApp();

  return (
    <div className="category-bar">
      <div className="category-scroll">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="cat-emoji">{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
