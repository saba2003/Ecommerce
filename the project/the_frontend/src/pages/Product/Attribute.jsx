import React, { Component } from 'react';
import { AttributesContext } from '../../helpers/AttributesContext';

class Attribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: props.attributes,
            activeAttribute: new Map([]),
            allAttributesSelected: false
        };
    }

    setActiveAttribute = (index, text) => {
        const arr = this.state.activeAttribute
        arr.set(index, text)
        this.setState({ activeAttribute: arr });
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.attributes.length <= this.state.activeAttribute.size
            && this.state.allAttributesSelected === false
        ) {
            this.context.changeButtonState(false);
            this.setState({ allAttributesSelected: true })
        }

        function mapsAreEqual(map1, map2) {
            if (map1.size !== map2.size) {
              return false;
            }
    
            for (let [key, value] of map1) {
              
              if (!map2.has(key) || map2.get(key) !== value) {
                return false;
              }
            }
            return true;
          }

        if(!mapsAreEqual(this.context.selectedAttributes, this.state.activeAttribute)){
            this.context.changeAttributes(this.state.activeAttribute)
        }
    }

    render() {
        const { attributes, activeAttribute } = this.state;

        return (
            <div className="attributes">
                {attributes && attributes.length > 0 ? (
                    attributes.map((attribute) => {
                        if (attribute.type === "text") {
                            return (
                                <div 
                                    data-testid={`product-attribute-${attribute.name.split(' ').join('-')}-${attribute.name.split(' ').join('-')}`}
                                    key={attribute.id}
                                    >
                                    <h4>{attribute.name.toUpperCase()}:</h4>
                                    <div className='items text-items'>
                                        {attribute.attribute_items.map((item, index) => (
                                            <div 
                                                key={index}
                                                className={`text-item ${activeAttribute.get(attribute.id) === item.value ? 'text-active' : ''}`}
                                                
                                                
                                                onClick={() => this.setActiveAttribute(attribute.id, item.value)}
                                            >{item.value}</div>
                                        ))}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div 
                                    key={attribute.id}
                                    data-testid={`product-attribute-${attribute.name.split(' ').join('-')}-${attribute.name.split(' ').join('-')}`}
                                    >
                                    <h4>{attribute.name.toUpperCase()}:</h4>
                                    <div className='items swatch-items'>
                                        {attribute.attribute_items.map((item, index) => {
                                            if(attribute.name === "Color"){
                                                return (
                                                    <div 
                                                        key={index}
                                                        className={`color-item ${activeAttribute.get(attribute.id) === item.value ? 'color-active' : ''}`} 
                                                        onClick={() => this.setActiveAttribute(attribute.id, item.value)}   
                                                    >
                                                        <div style={{ backgroundColor: item.value }}></div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div 
                                                        key={index}
                                                        className={`text-item ${activeAttribute.get(attribute.id) === item.value ? 'text-active' : ''}`}
                                                        onClick={() => this.setActiveAttribute(attribute.id, item.value)}
                                                    >{item.value}</div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            );
                        }
                    })
                ) : (
                    <p>No attributes available</p>
                )}
            </div>
        );
    }
}


// Consume the category context
Attribute.contextType = AttributesContext;

export default Attribute;
