import React from "react";
import "./heading.css";

function Heading({ title, description, images, type }) {
  // type is either wavy or gradient
  return (
    <div className={"heading" + (type ? ` heading--${type}` : "")}>
      <div className="heading__hero">
        {title && <h1 className="heading__hero__title">{title}</h1>}

        {description && (
          <p className="heading__hero__description">{description}</p>
        )}

        {images && (
          <div className="heading__hero__images">
            {images.map((image, index) => (
              <img
                key={index}
                className={`heading__hero__images__image-${index}`}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Heading;
