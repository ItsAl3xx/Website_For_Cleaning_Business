import React from 'react';
import './gallery-page.css';

const GalleryPage = () => {
  // Sample data - replace with real images later
  const galleryItems = [
    {
      id: 1,
      beforeImage: "/path-to-before-image1.jpg",
      afterImage: "/path-to-after-image1.jpg",
      title: "Kitchen Deep Clean",
      description: "Complete kitchen transformation"
    },
    {
      id: 2,
      beforeImage: "/path-to-before-image2.jpg",
      afterImage: "/path-to-after-image2.jpg",
      title: "Living Room Makeover",
      description: "Thorough living room cleaning"
    },
    // Add more items as needed
  ];

  return (
    <div className="gallery-page">
      <h1>Cleaning Transformations</h1>
      <p className="gallery-intro">
        Browse through our before and after cleaning transformations to see the quality of our work.
      </p>
      
      <div className="gallery-grid">
        {galleryItems.map(item => (
          <div key={item.id} className="gallery-item">
            <h3>{item.title}</h3>
            <div className="image-comparison">
              <div className="before-image">
                <h4>Before</h4>
                <img src={item.beforeImage} alt={`Before ${item.title}`} />
              </div>
              <div className="after-image">
                <h4>After</h4>
                <img src={item.afterImage} alt={`After ${item.title}`} />
              </div>
            </div>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
