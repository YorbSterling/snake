import React from "react";
import PixelRow from "./PixelRow";

const Display = props => {
    return (
        <div>
            {props.pixelRows.map((row, index) => {
                return (
                    <PixelRow key={index} pixels={row} />
                );
            })}
        </div>
    );
}

export default Display;
