import React from 'react';
import '../styleCompants/PostSection.css';

const PostSection = ({ title, description, imageUrl }) => {
  return (
    <section className="post-section">
      <h2 className="section-title">{title}</h2>
      
      <div className="post-container">

        <div className="post-media">
          <img src={imageUrl} alt="Social Media Post" className="post-image" />
        </div>

        <div className="post-content">
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default PostSection;