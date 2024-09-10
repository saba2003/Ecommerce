import React, { Component } from 'react';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: props.gallery,
            main_image: '',
            image_index: 0
        };
    }

    componentDidMount() {
      const { gallery } = this.state;
      this.setState({ main_image: gallery[this.state.image_index].url })
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.image_index !== this.state.image_index){
        this.setState({ main_image: this.state.gallery[this.state.image_index].url })
      }
    }
    
    render() {
        const { gallery } = this.state;

        return (
          <div className="gallery">
            <div className="all-images">
              {gallery.length > 0 ? (
                gallery.map((image, index) => (
                  <div className="image-box" key={index}>
                    <img
                      src={image.url}
                      alt={image.url}
                      style={{ width: "150px", margin: "10px" }}
                      onClick={() => this.setState({ main_image: image.url, image_index: index })}
                    />
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="main-image">
              <img
                src={this.state.main_image}
                alt={this.state.main_image}
              />
              <div className='carets'>
                <div 
                  className='caret left' 
                  onClick={() => {
                    if(this.state.image_index - 1 >= 0)
                    this.setState({ image_index: this.state.image_index - 1 })}
                    }
                ></div>
                <div 
                  className='caret right'
                  onClick={() => {
                    if(this.state.image_index + 1 <= (gallery.length - 1))
                    this.setState({ image_index: this.state.image_index + 1 })}
                    }
                ></div>
              </div>
            </div>
          </div>
        );
    }
}

export default Gallery;
