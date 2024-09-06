import React, { Component } from 'react';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: props.gallery,
        };
    }

    render() {
        const { gallery } = this.state;

        return (
            <div className="gallery">
            <h3>Gallery</h3>
            {gallery.length > 0 ? (
              gallery.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.url}
                  style={{ width: "150px", margin: "10px" }}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        );
    }
}

export default Gallery;
