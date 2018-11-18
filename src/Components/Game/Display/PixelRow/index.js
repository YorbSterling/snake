import React from "react";
import Pixel from "./Pixel";
import styles from "./styles";

const PixelRow = props => {
    return (
        <div>
            {props.pixels.map((pixel, index) => {
                return (
                    <Pixel 
                        key={index} 
                        style={styles.pixel} 
                        type={pixel.type} 
                        size={pixel.size} />
                );
            })}
        </div>
    );
};

export default PixelRow;
