import React, { Component } from 'react';

class Attribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: props.attributes,
            activeColor: null,
            activeText: new Map([])
        };
    }

    setActiveColor = (color) => {
        this.setState({ activeColor: color });
    };

    setActiveText = (index, text) => {
        const arr = this.state.activeText
        arr.set(index, text)
        this.setState({ activeText: arr });
    };

    render() {
        const { attributes, activeColor } = this.state;

        return (
            <div className="attributes">
                {attributes && attributes.length > 0 ? (
                    attributes.map((attribute) => {
                        if (attribute.type === "text") {
                            return (
                                <div key={attribute.id}>
                                    <h4>{attribute.name.toUpperCase()}:</h4>
                                    <div className='items text-items'>
                                        {attribute.attribute_items.map((item, index) => (
                                            <div 
                                                key={index}
                                                className={`text-item ${this.state.activeText.get(attribute.id) === item.value ? 'text-active' : ''}`}
                                                onClick={() => this.setActiveText(attribute.id, item.value)}
                                            >{item.value}</div>
                                        ))}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={attribute.id}>
                                    <h4>{attribute.name.toUpperCase()}:</h4>
                                    <div className='items swatch-items'>
                                        {attribute.attribute_items.map((item, index) => {
                                            if(attribute.name === "Color"){
                                                return (
                                                    <div 
                                                        key={index}
                                                        className={`color-item ${activeColor === item.value ? 'color-active' : ''}`} 
                                                        onClick={() => this.setActiveColor(item.value)}   
                                                    >
                                                        <div style={{ backgroundColor: item.value }}></div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div 
                                                        key={index}
                                                        className={`text-item ${this.state.activeText.get(attribute.id) === item.value ? 'text-active' : ''}`}
                                                        onClick={() => this.setActiveText(attribute.id, item.value)}
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

export default Attribute;
