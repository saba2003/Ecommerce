import React, { Component } from 'react';

class Attribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: props.attributes,
        };
    }

    render() {
        const { attributes } = this.state;

        return (
            <div className="attributes">
                <h3>Attributes</h3>
                {attributes && attributes.length > 0 ? (
                    attributes.map((attribute) => {
                        if (attribute.type === "text") {
                            return (
                                <div key={attribute.id}>
                                    <h4>{attribute.name}</h4>
                                    <ul>
                                        {attribute.attribute_items.map((item, index) => (
                                            <li key={index}>
                                                {item.displayValue} ({item.value})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        } else {
                            return (
                                <h4 key={attribute.id}>{attribute.type}</h4>
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
