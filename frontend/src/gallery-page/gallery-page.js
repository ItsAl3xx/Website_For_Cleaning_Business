import React, { useState } from 'react';
import './gallery-page.css';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Kitchen', 'Living Room', 'Bathroom', 'Bedroom'];
  
  // Sample data - replace image paths with your actual images later
  const galleryItems = [
    {
      id: 1,
      beforeImage: "https://via.placeholder.com/400x300",
      afterImage: "https://via.placeholder.com/400x300",
      title: "Kitchen Deep Clean",
      description: "Complete kitchen transformation with detailed cleaning of all surfaces",
      category: "Kitchen"
    },

    {
      id: 2,
      beforeImage: "https://via.placeholder.com/400x300",
      afterImage: "https://via.placeholder.com/400x300",
      title: "Living Room Refresh",
      description: "Transform your living space with a fresh coat of paint and organized furniture",
      category: "Living Room"
    },

    {
      id: 3,
      beforeImage: "https://via.placeholder.com/400x300",
      afterImage: "https://via.placeholder.com/400x300",
      title: "Bathroom Deep Clean",
      description: "Complete bathroom transformation with detailed cleaning of all surfaces",
      category: "Bathroom"
    },

    {
      id: 4,
      beforeImage: "https://via.placeholder.com/400x300",
      afterImage: "https://via.placeholder.com/400x300",
      title: "Bedroom Refresh",
      description: "Transform your bedroom with a fresh coat of paint and organized furniture",
      category: "Bedroom"
    },
    // Add more items here for testing
  ];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Our Cleaning Transformations</h1>
        <p className="gallery-intro">
          Witness the power of professional cleaning through our before and after transformations
        </p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="gallery-card">
            <h3 className="card-title">{item.title}</h3>
            <div className="image-container">
              <div className="image-wrapper before">
                <img src={item.beforeImage} alt={`Before ${item.title}`} />
                <div className="image-overlay">
                  <span className="overlay-text">Before</span>
                </div>
              </div>
              <div className="image-wrapper after">
                <img src={item.afterImage} alt={`After ${item.title}`} />
                <div className="image-overlay">
                  <span className="overlay-text">After</span>
                </div>
              </div>
            </div>
            <p className="card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
